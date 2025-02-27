import { useTranslation } from 'react-i18next'

import cls from './ProfileCard.module.scss'

import { type Profile } from '../..'
import { CountrySelect } from '@/entities/Country'
import { type Country } from '@/entities/Country'
import { type Currency, CurrencySelect } from '@/entities/Currency'
import { classNames, type Mods } from '@/shared/lib/classNames/classNames'
import { Avatar } from '@/shared/ui/Avatar'
import { Input } from '@/shared/ui/Input'
import { Loader } from '@/shared/ui/loader'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Text, TextAlign, TextTheme } from '@/shared/ui/Text'

interface ProfileCardProps {
    className?: string
    data?: Profile
    isLoading?: boolean
    error?: string
    readonly?: boolean
    onChangeFirstName?: (value?: string) => void
    onChangeLastName?: (value?: string) => void
    onChangeCity?: (value?: string) => void
    onChangeAge?: (value?: string) => void
    onChangeUsername?: (value?: string) => void
    onChangeAvatar?: (value?: string) => void
    onChangeCurrency?: (currency: Currency) => void
    onChangeCountry?: (country: Country) => void
}

export const ProfileCard = (props: ProfileCardProps) => {
    const {
        className,
        data,
        isLoading,
        error,
        readonly,
        onChangeFirstName,
        onChangeLastName,
        onChangeCity,
        onChangeAge,
        onChangeUsername,
        onChangeAvatar,
        onChangeCurrency,
        onChangeCountry
    } = props

    const { t } = useTranslation('profile')

    const mods: Mods = {
        [cls.editing]: !readonly
    }

    if (isLoading) {
        return (
            <HStack
                max
                justify='center'
                className={classNames(cls.ProfileCard, { [cls.loading]: true }, [className])}
            >
                <Loader />
            </HStack>
        )
    }

    if (error) {
        return (
            <HStack
                max
                justify='center'
                className={classNames(cls.ProfileCard, {}, [className, cls.error])}
            >
                <Text
                    theme={TextTheme.ERROR}
                    align={TextAlign.CENTER}
                    title={t('Произошло ошибка при загрузка профиля')}
                    text={t('Попробуйте обновить страницу')}
                />
            </HStack>
        )
    }

    return (
        <VStack
            max
            gap='8'
            className={classNames(cls.ProfileCard, mods, [className])}
        >
            {data?.avatar && (
                <HStack
                    max
                    justify='center'
                >
                    <Avatar
                        src={data.avatar}
                        alt={data.first}
                    />
                </HStack>
            )}
            <Input
                value={data?.first}
                placeholder={t('Ваше имя')}
                className={cls.input}
                onChange={onChangeFirstName}
                readonly={readonly}
                data-testid='ProfileCard.firstname'
            />
            <Input
                value={data?.lastname}
                placeholder={t('Ваша фамилия')}
                className={cls.input}
                onChange={onChangeLastName}
                readonly={readonly}
                data-testid='ProfileCard.lastname'
            />
            <Input
                type='number'
                value={data?.age}
                placeholder={t('Ваш возраст')}
                className={cls.input}
                onChange={onChangeAge}
                readonly={readonly}
            />
            <Input
                value={data?.city}
                placeholder={t('Город')}
                className={cls.input}
                onChange={onChangeCity}
                readonly={readonly}
            />
            <Input
                value={data?.username}
                placeholder={t('Введите имя пользователя')}
                className={cls.input}
                onChange={onChangeUsername}
                readonly={readonly}
            />
            <Input
                value={data?.avatar}
                placeholder={t('Введите ссылку на аватар')}
                className={cls.input}
                onChange={onChangeAvatar}
                readonly={readonly}
            />
            <CurrencySelect
                className={cls.input}
                value={data?.currency}
                onChange={onChangeCurrency}
                readonly={readonly}
            />
            <CountrySelect
                className={cls.input}
                value={data?.country}
                onChange={onChangeCountry}
                readonly={readonly}
            />
        </VStack>
    )
}
