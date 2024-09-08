const express = require('express')
const authMiddleware = require('../../middleware/authMiddleware')
const catchAsync = require('../../utils/catchAsync')
const router = express.Router()

app.use(authMiddleware.isAuthenticated, authMiddleware.restrictTo("vendor"),)
router.route('/store')
    .post(upload.array('image', 2), catchAsync(storeController.sellerRequest))
router.route('/store/:id')
    .delete(catchAsync(storeController.deleteStore))
    .patch(upload.array('image', 2), catchAsync(storeController.editStore))

module.exports = router