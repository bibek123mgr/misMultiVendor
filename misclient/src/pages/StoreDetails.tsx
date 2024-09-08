import { useParams } from 'react-router-dom';
import banner from '../../public/banner-4.png'
import logo from '../../public/store-logo.jpg'
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import Products from '../components/user/product/Products';
import { useAppDispatch } from '../store/hook';
import { useEffect } from 'react';
import { fetchStore } from '../store/store/storeApi';


const StoreDetails = () => {
    const param = useParams();
    if (!param || !param.id) {
        return <div>Error: Store ID is missing or invalid.</div>;
    }
    const dispatch = useAppDispatch()
    const id = param.id as string;

    useEffect(() => {
        dispatch(fetchStore(id))
    }, [])
    const { data } = useSelector((store: RootState) => store.store);
    const storeDetail = data.store as any
    return (
        <>
            <div className=' bg-slate-100'>
                <div className="mx-auto max-w-screen-xl pt-5 xl:px-0 px-3">
                    <div
                        className="relative h-60 rounded-b-lg bg-cover bg-center bg-no-repeat shadow-lg"
                        style={{
                            backgroundImage: `url(${storeDetail.banner && Object.keys(storeDetail.banner).length > 0 ? storeDetail.banner : banner})`
                        }}

                    >
                        <div className="px-4 pt-8 pb-10">
                            <div className="absolute inset-x-0 -bottom-10 mx-auto w-36 rounded-full border-8 border-white shadow-lg">
                                <span className="absolute right-0 m-3 h-3 w-3 rounded-full bg-green-500 ring-2 ring-green-300 ring-offset-2"></span>
                                {storeDetail.avatar && Object.keys(storeDetail.avatar).length > 0 ? (
                                    <img className="mx-auto h-auto w-full rounded-full overflow-hidden" width={500} height={500} src={storeDetail.avatar} alt="Store Avatar" />
                                ) : (
                                    <img className="mx-auto h-auto w-full rounded-full overflow-hidden" width={500} height={500} src={logo} alt="Default Logo" />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 flex flex-col items-start justify-center space-y-4 py-8 px-4 sm:flex-row sm:space-y-0 md:justify-between lg:px-0">
                        <div className="max-w-lg">
                            <h1 className="text-2xl font-bold text-gray-800">{storeDetail.name}</h1>
                            <p className="mt-2 text-gray-600">{storeDetail.description || `Discover your style at ${storeDetail.name} and redefine your wardrobe with pieces that make you feel confident, chic, and ready to take on the world.`}</p>
                        </div>
                        <div className="">
                            <button className="flex whitespace-nowrap rounded-lg bg-pink-600 px-6 py-2 font-bold text-white transition hover:translate-y-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 inline h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                Chat with us
                            </button>
                            <p className="mt-4 flex items-center whitespace-nowrap text-gray-500 sm:justify-end">
                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 inline h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                                {storeDetail.number}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Products title='All Products' filter={true} products={storeDetail.products} />
        </>
    );
}

export default StoreDetails;
