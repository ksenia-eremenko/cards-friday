import axios from 'axios'
import { instance } from './instance';

export type newPasswordDataType = {
    password: string,
    resetPasswordToken: string | undefined
}

const message = `<h3>Password recovery link: <a href='http://localhost:3000/#/set-new-password/$token$'>link</a></h3>`

export const recoveryPasswordAPI = {
    sendLetter(email: string) {
        return axios.post('https://neko-back.herokuapp.com/2.0/auth/forgot', { email, message }, { withCredentials: true })
    },
    newPassword(data: newPasswordDataType) {
        return instance.post('/auth/set-new-password', data)
    }
}
