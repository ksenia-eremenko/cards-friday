
import { Dispatch } from "redux"
import { authAPI, newPasswordDataType, recoveryPasswordAPI, RegisterParamsType } from "../api/auth-api"
import { LoginFormDataType } from "../pages/Login/Login"
import { setAppError, SetAppErrorActionType, setAppStatus, SetAppStatusActionType } from "./app-reducer"

const initialState: InitialStateType = {
    isLoggedIn: false,
    profile: null,
    isRegisterIn: false
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'AUTH/SET-IS-LOGIN':
            return { ...state, isLoggedIn: action.isLoggedIn }
        case 'AUTH/SET-PROFILE':
            return { ...state, profile: action.data }
        case 'AUTH/SET-IS-REGISTER-IN':
            return { ...state, isRegisterIn: action.userData }
        default:
            return { ...state }
    }
}

//types
type InitialStateType = {
    isLoggedIn: boolean
    profile: null | UserDataType
    isRegisterIn: boolean
}
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

//actions
export const setLoginData = (data: UserDataType) => ({ type: 'AUTH/SET-PROFILE', data } as const)
export const setIsLoggedIn = (isLoggedIn: boolean) => ({ type: 'AUTH/SET-IS-LOGIN', isLoggedIn } as const)
export const setIsRegisterIn = (userData: boolean) => ({ type: 'AUTH/SET-IS-REGISTER-IN', userData } as const)


//types actions
export type SetIsLoggedInType = ReturnType<typeof setIsLoggedIn>
export type SetLoginDataType = ReturnType<typeof setLoginData>
export type setIsRegisterInType = ReturnType<typeof setIsRegisterIn>

type ActionsType = SetIsLoggedInType | SetLoginDataType | setIsRegisterInType | SetAppStatusActionType | SetAppErrorActionType

//thunks
export const getProfile = (data: LoginFormDataType) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatus("loading"))
    try {
        const res = await authAPI.login(data)
        dispatch(setIsLoggedIn(true))
        dispatch(setLoginData(res.data))
        dispatch(setAppStatus('succeeded'))
    } catch (error: any) {
        dispatch(setAppStatus('failed'))
        if (error.response.data.error === 'user not found /ᐠ-ꞈ-ᐟ\\') {
            dispatch(setAppError('User not found'))
        }
        if (error.response.data.error === 'not correct password /ᐠ-ꞈ-ᐟ\\') {
            dispatch(setAppError('Not correct password'))
        }
    }
}
export const forgot = (email: string) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatus("loading"))
    try {
        await recoveryPasswordAPI.sendLetter(email);
        dispatch(setIsLoggedIn(false))
        dispatch(setAppStatus('succeeded'))

    } catch (error: any) {
        if (error.response.status === 404) {
            dispatch(setAppError('User not found'))
            dispatch(setAppStatus('failed'))
        }
    }
}
export const newPassword = (data: newPasswordDataType) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatus("loading"))
    try {
        await recoveryPasswordAPI.newPassword(data)
        dispatch(setIsLoggedIn(false))
        dispatch(setAppStatus('succeeded'))
    } catch (e: any) {
        console.log(e);
    }
}
export const logout = () => async (dispatch: Dispatch<ActionsType>) => {
    try {
        await authAPI.logout()
        dispatch(setIsLoggedIn(false))
    } catch (e) {
        console.log(e)
    }
}
export const register = (data: RegisterParamsType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatus("loading"))
    authAPI.register(data)
        .then((res) => {
            dispatch(setIsRegisterIn(true))
            dispatch(setAppStatus('succeeded'))
        })
        .catch((error) => {
            dispatch(setAppStatus('failed'))
            if (error.response.data.error === 'email already exists /ᐠ｡ꞈ｡ᐟ\\') {
                dispatch(setAppError('Email already exists'))
            }
        })
}
