const { Store, StoreOrder } = require("../../models/StoreSchema");

class storeController {
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
            for (const order of store.orders) {
                deletePromises.push(StoreOrder.findByIdAndDelete(order))
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
    async editMyStoreAvatar(req, res) {
    }
    async editMyStoreBanner(req, res) {
    }
    async editStoreDetails(req, res) {
    }

}
module.exports = new storeController()