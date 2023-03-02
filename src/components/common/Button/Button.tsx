import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement>

type ButtonPropsType = DefaultButtonPropsType & {
    xType?: string
    setColor?: (color: string) => void
}

const Button: React.FC<ButtonPropsType> = (
    {
        xType,
        className,
        setColor,
        disabled,
        ...restProps // все остальные пропсы попадут в объект restProps, там же будет children
    }
) => {

    const onChangeHandler = () => {
        alert('click')
    }
    return (
        <button
            onClick={onChangeHandler}
            disabled={disabled}
            className={`styled-btn + '' + ${className}`}
            {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
        />
    )
}

export default Button
