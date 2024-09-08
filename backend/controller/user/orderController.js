const { Payment, Order } = require("../../models/orderModel")
const { StoreOrder, Store } = require("../../models/StoreSchema");
const User = require("../../models/userModel");

class orderController {
    async createOrder(req, res) {
        const { products, totalPrice, paymentMethod, address, contact } = req.body;
        const user = req.user;
        const payment = new Payment({
            paymentMethod
        });
        await payment.save();
        const order = new Order({
            user: user._id,
            address,
            totalPrice,
            contact,
            paymentDetail: payment._id
        });
        await order.save();
        const storeProductsMap = products.reduce((map, product) => {
            const { storeId } = product;
            if (!map[storeId]) map[storeId] = [];
            map[storeId].push(product);
            return map;
        }, {});
        for (const [storeId, storeProducts] of Object.entries(storeProductsMap)) {
            const totalOrderPrice = storeProducts.reduce((acc, { price, quantity }) => acc + (price * quantity), 0);
            const storeOrder = new StoreOrder({
                order: order._id,
                totalOrderPrice,
                products: storeProducts.map(({ productId, price, quantity }) => ({ product: productId, price, quantity })),
                orderStatus: 'pending'
            });
            await storeOrder.save();
            await Store.findByIdAndUpdate(storeId, {
                $push: { orders: storeOrder._id },
            });
        }
        user.orders.push(order._id);
        await user.save();
        const resOrder = await Order.findById(order._id).populate("paymentDetail")
        const { _id, orderStatus, createdAt, paymentDetail } = resOrder

        const data = {
            _id,
            orderStatus,
            totalPrice: resOrder.totalPrice,
            createdAt,
            paymentMethod: paymentDetail.paymentMethod,
            paymentStatus: paymentDetail.paymentStatus
        }
        res.status(201).json({
            message: 'Successfully placed order',
            data
        });
    }
    async cancelOrder(req, res) {
        const { id } = req.params;
        const user = req.user._id;
        const order = await Order.findById(id);
        if (!order || order.user.toString() !== user.toString()) {
            return res.status(404).json({ message: 'Order not found or unauthorized' });
        }
        const storeOrder = await StoreOrder.countDocuments({
            order: id,
            orderStatus: 'pending'
        })

        if (storeOrder > 0 || order.orderStatus !== 'pending') {
            return res.status(401).json({ message: 'Can\'t cancel this order' });
        }
        order.orderStatus = 'cancelled';
        await order.save();
        res.status(200).json({ message: 'Order successfully cancelled' });
    }
    async fetchOrders(req, res) {
        const user = req.user._id;
        const userOrder = await User.findById(user).populate({
            path: 'orders',
            populate: {
                path: 'paymentDetail',
                select: 'paymentMethod paymentStatus'
            }
        });

        const orders = userOrder.orders.map(order => ({
            _id: order._id,
            totalPrice: order.totalPrice,
            paymentMethod: order.paymentDetail.paymentMethod,
            paymentStatus: order.paymentDetail.paymentStatus,
            orderStatus: order.orderStatus,
            createdAt: order.createdAt
        }));

        res.status(200).json({
            message: 'fetch orders',
            data: orders
        });
    }
    async fetchOrderDetails(req, res) {
        const user = req.user._id;
        const { id } = req.params;

        const [order, orderDetails] = await Promise.all([
            Order.findById(id).populate('paymentDetail', '-__v').select('-__v -updatedAt'),
            StoreOrder.find({ order: id }).select('-__v -totalOrderPrice').populate({
                path: 'products.product',
                select: 'name images'
            })
        ]);

        if (!order || !order.user || order.user.toString() !== user.toString()) {
            return res.status(404).json({
                message: 'Order not found or user not authorized'
            });
        }

        const { address, contact, _id, totalPrice, createdAt, orderStatus, paymentDetail } = order;

        // Aggregating all products from each order detail
        const products = orderDetails.flatMap(detail => detail.products || []);

        if (products.length === 0) {
            return res.status(404).json({
                message: 'No products found for this order'
            });
        }
        const transformedProducts = products.map((item) => {
            return {
                name: item.product.name.trim(),
                url: item.product.images[0]?.url || '',
                price: item.price,
                quantity: item.quantity,
            };
        });

        const data = {
            address,
            contact,
            _id,
            totalPrice,
            createdAt,
            orderStatus,
            paymentMethod: paymentDetail.paymentMethod,
            paymentStatus: paymentDetail.paymentStatus,
            products: transformedProducts
        };

        res.status(200).json({
            message: 'Fetched order details',
            data
        });
    }
    async cancelStoreOrder(req, res) {
        const { id } = req.params
        const user = req.user._id
        const storeOrder = await StoreOrder.findById(id)
        if (!storeOrder || storeOrder.orderStatus !== 'pending') {
            return res.status(404).json({
                message: 'Order not found or user not authorized'
            });
        }
        storeOrder.orderStatus = "cancelled_by_customer"
        await storeOrder.save()
        res.status(200).json({
            message: 'order successfully cancelled'
        })
    }
    async editOrderDetails(req, res) {
        const { address, contact } = req.body
        const { id } = req.params
        const order = await Order.findById(id)
        if (!order || order.orderStatus !== 'pending') {
            return res.status(401).json({
                message: 'no order found or forbidden'
            })
        }
        order.address = address
        order.contact = contact
        await order.save()
        res.status(200).json({
            message: 'sussfully update address',
            data: order
        })
    }
}

module.exports = new orderController()