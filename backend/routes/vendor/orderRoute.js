const express = require('express')
const authMiddleware = require('../../middleware/authMiddleware')
const catchAsync = require('../../utils/catchAsync')
const orderController = require('../../controller/vendor/orderController')
const Role = require('../../type/typeDef')
const router = express.Router()

router.use(authMiddleware.isAuthenticated, authMiddleware.restrictTo(Role.VENDOR))
router.route('/order')
    .get(catchAsync(orderController.getOrders))
router.route('/order/:id')
    .patch(catchAsync(orderController.orderStatusChange))

module.exports = router