import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { STATUSES } from "./authSlice";
import { AppDispatch, RootState } from "./store";
import { API, APIFomrm } from "../utils/AxiosConfig";

const initialState = {
    data: {
        categories: [] as any[],
        category: {} as any
    },
    status: STATUSES.IDLE
}

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setCategories(state, action: PayloadAction<any[]>) {
            state.data.categories = action.payload;
        },
        setCategory(state, action: PayloadAction<any>) {
            state.data.category = action.payload;
        },
        setStatus(state, action: PayloadAction<STATUSES>) {
            state.status = action.payload;
        },
        createCat(state, action: PayloadAction<any>) {
            state.data.categories.push(action.payload);
        },
        deleteCat(state, action: PayloadAction<string>) {
            state.data.categories = state.data.categories.filter(cat => cat.id !== action.payload);
        },
        resetStatus(state) {
            state.status = initialState.status
        }
    }
});

export const { setCategory, setCategories, setStatus, resetStatus, deleteCat, createCat } = categorySlice.actions;
export default categorySlice.reducer;

export function fetchCategories() {
    return async function fetchCategoriesThunk(dispatch: AppDispatch, getState: () => RootState) {
        const { categories } = getState().category.data;
        if (categories.length > 0) {
            return;
        }

        dispatch(setStatus(STATUSES.LOADING));
        try {
            const response = await API.get('admin/category');
            dispatch(setCategories(response.data.data));
            dispatch(setStatus(STATUSES.SUCCESS));
        } catch (error: any) {
            dispatch(setStatus(STATUSES.ERROR));
        }
    };
}

export function fetchCategory(id: string) {
    return async function fetchCategoryThunk(dispatch: AppDispatch, getState: () => RootState) {
        const { category }: { category: any } = getState().category.data;
        if (category && category.id === id) {
            return;
        }

        dispatch(setStatus(STATUSES.LOADING));
        try {
            const response = await API.get(`admin/category/${id}`);
            dispatch(setCategory(response.data.data));
            dispatch(setStatus(STATUSES.SUCCESS));
        } catch (error: any) {
            dispatch(setStatus(STATUSES.ERROR));
        }
    };
}

export function createCategory(data: any) {
    return async function createCategoryThunk(dispatch: AppDispatch) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const response = await APIFomrm.post('admin/category', data);
            dispatch(createCat(response.data.data));
            dispatch(setStatus(STATUSES.SUCCESS));
        } catch (error: any) {
            dispatch(setStatus(STATUSES.ERROR));
        }
    };
}

export function deleteCategory(id: string) {
    return async function deleteCategoryThunk(dispatch: AppDispatch) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            await APIFomrm.delete(`admin/category/${id}`);
            dispatch(deleteCat(id));
            dispatch(setStatus(STATUSES.SUCCESS));
        } catch (error: any) {
            dispatch(setStatus(STATUSES.ERROR));
        }
    };
}
