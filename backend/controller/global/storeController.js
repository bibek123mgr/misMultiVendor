const { Store } = require("../../models/StoreSchema")

class storeController {
    async getAllStore(req, res) {
        const store = await Store.find({ verified: true }).select("-citizenship -vatNumber -panNumber -user -verified -createdAt -updatedAt -__v -orders -treasure -products -banner -number -email")
        res.status(200).json({
            message: 'successfully fetch store',
            data: store
        })
    }
    async getStoreDetails(req, res) {
        const { id } = req.params
        const store = await Store.findById(id)
            .select("-citizenship -vatNumber -panNumber -user -verified -createdAt -updatedAt -__v -orders -treasure")
            .populate({
                path: 'products',
                select: 'price name images stock createdAt store',
            });

        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }
        const { _id, name, email, number, description, banner, avatar, products } = store;

        const formattedProducts = products.map(product => ({
            _id: product._id,
            price: product.price.orginalPrice,
            name: product.name,
            store: product.store,
            image: product.images[0].url,
            stock: product.stock,
        }))
        const data = {
            _id,
            name,
            email,
            number,
            products: formattedProducts,
            description,
            banner,
            avatar,
        };
        res.status(200).json({
            message: 'successfully fetch store',
            data
        })
    }

}

module.exports = new storeController()