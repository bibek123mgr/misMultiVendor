import { STATUSES } from "../../../type/TypeDef";
import API from "../../../utils/AxiosConfig";
import { RootState } from "../../store";
import { setProduct, setProducts, setStatus } from "./productSlice"

export function fetchProducts() {
    return async function fetchProductsThunk(dispatch: any, getState: () => RootState) {
        const state = getState();
        const products = state.Vproduct.data?.products;
        if (products && products.length > 0) {
            return;
        }
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await API.get('vendor/product')
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
            const response = await API.get(`vendor/product/${id}`)
            dispatch(setProduct(response.data.data))
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}
