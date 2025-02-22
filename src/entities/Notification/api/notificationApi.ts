import { rtkApi } from 'shared/api/rtkApi'

import { Notification } from '../modal/types/notification'

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
