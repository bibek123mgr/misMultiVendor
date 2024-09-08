import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Cart from '../pages/Cart';
import { Protected } from '../utils/ProtectedRoute';
import Product from '../pages/Product';
import SingleProduct from '../pages/SingleProduct';
import Store from '../pages/Store';
// import BecomeSeller from '../pages/BecomeSeller';
import StoreDetails from '../pages/StoreDetails';
import Profile from '../pages/Profile';
import Checkout from '../pages/CheckOut';
import Header from '../components/user/home/header/Header';
import Footer from '../components/user/footer/Footer';
import KhaltiSuccess from '../api/payment/khaltiSuccess';

const UserRoute = ({ isAuthenticated }: { isAuthenticated: boolean }) => (
    <>
        <Header />
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/api/payment/khaltisuccess' element={<KhaltiSuccess />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/profile' element={<Protected isAuthenticated={isAuthenticated}><Profile /></Protected>} />
            <Route path='/checkout' element={<Protected isAuthenticated={isAuthenticated}><Checkout /></Protected>} />
            <Route path='/product' element={<Product />} />
            <Route path='/product/:id' element={<SingleProduct />} />
            <Route path='/store' element={<Store />} />
            {/* <Route path='/become-seller' element={<BecomeSeller />} /> */}
            <Route path='/store/:id' element={<StoreDetails />} />
        </Routes>
        <Footer />

    </>
);

export default UserRoute;
