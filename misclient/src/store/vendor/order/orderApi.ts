
import { STATUSES } from "../../../type/TypeDef";
import API from "../../../utils/AxiosConfig";
import { RootState } from "../../store";
import { setOrder, setOrders, setStatus } from "./orderSlice"

export function fetchOrders() {
    return async function fetchOrdersThunk(dispatch: any, getState: () => RootState) {
        const state = getState();
        const products = state.order.data?.orders;
        if (products && products.length > 0) {
            return;
        }
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await API.get('vendor/order')
            dispatch(setOrders(response.data.data))
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}

export function fetchOrder(id: String) {
    return async function fetchOrderThunk(dispatch: any, getState: () => RootState) {
        const state = getState();
        const order: any = state.Vorder.data?.orders;
        if (order._id === id) {
            return
        }
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await API.get(`vendor/order/${id}`)
            dispatch(setOrder(response.data.data))
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}

export function createOrder(data: any) {
    return async function createOrderThunk(dispatch: any) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await API.post(`user/order`, data)
            dispatch(setOrder(response.data.data))
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}
