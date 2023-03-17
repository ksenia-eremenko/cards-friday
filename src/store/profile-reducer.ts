import { profileAPI } from "../api/profile-api";
import { handleServerNetworkError } from "../utils/error-utils";
import { setAppStatus } from "./app-reducer";
import { AppThunkType } from "./store";

const initState = {
    name: '',
    _id: ''
};

export const ProfileReducer = (state = initState, action: ProfileActionsType): InitStateType => {
    switch (action.type) {
        case 'PROFILE/SET-USER-DATA':
            return { ...state, ...action.payload.data };
        default: {
            return state;
        }
    }
};

export const setUserData = (data: DataType) => {
    return {
        type: 'PROFILE/SET-USER-DATA',
        payload: { data },
    } as const;
};

type DataType = {
    name: string
    _id: string
}

// type InitStateType = typeof initState
type InitStateType = {
    name: string
    _id: string
}

type ProfileActionsType = SetUserDataType
type SetUserDataType = ReturnType<typeof setUserData>;


export const changeUserData = (data: any): AppThunkType => async (dispatch) => {
    console.log(data);
    
    dispatch(setAppStatus('loading'));
    try {
        const response = await profileAPI.editUserData(data);
        const { name, _id } = response.data.updatedUser;
        dispatch(setUserData({ name, _id }));
    } catch (err: any) {
        handleServerNetworkError(err.response.data.error, dispatch);
    } finally {
        dispatch(setAppStatus('idle'));
    }
};
