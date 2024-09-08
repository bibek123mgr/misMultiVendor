import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { fetchStoresReq, VerfetchStoreReq } from "../redux/storeSlice";

const SellerRequest = () => {
    const dispatch = useAppDispatch();
    const { storeReqs } = useAppSelector((state) => state.store.data);

    useEffect(() => {
        dispatch(fetchStoresReq()); // Fetch store data from API
    }, [dispatch]);

    const handleAccept = (storeId: string) => {
        dispatch(VerfetchStoreReq(storeId))
    };



    return (
        <div className='py-4 bg-gray-100'>
            <div className='m-auto max-w-screen-xl'>
                <table className="w-full table-auto border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">ID</th>
                            <th className="border border-gray-300 px-4 py-2">User</th>
                            <th className="border border-gray-300 px-4 py-2">Name</th>
                            <th className="border border-gray-300 px-4 py-2">Description</th>
                            <th className="border border-gray-300 px-4 py-2">Email</th>
                            <th className="border border-gray-300 px-4 py-2">Number</th>
                            <th className="border border-gray-300 px-4 py-2">VAT Number</th>
                            <th className="border border-gray-300 px-4 py-2">PAN Number</th>
                            <th className="border border-gray-300 px-4 py-2">Citizenship Number</th>
                            <th className="border border-gray-300 px-4 py-2">Citizenship Images</th>
                            <th className="border border-gray-300 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {storeReqs.map((storeData: any, index) => (
                            <tr key={index}>
                                <td className="border border-gray-300 px-4 py-2">{storeData._id}</td>
                                <td className="border border-gray-300 px-4 py-2">{storeData.user}</td>
                                <td className="border border-gray-300 px-4 py-2">{storeData.name}</td>
                                <td className="border border-gray-300 px-4 py-2">{storeData.description}</td>
                                <td className="border border-gray-300 px-4 py-2">{storeData.email}</td>
                                <td className="border border-gray-300 px-4 py-2">{storeData.number}</td>
                                {/* Show VAT and PAN as empty if missing */}
                                <td className="border border-gray-300 px-4 py-2">{storeData.vatNumber || ''}</td>
                                <td className="border border-gray-300 px-4 py-2">{storeData.panNumber || ''}</td>
                                <td className="border border-gray-300 px-4 py-2">{storeData.citizenship.number}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <div className='flex flex-row gap-2'>
                                        {storeData.citizenship.images.map((image: any, index: any) => (
                                            <img key={index} src={image.url} alt="" className='w-[50px] h-[50px] object-cover rounded-md' />
                                        ))}
                                    </div>
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <div className='flex space-x-2'>
                                        <button
                                            className='p-2 bg-blue-600 text-white rounded-md'
                                            onClick={() => handleAccept(storeData._id)}
                                        >
                                            Accept
                                        </button>
                                        <button className='p-2 bg-red-600 text-white rounded-md'>Cancel</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SellerRequest;
