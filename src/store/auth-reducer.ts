
import { authAPI, newPasswordDataType, recoveryPasswordAPI, RegisterParamsType } from "../api/auth-api"
import { LoginDataType } from "../pages/Login/Login"
import { setAppError, SetAppErrorActionType, setAppStatus, SetAppStatusActionType } from "./app-reducer"
import { AppThunkType } from "./store"

const initialState = {
    isLoggedIn: false,
    profile: null as null | ProfileType,
    isRegisterIn: false,
    isInitialized: false
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'AUTH/SET-IS-LOGIN':
            return { ...state, isLoggedIn: action.isLoggedIn }
        case 'AUTH/SET-PROFILE':
            return { ...state, profile: action.data }
        case 'AUTH/SET-IS-REGISTER-IN':
            return { ...state, isRegisterIn: action.userData }
        case 'login/SET-IS-INITIALIZED':
            return { ...state, isInitialized: action.value }
        default:
            return { ...state }
    }
}

//types
type InitialStateType = typeof initialState

export type ProfileType = {
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
export const setLoginData = (data: ProfileType) => ({ type: 'AUTH/SET-PROFILE', data } as const)
export const setIsLoggedIn = (isLoggedIn: boolean) => ({ type: 'AUTH/SET-IS-LOGIN', isLoggedIn } as const)
export const setIsRegisterIn = (userData: boolean) => ({ type: 'AUTH/SET-IS-REGISTER-IN', userData } as const)
export const setIsInitialized = (value: boolean) => ({ type: 'login/SET-IS-INITIALIZED', value } as const)


//types actions
export type SetIsLoggedInType = ReturnType<typeof setIsLoggedIn>
export type SetLoginDataType = ReturnType<typeof setLoginData>
export type setIsRegisterInType = ReturnType<typeof setIsRegisterIn>
export type setIsInitializedType = ReturnType<typeof setIsInitialized>

type ActionsType = SetIsLoggedInType
    | SetLoginDataType
    | setIsRegisterInType
    | SetAppStatusActionType
    | SetAppErrorActionType
    | setIsInitializedType

//thunks
export const getProfile = (data: LoginDataType): AppThunkType => async (dispatch) => {
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
export const forgot = (email: string): AppThunkType => async (dispatch) => {
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
export const newPassword = (data: newPasswordDataType): AppThunkType => async (dispatch) => {
    dispatch(setAppStatus("loading"))
    try {
        await recoveryPasswordAPI.newPassword(data)
        dispatch(setIsLoggedIn(false))
        dispatch(setAppStatus('succeeded'))
    } catch (e: any) {
        dispatch(setAppStatus('failed'))
        dispatch(setAppError(e.response.data.error))
    }
}
export const logout = (): AppThunkType => async (dispatch) => {
    dispatch(setAppStatus('loading'))
    dispatch(setIsLoggedIn(false))
    try {
        await authAPI.logout()
        dispatch(setAppStatus("succeeded"))
    } catch (e) {
        dispatch(setAppStatus("failed"))
    } finally {
        dispatch(setAppStatus("idle"))
    }
}
export const register = (data: RegisterParamsType): AppThunkType => (dispatch) => {
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
        .finally(() => {
            dispatch(setAppStatus("idle"))
        })
}
export const me = (): AppThunkType => async (dispatch) => {
    dispatch(setAppStatus('loading'))
    try {
        const res = await authAPI.me()
        dispatch(setLoginData(res.data))
        dispatch(setIsLoggedIn(true));
        dispatch(setIsInitialized(true));
        dispatch(setAppStatus('succeeded'))
    } catch (e: any) {
        dispatch(setAppStatus('failed'))
        dispatch(setIsInitialized(true));
    } finally {
        dispatch(setAppStatus('idle'))
    }
}
