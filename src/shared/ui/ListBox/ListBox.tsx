import { Fragment, type ReactNode } from 'react'

import { Listbox as HListBox } from '@headlessui/react'
import CheckIcon from 'shared/assets/icons/check.svg'
import { classNames, type Mods } from 'shared/lib/classNames/classNames'
import { type DropdownDirection } from 'shared/types/ui'

import cls from './ListBox.module.scss'

import { Button } from '../Button/Button'
import { HStack } from '../Stack'

export interface ListBoxItem {
    value: string
    content: ReactNode
    disabled?: boolean
}

interface ListBoxProps {
    items?: ListBoxItem[]
    className?: string
    value?: string
    defaultValue?: string
    onChange: (value: string) => void
    readonly?: boolean
    direction?: DropdownDirection
    label?: string
}

const mapDirectionClass: Record<DropdownDirection, string> = {
    'bottom left': cls.optionsBottomLeft,
    'bottom right': cls.optionsBottomRight,
    'top right': cls.optionsTopRight,
    'top left': cls.optionsTopLeft
}

export function ListBox (props: ListBoxProps) {
    const {
        className,
        items,
        value,
        defaultValue,
        onChange,
        readonly,
        direction = 'bottom right',
        label
    } = props

    const optionsClasses = [mapDirectionClass[direction]]

    const mods: Mods = {
        [cls.readonly]: readonly
    }

    return (
        <HStack gap='4' className={classNames('', mods, [])}>
            {label && <span aria-disabled={readonly} >{`${label}>`}</span>}
            <HListBox
                disabled={readonly}
                as='div'
                className={classNames(cls.ListBox, {}, [className])}
                value={value}
                onChange={onChange}
            >
                <HListBox.Button disabled={readonly} className={cls.trigger}>
                    <Button disabled={readonly}>
                        {value ?? defaultValue}
                    </Button>
                </HListBox.Button>
                <HListBox.Options className={classNames(cls.options, {}, optionsClasses)}>
                    {items?.map((item) => (
                        <HListBox.Option
                            key={item.value}
                            value={item.value}
                            disabled={item.disabled}
                            as={Fragment}
                        >
                            {({ active, selected }) => (
                                <li
                                    className={classNames(
                                        cls.item,
                                        {
                                            [cls.active]: active,
                                            [cls.disabled]: item.disabled
                                        }
                                    )}
                                >
                                    {selected && <CheckIcon />}
                                    {item.content}
                                </li>
                            )}
                        </HListBox.Option>
                    ))}
                </HListBox.Options>
            </HListBox>
        </HStack>
    )
}
