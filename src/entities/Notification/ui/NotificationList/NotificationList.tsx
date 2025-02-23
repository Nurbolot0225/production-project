import { memo } from 'react'

import { useTranslation } from 'react-i18next'

import cls from './NotificationList.module.scss'

import { useNotifications } from '../../api/notificationApi'
import { NotificationItem } from '@/entities/Notification/ui/NotificationItem/NotificationItem'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'
import { VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text/Text'

interface NotificationListProps {
    className?: string
}

export const NotificationList = memo((props: NotificationListProps) => {
    const {
        className
    } = props

    const { t } = useTranslation()
    const { data: notifications, isLoading } = useNotifications(null, {
        pollingInterval: 10000
    })

    if (isLoading) {
        return (
            <VStack
                max
                gap='16'
                className={classNames(cls.NotificationList, {}, [className])}
            >
                <Skeleton width='100%' border='8px' height='80px' />
                <Skeleton width='100%' border='8px' height='80px' />
                <Skeleton width='100%' border='8px' height='80px' />
            </VStack>
        )
    }

    if (!notifications) {
        return (
            <Text text={t('Не удалось загрузить уведомление')} />
        )
    }

    return (
        <VStack

            gap='16'
            className={classNames(cls.NotificationList, {}, [className])}
        >
            {notifications.map(item => (
                <NotificationItem key={item.id} item={item} />
            ))}
        </VStack>
    )
})
