


import { useSelector } from 'react-redux';
import logo from '../../public/store-logo.jpg'
import { Link } from 'react-router-dom';
import { RootState } from '../store/store';
import { useEffect } from 'react';
import { useAppDispatch } from '../store/hook';
import { fetchStores } from '../store/store/storeApi';

const Store = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchStores())
    })
    const { data } = useSelector((state: RootState) => state.store)
    const store = data.stores
    return (
        <div className="bg-gray-100">
            <section className="text-black max-w-screen-xl mx-auto lg:px-0 px-3 py-6">
                <h1 className='py-4 text-3xl font-bold'>Stores</h1>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 ">
                    {store.map((item: any, index) => (
                        <Link to={`/store/${item._id}`} key={index} className="flex items-start gap-4 shadow p-4 bg-white rounded-md">
                            <span className="shrink-0 shadow-md">
                                {/* <FaGraduationCap size={25} fill="white" /> */}
                                <img
                                    src={logo}
                                    alt="Avatar"
                                    width={500}
                                    height={500}
                                    className="w-16 h-16 object-contain"
                                />
                            </span>
                            <div>
                                <h2 className="text-lg font-bold">{item.name}</h2>
                                <p className="mt-1 text-sm text-gray-400">
                                    {item.description || `Discover your style at ${item.name} and redefine your wardrobe with pieces that make you feel confident, chic, and ready to take on the world.`}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Store;
