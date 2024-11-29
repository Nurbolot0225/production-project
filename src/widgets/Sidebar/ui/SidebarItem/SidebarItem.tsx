import { memo } from 'react'

import { getUserAuthData } from 'entities/User'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { classNames } from 'shared/lib/classNames/classNames'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import { type SidebarItemsType } from 'widgets/Sidebar/model/types/sidebar'

import cls from './SidebarItem.module.scss'

interface SidebarItemProps {
    item: SidebarItemsType
    collapsed: boolean
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
    const isAuthenticated = useSelector(getUserAuthData)
    const { t } = useTranslation()

    if (item.authOnly && !isAuthenticated) {
        return null
    }

    return (
        <AppLink
            to={item.path}
            theme={AppLinkTheme.SECONDARY}
            className={classNames(cls.item, { [cls.collapsed]: collapsed })}
        >
            {collapsed}
            <item.Icon className={cls.icon} />
            <span className={cls.link}>
                {t(item.text)}
            </span>
        </AppLink>
    )
})
