import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchOrder } from '../../../store/order/orderApi';
import { RootState } from '../../../store/store';
import { useAppDispatch } from '../../../store/hook';

interface Product {
    name: string;
    url: string;
    price: number;
    quantity: number;
}

interface Order {
    _id: string;
    createdAt: string;
    paymentStatus: string;
    paymentMethod: string
    orderStatus: string;
    address: string;
    contact: string;
    totalPrice: number;
    products: Product[];
}

const SingleOrder = () => {
    const dispatch = useAppDispatch();
    const queryParameters = new URLSearchParams(window.location.search);
    const orderId = queryParameters.get('orderId');

    if (!orderId) {
        return <div>No Order ID found</div>;
    }

    useEffect(() => {
        dispatch(fetchOrder(orderId));
    }, [dispatch, orderId]);

    const order = useSelector((store: RootState) => store.order.data.order) as Order;

    return (
        <div className="max-w-5xl mx-auto p-6">
            {/* Order Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Details</h1>
                <p className="text-gray-600">
                    Order ID: <span className="font-medium">{order._id}</span>
                </p>
                <p className="text-gray-600">
                    Order Date: <span className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</span>
                </p>
                <p className={`text-sm font-semibold mt-2 ${order.paymentStatus === 'paid' ? 'text-green-500' : 'text-red-500'}`}>
                    Payment Status: {order.paymentStatus}
                </p>
                <p className={`text-sm font-semibold ${order.paymentStatus === 'paid' ? 'text-green-500' : 'text-red-500'}`}>
                    Payment Status: {order.paymentMethod}
                </p>
                <p className={`text-sm font-semibold ${order.orderStatus === 'delivered' ? 'text-green-500' : 'text-yellow-500'}`}>
                    Order Status: {order.orderStatus}
                </p>
            </div>

            {/* Shipping Address */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Shipping Address</h2>
                <p className="text-gray-700">{order.address}</p>
                <p className="text-gray-700">Contact: {order.contact}</p>
            </div>

            {/* Product List */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Products</h2>
                <div className="space-y-4">
                    {order.products.map((product, index) => (
                        <article className="rounded-xl border-2 border-gray-100 bg-white" key={index}>
                            <div className="flex items-start gap-4 p-2">
                                <a href="#" className="block shrink-0">
                                    <img
                                        alt=""
                                        src={product.url}
                                        width={400}
                                        height={200}
                                        className="size-14 rounded-lg object-cover"
                                    />
                                </a>

                                <div>
                                    <h3 className="font-medium sm:text-lg">
                                        {product.name}
                                    </h3>
                                    <div className="mt-2 sm:flex sm:items-center sm:gap-2">
                                        <div className="flex items-center gap-1 text-gray-500">
                                            <p className="text-xs">Nrs.{product.price}</p>
                                        </div>

                                        <span className="hidden sm:block" aria-hidden="true">&middot;</span>

                                        <p className="hidden sm:block sm:text-xs sm:text-gray-500">
                                            {product.quantity}X
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
            <div className="text-right">
                <p className="text-lg font-semibold text-gray-800">
                    Total Price: <span className="text-blue-600">${order.totalPrice}</span>
                </p>
            </div>
            {order.orderStatus === 'pending' && <button className='bg-red-600 p-2 text-white rounded-md'>Cancel Order</button>}
        </div>
    );
};

export default SingleOrder;
