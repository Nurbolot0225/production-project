import {
    createEntityAdapter,
    createSlice, type PayloadAction
} from '@reduxjs/toolkit'

import {
    fetchArticleRecommendations
} from '../../model/services/fetchArticleRecommendations/fetchArticleRecommendation'
import { type StateSchema } from '@/app/providers/StoreProvider'
import { type Article } from '@/entities/Article'
import { type ArticleDetailsRecommendationsSchema } from '@/pages/ArticleDetailsPage'

const recommendationsAdapter = createEntityAdapter<Article>({
    selectId: (article) => article.id
})

export const getArticleRecommendations = recommendationsAdapter.getSelectors<StateSchema>(
    (state) => state.articleDetailsPage?.recommendations || recommendationsAdapter.getInitialState()
)

export const articleDetailsPageRecommendationsSlice = createSlice({
    name: 'articleDetailsPageRecommendationsSlice',
    initialState: recommendationsAdapter.getInitialState<ArticleDetailsRecommendationsSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {}
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticleRecommendations.pending, (state) => {
                state.error = undefined
                state.isLoading = true
            })
            .addCase(fetchArticleRecommendations.fulfilled, (state, action: PayloadAction<Article[]>) => {
                state.isLoading = false
                recommendationsAdapter.setAll(state, action.payload)
            })
            .addCase(fetchArticleRecommendations.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    }
})

export const {
    reducer: articleDetailsPageRecommendationsReducers
} = articleDetailsPageRecommendationsSlice
