import { memo } from 'react'

import { NotificationList } from 'entities/Notification'
import { useTranslation } from 'react-i18next'
import NotificationIcon from 'shared/assets/icons/notification.svg'
import { classNames } from 'shared/lib/classNames/classNames'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { Icon } from 'shared/ui/Icon/Icon'
import { Popover } from 'shared/ui/Popups'

import cls from './NotificationButton.module.scss'

interface NotificationButtonProps {
    className?: string
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
    const {
        className
    } = props

    const { t } = useTranslation()

    return (
        <Popover
            direction='bottom left'
            className={classNames('', {}, [className])}
            trigger={(
                <Button theme={ButtonTheme.CLEAR}>
                    <Icon
                        inverted
                        Svg={NotificationIcon}
                    />
                </Button>
            )}
        >
            <NotificationList className={cls.NotificationButton} />
        </Popover>
    )
})
