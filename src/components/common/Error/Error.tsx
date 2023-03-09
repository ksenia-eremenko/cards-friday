import React, { useState } from 'react'
import { setAppError } from '../../../store/app-reducer'
import { useAppDispatch, useAppSelector } from '../../../store/store'

type ErrorType = {
    errorText: string | null
}

export const Error = (props: ErrorType) => {
    const error = useAppSelector(state => state.app.error)
    const dispatch = useAppDispatch()
    const onClickHandler = () => {
        dispatch(setAppError(null))
    }
    return (
        <div className="error-wrapper">
            {error && <div className="error">
                <div className="b-title bt14 color1 align-center">{props.errorText}</div>
                <div className="b-title bt14 color1 align-center close" onClick={onClickHandler}>X</div>
            </div>}
        </div>
    )
}