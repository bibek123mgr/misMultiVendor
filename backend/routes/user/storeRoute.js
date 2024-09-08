const express = require('express')
const authMiddleware = require('../../middleware/authMiddleware')
const storeController = require('../../controller/user/storeController')
const upload = require('../../middleware/multer')
const catchAsync = require('../../utils/catchAsync')
const Role = require('../../type/typeDef')
const router = express.Router()

router.route('/store')
    .post(upload.array('image', 2), catchAsync(storeController.sellerRequest))
    .get(catchAsync(storeController.getSellerForm))
router.route('/store/:id')
    .delete(catchAsync(storeController.deleteStore))
    .patch(upload.array('image', 2), catchAsync(storeController.editStore))

module.exports = router