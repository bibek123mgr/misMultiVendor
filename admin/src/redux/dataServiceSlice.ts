import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { STATUSES } from "./authSlice";
import { AppDispatch, RootState } from "./store";
import { API } from "../utils/AxiosConfig";

const initialState = {
    data: {},
    status: STATUSES.IDLE
};

const dataServiceSlice = createSlice({
    name: 'dataService',
    initialState,
    reducers: {
        setData(state, action: PayloadAction<any>) {
            state.data = action.payload;
        },
        setStatus(state, action: PayloadAction<STATUSES>) {
            state.status = action.payload;
        },
        resetStatus(state) {
            state.status = initialState.status;
        }
    }
});

export const { setData, setStatus, resetStatus } = dataServiceSlice.actions;
export default dataServiceSlice.reducer;

export function fetchData() {
    return async function fetchDataThunk(dispatch: AppDispatch, getState: () => RootState) {
        const { data } = getState().dataService;
        if (Object.keys(data).length > 0) {
            return;
        }
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const response = await API.get('admin/data-service');
            dispatch(setData(response.data.data));
            dispatch(setStatus(STATUSES.SUCCESS));
        } catch (error: any) {
            dispatch(setStatus(STATUSES.ERROR));
        }
    };
}
