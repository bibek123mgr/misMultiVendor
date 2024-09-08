const express = require('express')
const authMiddleware = require('../../middleware/authMiddleware')
const productController = require('../../controller/admin/productController')
const upload = require('../../middleware/multer')
const catchAsync = require('../../utils/catchAsync')
const router = express.Router()

router.route('/product').get(catchAsync(productController.getAllProduct))

module.exports = router