import { ProductTye } from "../types/product"

export const getProducts = (data: ProductTye) => {
    return {
        type: 'products/getProducts',
        payload: data
    }
}

export const updateCart = (data: ProductTye) => {
    return {
        type: 'cart/update',
        payload: data
    }
}

export const updateAuth = (data: any) => {
    return {
        type: 'auth/update',
        payload: data
    }
}

