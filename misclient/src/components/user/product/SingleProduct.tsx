import React, { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { RootState } from '../../../store/store'

type Props = {}

const SingleProduct = (props: Props) => {
    const params = useParams();
    if (!params || !params.id) {
        return <div>Error: Product ID is missing or invalid.</div>;
    }
    const id = params.id as string;
    const { data } = useSelector((store: RootState) => store.product)
    const product = data.product as any
    const [selectedImage, setSelectedImage] = useState();
    return (
        <>
            <div className="font-sans bg-gray-100">
                <div className="p-4 lg:max-w-5xl max-w-lg mx-auto">
                    <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-6 max-lg:gap-12">
                        {/* Product Images */}
                        <div className="w-full lg:sticky top-0 sm:flex gap-2">
                            <div className="sm:space-y-3 w-16 max-sm:w-12 max-sm:flex max-sm:mb-4 max-sm:gap-4">
                                {product?.images.map((image: any, index: any) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`Product ${index + 1}`}
                                        className={`w-full cursor-pointer rounded-md outline ${selectedImage === image ? 'outline-blue-500' : ''}`}
                                        onClick={() => setSelectedImage(image)}
                                    />
                                ))}
                            </div>
                            <img src={selectedImage} alt="Selected Product" className="w-4/5 rounded-md object-cover" />
                        </div>

                        {/* Product Details */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">{product?.name}</h2>
                            <div className="flex flex-wrap gap-4 mt-4">
                                <p className="text-gray-800 text-xl font-bold">${product?.price?.originalPrice}</p>
                                {product?.price?.discountedPrice && (
                                    <p className="text-gray-400 text-xl">
                                        <s>${product.price.discountedPrice}</s> <span className="text-sm ml-1.5">Tax included</span>
                                    </p>
                                )}
                            </div>

                            <div className="flex space-x-2 mt-4">
                                {[...Array(5)].map((_, index) => (
                                    <FaStar key={index} fill="#ff4545" size={20} />
                                ))}
                            </div>
                            <button type="button" className="w-full mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-md">
                                Add to cart
                            </button>
                            <div className="mt-8">
                                <h3 className="text-xl font-bold text-gray-800">About the item</h3>
                                <ul className="space-y-3 list-disc mt-4 pl-4 text-sm text-gray-800">
                                    <li>{product?.description}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SingleProduct;
