import {EditDataUserType, profileAPI} from '../api/profile-api';
import { handleServerNetworkError } from "../utils/error-utils";
import {setAppError, setAppStatus} from './app-reducer';
import { AppThunkType } from "./store";
import {LoginDataType} from '../pages/Login/Login';
import {authAPI} from '../api/auth-api';
import {setIsLoggedIn} from './auth-reducer';

const initState = {
    profile: null as null | ProfileType
};

export const ProfileReducer = (state = initState, action: ProfileActionsType): InitStateType => {
    switch (action.type) {
        case 'AUTH/SET-PROFILE':
            return { ...state, profile: action.data }
        case 'PROFILE/UPDATE-PROFILE-DATA':
            return { ...state, profile: {...action.data} };
        default: {
            return state;
        }
    }
};

//actions
export const setProfile = (data: ProfileType) => ({ type: 'AUTH/SET-PROFILE', data } as const)
export const updateProfileData = (data: ProfileType) => ({type: 'PROFILE/UPDATE-PROFILE-DATA', data } as const)

//thunks
export const getProfile = (data: LoginDataType): AppThunkType => async (dispatch) => {
    dispatch(setAppStatus("loading"))
    try {
        const res = await authAPI.login(data)
        dispatch(setIsLoggedIn(true))
        dispatch(setProfile(res.data))
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

export const changeUserData = (data: EditDataUserType): AppThunkType => async (dispatch) => {
    console.log(data);

    dispatch(setAppStatus('loading'));
    try {
        const response = await profileAPI.editUserData(data);
        console.log(response)
        dispatch(updateProfileData(response.data.updatedUser));
    } catch (err: any) {
        handleServerNetworkError(err.response.data.error, dispatch);
    } finally {
        dispatch(setAppStatus('idle'));
    }
};

//types
export type SetProfileType = ReturnType<typeof setProfile>
export type SetUserDataType = ReturnType<typeof updateProfileData>

type ProfileActionsType = SetProfileType | SetUserDataType
type InitStateType = typeof initState

type DataType = {
    name: string
    _id: string
    avatar?: string
}

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
