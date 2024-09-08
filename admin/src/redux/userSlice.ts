import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { STATUSES } from "./authSlice";
import { AppDispatch, RootState } from "./store";
import { API } from "../utils/AxiosConfig";

const initialState = {
    data: [], // Assuming this is an array of users
    status: STATUSES.IDLE
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsers(state, action: PayloadAction<any>) {
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

export const { setUsers, setStatus, resetStatus } = userSlice.actions;
export default userSlice.reducer;

export function fetchUsers() {
    return async function fetchUsersThunk(dispatch: AppDispatch, getState: () => RootState) {
        const { data } = getState().user;
        if (data.length > 0) {
            return;
        }

        dispatch(setStatus(STATUSES.LOADING));
        try {
            const response = await API.get('users');
            dispatch(setUsers(response.data));
            dispatch(setStatus(STATUSES.SUCCESS));
        } catch (error: any) {
            dispatch(setStatus(STATUSES.ERROR));
        }
    };
}
