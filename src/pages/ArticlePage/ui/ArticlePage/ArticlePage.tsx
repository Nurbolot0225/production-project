import { memo } from 'react'

import { ArticleView } from 'entities/Article'
import { ArticleList } from 'entities/Article/ui/ArticleList/ArticleList'
import { classNames } from 'shared/lib/classNames/classNames'

import cls from './ArticlePage.module.scss'

interface ArticlePageProps {
    className?: string
}

const ArticlePage = ({ className }: ArticlePageProps) => {
    return (
        <div className={classNames(cls.ArticlePage, {}, [className])}>
            <ArticleList
                isLoading
                view={ArticleView.SMALL}
                articles={[]}
            />
        </div>
    )
}

export default memo(ArticlePage)
