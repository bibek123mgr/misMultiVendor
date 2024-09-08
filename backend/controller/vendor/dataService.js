const { Store } = require("../../models/StoreSchema")

const dataService = async (req, res) => {
    const store = await Store.findOne({ user: req.user._id }).populate({
        path: 'orders'
    })
    const totalSales = store.orders.reduce((total, item) => item.totalOrderPrice + total, 0)
    res.status(200).json({
        message: 'fetch data',
        data: {
            orders: store.orders.length,
            products: store.products.length,
            totalOrder: totalSales
        }
    })
}
module.exports = dataService