const express = require('express')
const authMiddleware = require('../../middleware/authMiddleware')
const catchAsync = require('../../utils/catchAsync')
const storeController = require('../../controller/admin/storeController')
const router = express.Router()

router.use(authMiddleware.isAuthenticated, authMiddleware.restrictTo('admin'),)
router.route('/store/:id')
    .patch(catchAsync(storeController.verifyStore))
    .get(catchAsync(storeController.getStore))
router.route('/store')
    .get(catchAsync(storeController.getSellerForm))
module.exports = router