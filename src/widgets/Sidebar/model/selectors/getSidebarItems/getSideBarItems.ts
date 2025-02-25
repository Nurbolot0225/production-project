import { createSelector } from '@reduxjs/toolkit'

import { type SidebarItemsType } from '../../types/sidebar'
import { getUserAuthData } from '@/entities/User'
import AboutIcon from '@/shared/assets/icons/about.svg'
import ArticleIcon from '@/shared/assets/icons/article.svg'
import MainIcon from '@/shared/assets/icons/main.svg'
import ProfileIcon from '@/shared/assets/icons/profile.svg'
import { RoutePath } from '@/shared/const/router'

export const getSidebarItems = createSelector(
    getUserAuthData,
    (userData) => {
        const SidebarItemsList: SidebarItemsType[] = [
            {
                path: RoutePath.main,
                Icon: MainIcon,
                text: 'Главная'
            },
            {
                path: RoutePath.about,
                Icon: AboutIcon,
                text: 'О сайте'
            }
        ]

        if (userData) {
            SidebarItemsList.push(
                {
                    path: RoutePath.profile + userData.id,
                    Icon: ProfileIcon,
                    text: 'Профиль',
                    authOnly: true
                },
                {
                    path: RoutePath.articles,
                    Icon: ArticleIcon,
                    text: 'Статья',
                    authOnly: true
                }
            )
        }

        return SidebarItemsList
    }
)
