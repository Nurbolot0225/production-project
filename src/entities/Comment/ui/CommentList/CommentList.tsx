import { memo } from 'react'

import { useTranslation } from 'react-i18next'

import { type Comment } from '../..'
import { CommentCard } from '../CommentCard/CommentCard'
import { classNames } from '@/shared/lib/classNames/classNames'
import { VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text/Text'

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

    if (isLoading) {
        return (
            <VStack
                max
                gap='16'
                className={classNames('', {}, [className])}
            >
                <CommentCard isLoading={true}/>
                <CommentCard isLoading={true}/>
                <CommentCard isLoading={true}/>
            </VStack>
        )
    }

    return (
        <VStack
            max
            gap='16'
            className={classNames('', {}, [className])}
        >
            {comments?.length
                ? comments.map((comment: Comment) => (
                    <CommentCard
                        key={comment.id}
                        isLoading={isLoading}
                        comment={comment}
                    />
                ))
                : <Text title={t('Комментарии отсутствует')}/>
            }
        </VStack>
    )
})
