import { memo } from 'react'

import cls from './CommentCard.module.scss'

import { type Comment } from '../..'
import { getRouteProfile } from '@/shared/const/router'
import { classNames } from '@/shared/lib/classNames/classNames'
import { AppLink } from '@/shared/ui/AppLink'
import { Avatar } from '@/shared/ui/Avatar'
import { Skeleton } from '@/shared/ui/Skeleton'
import { VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text'

interface CommentCardProps {
    className?: string
    comment?: Comment
    isLoading?: boolean
}

export const CommentCard = memo((props: CommentCardProps) => {
    const {
        className,
        isLoading,
        comment
    } = props

    if (isLoading) {
        return (
            <VStack
                max
                gap='8'
                className={classNames(cls.CommentCard, {}, [className, cls.loading])}>
                <div className={cls.header}>
                    <Skeleton width={30} height={30} border='50%' />
                    <Skeleton width={100} height={16} className={cls.username} />
                </div>
                <Skeleton width={'100%'} height={50} className={cls.text} />
            </VStack>
        )
    }

    if (!comment) {
        return null
    }

    return (
        <VStack
            max
            gap='8'
            className={classNames(cls.CommentCard, {}, [className])}
        >
            <AppLink to={getRouteProfile(comment?.user.id)} className={cls.header}>
                {comment?.user.avatar && <Avatar
                    src={comment?.user.avatar}
                    size={30}
                />}
                <Text
                    className={cls.username}
                    title={comment?.user.username}
                />
            </AppLink>
            <Text
                className={cls.text}
                text={comment?.text}
            />
        </VStack>
    )
})
