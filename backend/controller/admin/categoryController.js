const cloudinary = require("../../middleware/cloudinary");
const { Category } = require("../../models/productModel");
const productService = require("../../services/productService");
class categoryController {
    //api
    async createMainCategory(req, res) {
        const { name } = req.body
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const categoryExist = await Category.findOne({ name }).lean().exec();
        const { path, filename } = await file
        if (categoryExist) {
            await cloudinary.uploader.destroy(filename)
            return res.status(401).json({ message: 'category already exist' })
        }
        const newCategory = new Category({
            name,
            image: {
                url: path,
                public_id: filename
            }
        });
        const category = await newCategory.save();
        const { _id, createdAt, image } = category

        const data = {
            _id,
            createdAt,
            image: image.url,
            name: category.name
        }
        res.status(200).json({
            message: 'successfully add category',
            data
        })
    }

    async deleteCategory(req, res) {
        const category = await productService._isCategoryExist(req, res)
        const deletePromises = [
            cloudinary.uploader.destroy(category.image.public_id),
        ];
        deletePromises.push(category.deleteOne());
        await Promise.all(deletePromises);
        res.status(200).json({
            message: 'successfully delete category',
        })
    }

    async updateCategory(req, res) {
        const { name } = req.body
        const category = await productService._isCategoryExist(req, res)
        const categoryExist = await Category.findOne({ name }).lean().exec();
        if (categoryExist) {
            if (req.file) await cloudinary.uploader.destroy(req.file.filename)
            return res.status(401).json({ message: 'category already exist' })
        }
        category.name = name
        const promiseArray = []
        if (req.file) {
            const { path, filename } = await req.file
            promiseArray.push(cloudinary.uploader.destroy(category.image.public_id)
            ),
                category.image.public_id = filename,
                category.image.url = path
        }
        promiseArray.push(category.save())
        await Promise.all(promiseArray)
        res.status(200).json({
            message: 'successfully update category',
        })
    }

    async getAllCategory(req, res) {
        const categories = await Category.find().select("-__v")
        const data = categories.map(({ _id, name, createdAt, image }) => ({
            _id, name, image: image.url, createdAt
        }))
        res.status(200).json({
            message: 'succssfully fetch',
            data
        })
    }
    async getCategoryDetail(req, res) {
        const category = await productService._isCategoryExist(req, res)
        res.status(200).json({
            message: 'succssfully fetch',
            data: category
        })
    }
}

module.exports = new categoryController()