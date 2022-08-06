import instance from "./instance";


export const getAll = () => {
    const url = "/products"
    return instance.get(url)
}


export const getByCate= (value: string) => {
    const url = `/products?categories=${value}`
    return instance.get(url)
}

export const getByName= (value: string) => {
    const url = `/products?name_like=${value}`
    return instance.get(url)
}

export const getById= (value: any) => {
    const url = `/products?id=${value}`
    return instance.get(url)
}

export const createProduct = (data:any) => {
    const url = "/products"
    return instance.post(url, data)
}

export const updateProduct = (data:any, id: any) => {
    const url = `/products/${id}`
    return instance.put(url, data)
}

export const changeStatusProduct = (data:any, id: any) => {
    const url = `/products/${id}`
    return instance.put(url, data)
}

export const remove = (id: any) => {
    const url = `/products/${id}`;
    return instance.delete(url);
}