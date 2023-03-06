import { Dispatch } from "redux"
import { authAPI } from "../api/auth-api"
import { newPasswordDataType, recoveryPasswordAPI } from "../api/recovery-password-api"

const initialState: InitialStateType = {
    isLoggedIn: false
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'AUTH/SET-IS-LOGIN':
            return { ...state, isLoggedIn: action.isLoggedIn }
        default:
            return { ...state }
    }
}

export type InitialStateType = {
    isLoggedIn: boolean
}

export const setIsLoggedIn = (isLoggedIn: boolean) => ({ type: 'AUTH/SET-IS-LOGIN', isLoggedIn } as const)

export type SetIsLoggedInType = ReturnType<typeof setIsLoggedIn>

type ActionsType =
    | SetIsLoggedInType

export const forgot = (email: string) => async (dispatch: Dispatch<ActionsType>) => {
    try {
        await recoveryPasswordAPI.sendLetter(email);
        dispatch(setIsLoggedIn(false))
    } catch (e) {
        console.log(e);
    }
}

export const newPassword = (data: newPasswordDataType) => async (dispatch: Dispatch<ActionsType>) => {
    try {
        await recoveryPasswordAPI.newPassword(data)
        dispatch(setIsLoggedIn(false))
    } catch (e) {
        console.log(e)
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
