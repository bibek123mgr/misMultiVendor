const { Order } = require("../../models/orderModel")
const { StoreOrder } = require("../../models/StoreSchema")

class orderController {
    async fetchallOrders(req, res) {
        const order = await Order.find()
        res.status(200).json({
            message: 'successfully fectch order',
            data: order
        })
    }
    async fetchOrderDetails(req, res) {
        const { id } = req.params
        const { orderstatus } = req.query
        const order = await Order.findById(id).populate('user', 'name')
        if (!order) {
            return res.status(404).json({
                message: 'order not found',
            })
        }
        const orderDetails = await StoreOrder.find({ order: id })
        if (orderstatus) {
            if (order.orderStatus === 'delivered') {
                return res.status(401).json({
                    message: 'Cannot change order status',
                });
            }
            const allAccepted = orderDetails.every(detail => detail.orderStatus === 'accepted');
            if (!allAccepted) {
                return res.status(401).json({
                    message: 'Cannot change order status to delivered. Not all order details are accepted.',
                });
            }
            order.orderStatus = orderstatus
            await order.save()
            res.status(200).json({
                message: 'successfully update order status',
                data: order
            })
        } else {
            const data = {
                ...order,
                ...orderDetails
            }
            res.status(200).json({
                message: 'successfully fectch order',
                data
            })
        }
    }
}
module.exports = new orderController()