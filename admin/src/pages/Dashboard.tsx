import { useAppDispatch, useAppSelector } from "../redux/hook";
import { useEffect } from "react";
import { fetchData } from "../redux/dataServiceSlice";

const Dashboard = () => {
    const orders = Array(10).fill({
        orderId: "12345",
        user: "John Doe",
        paymentMethod: "Credit Card",
        paymentStatus: "Completed",
        orderStatus: "Shipped",
    });
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchData())
    }, [dispatch])

    const { data } = useAppSelector((store) => store.dataService)
    return (

        <div className="text-black">
            <section className="m-auto">
                <div className="px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                    <h1 className="py-5 font-bold text-xl">OverView</h1>
                    <div className="flex flex-wrap gap-6 justify-center">
                        {Object.entries(data).map(([key, value], index) => (
                            <div
                                key={index}
                                className={`flex flex-col items-center justify-center w-52 h-52 rounded-lg border border-gray-200 bg-gradient-to-r from-blue-100 to-blue-200 p-5 shadow-lg hover:bg-gradient-to-r hover:from-blue-300 hover:to-blue-400 transition duration-300 ease-in-out transform hover:-translate-y-1`}
                            >
                                <h2 className="mt-4 font-semibold text-xl text-gray-900 text-center">
                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                </h2>

                                <p className="text-md mt-2 text-gray-700 text-center">
                                    {String(value)}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="w-full overflow-x-auto mt-9">
                        <h1 className="py-5 font-bold text-xl">Orders</h1>
                        <table className="min-w-full table-auto border-collapse border border-gray-300">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 border border-gray-300 text-left">Order ID</th>
                                    <th className="px-4 py-2 border border-gray-300 text-left">User</th>
                                    <th className="px-4 py-2 border border-gray-300 text-left">Payment Method</th>
                                    <th className="px-4 py-2 border border-gray-300 text-left">Payment Status</th>
                                    <th className="px-4 py-2 border border-gray-300 text-left">Order Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-4 py-2 border border-gray-300">{order.orderId}</td>
                                        <td className="px-4 py-2 border border-gray-300">{order.user}</td>
                                        <td className="px-4 py-2 border border-gray-300">{order.paymentMethod}</td>
                                        <td className="px-4 py-2 border border-gray-300">{order.paymentStatus}</td>
                                        <td className="px-4 py-2 border border-gray-300">{order.orderStatus}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="w-full overflow-x-auto mt-9">
                        <h1 className="py-5 font-bold text-xl">Orders</h1>
                        <table className="min-w-full table-auto border-collapse border border-gray-300">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 border border-gray-300 text-left">Order ID</th>
                                    <th className="px-4 py-2 border border-gray-300 text-left">User</th>
                                    <th className="px-4 py-2 border border-gray-300 text-left">Payment Method</th>
                                    <th className="px-4 py-2 border border-gray-300 text-left">Payment Status</th>
                                    <th className="px-4 py-2 border border-gray-300 text-left">Order Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-4 py-2 border border-gray-300">{order.orderId}</td>
                                        <td className="px-4 py-2 border border-gray-300">{order.user}</td>
                                        <td className="px-4 py-2 border border-gray-300">{order.paymentMethod}</td>
                                        <td className="px-4 py-2 border border-gray-300">{order.paymentStatus}</td>
                                        <td className="px-4 py-2 border border-gray-300">{order.orderStatus}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
