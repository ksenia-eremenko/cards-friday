import { instance } from './instance';
import {LoginFormDataType} from '../pages/Login/Login';


export const authAPI = {
    login(data: LoginFormDataType) {
        return instance.post('/auth/login', data)
    },
    logout() {
        return instance.delete('/auth/me')
    }
}
