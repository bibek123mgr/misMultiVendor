import Hero from '../components/user/home/hero/Hero';
import Banner from '../components/user/home/banner/Banner';
import Trusted from '../components/user/home/trusted/Trusted';
import Facility from '../components/user/home/facility/Facility';
import Products from '../components/user/product/Products';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
const Home = () => {
    const { data } = useSelector((store: RootState) => store.product)
    const newArrival = data.products.slice(0, 5)
    return (
        <div className='bg-gray-100'>
            <Hero />
            <Facility />
            <Products title='New Arrivals' filter={false} products={newArrival} />
            <Banner />
            <Products title='Recommended' filter={false} products={data.products} />
            <Trusted />
        </div >
    );
}

export default Home;
