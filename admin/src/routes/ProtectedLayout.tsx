import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Product from '../pages/Product';
import Store from '../pages/Store';
import Category from '../pages/Category';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { getMe, resetStatus, STATUSES } from '../redux/authSlice';


const ProtectedLayout = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    const { status } = useAppSelector((store) => store.auth)
    useEffect(() => {
        if (status === STATUSES.SUCCESS) {
            dispatch(resetStatus())
        }
    }, [status])
    return (
        <div className="flex gap-0">
            <div className="flex h-screen w-1/6 bg-gray-100 fixed">
                <Sidebar />
            </div>
            <div className="flex-1 ml-[16.67%] flex flex-col">
                <div className="w-full">
                    <Header />
                </div>
                <div className="flex-1 flex justify-center items-center">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/product" element={<Product />} />
                        <Route path="/store" element={<Store />} />
                        <Route path="/category" element={<Category />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default ProtectedLayout;
