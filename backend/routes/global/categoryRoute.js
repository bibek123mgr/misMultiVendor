const express = require('express')
const catchAsync = require('../../utils/catchAsync')
const categoryController = require('../../controller/global/categoryController')
const router = express.Router()

router.route('/category')
    .get(catchAsync(categoryController.fetchAllCategory))

module.exports = router