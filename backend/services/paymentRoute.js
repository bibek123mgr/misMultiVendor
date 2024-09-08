const crypto = require("crypto");
const axios = require("axios");
require('dotenv').config();

async function InitiateKhalti(orderId, price) {
    try {
        const data = {
            website_url: 'http://localhost:5173',
            return_url: 'http://localhost:5173/api/payment/khaltisuccess',
            amount: price * 100,
            purchase_order_id: `${orderId}-${Date.now()}`,
            purchase_order_name: `Order ${orderId}`
        };

        const response = await axios.post('https://a.khalti.com/api/v2/epayment/initiate/', data, {
            headers: {
                'Authorization': 'key 191e809935014f76869721a2989cbc16'
            }
        });

        return response;
    } catch (error) {

        throw new Error('Failed to initiate Khalti payment: ' + error.message);
    }
}

async function verifyKhaltiPidx(pidx) {
    try {
        const response = await axios.post('https://a.khalti.com/api/v2/epayment/lookup/', { pidx }, {
            headers: {
                'Authorization': 'key 191e809935014f76869721a2989cbc16'
            }
        });
        const data = response.data;
        return data
    } catch (error) {
        console.error('Error verifying payment:', error);
        throw error
    }
}
async function InitiateEsewaPay(amount, transaction_uuid) {
    try {
        const hashData = `total_amount=${amount},transaction_uuid=${transaction_uuid},product_code=${process.env.ESEWA_PRODUCT_CODE}`;
        const secretKey = process.env.ESEWA_SECRET_KEY;
        const hash = crypto
            .createHmac("sha256", secretKey)
            .update(hashData)
            .digest("base64");

        const taxAmount = 0;
        const totalAmount = taxAmount + amount;
        const data = {
            amount: `${amount}`,
            failure_url: "http://localhost:5173/esewa/fail",
            product_delivery_charge: "0",
            product_service_charge: "0",
            product_code: process.env.ESEWA_PRODUCT_CODE || "EPAYTEST",
            signature: `${hash}`,
            signed_field_names: "total_amount,transaction_uuid,product_code",
            success_url: "http://localhost:5173/esewa/success",
            tax_amount: `${taxAmount}`,
            total_amount: `${totalAmount}`,
            transaction_uuid: `${transaction_uuid}`,
        };
        const response = await axios.post('https://rc-epay.esewa.com.np/api/epay/main/v2/form', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error initiating eSewa payment:', error);
        throw error;
    }
}
async function verifyEsewaPayment(encodedData) {
    try {
        let decodedData = atob(encodedData);
        decodedData = await JSON.parse(decodedData);
        let headersList = {
            Accept: "application/json",
            "Content-Type": "application/json",
        };

        const data = `transaction_code=${decodedData.transaction_code},status=${decodedData.status},total_amount=${decodedData.total_amount},transaction_uuid=${decodedData.transaction_uuid},product_code=${process.env.ESEWA_PRODUCT_CODE},signed_field_names=${decodedData.signed_field_names}`;

        const secretKey = process.env.ESEWA_SECRET_KEY;
        const hash = crypto
            .createHmac("sha256", secretKey)
            .update(data)
            .digest("base64");
        let reqOptions = {
            url: `${process.env.ESEWA_GATEWAY_URL}/api/epay/transaction/status/?product_code=${process.env.ESEWA_PRODUCT_CODE}&total_amount=${decodedData.total_amount}&transaction_uuid=${decodedData.transaction_uuid}`,
            method: "GET",
            headers: headersList,
        };
        if (hash !== decodedData.signature) {
            throw { message: "Invalid Info", decodedData };
        }
        let response = await axios.request(reqOptions);
        if (
            response.data.status !== "COMPLETE" ||
            response.data.transaction_uuid !== decodedData.transaction_uuid ||
            Number(response.data.total_amount) !== Number(decodedData.total_amount)
        ) {
            throw { message: "Invalid Info", decodedData };
        }
        return { response: response.data, decodedData };
    } catch (error) {
        throw error;
    }
}


module.exports = {
    InitiateKhalti,
    verifyKhaltiPidx,
    InitiateEsewaPay,
    verifyEsewaPayment
};