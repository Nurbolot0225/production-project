import { memo } from 'react'

import { ArticleList } from 'entities/Article/ui/ArticleList/ArticleList'
import { useArticleRecommendationsList } from 'features/articleRecommendationList/api/articleRecommendationsApi'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { VStack } from 'shared/ui/Stack'
import { Text, TextSize } from 'shared/ui/Text/Text'

interface ArticleRecommendationListProps {
    className?: string
}

export const ArticleRecommendationList = memo((props: ArticleRecommendationListProps) => {
    const { className } = props
    const { t } = useTranslation()
    const { isLoading, error, data: articles } = useArticleRecommendationsList(4)

    if (isLoading && error) {
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
