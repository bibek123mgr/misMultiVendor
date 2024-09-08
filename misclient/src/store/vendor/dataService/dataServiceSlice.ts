import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { STATUSES } from "../../../type/TypeDef";

const initialState = {
    data: {},
    status: STATUSES.IDEL
}

const dataServiceSlice = createSlice({
    name: 'data-service',
    initialState,
    reducers: {
        setData(state, action: PayloadAction<any>) {
            state.data = action.payload
        },
        setStatus(state, action: PayloadAction<STATUSES>) {
            state.status = action.payload
        },
        reSetStatus(state) {
            state.status = initialState.status
        },
    }
})

export const { setData, setStatus, reSetStatus } = dataServiceSlice.actions
export default dataServiceSlice.reducer