import toast from "react-hot-toast"
import { STATUSES } from "../../type/TypeDef"
import API from "../../utils/AxiosConfig"
import { RootState } from "../store"
import { setLogOut, setStatus, setUser } from "./authSlice"

export function login(data: any) {
    return async function userLoginThunk(dispatch: any) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await API.post('auth/login', data)
            dispatch(setUser(response.data.data))
            dispatch(setStatus(STATUSES.SUCCESS))
            toast.success('login successfully')
        } catch (error: any) {
            console.log(error)
            dispatch(setStatus(STATUSES.ERROR))
            const errorMessage = error.response?.data?.message || 'An error occurred';
            toast.error(errorMessage);
        }
    }
}

export function logOut() {
    return async function logOutThunk(dispatch: any) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            await API.post('auth/logout')
            dispatch(setLogOut())
            dispatch(setStatus(STATUSES.SUCCESS))
            toast.success('logOut successfully')

        } catch (error: any) {
            console.log(error)
            dispatch(setStatus(STATUSES.ERROR))
            const errorMessage = error.response?.data?.message || 'An error occurred';
            toast.error(errorMessage);
        }
    }
}
export function register(data: any) {
    return async function userLoginThunk(dispatch: any) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await API.post('auth/register', data)
            dispatch(setStatus(STATUSES.SUCCESS))
            toast.success(response.data.message)
        } catch (error: any) {
            dispatch(setStatus(STATUSES.ERROR))
            const errorMessage = error.response?.data?.message || 'An error occurred';
            toast.error(errorMessage);
        }
    }
}
export function fetchMyprofile() {
    return async function fetchMyprofileThunk(dispatch: any, getState: () => RootState) {
        const state = getState();
        const currentUser = state.auth.data;
        if (Object.entries(currentUser).length > 0) {
            return;
        }
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const response = await API.get('auth/getme');
            dispatch(setUser(response.data.data));
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR));
        }
    };
}

export function verifyMyAccount(otp: string) {
    return async function verifyMyAccountThunk(dispatch: any) {
        dispatch(setStatus(STATUSES.LOADING));
        console.log(otp)
        try {
            const response = await API.post('auth/verify', { otp });
            dispatch(setUser(response.data.data));
            dispatch(setStatus(STATUSES.SUCCESS))
            toast.success('user created')
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR));
        }
    };
}