const express = require('express')
const catchAsync = require('../../utils/catchAsync')
const storeController = require('../../controller/global/storeController')
const router = express.Router()

router.route('/store')
    .get(catchAsync(storeController.getAllStore))
router.route('/store/:id')
    .get(catchAsync(storeController.getStoreDetails))

module.exports = router