const cloudinary = require("../../middleware/cloudinary")
const { Product } = require("../../models/productModel")
const { Store } = require("../../models/StoreSchema")

class storeController {
    async sellerRequest(req, res) {
        const { name, number, vatNumber, panNumber, citizenshipNumber, email, address, description } = req.body
        const files = req.files
        const [isNameReserved, userHaverAlreadyStore] = await Promise.all([
            Store.findOne({ name }),
            Store.findOne({ user: req.user._id })
        ])
        if (isNameReserved || userHaverAlreadyStore) {
            return res.status(401).json({
                messsage: 'name already reserved or one user have only one user'
            })
        }
        console.log(files)
        if (!files || files.length === 0) {
            return res.status(400).json({
                messsage: 'citizenship details is require'
            })
        }
        const citizenshipImages = await files.map(file => {
            return {
                public_id: file.filename,
                url: file.path
            }
        })
        const store = new Store({
            name,
            number,
            email,
            number,
            vatNumber,
            panNumber,
            description,
            citizenship: {
                number: citizenshipNumber,
                images: citizenshipImages,
            },
            email,
            address,
            user: req.user._id
        })
        await store.save()
        res.status(201).json({
            message: 'your seller request has been applied',
            data: store
        })
    }
    async deleteStore(req, res) {
        const { id } = req.params;
        const store = await Store.findById(id);
        if (!store || store.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                message: 'Forbidden for this action'
            });
        }
        const deletePromises = [];
        if (store.verified === true && store.products.length > 0) {
            const products = await Product.find({ _id: { $in: store.products } });
            for (const product of products) {
                if (product.images && product.images.length > 0) {
                    for (const image of product.images) {
                        deletePromises.push(cloudinary.uploader.destroy(image.public_id));
                    }
                }
            }
            deletePromises.push(Product.deleteMany({ _id: { $in: store.products } }));
        }
        if (store.citizenship && store.citizenship.images && store.citizenship.images.length > 0) {
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
    async editStore(req, res) {
        const { id } = req.params;
        const { name, vatNumber, panNumber, citizenshipNumber, email, address, number } = req.body;
        const store = await Store.findById(id);
        if (!store || store.user.toString() !== req.user._id.toString() || store.verified === true) {
            return res.status(401).json({
                message: 'Forbidden for this action'
            });
        }
        store.number = number || store.number
        store.name = name || store.name;
        store.vatNumber = vatNumber || store.vatNumber;
        store.panNumber = panNumber || store.panNumber;
        if (citizenshipNumber !== undefined) {
            store.citizenship.number = citizenshipNumber;
        }
        store.contactInfo.email = email || store.contactInfo.email;
        store.contactInfo.phone = req.body.phone || store.contactInfo.phone;
        store.address = address || store.address;
        if (req.file) {
            if (store.citizenship.image && store.citizenship.image.length > 0) {
                for (const image of store.citizenship.image) {
                    await cloudinary.uploader.destroy(image.public_id);
                }
            }
            const citizenshipImages = await files.map(file => {
                return {
                    public_url: file.filename,
                    url: file.path
                }
            })
            store.citizenship.image = citizenshipImages
        }
        await store.save();
        res.status(200).json({
            message: 'Store updated successfully',
            store
        });
    }
    async getSellerForm(req, res) {
        s
        const [store] = await Store.find({ user: req.user._id }).select("-products -orders -__v -updatedAt -treasure -user")
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

module.exports = new storeController()