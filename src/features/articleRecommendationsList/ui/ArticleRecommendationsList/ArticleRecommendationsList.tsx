import { memo } from 'react'

import { useTranslation } from 'react-i18next'

import {
    useArticleRecommendationsList
} from '../../api/articleRecommendationsApi'
import { ArticleList } from '@/entities/Article'
import { classNames } from '@/shared/lib/classNames/classNames'
import { VStack } from '@/shared/ui/Stack'
import { Text, TextSize } from '@/shared/ui/Text/Text'

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
