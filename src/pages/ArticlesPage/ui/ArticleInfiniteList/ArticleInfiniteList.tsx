import { memo } from 'react'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

import {
    getArticlesPageError,
    getArticlesPageIsLoading,
    getArticlesPageView
} from '../../model/selectors/articlesPageSelectors'
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage'
import { getArticles } from '../../model/slices/articlesPageSlice'
import { ArticleList } from '@/entities/Article'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect'
import { Text } from '@/shared/ui/Text'

interface ArticleInfiniteListProps {
    className?: string
}

export const ArticleInfiniteList = memo((props: ArticleInfiniteListProps) => {
    const {
        className
    } = props
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const articles = useSelector(getArticles.selectAll)
    const isLoading = useSelector(getArticlesPageIsLoading)
    const error = useSelector(getArticlesPageError)
    const view = useSelector(getArticlesPageView)
    const [searchParams] = useSearchParams()

    useInitialEffect(() => {
        dispatch(initArticlesPage(searchParams))
    })

    if (error) {
        return (
            <Text text={t('Ошибка при загрузка статей')} />
        )
    }

    return (
        <div className={classNames('', {}, [className])}>
            <ArticleList
                isLoading={isLoading}
                view={view}
                articles={articles}
                className={className}
            />
        </div>
    )
})
