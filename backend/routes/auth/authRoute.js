const express = require('express')
const authController = require('../../controller/auth/authController')
const authMiddleware = require('../../middleware/authMiddleware')
const router = express.Router()

router.route('/login').post(authController.login)
router.route('/register').post(authController.register)
router.route('/verify').post(authController.verifyAccout)
router.route('/getme').get(authMiddleware.isAuthenticated, authController.getMe)
router.route('/logout').post(authMiddleware.isAuthenticated, authController.Logout)

module.exports = router