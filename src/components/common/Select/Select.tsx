import React, {
    SelectHTMLAttributes,
    DetailedHTMLProps,
    ChangeEvent,
} from 'react'

type DefaultSelectPropsType = DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
>

type SuperSelectPropsType = DefaultSelectPropsType & {
    options?: any[]
    onChangeSelect?: (option: any) => void
    defaultValue: number
}

const Select: React.FC<SuperSelectPropsType> = ({
    options,
    onChangeSelect,
    defaultValue
}) => {

    const mappedOptions: any[] = options
        ? options.map((o) => (
              <option
                  id={'hw7-option-' + o.id}
                  key={o.id}
                  value={o.value}
              >
                  {o.value}
              </option>
          ))
        : []

    const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
        // делают студенты
        onChangeSelect?.(+e.currentTarget.value)
    }

    return (
        <select
            onChange={onChangeCallback}
            value={defaultValue}
        >
            {mappedOptions}
        </select>
    )
}

export default Select
