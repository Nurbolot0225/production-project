import { type ReactNode } from 'react'

import cls from './Modal.module.scss'

import { Overlay } from '../Overlay/Overlay'
import { Portal } from '../Portal/Portal'
import { classNames, type Mods } from '@/shared/lib/classNames/classNames'
import { useModal } from '@/shared/lib/hooks/useModal/useModal'
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme'

interface ModalProps {
    className?: string
    children?: ReactNode
    isOpen?: boolean
    onClose?: () => void
    lazy?: boolean
}

const ANIMATION_DELAY = 300

export const Modal = (props: ModalProps) => {
    const {
        className,
        children,
        isOpen,
        lazy,
        onClose
    } = props
    const { theme } = useTheme()
    const {
        isClosing,
        isMounted,
        close
    } = useModal({
        animationDelay: ANIMATION_DELAY,
        onClose,
        isOpen
    })

    const mods: Mods = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing
    }

    if (lazy && !isMounted) {
        return null
    }

    return (
        <Portal>
            <div className={classNames(cls.Modal, mods, [className, theme, 'app_modal'])}>
                <Overlay onClick={close}/>
                <div className={cls.content}>
                    {children}
                </div>
            </div>
        </Portal>
    )
}
