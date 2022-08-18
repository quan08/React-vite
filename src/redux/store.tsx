import {configureStore} from '@reduxjs/toolkit'
import authReducerSlice from '../fu/auth/authReducerSlice';
import CartReducerSlice from '../fu/cart/CartReducerSlice';
import ProductsReducerSlice from '../fu/products/ProductsReducerSlice';
// import filtersReducerSlice from '../components/Filters/filtersReducerSlice';
// import todoListReducerSlice from '../components/TodoList/todoListReducerSlice';


const store = configureStore({
    reducer: {
        products: ProductsReducerSlice,
        cart: CartReducerSlice,
        auth:authReducerSlice
        // todoList: todoListReducerSlice.reducer,
    }
    
})
export default store;