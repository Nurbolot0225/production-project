import { memo, useCallback } from 'react'

import cls from './ArticlesPage.module.scss'

import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage'
import { articlesPageReducer } from '../../model/slices/articlesPageSlice'
import { ArticleInfiniteList } from '../../ui/ArticleInfiniteList/ArticleInfiniteList'
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters'
import { classNames } from '@/shared/lib/classNames/classNames'
import { DynamicModuleLoader, type ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Page } from '@/widgets/Page/Page'

interface ArticlePageProps {
    className?: string
}

const reducers: ReducersList = {
    articlesPage: articlesPageReducer
}

const ArticlesPage = ({ className }: ArticlePageProps) => {
    const dispatch = useAppDispatch()

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesPage())
    }, [dispatch])

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <Page
                onScrollEnd={onLoadNextPart}
                className={classNames(cls.ArticlePage, {}, [className])}
            >
                <ArticlesPageFilters />
                <ArticleInfiniteList className={cls.list} />
            </Page>
        </DynamicModuleLoader>
    )
}

export default memo(ArticlesPage)
