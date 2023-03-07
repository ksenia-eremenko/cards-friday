
import {Dispatch} from "redux";
import {RegisterParamsType, registerUserAPI} from "../api/register-user-api";
import {setAppStatusAC, SetAppStatusActionType} from "./app-reducer";



export const SET_IS_REGISTER_IN = 'SET-IS-REGISTER-IN';
const initialState = {
    isRegisterIn: false,
}
type InitialStateType = typeof initialState

export const registerReducer = (state:InitialStateType = initialState, action:ActionsType): InitialStateType=>{
    switch(action.type){
        case  SET_IS_REGISTER_IN:
            return {
                ...state, isRegisterIn: action.userData
            }
        default:
            return state
    }
}


export const setIsRegisterInAC = (userData: boolean) =>({
    type: SET_IS_REGISTER_IN,
    userData
})


export const registerTC = (data: RegisterParamsType) =>  (dispatch: Dispatch<ActionsType>) =>{
        dispatch(setAppStatusAC("loading"))
        registerUserAPI.register(data)
            .then((res)=>{
        dispatch(setIsRegisterInAC(true))
        dispatch(setAppStatusAC('succeeded'))
    })
    .catch((error) =>{
        console.log(error)
    })
}

type ActionsType = ReturnType<typeof setIsRegisterInAC> | SetAppStatusActionType
