import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/authSlice'
import productSlice from './product/productSlice'
import storeSlice from './store/storeSlice'
import orderSlice from './order/orderSlice'
import sellerSlice from './seller/sellerSlice'
import VproductSlice from './vendor/product/productSlice'
import VorderSlice from './vendor/order/orderSlice'
import VdataSlice from './vendor/dataService/dataServiceSlice'
import categorySlice from './category/categorySlice'

export const store = configureStore({
    reducer: {
        product: productSlice,
        auth: authSlice,
        store: storeSlice,
        order: orderSlice,
        seller: sellerSlice,
        category: categorySlice,
        Vproduct: VproductSlice,
        Vorder: VorderSlice,
        VdataService: VdataSlice
    },
    devTools: false,
});
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
