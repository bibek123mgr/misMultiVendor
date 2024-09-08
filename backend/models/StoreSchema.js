const mongoose = require('mongoose');
const { Schema } = mongoose

const storeOrderSchema = new Schema({
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
    },
    totalOrderPrice: {
        type: Number,
        required: true
    },
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    orderStatus: {
        type: String,
        enum: ['pending', 'processing', 'cancelled_by_customer', 'cancelled_by_store', 'returned', "accepted"],
        default: 'pending',
        required: true
    },
})

const storeSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true
    },
    banner: {
        public_id: String,
        url: String
    },
    avatar: {
        public_id: String,
        url: String
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    number: {
        type: Number,
        required: true,
        trim: true,
    },
    vatNumber: String,
    panNumber: String,
    citizenship: {
        number: { type: Number, require: [true, 'please provide citizenShip'] },
        images: [{
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            }
        }],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    treasure: { type: Number, default: 0 },
    verified: {
        type: Boolean,
        default: false
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
    }],
    orders: [{
        type: Schema.Types.ObjectId,
        ref: 'StoreOrder'
    }]
}, {
    timestamps: true,
});

const Store = mongoose.model('Store', storeSchema);
const StoreOrder = mongoose.model('StoreOrder', storeOrderSchema);
module.exports = { Store, StoreOrder };
