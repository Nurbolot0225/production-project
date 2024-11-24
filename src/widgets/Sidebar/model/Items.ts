import type React from 'react'

import AboutIcon from 'shared/assets/icons/about.svg'
import ArticleIcon from 'shared/assets/icons/article.svg'
import MainIcon from 'shared/assets/icons/main.svg'
import ProfileIcon from 'shared/assets/icons/profile.svg'
import { RoutePath } from 'shared/config/routerConifg/routeConfig'

export interface SidebarItemsType {
    path: string
    text: string
    Icon: React.VFC<React.SVGProps<SVGSVGElement>>
    authOnly?: boolean
}

export const SidebarItemsList: SidebarItemsType[] = [
    {
        path: RoutePath.main,
        Icon: MainIcon,
        text: 'Главная'
    },
    {
        path: RoutePath.about,
        Icon: AboutIcon,
        text: 'О сайте'
    },
    {
        path: RoutePath.profile,
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
]
