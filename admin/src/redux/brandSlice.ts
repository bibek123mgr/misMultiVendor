import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { STATUSES } from "./authSlice";
import { AppDispatch, RootState } from "./store";
import { API } from "../utils/AxiosConfig";

const initialState = {
    data: {
        brands: [],
        brand: {}
    },
    status: STATUSES.IDLE
}

const brandSlice = createSlice({
    name: 'brand',
    initialState,
    reducers: {
        setBrands(state, action: PayloadAction<any>) {
            state.data.brands = action.payload;
        },
        setBrand(state, action: PayloadAction<any>) {
            state.data.brand = action.payload;
        },
        setStatus(state, action: PayloadAction<STATUSES>) {
            state.status = action.payload;
        },
        resetStatus(state) {
            state.status = initialState.status;
        }
    }
});

export const { setBrand, setBrands, setStatus, resetStatus } = brandSlice.actions;
export default brandSlice.reducer;

export function fetchBrands() {
    return async function fetchBrandsThunk(dispatch: AppDispatch, getState: () => RootState) {
        const { brands } = getState().brand.data;
        if (brands.length > 0) {
            return;
        }

        dispatch(setStatus(STATUSES.LOADING));
        try {
            const response = await API.get('brands');
            dispatch(setBrands(response.data));
            dispatch(setStatus(STATUSES.SUCCESS));
        } catch (error: any) {
            dispatch(setStatus(STATUSES.ERROR));
        }
    };
}

export function fetchBrand(id: string) {
    return async function fetchBrandThunk(dispatch: AppDispatch, getState: () => RootState) {
        const { brand }: { brand: any } = getState().brand.data;
        if (brand && brand._id === id) {
            return;
        }

        dispatch(setStatus(STATUSES.LOADING));
        try {
            const response = await API.get(`brands/${id}`);
            dispatch(setBrand(response.data));
            dispatch(setStatus(STATUSES.SUCCESS));
        } catch (error: any) {
            dispatch(setStatus(STATUSES.ERROR));
        }
    };
}
