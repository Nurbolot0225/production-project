import { memo } from 'react'

import { classNames } from 'shared/lib/classNames/classNames'

import cls from './ArticlePage.module.scss'

interface ArticlePageProps {
    className?: string
}

const ArticlePage = ({ className }: ArticlePageProps) => {
    return (
        <div className={classNames(cls.ArticlePage, {}, [className])}>
        </div>
    )
}

export default memo(ArticlePage)
