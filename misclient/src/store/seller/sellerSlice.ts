import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { STATUSES } from "../../type/TypeDef";
const initialState = {
    data: {},
    status: STATUSES.IDEL
}
const sellerSlice = createSlice({
    name: 'seller',
    initialState,
    reducers: {
        setSellerForm(state, action: PayloadAction<any>) {
            state.data = action.payload
        },
        setStatus(state, action: PayloadAction<STATUSES>) {
            state.status = action.payload
        },
        reSetStatus(state) {
            state.status = initialState.status
        }
    }
})

export const { setSellerForm, setStatus, reSetStatus } = sellerSlice.actions
export default sellerSlice.reducer