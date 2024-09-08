import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { STATUSES } from "../../../type/TypeDef";

const initialState = {
    data: {
        products: [] as any,
        product: {}
    },
    status: STATUSES.IDEL
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts(state, action: PayloadAction<any>) {
            state.data.products = action.payload
        },
        setProduct(state, action: PayloadAction<any>) {
            state.data.product = action.payload
        },
        setStatus(state, action: PayloadAction<STATUSES>) {
            state.status = action.payload
        },
        setNewProduct(state, action: PayloadAction<any>) {
            state.data.products.push(action.payload)
        }
    }
})

export const { setProduct, setStatus, setProducts } = productSlice.actions
export default productSlice.reducer