import { lazy } from 'react'

export const ArticleDetailPageAsync = lazy(
    async () => await import('./ArticleDetailPage')
)
