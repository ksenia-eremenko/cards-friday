import React, { ChangeEvent, useState } from 'react';
import './EditableTitle.scss';

type EditableTitlePropsType = {
    editMode: boolean
    setEditMode: (mode: boolean) => void
    title?: string
    callback: (name: string, deckCover: string) => void
    className?: string
    deckCover? : string
}

const EditableTitle = ({ editMode, setEditMode, title, callback, className, deckCover}: EditableTitlePropsType) => {
    const [value, setValue] = useState(title);
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const onBlurHandler = () => {
        if (value) callback(value, deckCover || '')
        setEditMode(false)
    }

    return <div className='editable-title'>
        {
            editMode
                ? <input value={value} autoFocus onChange={onChangeHandler} onBlur={onBlurHandler} />
                : <h3 className={className}>{title}</h3>
        }
    </div>
};

export default EditableTitle;
