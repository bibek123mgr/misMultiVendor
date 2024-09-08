const cloudinary = require("../../middleware/cloudinary");
const { Product } = require("../../models/productModel");
const { Store } = require("../../models/StoreSchema");

class productController {
    async AddProductRequest(req, res) {
        const { name, category, description, price, stock } = req.body;
        const user = req.user
        const store = await Store.findOne({ user: user._id })
        if (!store || store.verified === false) {
            return res.status(401).json({
                message: 'no store or forbidden'
            })
        }
        const files = req.files
        if (!files || files.length === 0) {
            return res.status(400).json({
                message: 'images is require'
            })
        }
        const images = await files.map(file => {
            return {
                public_id: file.filename,
                url: file.path
            }
        })
        const newProduct = new Product({
            name,
            category,
            description,
            price: {
                originalPrice: price,
                discountedPrice: 0,
            },
            images,
            stock,
            store: store._id
        })
        await newProduct.save();
        store.products.push(newProduct._id);
        await store.save();
        res.status(201).json({
            message: 'new product added',
        })

    }
    async deleteProduct(req, res) {
        const { id } = req.params
        const { storeId } = req.body
        const user = req.user
        const store = await Store.findById(storeId)
        if (!store || store.user.toString() !== user._id.toString()) {
            return res.status(401).json({
                message: 'no store or forbidden'
            })
        }
        const deletePormise = []
        const product = await Product.findOne({
            _id: id,
            store: storeId
        })
        if (!product) {
            return res.status(404).json({
                message: 'no product found or not associated to you'
            })
        }
        for (const image of product.images) {
            deletePormise.push(cloudinary.uploader.destroy(image.public_id))
        }
        store.products = store.products.filter(item => item.toString() !== id)
        deletePormise.push(store.save())
        deletePormise.push(product.deleteOne())
        await Promise.all(deletePormise)
        res.status(200).json({
            message: 'successfully delete'
        })
    }
    async getAllProduct(req, res, next) {
        const user = req.user._id
        const store = await Store.findOne({ user }).populate({
            path: 'products',
            select: "-__v -description -store -updatedAt",
            populate: {
                path: 'category',
                select: '-__v -image -createdAt -updatedAt'
            }
        })
        if (!store) {
            return res.status(401).json({
                message: 'Store not found  or forbidden'
            });
        }
        const data = store.products.map(({ price, _id, name, images, stock, createdAt, store }) => ({
            price: price.originalPrice,
            _id,
            name,
            image: images[0].url,
            stock,
            store,
            createdAt
        }));
        res.status(200).json({
            message: 'product fetch Successfully',
            data
        })
    }
    async editProductDetails(req, res, next) {
        const { id } = req.params
        const user = req.user._id
        const store = await Store.findById(id).populate('products');
        if (!store || store.user.toString() !== user.toString()) {
            return res.status(401).json({
                message: 'Store not found  or forbidden'
            });
        }
        res.status(200).json({
            message: 'product fetch Successfully',
            data: store.products
        })
    }
    async getProduct(req, res) {

    }
}

module.exports = new productController()