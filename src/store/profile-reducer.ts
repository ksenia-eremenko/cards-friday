import {Dispatch} from 'redux';
import {loginAPI} from '../api/login-api';
import {LoginFormDataType} from '../pages/Login/Login';
import {setIsLoggedIn, SetIsLoggedInType} from './auth-reducer';

const initialState = {
    profile: null
}

export const profileReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET-PROFILE':
            return { ...state, profile: action.data }
        default:
            return { ...state }
    }
}

//actions
const setLoginData = (data: UserDataType) => ({
    type: 'SET-PROFILE', data
} as const)

//thunks
export const getProfile = (data: LoginFormDataType) => async (dispatch: Dispatch<ActionsType>) => {
    try {
        const res = await loginAPI.login(data)
        dispatch(setIsLoggedIn(true))
        dispatch(setLoginData(res.data))
    } catch (e) {
        console.log(e)
    }
}

//types
type InitialStateType = {
    profile: null | UserDataType
}

type ActionsType = ReturnType<typeof setLoginData>
                    | SetIsLoggedInType

type UserDataType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number
    created: Date
    updated: Date
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
    error?: string
}
