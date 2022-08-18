

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAll } from "../../api/product";

export const getProducts = createAsyncThunk(
    "product/getProducts",
    async () => {
        const { data } = await getAll();
        return data
    }
)
export const ProductsReducerSlice = createSlice({
    name: 'products',
    initialState: {
        value: [],
    },
    reducers: {
        getProducts: (state, action) => {
            state.value = action.payload
        }
        
    }})
// export const getProducts = ProductsReducerSlice.actions
export default ProductsReducerSlice.reducer