import { memo, useCallback, useState } from 'react'

import { BrowserView, MobileView } from 'react-device-detect'

import cls from './NotificationButton.module.scss'

import { NotificationList } from '@/entities/Notification'
import NotificationIcon from '@/shared/assets/icons/notification.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { AnimationProvider } from '@/shared/lib/components/AminationProvider'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'
import { Drawer } from '@/shared/ui/Drawer/Drawer'
import { Icon } from '@/shared/ui/Icon/Icon'
import { Popover } from '@/shared/ui/Popups'

interface NotificationButtonProps {
    className?: string
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
    const {
        className
    } = props

    const [isOpen, setIsOpen] = useState<boolean>(false)

    const onOpenDrawer = useCallback(() => {
        setIsOpen(true)
    }, [])

    const onCloseDrawer = useCallback(() => {
        setIsOpen(false)
    }, [])

    const trigger = (
        <Button
            onClick={onOpenDrawer}
            theme={ButtonTheme.CLEAR}
        >
            <Icon
                inverted
                Svg={NotificationIcon}
            />
        </Button>
    )

    return (
        <div>
            <BrowserView>
                <Popover
                    direction='bottom left'
                    className={classNames('', {}, [className])}
                    trigger={trigger}
                >
                    <NotificationList className={cls.NotificationButton} />
                </Popover>
            </BrowserView>
            <MobileView>
                {trigger}
                <AnimationProvider>
                    <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
                        <NotificationList className={cls.NotificationButton} />
                    </Drawer>
                </AnimationProvider>
            </MobileView>
        </div>
    )
})
