const { Product } = require("../../models/productModel")

class productController {
    async getAllProduct(req, res) {
        const products = await Product.find()
            .select("-category -subCategory -description -updatedAt -__v")
            .sort({ createdAt: -1 });

        const data = products.map(({ price, _id, name, images, stock, createdAt, store }) => ({
            price: price.originalPrice,
            _id,
            name,
            image: images[0].url,
            stock,
            store,
            createdAt
        }));

        res.status(200).json({
            message: 'fetch product successfully',
            data
        });
    }

    async getProduct(req, res) {
        const { id } = req.params
        const product = await Product.findById(id).populate({
            path: 'category',
            select: '-subCategory -createdAt -updatedAt -__v'
        }).populate({
            path: 'store',
        }).select(" -updatedAt -__v")

        if (!product) {
            return res.status(404).json({
                message: 'no product found'
            })
        }
        const { _id, name, description, category, price, images, stock, store, createdAt } = product
        const data = {
            _id,
            name,
            description,
            category: category.name,
            price,
            images: images.map((item) => item.url),
            stock,
            store: {
                _id: store._id,
                name: store.name
            },
            createdAt
        }
        res.status(200).json({
            message: 'fetch product successfully',
            data
        })
    }
}

module.exports = new productController()