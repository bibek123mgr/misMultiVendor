const { Category } = require("../models/productModel");

class ProductService {
    async _isCategoryExist(req, res) {
        const { id } = req.params;
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({
                message: 'No category found'
            });
        }
        return category;
    }

    async _isSubCategoryExist(req, res) {
        const category = await this._isCategoryExist(req, res); // Use 'this' to call instance method
        if (!category) return; // Early return if no category

        const { subcategoryId } = req.body;
        const subcategory = category.subCategory.id(subcategoryId);
        if (!subcategory) {
            return res.status(404).json({
                message: 'No subcategory found',
            });
        }
        return subcategory;
    }
}

module.exports = new ProductService();
