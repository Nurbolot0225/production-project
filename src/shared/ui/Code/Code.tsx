import { memo, useCallback } from 'react'

import cls from './Code.module.scss'

import { Button, ButtonTheme } from '../Button/Button'
import CopyIcon from '@/shared/assets/icons/copy.svg'
import { classNames } from '@/shared/lib/classNames/classNames'

interface CodeProps {
    className?: string
    text: string
}

export const Code = memo((props: CodeProps) => {
    const {
        className,
        text
    } = props

    const onCopy = useCallback(() => {
        navigator.clipboard.writeText(text)
    }, [text])

    return (
        <pre className={classNames(cls.Code, {}, [className])}>
            <Button
                theme={ButtonTheme.CLEAR}
                className={cls.copyBtn}
                onClick={onCopy}
            >
                <CopyIcon className={cls.copyIcon} />
            </Button>
            <code>
                {text}
            </code>
        </pre>
    )
})
