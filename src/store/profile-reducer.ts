import { Dispatch } from "redux";
import { profileAPI } from "../api/profile-api";
import { setAppStatus } from "./app-reducer";

const initState = {
    name: ''
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
}

type InitStateType = typeof initState

type ProfileActionsType = SetUserDataType
type SetUserDataType = ReturnType<typeof setUserData>;


export const changeUserData = (data: any) => async (dispatch: Dispatch) => {
    console.log(data);

    dispatch(setAppStatus('loading'));
    try {
        const response = await profileAPI.editUserData(data);
        console.log(response);

        const { name } = response.updatedUser;
        dispatch(setUserData({ name }));
    } catch (err: any) {
        // errorHandler(dispatch, err.response.data.error);
    } finally {
        dispatch(setAppStatus('idle'));
    }
};
