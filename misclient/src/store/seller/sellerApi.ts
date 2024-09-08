import { STATUSES } from "../../type/TypeDef"
import API from "../../utils/AxiosConfig"
import APIFormData from "../../utils/formdata"
import { RootState } from "../store"
import { setSellerForm, setStatus } from "./sellerSlice"


export function sellerRequest(data: any) {
    return async function sellerRequestThunk(dispatch: any) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await APIFormData.post('user/store', data)
            dispatch(setSellerForm(response.data.data))
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}

export function fetchSellerForm() {
    return async function fetchSellerFormThunk(dispatch: any, getState: () => RootState) {
        const store = getState()
        const sellerform = store.seller.data
        if (sellerform && Object.entries(sellerRequest).length > 0) {
            return
        }
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await API.get('user/store')
            dispatch(setSellerForm(response.data.data))
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}
