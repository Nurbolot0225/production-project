import { type EntityState } from '@reduxjs/toolkit'
import { type Article, type ArticleView } from 'entities/Article'

export interface ArticlePageSchema extends EntityState<Article> {
    isLoading?: boolean
    error?: string
    view: ArticleView
}
