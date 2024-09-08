const { model } = require("mongoose");
const { Category } = require("../../models/productModel");

class categoryController {
    async fetchAllCategory(req, res) {
        const category = await Category.find()
        const data = category.map((item) => ({
            _id: item._id,
            name: item.name
        }));
        res.status(200).json({
            message: 'Fetched successfully',
            data
        });
    }
}

module.exports = new categoryController()