import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { STATUSES } from "./authSlice";
import { AppDispatch, RootState } from "./store";
import { API } from "../utils/AxiosConfig";

const initialState = {
    data: {
        orders: [],
        order: {}
    },
    status: STATUSES.IDLE
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrders(state, action: PayloadAction<any>) {
            state.data.orders = action.payload;
        },
        setOrder(state, action: PayloadAction<any>) {
            state.data.order = action.payload;
        },
        setStatus(state, action: PayloadAction<STATUSES>) {
            state.status = action.payload;
        },
        resetStatus(state) {
            state.status = initialState.status;
        }
    }
});

export const { setOrder, setOrders, setStatus, resetStatus } = orderSlice.actions;
export default orderSlice.reducer;

export function fetchOrders() {
    return async function fetchOrdersThunk(dispatch: AppDispatch, getState: () => RootState) {
        const { orders } = getState().order.data;
        if (orders.length > 0) {
            return;
        }

        dispatch(setStatus(STATUSES.LOADING));
        try {
            const response = await API.get('orders');
            dispatch(setOrders(response.data));
            dispatch(setStatus(STATUSES.SUCCESS));
        } catch (error: any) {
            dispatch(setStatus(STATUSES.ERROR));
        }
    };
}

export function fetchOrder(id: string) {
    return async function fetchOrderThunk(dispatch: AppDispatch, getState: () => RootState) {
        const { order }:{order:any} = getState().order.data;
        if (order && order._id === id) {
            return;
        }

        dispatch(setStatus(STATUSES.LOADING));
        try {
            const response = await API.get(`orders/${id}`);
            dispatch(setOrder(response.data));
            dispatch(setStatus(STATUSES.SUCCESS));
        } catch (error: any) {
            dispatch(setStatus(STATUSES.ERROR));
        }
    };
}
