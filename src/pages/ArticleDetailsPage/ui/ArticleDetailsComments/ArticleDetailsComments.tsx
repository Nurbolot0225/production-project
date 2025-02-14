import { memo, useCallback } from 'react'

import { CommentList } from 'entities/Comment'
import { AddCommentForm } from 'features/addCommentForm'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { classNames } from 'shared/lib/classNames/classNames'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { VStack } from 'shared/ui/Stack'
import { Text, TextSize } from 'shared/ui/Text/Text'

import { getArticleCommentsIsLoading } from '../../model/selectors/comments'
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle'
import {
    fetchCommentsByArticleId
} from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { getArticleComments } from '../../model/slices/articleDetailsCommentsSlice'

interface ArticleDetailsCommentsProps {
    className?: string
    id: string
}

export const ArticleDetailsComments = memo((props: ArticleDetailsCommentsProps) => {
    const { className, id } = props
    const { t } = useTranslation()
    const comments = useSelector(getArticleComments.selectAll)
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading)
    const dispatch = useDispatch()

    const onSendComment = useCallback((text: string) => {
        dispatch(addCommentForArticle(text))
    }, [dispatch])

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id))
    })

    return (
        <VStack
            max
            gap='16'
            className={classNames('', {}, [className])}>
            <Text
                size={TextSize.L}
                title={t('Комментарии')}
            />
            <AddCommentForm onSendComment={onSendComment} />
            <CommentList
                isLoading={commentsIsLoading}
                comments={comments}
            />
        </VStack>
    )
})
