import { createAsyncThunk } from '@reduxjs/toolkit'
import { type ThunkConfig } from 'app/providers/StoreProvider'
import { type Article } from 'entities/Article'

export const fetchArticlesList = createAsyncThunk<
    Article[],
    void,
    ThunkConfig<string>
>(
    'articlesPage/fetchArticlesList',
    async (_, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi

        try {
            const response = await extra.api.get<Article[]>('/articles', {
                params: {
                    _expand: 'user'
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
