import { memo, useCallback } from 'react'

import { getArticleDetailsData } from 'entities/Article'
import { getCanEditArticle } from 'pages/ArticleDetailsPage/model/selectors/article'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RoutePath } from 'shared/config/routerConifg/routeConfig'
import { classNames } from 'shared/lib/classNames/classNames'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { HStack } from 'shared/ui/Stack'

interface ArticlesDetailsPageHeaderProps {
    className?: string
}

export const ArticlesDetailsPageHeader = memo((props: ArticlesDetailsPageHeaderProps) => {
    const {
        className
    } = props

    const { t } = useTranslation('article-details')
    const navigate = useNavigate()
    const canEdit = useSelector(getCanEditArticle)
    const article = useSelector(getArticleDetailsData)

    const onBackToList = useCallback(() => {
        navigate(RoutePath.articles)
    }, [navigate])

    const onEditArticle = useCallback(() => {
        navigate(`${RoutePath.article_details}${article?.id}/edit`)
    }, [navigate, article?.id])

    return (
        <HStack
            max
            justify='between'
            className={classNames('', {}, [className])}
        >
            <Button
                theme={ButtonTheme.OUTLINE}
                onClick={onBackToList}
            >
                {t('Назад в списку')}
            </Button>
            {canEdit && (
                <Button
                    theme={ButtonTheme.OUTLINE}
                    onClick={onEditArticle}
                >
                    {t('Редактировать')}
                </Button>
            )}
        </HStack>
    )
})
