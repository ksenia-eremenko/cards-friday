import axios, {AxiosResponse} from 'axios';
import {LoginDataType} from '../pages/Login/Login';
import { instance } from './instance';
import {ProfileType} from '../store/profile-reducer';

export type RegisterParamsType = {
    email: string
    password: string
}
export type newPasswordDataType = {
    password: string,
    resetPasswordToken: string | undefined
}
const message = `<h3>Password recovery link: <a href='http://localhost:3000/#/set-new-password/$token$'>link</a></h3>`

export const authAPI = {
    logout() {
        return instance.delete<{info: string}>('/auth/me')
    },
    login(data: LoginDataType) {
        return instance.post<'', AxiosResponse<ProfileType>, LoginDataType>('/auth/login', data)
    },
    register(data: RegisterParamsType) {
        return instance.post<'', AxiosResponse<ProfileType>, RegisterParamsType>(`/auth/register`, data)
    },
    me() {
        return instance.post<ProfileType>('/auth/me')
    },
}

export const recoveryPasswordAPI = {
    sendLetter(email: string) {
        return axios.post('https://neko-back.herokuapp.com/2.0/auth/forgot', { email, message }, { withCredentials: true })
    },
    newPassword(data: newPasswordDataType) {
        return instance.post('/auth/set-new-password', data)
    }
}
