import { useCallback } from 'react'

import { getProfileData, getProfileReadOnly, profileActions, updateProfileData } from 'entities/Profile'
import { getUserAuthData } from 'entities/User'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { classNames } from 'shared/lib/classNames/classNames'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { HStack } from 'shared/ui/Stack'
import { Text } from 'shared/ui/Text/Text'

interface ProfilePageHeaderProps {
    className?: string
}

export const ProfilePageHeader = ({ className }: ProfilePageHeaderProps) => {
    const dispatch = useAppDispatch()
    const readonly = useSelector(getProfileReadOnly)
    const authData = useSelector(getUserAuthData)
    const profileData = useSelector(getProfileData)
    const { t } = useTranslation('profile')
    const canEdit = authData?.id === profileData?.id

    const onEdit = useCallback(() => {
        dispatch(profileActions.setReadonly(false))
    }, [dispatch])

    const onCancelEdit = useCallback(() => {
        dispatch(profileActions.cancelEdit())
    }, [dispatch])

    const onSave = useCallback(() => {
        dispatch(updateProfileData())
    }, [dispatch])

    return (
        <HStack
            max
            justify='between'
            className={classNames('', {}, [className])}
        >
            <Text
                title={t('Профиль')}
            />
            {canEdit && (
                <>
                    {readonly
                        ? (
                            <Button
                                theme={ButtonTheme.OUTLINE}
                                onClick={onEdit}
                            >
                                {t('Редактировать')}
                            </Button>
                        )
                        : (
                            <HStack gap='8'>
                                <Button
                                    theme={ButtonTheme.OUTLINE_RED}
                                    onClick={onCancelEdit}
                                >
                                    {t('Отменить')}
                                </Button>
                                <Button
                                    theme={ButtonTheme.OUTLINE}
                                    onClick={onSave}
                                >
                                    {t('Сохранить')}
                                </Button>
                            </HStack>
                        )}
                </>
            )}
        </HStack>
    )
}
