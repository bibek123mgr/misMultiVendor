import { Route, Routes } from 'react-router-dom';
import DashBoard from '../pages/vendor/DashBoard';
import SideBar from '../components/vendor/SideBar';
import Product from '../pages/vendor/Product';
import Order from '../pages/vendor/Order';
import AddProduct from '../pages/vendor/AddProduct';

const VendorRoute = () => (
    <div className="flex h-screen">
        <div className="max-w-64 bg-gray-800 text-white md:w-full">
            <SideBar />
        </div>
        <div className="flex-1 p-4 bg-gray-100 min-h-full overflow-y-auto">
            <Routes>
                <Route path='/' element={<DashBoard />} />
                <Route path='/product' element={<Product />} />
                <Route path='/order' element={<Order />} />
                <Route path='/add-product' element={<AddProduct />} />
            </Routes>
        </div>
    </div>
);

export default VendorRoute;
