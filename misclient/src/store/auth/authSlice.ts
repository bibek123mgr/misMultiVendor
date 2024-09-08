import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { STATUSES } from "../../type/TypeDef"


const initialState = {
    data: {},
    status: STATUSES.IDEL
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<any>) {
            state.data = action.payload
        },
        setStatus(state, action: PayloadAction<STATUSES>) {
            state.status = action.payload
        },
        setLogOut(state) {
            state.data = initialState.data
        }
    }
})

export const { setUser, setStatus, setLogOut } = authSlice.actions
export default authSlice.reducer