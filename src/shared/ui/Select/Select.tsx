import { type ChangeEvent, useCallback, useMemo } from 'react'

import cls from './Select.module.scss'

import { classNames, type Mods } from '@/shared/lib/classNames/classNames'

export interface SelectOption<T extends string> {
    value: T
    content: string
}

interface SelectProps<T extends string> {
    className?: string
    label?: string
    options?: Array<SelectOption<T>>
    value?: T
    onChange?: (value: T) => void
    readonly?: boolean
}

export const Select = <T extends string>(props: SelectProps<T>) => {
    const {
        className,
        label,
        options,
        value,
        readonly,
        onChange
    } = props

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value as T)
    }, [onChange])

    const optionsList = useMemo(() => {
        return options?.map((opt) => (
            <option
                className={cls.option}
                key={opt.value}
                value={opt.value}
            >
                {opt.content}
            </option>
        ))
    }, [options])

    const mods: Mods = {
        [cls.readonly]: readonly
    }

    return (
        <div className={classNames(cls.Wrapper, mods, [className])}>
            {label && (
                <span className={cls.label}>
                    {`${label}>`}
                </span>
            )}
            <select
                className={cls.select}
                onChange={onChangeHandler}
                value={value}
                disabled={readonly}
            >
                {optionsList}
            </select>
        </div>
    )
}
