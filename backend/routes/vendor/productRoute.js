const express = require('express')
const upload = require('../../middleware/multer')
const productController = require('../../controller/vendor/productController')
const catchAsync = require('../../utils/catchAsync')
const authMiddleware = require('../../middleware/authMiddleware')
const router = express.Router()

router.use(authMiddleware.isAuthenticated, authMiddleware.restrictTo('vendor'))
router.route('/product')
    .post(upload.array('image', 4), catchAsync(productController.AddProductRequest))
    .get(catchAsync(productController.getAllProduct))
router.route('/product/:id')
    .delete(catchAsync(productController.deleteProduct))

module.exports = router