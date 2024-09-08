const cloudinary = require("../../middleware/cloudinary");
const { Product } = require("../../models/productModel");
const { Store } = require("../../models/StoreSchema");
const User = require("../../models/userModel");
const storeService = require("../../services/storeService");


class storeController {
    async verifyStore(req, res) {
        const store = await Store.findById(req.params.id);
        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }
        const user = await User.findById(store.user.toString());
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.role = "vendor";
        store.verified = true;
        await Promise.all([
            store.save(),
            user.save()
        ]);

        res.status(200).json({
            message: 'Store verified and user role updated to vendor'
        });
    }
    async getStore(req, res) {
        const store = await storeService._findStore(req, res);
        res.status(200).json({
            message: 'store retrieved',
            data: store
        });
    }
    async deleteStore(req, res) {
        const { id } = req.params;
        const store = await Store.findById(id);
        if (!store) {
            return res.status(401).json({
                message: 'no store found for this action'
            });
        }
        const deletePromises = [];
        if (store.verified === true && store.products.length > 0) {
            const products = await Product.find({ _id: { $in: store.products } });
            for (const product of products) {
                for (const image of product.images) {
                    deletePromises.push(cloudinary.uploader.destroy(image.public_id));
                }
            }
            deletePromises.push(Product.deleteMany({ _id: { $in: store.products } }));
        }
        if (store.citizenship && store.citizenship.images.length > 0) {
            for (const image of store.citizenship.images) {
                deletePromises.push(cloudinary.uploader.destroy(image.public_id));
            }
        }
        deletePromises.push(Store.findByIdAndDelete(id));
        await Promise.all(deletePromises);
        res.status(200).json({
            message: 'Store, associated products, and all related images deleted successfully'
        });
    }
    async getSellerForm(req, res) {
        const store = await Store.find({ verified: false }).select("-products -orders -__v -updatedAt -treasure")
        if (!store) {
            return res.status(404).json({
                message: 'no store form found'
            })
        }

        res.status(200).json({
            message: 'fetch form',
            data: store
        }
        )
    }
}

module.exports = new storeController();

