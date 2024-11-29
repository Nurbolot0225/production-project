import { type User } from 'entities/User'

export enum ArticleBlockType {
    CODE = 'CODE',
    IMAGE = 'IMAGE',
    TEXT = 'TEXT'
}

export enum ArticleView {
    BIG = 'BIG',
    SMALL = 'SMALL'
}

export interface ArticleBlockBase {
    id: string
    type: ArticleBlockType
}

export interface ArticleCodeBlock extends ArticleBlockBase {
    type: ArticleBlockType.CODE
    code: string
}

export interface ArticleImageBlock extends ArticleBlockBase {
    type: ArticleBlockType.IMAGE
    src: string
    title: string
}

export interface ArticleTextBlock extends ArticleBlockBase {
    type: ArticleBlockType.TEXT
    title?: string
    paragraphs: string[]
}

export type ArticleBlock = ArticleCodeBlock | ArticleImageBlock | ArticleTextBlock

export enum ArticleType {
    ITEM = 'IT',
    SCIENCE = 'SCIENCE',
    ECONOMICS = 'ECONOMICS',
}

export interface Article {
    id: string
    title: string
    user: User
    subtitle: string
    img: string
    views: number
    createdAt: string
    userId: string
    type: ArticleType[]
    blocks: ArticleBlock[]
}
