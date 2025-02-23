import { memo, useCallback } from 'react'

import { useTranslation } from 'react-i18next'

import { Currency } from '../../model/types/currency'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ListBox } from '@/shared/ui/Popups'

interface CurrencySelectProps {
    className?: string
    value?: string
    onChange?: (currency: Currency) => void
    readonly?: boolean
}

const options = [
    { value: Currency.KGZ, content: Currency.KGZ },
    { value: Currency.RUB, content: Currency.RUB },
    { value: Currency.USD, content: Currency.USD },
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
        <ListBox
            label={t('Укажите валюту')}
            className={classNames('', {}, [className])}
            items={options}
            value={value}
            readonly={readonly}
            onChange={onChangeHandler}
            direction='top right'
        />
    )
})
