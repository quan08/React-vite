

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const CartReducerSlice = createSlice({
    name: 'cart',
    initialState: {
        value: [],
    },
    reducers: {
        update: (state, action) => {
            state.value = action.payload
        }
    }})
// export const getProducts = ProductsReducerSlice.actions
export default CartReducerSlice.reducer