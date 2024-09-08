import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./store";
import { API } from "../utils/AxiosConfig";
import toast from "react-hot-toast";



export enum STATUSES {
    IDLE = 'idle',
    SUCCESS = 'success',
    ERROR = 'error',
    LOADING = 'loading'
}

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        data: {},
        status: STATUSES.IDLE
    },
    reducers: {
        setUser(state, action: PayloadAction<any>) {
            state.data = action.payload;
        },
        setStatus(state, action: PayloadAction<STATUSES>) {
            state.status = action.payload;
        },
        resetStatus(state) {
            state.status = STATUSES.IDLE
        }
    }
});

export const { setStatus, setUser, resetStatus } = authSlice.actions;
export default authSlice.reducer;

export function userlogin(data: any) {
    return async function loginThunk(dispatch: AppDispatch) {
        dispatch(setStatus(STATUSES.LOADING));
        const toastId = toast.loading('Signing in...');
        try {
            const response = await API.post('auth/login', data);
            dispatch(setUser(response.data.data));
            dispatch(setStatus(STATUSES.SUCCESS));
            toast.success('Signed in successfully!', { id: toastId });
        } catch (error: any) {
            dispatch(setStatus(STATUSES.ERROR));

            const errorMessage = error.response?.data?.message || 'An error occurred';
            toast.error(`Sign in failed: ${errorMessage}`, { id: toastId });
        }
    };
}
export function getMe() {
    return async function getMeThunk(dispatch: AppDispatch, getState: () => RootState) {
        const state = getState()
        const { data } = state.auth
        if (data && Object.entries(data).length > 0) {
            return
        }
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const response = await API.get('auth/getme');
            dispatch(setUser(response.data.data));
            dispatch(setStatus(STATUSES.SUCCESS));
        } catch (error: any) {
            dispatch(setStatus(STATUSES.ERROR));
            const errorMessage = error.response?.data?.message || 'An error occurred';
            console.log(errorMessage)
        }
    };
}

