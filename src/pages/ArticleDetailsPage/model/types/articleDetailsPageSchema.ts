import {
    type ArticleDetailsCommentsSchema,
    type ArticleDetailsRecommendationsSchema
} from '../..'

export interface ArticleDetailsPageSchema {
    comments: ArticleDetailsCommentsSchema
    recommendations: ArticleDetailsRecommendationsSchema
}
