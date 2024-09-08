import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { STATUSES } from "../../type/TypeDef";

const initialState = {
    data: {
        stores: [],
        store: {}
    },
    status: STATUSES.IDEL
}

const storeSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {
        setStores(state, action: PayloadAction<any>) {
            state.data.stores = action.payload
        },
        setStore(state, action: PayloadAction<any>) {
            state.data.store = action.payload
        },
        setStatus(state, action: PayloadAction<STATUSES>) {
            state.status = action.payload
        }
    }
})

export const { setStores, setStatus, setStore } = storeSlice.actions
export default storeSlice.reducer