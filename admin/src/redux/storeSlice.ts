import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { STATUSES } from "./authSlice";
import { AppDispatch, RootState } from "./store";
import { API } from "../utils/AxiosConfig";

const initialState = {
    data: {
        stores: [], // Changed to "stores" for consistency
        store: {},
        storeReqs: [],
        storeReq: {}
    },
    status: STATUSES.IDLE
};

const storeSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {
        setStores(state, action: PayloadAction<any>) {
            state.data.stores = action.payload;
        },
        setStore(state, action: PayloadAction<any>) {
            state.data.store = action.payload;
        },
        setStoresReqs(state, action: PayloadAction<any>) {
            state.data.storeReqs = action.payload;
        },
        setStoreReq(state, action: PayloadAction<any>) {
            state.data.storeReq = action.payload;
        },
        setStatus(state, action: PayloadAction<STATUSES>) {
            state.status = action.payload;
        },
        resetStatus(state) {
            state.status = initialState.status;
        }
    }
});

export const { setStore, setStoresReqs, setStoreReq, setStores, setStatus, resetStatus } = storeSlice.actions;
export default storeSlice.reducer;

export function fetchStores() {
    return async function fetchStoresThunk(dispatch: AppDispatch, getState: () => RootState) {
        const { stores } = getState().store.data;
        if (stores.length > 0) {
            return;
        }

        dispatch(setStatus(STATUSES.LOADING));
        try {
            const response = await API.get('store');
            dispatch(setStores(response.data.data));
            dispatch(setStatus(STATUSES.SUCCESS));
        } catch (error: any) {
            dispatch(setStatus(STATUSES.ERROR));
        }
    };
}
export function fetchStore(id: string) {
    return async function fetchStoreThunk(dispatch: AppDispatch, getState: () => RootState) {
        const { store }: { store: any } = getState().store.data;
        if (store && store._id === id) {
            return;
        }

        dispatch(setStatus(STATUSES.LOADING));
        try {
            const response = await API.get(`stores/${id}`);
            dispatch(setStore(response.data));
            dispatch(setStatus(STATUSES.SUCCESS));
        } catch (error: any) {
            dispatch(setStatus(STATUSES.ERROR));
        }
    };
}

export function fetchStoresReq() {
    return async function fetchStoresThunk(dispatch: AppDispatch) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const response = await API.get('admin/store');
            dispatch(setStoresReqs(response.data.data));
            dispatch(setStatus(STATUSES.SUCCESS));
        } catch (error: any) {
            dispatch(setStatus(STATUSES.ERROR));
        }
    };
}
export function fetchStoreReq(id: string) {
    return async function fetchStoreThunk(dispatch: AppDispatch, getState: () => RootState) {
        const { store }: { store: any } = getState().store.data;
        if (store && store._id === id) {
            return;
        }

        dispatch(setStatus(STATUSES.LOADING));
        try {
            const response = await API.get(`stores/${id}`);
            dispatch(setStore(response.data));
            dispatch(setStatus(STATUSES.SUCCESS));
        } catch (error: any) {
            dispatch(setStatus(STATUSES.ERROR));
        }
    };
}

export function VerfetchStoreReq(id: string) {
    return async function fetchStoreThunk(dispatch: AppDispatch) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            await API.patch(`admin/store/${id}`);
            dispatch(setStatus(STATUSES.SUCCESS));
        } catch (error: any) {
            dispatch(setStatus(STATUSES.ERROR));
        }
    };
}
