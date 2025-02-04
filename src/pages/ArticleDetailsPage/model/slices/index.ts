import { combineReducers } from '@reduxjs/toolkit'

import { articleDetailsCommentsReducers } from '../../model/slices/articleDetailsCommentsSlice'
import {
    articleDetailsPageRecommendationsReducers
} from '../../model/slices/articleDetailsPageRecommendationsSlice'
import { type ArticleDetailsPageSchema } from '../types/articleDetailsPageSchema'

export const articleDetailsPageReducer = combineReducers<ArticleDetailsPageSchema>({
    recommendations: articleDetailsPageRecommendationsReducers,
    comments: articleDetailsCommentsReducers
})
