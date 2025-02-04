import { memo, useCallback } from 'react'

import { ArticleDetails } from 'entities/Article'
import { ArticleList } from 'entities/Article/ui/ArticleList/ArticleList'
import { CommentList } from 'entities/Comment'
import { AddCommentForm } from 'features/AddCommentForm'
import { articleDetailsPageReducer } from 'pages/ArticleDetailsPage/model/slices'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { RoutePath } from 'shared/config/routerConifg/routeConfig'
import { classNames } from 'shared/lib/classNames/classNames'
import { DynamicModuleLoader, type ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { Text, TextSize } from 'shared/ui/Text/Text'
import { Page } from 'widgets/Page/Page'

import cls from './ArticleDetailPage.module.scss'

import { getArticleCommentsIsLoading } from '../../model/selectors/comments'
import { getArticleRecommendationsIsLoading } from '../../model/selectors/recommendations'
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle'
import {
    fetchArticleRecommendations
} from '../../model/services/fetchArticleRecommendations/fetchArticleRecommendation'
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { getArticleComments } from '../../model/slices/articleDetailsCommentsSlice'
import {
    getArticleRecommendations
} from '../../model/slices/articleDetailsPageRecommendationsSlice'

interface ArticleDetailPageProps {
    className?: string
}

const reducers: ReducerList = {
    articleDetailsPage: articleDetailsPageReducer
}

const ArticleDetailPage = ({ className }: ArticleDetailPageProps) => {
    const { id } = useParams<{ id: string }>()
    const { t } = useTranslation('article-details')
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const comments = useSelector(getArticleComments.selectAll)
    const recommendations = useSelector(getArticleRecommendations.selectAll)
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading)
    const recommendationsIsLoading = useSelector(getArticleRecommendationsIsLoading)

    const onBackToList = useCallback(() => {
        navigate(RoutePath.articles)
    }, [navigate])

    const onSendComment = useCallback((text: string) => {
        dispatch(addCommentForArticle(text))
    }, [dispatch])

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id))
        dispatch(fetchArticleRecommendations())
    })

    if (!id) {
        return (
            <Page className={classNames(cls.ArticleDetailPage, {}, [className])}>
                {t('Статья не найдена')}
            </Page>
        )
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Page className={classNames(cls.ArticleDetailPage, {}, [className])}>
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
                    title={t('Рекомендуем')}
                    size={TextSize.L}
                />
                <ArticleList
                    isLoading={recommendationsIsLoading}
                    articles={recommendations}
                    className={cls.recommendations}
                    target="_blank"
                />
                <Text
                    className={cls.commentTitle}
                    title={t('Комментарии')}
                    size={TextSize.L}
                />
                <AddCommentForm onSendComment={onSendComment} />
                <CommentList
                    isLoading={commentsIsLoading}
                    comments={comments}
                />
            </Page>
        </DynamicModuleLoader>
    )
}

export default memo(ArticleDetailPage)
