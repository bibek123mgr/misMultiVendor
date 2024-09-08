


import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { useAppDispatch } from './store/hook';
import { fetchProducts } from './store/product/productApi';
import { fetchMyprofile } from './store/auth/authApi';
import { RootState } from './store/store';
import UserRoute from './routes/UserRoute';
import VendorRoute from './routes/VendorRoute';
function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchMyprofile());
  }, [dispatch]);

  const { data: user } = useSelector((store: RootState) => store.auth);
  const isAuthenticated = user && Object.entries(user).length > 0;

  return (
    <>
      <Routes>
        <Route path='/*' element={<UserRoute isAuthenticated={isAuthenticated} />} />
        <Route path='/dashboard/*' element={<VendorRoute />} />
      </Routes>
    </>
  );
}

export default App;

