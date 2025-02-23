import { createAsyncThunk } from '@reduxjs/toolkit'

import { type ThunkConfig } from '@/app/providers/StoreProvider'
import { type Article } from '@/entities/Article'

export const fetchArticleRecommendations = createAsyncThunk<
    Article[],
    void,
    ThunkConfig<string>
>(
    'articlesDetailPage/fetchArticleRecommendations',
    async (_, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi

        try {
            const response = await extra.api.get<Article[]>('/articles', {
                params: {
                    _limit: 6
                }
            })

            if (!response.data) {
                throw new Error()
            }

            console.log('call')

            return response.data
        } catch (e) {
            console.error(e)
            return rejectWithValue('error')
        }
    }
)
