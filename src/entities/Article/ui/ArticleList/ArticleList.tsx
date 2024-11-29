import { memo } from 'react'

import { ArticleListItem } from 'entities/Article/ui/ArticleListItem/ArticleListItem'
import { ArticleListItemSkeleton } from 'entities/Article/ui/ArticleListItem/ArticleListItemSkeleton'
import { classNames } from 'shared/lib/classNames/classNames'

import cls from './ArticleList.module.scss'

import { type Article, ArticleView } from '../../model/types/article'

interface ArticleListProps {
    className?: string
    articles: Article[]
    isLoading?: boolean
    view?: ArticleView
}

const getSkeletons = (view: ArticleView) => {
    return new Array(view === ArticleView.SMALL ? 9 : 3)
        .fill(0)
        .map((_, index) => (
            <ArticleListItemSkeleton className={cls.card} key={index} view={view} />
        ))
}

export const ArticleList = memo((props: ArticleListProps) => {
    const {
        className,
        articles,
        isLoading,
        view = ArticleView.SMALL
    } = props

    if (isLoading) {
        return (
            <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
                {getSkeletons(view)}
            </div>
        )
    }

    const renderArticle = (article: Article) => (
        <ArticleListItem
            article={article}
            view={view}
            key={article.id}
            className={cls.card}
        />
    )

    return (
        <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
            {articles.length > 0
                ? articles.map(renderArticle)
                : null
            }
        </div>
    )
})
