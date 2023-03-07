import {instance} from "./instance";


export type RegisterParamsType = {
    email: string
    password: string
}


export const registerUserAPI = {
    register(data: RegisterParamsType) {
        return instance.post(`/auth/register`, data)
    }
}
