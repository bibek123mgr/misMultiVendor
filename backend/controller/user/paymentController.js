const { Order, Payment } = require("../../models/orderModel");
const { InitiateKhalti, verifyKhaltiPidx, verifyEsewaPayment, InitiateEsewaPay } = require("../../services/paymentRoute");

class paymentController {
    async khaltiPay(req, res) {
        const { orderId, amount } = req.body
        console.log(req.body)
        const order = await Order.findById(orderId).populate('paymentDetail');

        if (!order) {
            return res.status(404).json({
                message: 'Order not found'
            });
        }
        const response = await InitiateKhalti(orderId, amount)
        const paymentDetail = order.paymentDetail;
        if (paymentDetail) {
            paymentDetail.paymentId = response.data.pidx;
            await paymentDetail.save();
        } else {
            return res.status(400).json({
                message: 'Payment details not found in the order.'
            });
        }
        res.status(200).json({
            message: 'Khalti initiated successfully',
            data: response.data
        });
    }
    async verifyKhalti(req, res) {
        const { pidx } = req.body
        const data = await verifyKhaltiPidx(pidx)
        console.log(data)
        if (data.status === 'Completed') {
            const paymnet = await Payment.findOneAndUpdate({ paymentId: pidx }, {
                paymentStatus: 'Paid'
            });
            console.log(paymnet)
            res.status(200).json({
                message: 'Payment verified successfully'
            });
        } else {
            res.status(400).json({
                message: 'Payment verification failed. Status: ' + data.status
            });
        }
    }
    async InitiateEsewa(req, res) {
        const { orderId, amount } = req.body
        const order = await Order.findById(orderId).populate('paymentDetail');

        if (!order) {
            return res.status(404).json({
                message: 'Order not found'
            });
        }
        const paymentInitiate = await InitiateEsewaPay(
            amount,
            orderId
        );
        res.status(200).json({
            data: paymentInitiate,

        });
    }
    async verifyEsewa(req, res) {
        const { data } = req.query;
        const paymentInfo = await verifyEsewaPayment(data);
        const purchasedItemData = await Order.findById(
            paymentInfo.response.transaction_uuid
        ).populate('paymentDetail');

        if (!purchasedItemData) {
            return res.status(404).json({
                message: "Purchase not found",
            });
        }
        const paymentDateail = purchasedItemData.paymentDetail
        paymentDateail.paymentId = paymentInfo.decodedData.transaction_code,
            paymentDateail.paymentStatus = 'paid'
        await paymentDateail.save()
        res.json({
            success: true,
            message: "Payment successful",
        });

    };
}

module.exports = new paymentController()