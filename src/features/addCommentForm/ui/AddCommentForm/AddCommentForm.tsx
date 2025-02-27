import { memo, useCallback } from 'react'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import cls from './AddCommentForm.module.scss'

import {
    getAddCommentFormText
} from '../../model/selectors/addCommentFormSelectors'
import { addCommentFormActions, addCommentFormReducer } from '../../model/slice/addCommentFormSlice'
import { classNames } from '@/shared/lib/classNames/classNames'
import { DynamicModuleLoader, type ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { HStack } from '@/shared/ui/Stack'

export interface AddCommentFormProps {
    className?: string
    onSendComment: (text: string) => void
}

const reducers: ReducersList = {
    addCommentForm: addCommentFormReducer
}

const addCommentForm = memo((props: AddCommentFormProps) => {
    const {
        className,
        onSendComment
    } = props

    const dispatch = useAppDispatch()
    const { t } = useTranslation()
    const text = useSelector(getAddCommentFormText)

    const onCommentTextChange = useCallback((value: string) => {
        dispatch(addCommentFormActions.setText(value))
    }, [dispatch])

    const onSendHandler = useCallback(() => {
        onSendComment(text || '')
        onCommentTextChange('')
    }, [onSendComment, text, onCommentTextChange])

    return (
        <DynamicModuleLoader reducers={reducers}>
            <HStack
                max
                justify='between'
                className={classNames(cls.addCommentForm, {}, [className])}
            >
                <Input
                    className={cls.input}
                    placeholder={t('Введите текст комментарии')}
                    value={text}
                    onChange={onCommentTextChange}
                />
                <Button
                    disabled={Boolean(!text.trim().length)}
                    theme={ButtonTheme.OUTLINE}
                    onClick={onSendHandler}
                    type="submit"
                >
                    {t('Отправить')}
                </Button>
            </HStack>
        </DynamicModuleLoader>
    )
})

export default addCommentForm
