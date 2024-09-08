import { configureStore } from "@reduxjs/toolkit";
import authSlice from './authSlice';
import brandSlice from './brandSlice';
import productSlice from './productSlice';
import storeSlice from './storeSlice';
import dataServiceSlice from './dataServiceSlice';
import categorySlice from './categorySlice';
import userSlice from './userSlice';
import orderSlice from './orderSlice';


const store = configureStore({
    reducer: {
        auth: authSlice,
        brand: brandSlice,
        product: productSlice,
        store: storeSlice,
        order: orderSlice,
        dataService: dataServiceSlice,
        category: categorySlice,
        user: userSlice
    }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
