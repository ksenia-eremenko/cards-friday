import React, {ChangeEvent, ReactNode, useRef} from 'react';
import './InputTypeFile.scss';
import {convertFileToBase64} from './convertFileToBase64';

type PropsType = {
    changeFile: (file: string) => void
    children: ReactNode
}

export const InputTypeFile = ({children, changeFile}: PropsType) => {

    const inputRef = useRef<HTMLInputElement>(null)

    const selectFileHandler = () => {
        inputRef && inputRef.current?.click();
    };

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]

            if (file.size < 4000000) {
                convertFileToBase64(file, changeFile)
            } else {
                console.error('Error: ', 'Файл слишком большого размера')
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
                onChange={uploadHandler}
            />
        </div>
    )
}
