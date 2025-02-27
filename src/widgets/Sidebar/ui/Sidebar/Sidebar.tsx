import { memo, useMemo, useState } from 'react'

import { useSelector } from 'react-redux'

import cls from './Sidebar.module.scss'

import { getSidebarItems } from '../../model/selectors/getSidebarItems/getSideBarItems'
import { SidebarItem } from '../SidebarItem/SidebarItem'
import { LangSwitcher } from '@/features/LangSwitcher'
import { ThemeSwitcher } from '@/features/ThemeSwitcher'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button'
import { VStack } from '@/shared/ui/Stack'

interface SidebarProps {
    className?: string
}

export const Sidebar = memo(({ className }: SidebarProps) => {
    const sidebarItemsList = useSelector(getSidebarItems)
    const [collapsed, setCollapsed] = useState<boolean>(false)

    const onToggle = () => {
        setCollapsed(prevState => !prevState)
    }

    const itemsList = useMemo(() => sidebarItemsList.map((item) => (
        <SidebarItem
            key={item.path}
            item={item}
            collapsed={collapsed}
        />
    )), [collapsed, sidebarItemsList])

    return (
        <aside
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
            <VStack
                role='navigation'
                gap='8'
                className={cls.items}
            >
                {itemsList}
            </VStack>
            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LangSwitcher
                    short={collapsed}
                    className={cls.lang}
                />
            </div>
        </aside>
    )
})
