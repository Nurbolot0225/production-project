import { memo } from 'react'

import { useTranslation } from 'react-i18next'

import { useNotifications } from '../../api/notificationApi'
import { NotificationItem } from '../NotificationItem/NotificationItem'
import { Skeleton } from '@/shared/ui/Skeleton'
import { VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text'

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
                gap='16'
                className={className}
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
            className={className}
        >
            {notifications.map(item => (
                <NotificationItem key={item.id} item={item} />
            ))}
        </VStack>
    )
})
