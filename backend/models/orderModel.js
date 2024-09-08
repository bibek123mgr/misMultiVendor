const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    address: { type: String, required: true },
    contact: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    orderStatus: {
        type: String, enum: [
            'pending',
            'processing',
            'shipped',
            'delivered',
            'cancelled',
            'returned'
        ],
        default: 'pending'
    },
    paymentDetail: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment', required: true },
}, {
    timestamps: true
});

// Schema for Payment
const PaymentSchema = new Schema({
    paymentMethod: {
        type: String,
        enum: [
            'khalti',
            'esewa',
            'cod'
        ],
        required: true,
        default: 'cod'
    },
    paymentStatus: {
        type: String,
        enum: [
            'paid',
            'unpaid',
            'refunded'
        ],
        required: true,
        default: 'unpaid'
    },
    paymentId: { type: String },
});

// Models
const Order = mongoose.model('Order', OrderSchema);
const Payment = mongoose.model('Payment', PaymentSchema);

module.exports = { Order, Payment };
