import { memo, useCallback, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import cls from './Navbar.module.scss'

import { getUserAuthData } from '@/entities/User'
import { LoginModal } from '@/features/AuthByUsername'
import { AvatarDropdown } from '@/features/avatarDropdown'
import { NotificationButton } from '@/features/notificationButton'
import { RoutePath } from '@/shared/config/routerConifg/routeConfig'
import { classNames } from '@/shared/lib/classNames/classNames'
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink/AppLink'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'
import { HStack } from '@/shared/ui/Stack'
import { Text, TextTheme } from '@/shared/ui/Text/Text'

interface NavbarProps {
    className?: string
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const { t } = useTranslation()
    const authData = useSelector(getUserAuthData)
    const [isAuthModal, setIsAuthModal] = useState<boolean>(false)

    const onShowModal = useCallback(() => {
        setIsAuthModal(true)
    }, [])

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false)
    }, [])

    if (authData) {
        return (
            <header className={classNames(cls.Navbar, {}, [className])}>
                <Text
                    className={cls.appName}
                    title={t('Habr')}
                    theme={TextTheme.INVERTED}
                />
                <AppLink
                    to={RoutePath.article_create}
                    theme={AppLinkTheme.SECONDARY}
                    className={cls.createBtn}
                >
                    {t('Создать статью')}
                </AppLink>
                <HStack gap='16' className={cls.actions}>
                    <NotificationButton />
                    <AvatarDropdown />
                </HStack>
            </header>
        )
    }

    return (
        <header className={classNames(cls.Navbar, {}, [className])}>
            <Button
                theme={ButtonTheme.CLEAR_INVERTED}
                className={cls.links}
                onClick={onShowModal}
            >
                {t('Войти')}
            </Button>
            {isAuthModal && (
                <LoginModal
                    isOpen={isAuthModal}
                    onClose={onCloseModal}
                />
            )}
        </header>
    )
})
