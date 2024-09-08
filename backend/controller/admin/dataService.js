const { Order } = require("../../models/orderModel")
const { Product } = require("../../models/productModel")
const { Store } = require("../../models/StoreSchema")
const User = require("../../models/userModel")

const dataService = async (req, res) => {
    const [user, order, store, product] = await Promise.all([
        User.countDocuments(),
        Order.find(),
        Store.countDocuments({ verified: true }),
        Product.countDocuments()
    ])

    const totlOrder = order.reduce((total, item) => total + item.totalPrice, 0)
    res.status(200).json({
        message: 'fetch successfully',
        data: {
            user,
            order: order.length,
            store,
            product,
            totlOrder
        }
    })
}

module.exports = dataService