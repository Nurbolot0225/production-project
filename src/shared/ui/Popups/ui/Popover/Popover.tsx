import { type ReactNode } from 'react'

import { Popover as HPopover } from '@headlessui/react'

import cls from './Popover.module.scss'

import type { DropdownDirection } from '../../../../types/ui'
import popupCls from '../../styles/popup.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { mapDirectionClass } from '@/shared/ui/Popups/styles/constant'

interface PopoverProps {
    className?: string
    direction?: DropdownDirection
    trigger: ReactNode
    children: ReactNode
}

export const Popover = (props: PopoverProps) => {
    const {
        className,
        direction = 'bottom right',
        trigger,
        children
    } = props

    const menuClasses = [mapDirectionClass[direction]]

    return (
        <HPopover className={classNames('', {}, [className, popupCls.popup])}>
            <HPopover.Button as='div' className={popupCls.trigger}>
                {trigger}
            </HPopover.Button>

            <HPopover.Panel
                className={classNames(cls.panel, {}, menuClasses)}
            >
                {children}
            </HPopover.Panel>
        </HPopover>
    )
}
