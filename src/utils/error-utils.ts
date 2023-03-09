import { setAppError, SetAppErrorActionType, setAppStatus, SetAppStatusActionType } from './../store/app-reducer';
import { Dispatch } from 'redux'

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType>) => {
    dispatch(setAppError(error.message ? error.message : 'Some error occurred'))
    dispatch(setAppStatus('failed'))
}
