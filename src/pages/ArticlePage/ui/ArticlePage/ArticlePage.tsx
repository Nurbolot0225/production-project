import { memo } from 'react'

import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'

import cls from './ArticlePage.module.scss'

interface ArticlePageProps {
    className?: string
}

const ArticlePage = ({ className }: ArticlePageProps) => {
    const { t } = useTranslation()

    return (
        <div className={classNames(cls.ArticlePage, {}, [className])}>
            Article page
        </div>
    )
}

export default memo(ArticlePage)
