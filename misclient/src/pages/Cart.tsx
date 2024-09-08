
import { GoPlus } from "react-icons/go";
import { GrSubtract } from "react-icons/gr";
import { BsArrowRight } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Empty from "../components/user/cart/Empty";

const Cart = () => {
    const [cart, setCart] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCart = () => {
            setLoading(true);
            const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
            setCart(storedCart);
            setLoading(false);
        };

        fetchCart();
    }, []);

    const updateCart = (updatedCart: any[]) => {
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleRemoveProduct = (id: string) => {
        const updatedCart = cart.filter(item => item._id !== id);
        updateCart(updatedCart);
    };

    const handleChangeProductQty = (id: string, quantity: number) => {
        const updatedCart = cart.map(item =>
            item._id === id ? { ...item, quantity } : item
        );
        updateCart(updatedCart);
    };

    if (loading) {
        return <p>Loading ...</p>
    }

    if (cart.length <= 0) {
        return <Empty />
    }

    const totalProduct = cart.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cart.reduce((total, item) => (item.price * item.quantity) + total, 0);

    return (
        <section className="bg-gray-100 py-8 antialiased md:py-16 max-h-screen">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">Shopping Cart</h2>
                <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                    <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                        <div className="space-y-1 overflow-y-scroll max-h-[70vh] hideScroll">
                            {cart.map((item, index) => (
                                <div key={index} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6">
                                    <div className="flex items-center justify-between gap-6 space-y-0">
                                        <Link to="#" className="shrink-0 md:order-1">
                                            <img className="h-20 w-20" width={200} height={200} src={item.image} alt={item.name} />
                                        </Link>
                                        <div className="flex items-center order-3 justify-end">
                                            <div className="flex items-center">
                                                <button
                                                    type="button"
                                                    className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
                                                    disabled={item.quantity === 1}
                                                    onClick={() => handleChangeProductQty(item._id, item.quantity - 1)}
                                                >
                                                    <GoPlus size={25} fill='black' />
                                                </button>
                                                <input
                                                    type="text"
                                                    className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0"
                                                    value={item.quantity}
                                                    readOnly
                                                />
                                                <button
                                                    type="button"
                                                    className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
                                                    onClick={() => handleChangeProductQty(item._id, item.quantity + 1)}
                                                >
                                                    <GrSubtract size={25} fill='black' className='text-black' />
                                                </button>
                                            </div>
                                            <div className="text-end md:order-4 md:w-32">
                                                <p className="text-base font-bold text-gray-900">${item.price}</p>
                                            </div>
                                        </div>
                                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                            <Link to="#" className="text-base font-medium text-gray-900 hover:underline">{item.name}</Link>
                                            <div className="flex items-center gap-4">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline"
                                                >
                                                    <svg
                                                        className="me-1.5 h-5 w-5"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            stroke="currentColor"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                                                        />
                                                    </svg>
                                                    <span className='sm:block hidden'> Add to Favorites</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center text-sm font-medium text-red-600 hover:underline"
                                                    onClick={() => handleRemoveProduct(item._id)}
                                                >
                                                    <RxCross2 size={25} />
                                                    <span className='sm:block hidden'>Remove</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                            <p className="text-xl font-semibold text-gray-900">Order summary</p>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="text-base font-normal text-gray-500">Original price</dt>
                                        <dd className="text-base font-medium text-gray-900">${totalPrice}</dd>
                                    </dl>

                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="text-base font-normal text-gray-500">Products</dt>
                                        <dd className="text-base font-medium text-gray-900">{totalProduct} qty</dd>
                                    </dl>
                                </div>

                                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                                    <dt className="text-base font-bold text-gray-900">Total</dt>
                                    <dd className="text-base font-bold text-gray-900">${totalPrice}</dd>
                                </dl>
                            </div>

                            <Link to="/checkout" className="flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300">
                                Proceed to Checkout
                            </Link>

                            <div className="flex items-center justify-center gap-2">
                                <span className="text-sm font-normal text-gray-500"> or </span>
                                <Link to="/product" className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 underline hover:no-underline">
                                    Continue Shopping
                                    <BsArrowRight size={25} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Cart;
