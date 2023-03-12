import React, { ChangeEvent, useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import Input from '../Input/Input';

type PropsType = {
    name: string;
    callback: (name: string) => void;
};

export const EditableSpan: React.FC<PropsType> = ({ name, callback }) => {
    const [field, setField] = useState<'span' | 'input'>('span');
    const [value, setValue] = useState(name);
    const [error, setError] = useState('');

    const onClickHandler = () => {
        setField('input');
    };

    const onBlurHandler = () => {
        if (value.length === 0) {
            setError('Required')
        } else {
            if (value === name) {
                setField('span');
                setError('')
            } else {
                setField('span');
                callback(value);
                setError('')
            }
        }
    };

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value);
    };

    return (
        <div className='editable-span'>
            {field === 'span'
                ? <div className='name'>
                    <span>{value}</span>
                    <button type="button" onClick={onClickHandler}>
                        <div className="icon edit-name">
                            <CiEdit />
                        </div>
                    </button>
                </div>
                : (
                    <div className='change-name'>
                        <Input
                            autoFocus
                            onChange={onChangeHandler}
                            onEnter={onBlurHandler}
                            onBlur={onBlurHandler}
                            value={value}
                            type="text"
                        />
                        {error && <div className="error-name b-title bt14">{error}</div>}
                    </div>
                )}
        </div>
    );
};
