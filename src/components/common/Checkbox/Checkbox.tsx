import React, {
    ChangeEvent,
    DetailedHTMLProps,
    InputHTMLAttributes,
} from 'react'

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement>

type CheckboxPropsType = Omit<DefaultInputPropsType, 'type'> & {
    onChangeChecked?: (checked: boolean) => void
    spanClassName?: string
}

const Checkbox: React.FC<CheckboxPropsType> = (
    {
        onChange,
        onChangeChecked,
        className,
        spanClassName,
        children, // в эту переменную попадёт текст, типизировать не нужно так как он затипизирован в React.FC
        id,

        ...restProps // все остальные пропсы попадут в объект restProps
    }
) => {

    const onChangeCallback = (inputId: string | undefined, e: ChangeEvent<HTMLInputElement>) => {
        // задачка на написание онченджа
        if (id === inputId) {
            onChangeChecked?.(e.currentTarget.checked);
        }
    }
    return (
        <label className="label checkbox-wrapper">
            <input
                id={id}
                type={'checkbox'}
                onChange={(onChangeChecked) ? (e: ChangeEvent<HTMLInputElement>) => onChangeCallback(id, e) : onChange}
                className={`checbox + " " + ${className}`}
                {...restProps} // отдаём инпуту остальные пропсы если они есть (checked например там внутри)
            />
            {children && (
                <span
                    id={id ? id + '-span' : undefined}
                    className="checkbox-info"
                >
                    {children}
                </span>
            )}
        </label> // благодаря label нажатие на спан передастся в инпут
    )
}

export default Checkbox
