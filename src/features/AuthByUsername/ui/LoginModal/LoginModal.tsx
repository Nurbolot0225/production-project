import { Suspense } from 'react'

import { LoginFormAsync } from '../LoginForm/LoginForm.async'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Loader } from '@/shared/ui/loader/Loader'
import { Modal } from '@/shared/ui/Modal/Modal'

interface LoginModalProps {
    className?: string
    isOpen?: boolean
    onClose: () => void
}

export const LoginModal = ({ className, isOpen, onClose }: LoginModalProps) => {
    return (
        <Modal
            lazy
            className={classNames('', {}, [className])}
            isOpen={isOpen}
            onClose={onClose}
        >
            <Suspense fallback={<Loader />}>
                <LoginFormAsync onSuccess={onClose} />
            </Suspense>
        </Modal>
    )
}
