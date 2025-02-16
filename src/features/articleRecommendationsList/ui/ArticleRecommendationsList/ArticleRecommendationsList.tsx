import { memo } from 'react'

import { ArticleList } from 'entities/Article/ui/ArticleList/ArticleList'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { VStack } from 'shared/ui/Stack'
import { Text, TextSize } from 'shared/ui/Text/Text'

import {
    useArticleRecommendationsList
} from '../../api/articleRecommendationsApi'

interface ArticleRecommendationListProps {
    className?: string
}

export const ArticleRecommendationsList = memo((props: ArticleRecommendationListProps) => {
    const { className } = props
    const { t } = useTranslation()
    const { isLoading, error, data: articles } = useArticleRecommendationsList(6)

    if (isLoading || error || !articles) {
        return null
    }

    return (
        <VStack gap='8' className={classNames('', {}, [className])}>
            <Text
                title={t('Рекомендуем')}
                size={TextSize.L}
            />
            <ArticleList
                isLoading={isLoading}
                articles={articles}
                target="_blank"
            />
        </VStack>
    )
})
