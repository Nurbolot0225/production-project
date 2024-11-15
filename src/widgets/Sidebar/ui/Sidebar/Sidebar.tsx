import { memo, useMemo, useState } from 'react'

import { classNames } from 'shared/lib/classNames/classNames'
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button'
import { LangSwitcher } from 'shared/ui/LangSwitcher/LangSwitcher'
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher'
import { SidebarItemsList } from 'widgets/Sidebar/model/Items'
import { SidebarItem } from 'widgets/Sidebar/ui/SidebarItem/SidebarItem'

import cls from './Sidebar.module.scss'

interface SidebarProps {
    className?: string
}

export const Sidebar = memo(({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState<boolean>(false)

    const onToggle = () => {
        setCollapsed(prevState => !prevState)
    }

    const itemsList = useMemo(() => SidebarItemsList.map((item) => (
        <SidebarItem
            key={item.path}
            item={item}
            collapsed={collapsed}
        />
    )), [collapsed])

    return (
        <div
            data-testid='sidebar'
            className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}>
            <Button
                data-testid='sidebar-toggle'
                onClick={onToggle}
                className={cls.collapsedBtn}
                theme={ButtonTheme.BACKGROUND_INVERTED}
                size={ButtonSize.L}
                square
            >
                {collapsed ? '>' : '<'}
            </Button>
            <div className={cls.items}>
                {itemsList}
            </div>
            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LangSwitcher
                    short={collapsed}
                    className={cls.lang}
                />
            </div>
        </div>
    )
})
