
import { authAPI, newPasswordDataType, recoveryPasswordAPI, RegisterParamsType } from "../api/auth-api"
import { LoginDataType } from "../pages/Login/Login"
import { setAppError, SetAppErrorActionType, setAppStatus, SetAppStatusActionType, setIsInitialized } from "./app-reducer"
import { AppThunkType } from "./store"
import {setProfile} from './profile-reducer';

const initialState = {
    isLoggedIn: false,
    isRegisterIn: false
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'AUTH/SET-IS-LOGIN':
            return { ...state, isLoggedIn: action.isLoggedIn }
        case 'AUTH/SET-IS-REGISTER-IN':
            return { ...state, isRegisterIn: action.userData }
        default:
            return { ...state }
    }
}

//types
type InitialStateType = typeof initialState


//actions
export const setIsLoggedIn = (isLoggedIn: boolean) => ({ type: 'AUTH/SET-IS-LOGIN', isLoggedIn } as const)
export const setIsRegisterIn = (userData: boolean) => ({ type: 'AUTH/SET-IS-REGISTER-IN', userData } as const)


//types actions
export type SetIsLoggedInType = ReturnType<typeof setIsLoggedIn>
export type setIsRegisterInType = ReturnType<typeof setIsRegisterIn>

type ActionsType = SetIsLoggedInType
    | setIsRegisterInType
    | SetAppStatusActionType
    | SetAppErrorActionType

//thunks
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
            dispatch(setAppError(error.response.data.error))
        })
}
export const me = (): AppThunkType => async (dispatch) => {
    dispatch(setAppStatus('loading'))

    try {
        const res = await authAPI.me()
        dispatch(setProfile(res.data))
        dispatch(setIsLoggedIn(true));
        dispatch(setAppStatus('succeeded'))
    } catch (e: any) {
        dispatch(setAppStatus('failed'))
    } finally {
        dispatch(setAppStatus('idle'))
        dispatch(setIsInitialized(true));
    }
}
