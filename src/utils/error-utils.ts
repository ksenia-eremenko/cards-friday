import { setAppError, SetAppErrorActionType, setAppStatus, SetAppStatusActionType } from './../store/app-reducer';
import { Dispatch } from 'redux'

export const handleServerNetworkError = (error: string, dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType>) => {
    dispatch(setAppError(error ? error : 'Some error occurred'))
    dispatch(setAppStatus('failed'))
}
