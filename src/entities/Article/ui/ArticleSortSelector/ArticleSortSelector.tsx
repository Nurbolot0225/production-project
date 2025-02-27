import { memo, useMemo } from 'react'

import { useTranslation } from 'react-i18next'

import cls from './ArticleSortSelector.module.scss'

import { ArticleSortField } from '../../model/constants/articleConstants'
import { classNames } from '@/shared/lib/classNames/classNames'
import { type SortOrder } from '@/shared/types'
import { Select, type SelectOption } from '@/shared/ui/Select'

interface ArticleSortSelectorProps {
    className?: string
    order: SortOrder
    sort: ArticleSortField
    onChangeOrder: (newOrder: SortOrder) => void
    onChangeSort: (newOrder: ArticleSortField) => void
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
    const {
        className,
        order,
        sort,
        onChangeOrder,
        onChangeSort
    } = props

    const { t } = useTranslation()

    const orderOptions = useMemo<Array<SelectOption<SortOrder>>>(() => [
        {
            value: 'asc',
            content: t('возрастание')
        },
        {
            value: 'desc',
            content: t('убывание')
        }
    ], [t])

    const sortFieldOptions = useMemo<Array<SelectOption<ArticleSortField>>>(() => [
        {
            value: ArticleSortField.CREATED,
            content: t('дата созданию')
        },
        {
            value: ArticleSortField.TITLE,
            content: t('названию')
        },
        {
            value: ArticleSortField.VIEWS,
            content: t('просмотром')
        }
    ], [t])

    return (
        <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
            <Select
                label={t('Сортировать ПО')}
                options={sortFieldOptions}
                value={sort}
                onChange={onChangeSort}
            />
            <Select
                label={t('по')}
                options={orderOptions}
                value={order}
                onChange={onChangeOrder}
                className={cls.order}
            />
        </div>
    )
})
