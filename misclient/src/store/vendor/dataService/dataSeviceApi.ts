import { STATUSES } from "../../../type/TypeDef";
import API from "../../../utils/AxiosConfig";
import { RootState } from "../../store";
import { setData, setStatus } from "./dataServiceSlice";

export function fetchdataService() {
    return async function fetchdataServiceThunk(dispatch: any, getState: () => RootState) {
        const state = getState();
        const data = state.VdataService.data;
        if (data && Object.entries(data).length > 0) {
            return;
        }
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await API.get('vendor/data-service')
            dispatch(setData(response.data.data))
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}