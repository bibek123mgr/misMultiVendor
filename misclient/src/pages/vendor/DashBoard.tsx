import { FaTachometerAlt } from 'react-icons/fa';
import { useAppDispatch } from '../../store/hook';
import { useEffect } from 'react';
import { fetchdataService } from '../../store/vendor/dataService/dataSeviceApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const DashBoard = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchdataService());
    }, [dispatch]);

    const { data }: { data: any } = useSelector((store: RootState) => store.VdataService);

    return (
        <>
            <div className="p-6  min-h-screen">
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        {/* Card for Total Orders */}
                        <div className="flex flex-col items-center justify-center h-32 rounded-lg bg-blue-100 shadow">
                            <p className="text-xl font-semibold text-gray-800">Total Orders</p>
                            <p className="text-3xl font-bold text-blue-600">{data.orders}</p>
                        </div>

                        {/* Card for Total Products */}
                        <div className="flex flex-col items-center justify-center h-32 rounded-lg bg-green-100 shadow">
                            <p className="text-xl font-semibold text-gray-800">Total Products</p>
                            <p className="text-3xl font-bold text-green-600">{data.products}</p>
                        </div>

                        {/* Card for Total Order Price */}
                        <div className="flex flex-col items-center justify-center h-32 rounded-lg bg-yellow-100 shadow">
                            <p className="text-xl font-semibold text-gray-800">Total Order Price</p>
                            <p className="text-3xl font-bold text-yellow-600">{data.totalOrder}</p>
                        </div>
                    </div>

                    {/* Main Icon Section */}
                    <div className="flex items-center justify-center h-48 mb-6 bg-gray-50 rounded-lg shadow-inner">
                        <FaTachometerAlt className="text-6xl text-gray-400" aria-hidden="true" />
                    </div>

                    {/* Additional Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center justify-center h-28 rounded-lg bg-red-100 shadow">
                            <FaTachometerAlt className="text-5xl text-red-400" aria-hidden="true" />
                        </div>
                        <div className="flex items-center justify-center h-28 rounded-lg bg-purple-100 shadow">
                            <FaTachometerAlt className="text-5xl text-purple-400" aria-hidden="true" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashBoard;
