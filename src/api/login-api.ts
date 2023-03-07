import {LoginFormDataType} from '../pages/Login/Login';
import {instance} from './instance';

export const loginAPI = {
    login(data: LoginFormDataType) {
        return instance.post('/auth/login', data)
    }
}
