const express = require('express')
const catchAsync = require('../../utils/catchAsync')
const productController = require('../../controller/global/productController')
const router = express.Router()

router.route('/product')
    .get(catchAsync(productController.getAllProduct))
router.route('/product/:id')
    .get(catchAsync(productController.getProduct))

module.exports = router