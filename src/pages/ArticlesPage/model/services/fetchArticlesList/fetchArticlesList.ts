import { createAsyncThunk } from '@reduxjs/toolkit'
import { type ThunkConfig } from 'app/providers/StoreProvider'
import { type Article } from 'entities/Article'

import { getArticlesPageLimit } from '../../selectors/articlesPageSelectors'

interface FetchArticlesListProps {
    page?: number
}

export const fetchArticlesList = createAsyncThunk<
    Article[],
    FetchArticlesListProps,
    ThunkConfig<string>
>(
    'articlesPage/fetchArticlesList',
    async (props, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi
        const { page = 1 } = props
        const limit = getArticlesPageLimit(getState())

        try {
            const response = await extra.api.get<Article[]>('/articles', {
                params: {
                    _expand: 'user',
                    _limit: limit,
                    _page: page
                }
            })

            if (!response.data) {
                throw new Error()
            }

            return response.data
        } catch (e) {
            console.error(e)
            return rejectWithValue('error')
        }
    }
)
