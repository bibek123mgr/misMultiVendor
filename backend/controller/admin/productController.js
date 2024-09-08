const { Product } = require("../../models/productModel");

class productController {
    async getAllProduct(req, res, next) {
        const product = await Product.find()
        res.status(200).json({
            message: 'product fetch Successfully',
            data: product
        })
    }
}

module.exports = new productController()