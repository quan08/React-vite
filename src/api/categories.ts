import instance from "./instance";

export const getAllCate = () => {
    const url = "/categories"
    return instance.get(url)
}

export const addCate = (data:any) => {
    const url = "/categories"
    return instance.post(url, data)
}

export const getCateById= (value: any) => {
    const url = `/categories?id=${value}`
    return instance.get(url)
}


export const updateCate = (data:any, id: any) => {
    const url = `/categories/${id}`
    return instance.put(url, data)
}

export const removeCate = (id: any) => {
    const url = `/categories/${id}`;
    return instance.delete(url);
}