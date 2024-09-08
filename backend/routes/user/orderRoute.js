const express = require('express')
const authMiddleware = require('../../middleware/authMiddleware')
const catchAsync = require('../../utils/catchAsync')
const orderController = require('../../controller/user/orderController')
const Role = require('../../type/typeDef')
const router = express.Router()


router.use(authMiddleware.isAuthenticated, authMiddleware.restrictTo(Role.CUSTOMER),)
router.route('/order')
    .post(catchAsync(orderController.createOrder))
    .get(catchAsync(orderController.fetchOrders))
router.route('/order/:id')
    .put(catchAsync(orderController.cancelOrder))
    .get(catchAsync(orderController.fetchOrderDetails))

module.exports = router