import { Rating } from '@/entities/Rating'
import { rtkApi } from '@/shared/api/rtkApi'

interface GetArticleRatingArg {
    userId: string
    articleId: string
}

interface RateArticleArg {
    userId: string
    articleId: string
    rate: number
    feedback?: string
}

export const articleRatingApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRatings: build.query<Rating[], GetArticleRatingArg>({
            query: ({ userId, articleId }) => ({
                url: 'article-ratings',
                params: {
                    userId,
                    articleId
                }
            })
        }),
        rateArticle: build.mutation<void, RateArticleArg>({
            query: (arg) => ({
                url: 'article-ratings',
                method: 'POST',
                body: arg
            })
        })
    })
})

export const useGetArticleRating = articleRatingApi.useGetArticleRatingsQuery
export const useRateArticle = articleRatingApi.useRateArticleMutation
