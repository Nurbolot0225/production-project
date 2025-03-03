import { createAsyncThunk } from '@reduxjs/toolkit'

import { getArticlesPageInited } from '../../selectors/articlesPageSelectors'
import { articlesPageActions } from '../../slices/articlesPageSlice'
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList'
import { type ThunkConfig } from '@/app/providers/StoreProvider'
import { type ArticleSortField, type ArticleType } from '@/entities/Article'
import { type SortOrder } from '@/shared/types/sort'

export const initArticlesPage = createAsyncThunk<
    void,
    URLSearchParams,
    ThunkConfig<string>
>(
    'articlesPage/fetchNextArticlesPage',
    async (searchParams, thunkApi) => {
        const { getState, dispatch } = thunkApi
        const inited = getArticlesPageInited(getState())

        if (!inited) {
            const orderFromUrl = searchParams.get('order') as SortOrder
            const sortFromUrl = searchParams.get('sort') as ArticleSortField
            const searchFromUrl = searchParams.get('search')
            const typeFromUrl = searchParams.get('type') as ArticleType

            if (orderFromUrl) {
                dispatch(articlesPageActions.setOrder(orderFromUrl))
            }

            if (sortFromUrl) {
                dispatch(articlesPageActions.setSort(sortFromUrl))
            }

            if (searchFromUrl) {
                dispatch(articlesPageActions.setSearch(searchFromUrl))
            }

            if (typeFromUrl) {
                dispatch(articlesPageActions.setType(typeFromUrl))
            }

            dispatch(articlesPageActions.initState())
            dispatch(fetchArticlesList({}))
        }
    }
)
