import React, {ChangeEvent, ReactNode, useRef} from 'react';
import './InputTypeFile.scss';
import {convertFileToBase64} from './convertFileToBase64';
import login from '../../../pages/Login/Login';
import {useAppDispatch} from '../../../store/store';
import {setAppError} from '../../../store/app-reducer';

type PropsType = {
    changeFile: (file: string) => void
    children: ReactNode
}

export const InputTypeFile = ({children, changeFile}: PropsType) => {
    const dispatch = useAppDispatch()

    const inputRef = useRef<HTMLInputElement>(null)

    const selectFileHandler = () => {
        inputRef && inputRef.current?.click();
    };

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            console.log(file.size)
            if (file.size < 102400) {
                convertFileToBase64(file, changeFile)
                dispatch(setAppError(''))
            } else {
                dispatch(setAppError('File size is too big'))
            }
        }
    }

    return (
        <div className='input-type-file'>
            <button onClick={selectFileHandler}>{children}</button>
            <input
                style={{display: 'none'}}
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={uploadHandler}
            />
        </div>
    )
}
