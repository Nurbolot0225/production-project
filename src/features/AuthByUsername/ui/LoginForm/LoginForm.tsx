import { memo, useCallback } from 'react'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import cls from './LoginForm.module.scss'

import { getLoginError } from '../../model/selectors/getLoginError/getLoginError'
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading'
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword'
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername'
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername'
import { loginActions, loginReducer } from '../../model/slice/loginSlice'
import { classNames } from '@/shared/lib/classNames/classNames'
import { DynamicModuleLoader, type ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { Text, TextTheme } from '@/shared/ui/Text'

export interface LoginFormProps {
    className?: string
    onSuccess: () => void
}

const initialReducers: ReducersList = {
    loginForm: loginReducer
}

const LoginForm = ({ className, onSuccess }: LoginFormProps) => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const username = useSelector(getLoginUsername)
    const password = useSelector(getLoginPassword)
    const isLoading = useSelector(getLoginIsLoading)
    const error = useSelector(getLoginError)

    const onChangeUsername = useCallback((value: string) => {
        dispatch(loginActions.setUsername(value))
    }, [dispatch])

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value))
    }, [dispatch])

    const onLoginClick = useCallback(async () => {
        const resultAction = await dispatch(loginByUsername({ username, password }))
        if (resultAction.meta.requestStatus === 'fulfilled') {
            onSuccess()
        }
    }, [dispatch, username, password, onSuccess])

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <form className={classNames(cls.LoginForm, {}, [className])}>
                <Text title={t('Форма авторизации')}/>
                {error && <Text text={t('Вы ввели неверный логин или пароль')} theme={TextTheme.ERROR}/>}
                <Input
                    autofocus
                    type="text"
                    className={cls.input}
                    placeholder={t('Введите логин')}
                    value={username}
                    onChange={onChangeUsername}
                />
                <Input
                    type="password"
                    className={cls.input}
                    placeholder={t('Введите пароль')}
                    value={password}
                    onChange={onChangePassword}
                />
                <Button
                    type="submit"
                    disabled={isLoading}
                    className={cls.loginBtn}
                    theme={ButtonTheme.OUTLINE}
                    // eslint-disable-next-line
                    onClick={onLoginClick}
                >
                    {t('Войти')}
                </Button>
            </form>
        </DynamicModuleLoader>
    )
}

export default memo(LoginForm)
