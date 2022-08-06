import instance from "./instance";

export const getAllCate = () => {
    const url = "/categories"
    return instance.get(url)
}
