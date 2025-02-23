import { createAsyncThunk } from '@reduxjs/toolkit'

import {
    fetchCommentsByArticleId
} from '../fetchCommentsByArticleId/fetchCommentsByArticleId'
import { type ThunkConfig } from '@/app/providers/StoreProvider'
import { getArticleDetailsData } from '@/entities/Article'
import { type Comment } from '@/entities/Comment'
import { getUserAuthData } from '@/entities/User'

export const addCommentForArticle = createAsyncThunk<Comment, string, ThunkConfig<string>>(
    'articleDetails/addCommentForArticle',
    async (text, thunkAPI) => {
        const { dispatch, extra, rejectWithValue, getState } = thunkAPI

        const userData = getUserAuthData(getState())
        const articleData = getArticleDetailsData(getState())

        if (!userData || !text || !articleData) {
            return rejectWithValue('error')
        }

        try {
            const response = await extra.api.post<Comment>('/comments', {
                articleId: articleData.id,
                userId: userData.id,
                text
            })

            if (!response.data) {
                throw new Error()
            }

            dispatch(fetchCommentsByArticleId(articleData.id))

            return response.data
        } catch (e) {
            console.error(e)
            return rejectWithValue('error')
        }
    }
)
