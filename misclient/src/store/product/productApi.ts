import { STATUSES } from "../../type/TypeDef"
import API from "../../utils/AxiosConfig"
import APIFormData from "../../utils/formdata"
import { RootState } from "../store"
import { setProduct, setProducts, setStatus } from "./productSlice"

export function fetchProducts() {
    return async function fetchProductsThunk(dispatch: any, getState: () => RootState) {
        const state = getState();
        const products = state.product.data?.products;
        if (products && products.length > 0) {
            return;
        }
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await API.get('product')
            dispatch(setProducts(response.data.data))
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}
export function fetchProduct(id: String) {
    return async function fetchProductThunk(dispatch: any) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await API.get(`product/${id}`)
            dispatch(setProduct(response.data.data))
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}
export function createProduct(data: any) {
    return async function createProductThunk(dispatch: any) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await APIFormData.post(`vendor/product`, data)
            dispatch(setProduct(response.data.data))
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}
