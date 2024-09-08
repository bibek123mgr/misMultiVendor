const { Store } = require("../../models/StoreSchema")

class orderController {
    async getOrder(req, res) {
        const { storeOrderId } = req.params;
        const store = await Store.findById(storeId).populate('orders');
        if (!store) {
            return res.status(404).json({
                message: 'Store not found',
            });
        }
        if (storeOrderId) {
            const order = store.orders.find(item => item._id.toString() === storeOrderId.toString());
            if (!order) {
                return res.status(404).json({
                    message: 'Order not found',
                });
            }
            return res.status(200).json({
                message: 'Fetched specific order successfully',
                data: order,
            });
        } else {
            return res.status(200).json({
                message: 'Fetched all store orders successfully',
                data: store.orders,
            });
        }
    }
    async orderStatusChange(req, res) {
        const { storeId } = req.body;
        const { storeOrderId } = req.query;
        const store = await Store.findById(storeId).populate('orders');
        if (!store) {
            return res.status(404).json({
                message: 'Store not found',
            });
        }
        const order = store.orders.find(item => item._id.toString() === storeOrderId.toString());
        if (orderStatus && order.orderStatus !== 'accepted') {
            order.orderStatus = orderStatus;
            // if (orderStatus === 'accepted') {

            // }
            await order.save();
            return res.status(200).json({
                message: 'Order status updated successfully',
                data: order,
            });
        } else {
            return res.status(401).json({
                message: 'no order or forbidden',
                data: order,
            });
        }
    }
    async getOrders(req, res) {
        const store = await Store.findOne({ user: req.user._id }).populate({
            path: 'orders',
            select: '-__v -order',
            populate: {
                path: 'products.product',
                select: 'name'
            }
        })
        const data = store.orders.map(order => ({
            _id: order._id,
            totalOrderPrice: order.totalOrderPrice,
            products: order.products.map(item => ({
                product: item.product.name,
                price: item.price,
                quantity: item.quantity,
            })),
            orderStatus: order.orderStatus,
        }));
        res.status(200).json({
            message: 'fatch',
            data
        })
    }d

}

module.exports = new orderController()