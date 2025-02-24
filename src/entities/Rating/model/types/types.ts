export interface Rating {
    id: string
    userId: string
    articleId: string
    rate: number
    feedback?: string
}
