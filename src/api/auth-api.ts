import axios from 'axios';
import { LoginFormDataType } from '../pages/Login/Login';
import { instance } from './instance';

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
        return instance.delete('/auth/me')
    },
    login(data: LoginFormDataType) {
        return instance.post('/auth/login', data)
    },
    register(data: RegisterParamsType) {
        return instance.post(`/auth/register`, data)
    }
}

export const recoveryPasswordAPI = {
    sendLetter(email: string) {
        return axios.post('https://neko-back.herokuapp.com/2.0/auth/forgot', { email, message }, { withCredentials: true })
    },
    newPassword(data: newPasswordDataType) {
        return instance.post('/auth/set-new-password', data)
    }
}
