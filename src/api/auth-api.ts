import { instance } from './instance';

export const authAPI = {
    logout() {
        return instance.delete('/auth/me')
    }
}
