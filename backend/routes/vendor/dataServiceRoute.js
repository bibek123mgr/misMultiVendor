const express = require('express')
const authMiddleware = require('../../middleware/authMiddleware')
const Role = require('../../type/typeDef')
const dataService = require('../../controller/vendor/dataService')

const router = express.Router()


router.use(authMiddleware.isAuthenticated, authMiddleware.restrictTo(Role.VENDOR))
router.route('/data-service',).get(dataService)

module.exports = router