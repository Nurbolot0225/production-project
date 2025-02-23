import {
    type ArticleDetailsCommentsSchema,
    type ArticleDetailsRecommendationsSchema
} from '@/pages/ArticleDetailsPage'

export interface ArticleDetailsPageSchema {
    comments: ArticleDetailsCommentsSchema
    recommendations: ArticleDetailsRecommendationsSchema
}
