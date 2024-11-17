import { memo, useCallback } from 'react'

import { Currency } from 'entities/Currency'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { Select } from 'shared/ui/Select/Select'

interface CurrencySelectProps {
    className?: string
    value?: string
    onChange?: (currency: Currency) => void
    readonly?: boolean
}

const options = [
    { value: Currency.KGZ, content: Currency.KGZ },
    { value: Currency.RUB, content: Currency.RUB },
    { value: Currency.USB, content: Currency.USB },
    { value: Currency.EUR, content: Currency.EUR }
]

export const CurrencySelect = memo((props: CurrencySelectProps) => {
    const {
        className,
        value,
        readonly,
        onChange
    } = props

    const { t } = useTranslation()

    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Currency)
    }, [onChange])

    return (
        <Select
            label={t('Укажите валюту')}
            className={classNames('', {}, [className])}
            options={options}
            value={value}
            readonly={readonly}
            onChange={onChangeHandler}
        />
    )
})
