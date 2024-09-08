import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useAppDispatch } from '../store/hook';
import { createOrder } from '../store/order/orderApi';

interface FormData {
    contact: number;
    address: string;
    paymentMethod: string;
}

interface CartItem {
    productId: string;
    quantity: number;
    price: number;
    name: string
    storeId: string;
}

const Checkout: React.FC = () => {
    const { data: user }: { data: any } = useSelector((store: RootState) => store.auth)
    const dispatch = useAppDispatch()
    const [formData, setFormData] = useState<FormData>({
        address: user?.address || '',
        contact: 0,
        paymentMethod: 'cod',
    });
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        const fetchCart = () => {
            const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
            setCart(storedCart);
        };
        fetchCart();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = 150
    const total = subtotal + shipping;

    const handlePayment = async () => {
        console.log('Form data submitted:', formData);
        const filterProducts = cart.map(({ productId, price, storeId, quantity }) => ({
            productId,
            price,
            storeId,
            quantity
        }));
        const data = {
            products: filterProducts,
            paymentMethod: formData.paymentMethod,
            address: formData.address,
            contact: formData.contact,
            totalPrice: total
        }
        await dispatch(createOrder(data))
    };



    return (
        <div className='bg-gray-100'>
            <div className="max-w-screen-xl mx-auto p-6 w-full">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Checkout</h1>
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-2/3 bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Shipping Information</h2>
                        <div className="mb-6">
                            <h3 className="text-lg font-medium mb-2 text-gray-600">Payment Method</h3>
                            <div className="flex flex-col space-y-2 mb-4">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="cod"
                                        checked={formData.paymentMethod === 'cod'}
                                        onChange={handleChange}
                                        className="form-radio h-4 w-4 text-blue-600"
                                    />
                                    <span className="ml-2 text-gray-800">Cash on Delivery (COD)</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="khalti"
                                        checked={formData.paymentMethod === 'khalti'}
                                        onChange={handleChange}
                                        className="form-radio h-4 w-4 text-blue-600"
                                    />
                                    <span className="ml-2 text-gray-800">Khalti</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="esewa"
                                        checked={formData.paymentMethod === 'esewa'}
                                        onChange={handleChange}

                                        className="form-radio h-4 w-4 text-blue-600"
                                    />
                                    <span className="ml-2 text-gray-800">eSewa</span>
                                </label>
                            </div>
                        </div>
                        <div className="mb-6">
                            <input
                                type="text"
                                name="address"
                                placeholder="Enter address"
                                value={formData.address}
                                required
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-md mb-4 text-gray-800"
                            />
                            <input
                                type="number"
                                name="contact"
                                required
                                minLength={10}
                                maxLength={10}
                                placeholder="Enter contact number"
                                value={formData.contact}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-md text-gray-800"
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-1/3 bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-4 text-gray-700">Your Products</h2>
                            <div className="space-y-4">
                                {cart.map(item => (
                                    <div key={item.productId} className="flex justify-between border-b py-2">
                                        <span className="text-gray-800">{item.name}</span>
                                        <div className='space-x-3'>
                                            <span className="text-gray-600">{item.quantity}x</span>
                                            <span className="text-gray-600">Nrs.{(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Cart Review */}
                        <div className="border-t pt-4">
                            <div className="flex justify-between mb-2 font-semibold">
                                <span>Subtotal</span>
                                <span>Nrs.{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Shipping</span>
                                <span>Nrs.{shipping.toFixed(2)}</span>
                            </div>
                            <hr className="my-2 border-gray-300" />
                            <div className="flex justify-between font-semibold text-lg">
                                <span>Total</span>
                                <span>Nrs.{total.toFixed(2)}</span>
                            </div>
                            <button
                                onClick={handlePayment}
                                className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 mt-4"
                            >
                                {formData.paymentMethod === 'cod' && 'Place Order'}
                                {formData.paymentMethod === 'esewa' && 'Pay with eSewa'}
                                {formData.paymentMethod === 'khalti' && 'Pay with Khalti'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
