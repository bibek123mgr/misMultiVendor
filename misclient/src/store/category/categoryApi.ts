import { STATUSES } from "../../type/TypeDef";
import API from "../../utils/AxiosConfig";
import { AppDispatch, RootState } from "../store";
import { setCate, setStatus } from "./categorySlice";

export function fetchCategories() {
    return async function fetchOrdersThunk(dispatch: AppDispatch, getState: () => RootState) {
        const state = getState();
        const category = state.category.data;
        if (category && category.length > 0) {
            return;
        }
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await API.get('category')
            dispatch(setCate(response.data.data))
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}