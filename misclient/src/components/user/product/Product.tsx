import { FaRegHeart } from "react-icons/fa";
import { MdOutlineRemoveRedEye, MdOutlineShoppingCart } from "react-icons/md";
import { FC } from 'react';
import { FaStar } from "react-icons/fa6";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

type Props = {
    product: any
};

const Product: FC<Props> = ({ product }) => {
    const handleAddToCart = (product: any) => {
        let cart;
        try {
            cart = JSON.parse(localStorage.getItem('cart') || '[]');
        } catch (e) {
            console.error("Failed to parse cart data:", e);
            cart = [];
        }

        if (!Array.isArray(cart)) {
            cart = [];
        }

        const index = cart.findIndex((i: any) => i.productId === product._id);
        if (index === -1) {
            cart.push({
                productId: product._id,
                quantity: 1,
                name: product.name,
                image: product.image,
                price: product.price,
                storeId: product.store
            });
        } else {
            cart[index].quantity += 1;
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        toast.success("Item added to cart");
    };


    return (
        <div className="rounded-lg border border-gray-200 bg-white p-2 shadow-sm">
            <div className="relative h-48 w-full group">
                <Link to={`/product/${product._id}`}>
                    <img className="absolute inset-0 object-contain w-full h-full" src={product.image} alt="Product Image" />
                </Link>
                <div className="absolute top-0 right-0 flex flex-col items-center justify-center p-2 space-y-2 bg-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button type="button" className="text-gray-900">
                        <span className="sr-only">Quick look</span>
                        <MdOutlineRemoveRedEye size={18} />
                    </button>
                    <button type="button" className="text-gray-900">
                        <span className="sr-only">Add to Favorites</span>
                        <FaRegHeart size={18} />
                    </button>
                </div>
            </div>

            <div className="pt-2">
                <Link to={`/product/${product._id}`} className="text-sm font-semibold leading-tight text-gray-900 hover:underline">{product.name}</Link>

                <div className="flex items-center gap-1">
                    <div className="flex items-center">
                        <FaStar fill="#ff4545" size={15} />
                        <FaStar fill="#ff4545" size={15} />
                        <FaStar fill="#ff4545" size={15} />
                        <FaStar fill="#ff4545" size={15} />
                        <FaStar fill="#ff4545" size={15} />
                    </div>
                    <p className="text-sm font-medium text-gray-900">4.8</p>
                    <p className="text-sm font-medium text-gray-500">(2,957)</p>
                </div>
                <div className="mt-2 flex items-center justify-between gap-4">
                    <p className="text-lg font-extrabold leading-tight text-gray-900">Rs .{product.price}</p>

                    <button
                        type="button"
                        className="inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-[12px] font-medium text-white"
                        onClick={() => handleAddToCart(product)}
                    >
                        <MdOutlineShoppingCart size={15} className="mx-1" />
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Product;
