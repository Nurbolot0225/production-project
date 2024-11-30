import { memo, useCallback } from 'react'

import { type ArticleView, ArticleViewSelector } from 'entities/Article'
import { ArticleList } from 'entities/Article/ui/ArticleList/ArticleList'
import { useSelector } from 'react-redux'
import { classNames } from 'shared/lib/classNames/classNames'
import { DynamicModuleLoader, type ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'

import cls from './ArticlesPage.module.scss'

import {
    getArticlesIsLoading,
    getArticlesView
} from '../../model/selectors/articlesPageSelectors'
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList'
import { articlesPageSliceActions, articlesPageSliceReducer, getArticles } from '../../model/slice/articlesPageSlice'

interface ArticlePageProps {
    className?: string
}

const reducers: ReducerList = {
    articlesPage: articlesPageSliceReducer
}

const ArticlesPage = ({ className }: ArticlePageProps) => {
    const dispatch = useAppDispatch()
    const articles = useSelector(getArticles.selectAll)
    const isLoading = useSelector(getArticlesIsLoading)
    const view = useSelector(getArticlesView)

    const onChangeView = useCallback((view: ArticleView) => {
        dispatch(articlesPageSliceActions.setView(view))
    }, [dispatch])

    useInitialEffect(() => {
        dispatch(fetchArticlesList())
        dispatch(articlesPageSliceActions.initState())
    })

    return (
        <DynamicModuleLoader reducers={reducers}>
            <div className={classNames(cls.ArticlePage, {}, [className])}>
                <ArticleViewSelector
                    view={view}
                    onViewClick={onChangeView}
                />
                <ArticleList
                    isLoading={isLoading}
                    view={view}
                    articles={articles}
                />
            </div>
        </DynamicModuleLoader>
    )
}

export default memo(ArticlesPage)
