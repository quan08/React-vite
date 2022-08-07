import { User } from "../types/User";
import instance from "./instance";

export const signup = (user: User) => {
    const url = `/users`;
    return instance.post(url, user);
}
export const signin = (user: User) => {
    const url = `/users?email=${user.email}`;
    return instance.get(url);
}

export const checkEmail = (email: any) => {
    const url = `/users?email=${email}`;
    return instance.get(url);
}