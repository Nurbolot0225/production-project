import { memo, useCallback } from 'react'

import { ArticleDetails } from 'entities/Article'
import { CommentList } from 'entities/Comment'
import { AddCommentForm } from 'features/AddCommentForm'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { RoutePath } from 'shared/config/routerConifg/routeConfig'
import { classNames } from 'shared/lib/classNames/classNames'
import { DynamicModuleLoader, type ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { Text } from 'shared/ui/Text/Text'

import cls from './ArticleDetailPage.module.scss'

import { getArticleCommentsError, getArticleCommentsIsLoading } from '../../model/selectors/comments'
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle'
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
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
    const navigate = useNavigate()

    const onBackToList = useCallback(() => {
        navigate(RoutePath.articles)
    }, [navigate])

    const onSendComment = useCallback((text: string) => {
        dispatch(addCommentForArticle(text))
    }, [dispatch])

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
                <Button
                    theme={ButtonTheme.OUTLINE}
                    onClick={onBackToList}
                >
                    {t('Назад в списку')}
                </Button>
                <ArticleDetails
                    id={id}
                />
                <Text
                    className={cls.commentTitle}
                    title={t('Комментарии')}
                />
                <AddCommentForm onSendComment={onSendComment} />
                <CommentList
                    isLoading={commentsIsLoading}
                    comments={comments}
                />
            </div>
        </DynamicModuleLoader>
    )
}

export default memo(ArticleDetailPage)
