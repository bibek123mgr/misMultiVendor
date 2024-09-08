const express = require('express')
const catchAsync = require('../../utils/catchAsync')
const dataService = require('../../controller/admin/dataService')
const router = express.Router()

router.route('/data-service').get(catchAsync(dataService))

module.exports = router