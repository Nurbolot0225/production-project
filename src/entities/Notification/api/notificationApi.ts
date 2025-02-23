import { Notification } from '../modal/types/notification'
import { rtkApi } from '@/shared/api/rtkApi'

export const notificationApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getNotifications: build.query<Notification[], null>({
            query: () => ({
                url: '/notifications'
            })
        })
    })
})

export const useNotifications = notificationApi.useGetNotificationsQuery
