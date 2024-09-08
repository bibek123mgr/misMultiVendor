const express = require('express')
const categoryController = require('../../controller/admin/categoryController')
const catchAsync = require('../../utils/catchAsync');
const upload = require('../../middleware/multer');
const router = express.Router()

router.route('/category')
    .post(upload.single('image'), catchAsync(categoryController.createMainCategory))
    .get(catchAsync(categoryController.getAllCategory));

router.route('/category/:id')
    .get(catchAsync(categoryController.getCategoryDetail))
    .delete(catchAsync(categoryController.deleteCategory))
    .patch(upload.single('image'), catchAsync(categoryController.updateCategory));

// SubCategorys
// router.route('/category/sub/:id')
//     .post(upload.single('image'), catchAsync(categoryController.createSubCategory))
//     .delete(catchAsync(categoryController.deleteSubCategory))
//     .patch(upload.single('image'), catchAsync(categoryController.updateSubCategoryName));


module.exports = router