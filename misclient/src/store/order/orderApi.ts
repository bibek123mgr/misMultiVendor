import { redirect } from "react-router-dom"
import { STATUSES } from "../../type/TypeDef"
import API from "../../utils/AxiosConfig"
import { RootState } from "../store"
import { setOrder, setOrders, setStatus } from "./orderSlice"
import toast from "react-hot-toast"

export function fetchOrders() {
    return async function fetchOrdersThunk(dispatch: any, getState: () => RootState) {
        const state = getState();
        const products = state.order.data?.orders;
        if (products && products.length > 0) {
            return;
        }
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await API.get('user/order')
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
        const order: any = state.order.data?.order;
        if (order._id === id) {
            return
        }
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await API.get(`user/order/${id}`)
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
            const resdata = await response.data.data
            const orderData = {
                orderId: resdata._id,
                amount: resdata.totalPrice
            }
            if (response.status === 201 && data.paymentMethod === 'khalti') {
                dispatch(payKhalti(orderData))
            }
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}

export function payKhalti(data: any) {
    return async function payKhaltiThunk(dispatch: any) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await API.post(`user/initate-khalti`, data)
            if (response.status === 200) {
                window.location.href = response.data.data.payment_url;
            }
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}
export function payKhaltiVefity(pidx: string) {
    return async function payKhaltiVefityThunk(dispatch: any) {
        dispatch(setStatus(STATUSES.LOADING));
        const toastId = toast.loading('Verifying payment ...');

        try {
            await API.post('user/verify-khalti', { pidx });
            toast.success('Successfully paid Khalti', { id: toastId });
            window.location.href = '/';
            dispatch(setStatus(STATUSES.SUCCESS));
        } catch (error) {
            toast.error('Payment verification failed', { id: toastId });
            dispatch(setStatus(STATUSES.ERROR));
        }
    }
}