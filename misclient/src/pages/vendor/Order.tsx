import { useEffect } from "react";
import { useAppDispatch } from "../../store/hook";
import { fetchOrders } from "../../store/vendor/order/orderApi";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Order = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    const { orders }: { orders: any } = useSelector((store: RootState) => store.Vorder.data);
    console.log(orders)
    return (
        <div>
            <section className="bg-gray-50  p-3 sm:p-5">
                <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                    <div className="bg-white  relative shadow-md sm:rounded-lg overflow-hidden">
                        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-4 py-3">Order Id</th>
                                        <th scope="col" className="px-4 py-3">TotalPrice</th>
                                        <th scope="col" className="px-4 py-3">Products</th>
                                        <th scope="col" className="px-4 py-3">OrderStatus</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order: any) => (
                                        <tr className="border-b ">
                                            <td className="px-4 py-3">{order._id}</td>
                                            <td className="px-4 py-3">{order.totalOrderPrice}</td>
                                            <td className="px-4 py-3">
                                                {order.products.map((product: any) => (
                                                    <span key={product.product} className="flex flex-col">
                                                        {product.product}, {product.quantity}x, ,Rs.{product.price}
                                                    </span>
                                                ))}
                                            </td>
                                            <td className="px-4 py-3">{order.orderStatus}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </section></div>
    )
}

export default Order