import { STATUSES } from "../../type/TypeDef"
import API from "../../utils/AxiosConfig"
import { RootState } from "../store"
import { setStatus, setStore, setStores } from "./storeSlice"

export function fetchStores() {
    return async function fetchStoresThunk(dispatch: any, getState: () => RootState) {
        const state = getState()
        const stores = state.store.data?.stores
        if (stores && stores.length > 0) {
            return;
        }
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await API.get('store')
            dispatch(setStores(response.data.data))
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}

export function fetchStore(id: String) {
    return async function fetchStoreThunk(dispatch: any, getState: () => RootState) {
        const state = getState()
        const existingStore = state.store.data?.stores?.find((store: any) => store._id === id);
        if (existingStore) {
            return;
        }
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await API.get(`store/${id}`)
            dispatch(setStore(response.data.data))
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}
