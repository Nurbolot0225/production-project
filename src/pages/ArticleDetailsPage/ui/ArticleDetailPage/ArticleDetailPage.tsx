import { memo } from 'react'

import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'

import cls from './ArticleDetailPage.module.scss'

interface ArticleDetailPageProps {
    className?: string
}

const ArticleDetailPage = ({ className }: ArticleDetailPageProps) => {
    const { t } = useTranslation('article')

    return (
        <div className={classNames(cls.ArticleDetailPage, {}, [className])}>
            Article detail
        </div>
    )
}

export default memo(ArticleDetailPage)
