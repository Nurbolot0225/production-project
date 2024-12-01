import { type EntityState } from '@reduxjs/toolkit'
import { type Article, type ArticleSortField, type ArticleType, type ArticleView } from 'entities/Article'
import { type SortOrder } from 'shared/types'

export interface ArticlesPageSchema extends EntityState<Article> {
    isLoading?: boolean
    error?: string
    view: ArticleView

    // pagination
    page: number
    limit: number
    hasMore: boolean

    // filter
    order: SortOrder
    sort: ArticleSortField
    search: string
    type: ArticleType

    _inited: boolean
}
