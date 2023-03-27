import {EditDataUserType, profileAPI} from '../api/profile-api';
import { handleServerNetworkError } from "../utils/error-utils";
import { setAppStatus } from "./app-reducer";
import { AppThunkType } from "./store";
import defaultAva from '../assets/images/image-2.png';

const initState = {
    name: '',
    _id: '',
    avatar: defaultAva
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
    avatar?: string
}

type InitStateType = typeof initState
/*type InitStateType = {
    name: string
    _id: string
}*/

type ProfileActionsType = SetUserDataType
type SetUserDataType = ReturnType<typeof setUserData>;


export const changeUserData = (data: EditDataUserType): AppThunkType => async (dispatch) => {
    console.log(data);

    dispatch(setAppStatus('loading'));
    try {
        const response = await profileAPI.editUserData(data);
        const { name, _id, avatar } = response.data.updatedUser;
        dispatch(setUserData({ name, _id, avatar }));
    } catch (err: any) {
        handleServerNetworkError(err.response.data.error, dispatch);
    } finally {
        dispatch(setAppStatus('idle'));
    }
};
