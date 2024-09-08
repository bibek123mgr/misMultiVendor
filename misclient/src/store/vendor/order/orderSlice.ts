import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { STATUSES } from "../../../type/TypeDef";

const initialState = {
    data: {
        orders: [],
        order: {}
    },
    status: STATUSES.IDEL
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrders(state, action: PayloadAction<any>) {
            state.data.orders = action.payload
        },
        setOrder(state, action: PayloadAction<any>) {
            state.data.order = action.payload
        },
        setStatus(state, action: PayloadAction<STATUSES>) {
            state.status = action.payload
        }
    }
})

export const { setOrders, setStatus, setOrder } = orderSlice.actions
export default orderSlice.reducer