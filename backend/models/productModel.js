
const mongoose = require('mongoose')
const { Schema } = mongoose

// const SubCategorySchema = new Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     image: {
//         public_id: {
//             type: String,
//             required: true,
//         },
//         url: {
//             type: String,
//             required: true,
//         },
//     },
// }, {
//     timestamps: true,
// });


const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    // subCategory: [
    //     {
    //         name: {
    //             type: String,
    //         },
    //         image: {
    //             public_id: {
    //                 type: String,
    //                 required: true,
    //             },
    //             url: {
    //                 type: String,
    //                 required: true,
    //             },
    //         },
    //     }
    // ],
    image: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
}, {
    timestamps: true,
});



const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    // subCategory: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'SubCategory'
    // }],
    description: {
        type: String,
    },
    price: {
        originalPrice: {
            type: Number,
            required: true,
        },
        discountedPrice: {
            type: Number,
        },
    },
    images: [{
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    }],
    stock: Number,
    rating: {
        type: Number,
        min: 0,
        max: 5,
    },
    brand: {
        type: String,
    },
    store: {
        type: Schema.Types.ObjectId,
        ref: 'Store',
        required: true
    }
}, {
    timestamps: true,
});

const Product = mongoose.model('Product', productSchema);
const Category = mongoose.model('Category', categorySchema)
// const SubCategory = mongoose.model('SubCategory', SubCategorySchema);

module.exports = { Product, Category };
