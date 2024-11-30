import { createAsyncThunk } from '@reduxjs/toolkit'
import { type ThunkConfig } from 'app/providers/StoreProvider'
import { articlesPageActions } from 'pages/ArticlesPage/model/slices/articlesPageSlice'

import { getArticlesPageInited } from '../../selectors/articlesPageSelectors'
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList'

export const initArticlesPage = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>(
    'articlesPage/fetchNextArticlesPage',
    async (_, thunkApi) => {
        const { getState, dispatch } = thunkApi
        const inited = getArticlesPageInited(getState())

        if (!inited) {
            dispatch(articlesPageActions.initState())
            dispatch(fetchArticlesList({
                page: 1
            }))
        }
    }
)
