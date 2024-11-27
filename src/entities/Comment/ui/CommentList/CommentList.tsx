import { memo } from 'react'

import { type Comment } from 'entities/Comment'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { Text } from 'shared/ui/Text/Text'

import cls from './CommentList.module.scss'

import { CommentCard } from '../CommentCard/CommentCard'

interface CommentListProps {
    className?: string
    comments?: Comment[]
    isLoading?: boolean

}

export const CommentList = memo((props: CommentListProps) => {
    const { t } = useTranslation()

    const {
        className,
        comments,
        isLoading
    } = props

    return (
        <div className={classNames(cls.CommentList, {}, [className])}>
            {comments?.length
                ? comments.map((comment: Comment) => (
                    <CommentCard
                        className={cls.comment}
                        key={comment.id}
                        isLoading={isLoading}
                        comment={comment}
                    />
                ))
                : <Text title={t('Комментарии отсутствует')} />
            }
        </div>
    )
})
