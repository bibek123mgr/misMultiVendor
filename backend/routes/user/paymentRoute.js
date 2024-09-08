const express = require('express')
const authMiddleware = require('../../middleware/authMiddleware')
const catchAsync = require('../../utils/catchAsync')
const Role = require('../../type/typeDef')
const paymentController = require('../../controller/user/paymentController')
const router = express.Router()


router.use(authMiddleware.isAuthenticated, authMiddleware.restrictTo(Role.CUSTOMER),)
router.route('/initate-khalti').post(catchAsync(paymentController.khaltiPay))
router.route('/verify-khalti').post(catchAsync(paymentController.verifyKhalti))
router.route('/initate-esewa').post(catchAsync(paymentController.InitiateEsewa))



module.exports = router