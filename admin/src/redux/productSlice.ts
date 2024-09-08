import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { STATUSES } from "./authSlice";
import { AppDispatch, RootState } from "./store";
import { API } from "../utils/AxiosConfig";

const initialState = {
    data: {
        products: [],
        product: {}
    },
    status: STATUSES.IDLE
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts(state, action: PayloadAction<any>) {
            state.data.products = action.payload;
        },
        setProduct(state, action: PayloadAction<any>) {
            state.data.product = action.payload;
        },
        setStatus(state, action: PayloadAction<STATUSES>) {
            state.status = action.payload;
        },
        resetStatus(state) {
            state.status = initialState.status;
        }
    }
});

export const { setProduct, setProducts, setStatus, resetStatus } = productSlice.actions;
export default productSlice.reducer;

export function fetchProducts() {
    return async function fetchProductsThunk(dispatch: AppDispatch, getState: () => RootState) {
        const { products } = getState().product.data;
        if (products.length > 0) {
            return;
        }
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const response = await API.get('product');
            dispatch(setProducts(response.data.data));
            dispatch(setStatus(STATUSES.SUCCESS));
        } catch (error: any) {
            dispatch(setStatus(STATUSES.ERROR));
        }
    };
}

export function fetchProduct(id: string) {
    return async function fetchProductThunk(dispatch: AppDispatch, getState: () => RootState) {
        const { product }: { product: any } = getState().product.data;
        if (product && product._id === id) {
            return;
        }
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const response = await API.get(`products/${id}`);
            dispatch(setProduct(response.data.data));
            dispatch(setStatus(STATUSES.SUCCESS));
        } catch (error: any) {
            dispatch(setStatus(STATUSES.ERROR));
        }
    };
}
