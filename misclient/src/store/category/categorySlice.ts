import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { STATUSES } from "../../type/TypeDef";

interface ICategory {
    _id: string;
    name: string;
}

interface CategoryState {
    data: ICategory[];
    status: STATUSES;
}

const initialState: CategoryState = {
    data: [],
    status: STATUSES.IDEL,
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setCate(state, action: PayloadAction<ICategory[]>) {
            state.data = action.payload;
            state.status = STATUSES.SUCCESS;
        },
        setStatus(state, action: PayloadAction<STATUSES>) {
            state.status = action.payload;
        },
        resetCate(state) {
            state.data = [];
            state.status = STATUSES.IDEL;
        }
    }
});

export const { setCate, setStatus, resetCate } = categorySlice.actions;
export default categorySlice.reducer;
