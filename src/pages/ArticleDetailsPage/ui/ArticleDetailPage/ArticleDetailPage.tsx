import { memo } from 'react'

import { ArticleDetails } from 'entities/Article'
import { CommentList } from 'entities/Comment'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { classNames } from 'shared/lib/classNames/classNames'
import { DynamicModuleLoader, type ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { Text } from 'shared/ui/Text/Text'

import cls from './ArticleDetailPage.module.scss'

import { getArticleCommentsError, getArticleCommentsIsLoading } from '../../model/selectors/comments'
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId'
import { articleDetailsCommentsReducers, getArticleComments } from '../../model/slice/articleDetailsCommentsSlice'

interface ArticleDetailPageProps {
    className?: string
}

const reducers: ReducerList = {
    articleDetailsComments: articleDetailsCommentsReducers
}

const ArticleDetailPage = ({ className }: ArticleDetailPageProps) => {
    const { id } = useParams<{ id: string }>()
    const { t } = useTranslation('article-details')
    const dispatch = useAppDispatch()
    const comments = useSelector(getArticleComments.selectAll)
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading)
    const commentsError = useSelector(getArticleCommentsError)

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id))
    })

    if (!id) {
        return (
            <div className={classNames(cls.ArticleDetailPage, {}, [className])}>
                {t('Статья не найдена')}
            </div>
        )
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={classNames(cls.ArticleDetailPage, {}, [className])}>
                <ArticleDetails
                    id={id}
                />
                <Text
                    className={cls.commentTitle}
                    title={t('Комментарии')}
                />
                <CommentList
                    isLoading={commentsIsLoading}
                    comments={comments}
                />
            </div>
        </DynamicModuleLoader>
    )
}

export default memo(ArticleDetailPage)
