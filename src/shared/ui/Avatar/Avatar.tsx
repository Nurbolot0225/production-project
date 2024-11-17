import { type CSSProperties, useMemo } from 'react'

import { classNames, type Mods } from 'shared/lib/classNames/classNames'

import cls from './Avatar.module.scss'

interface AvatarProps {
    className?: string
    src?: string
    alt?: string
    size?: string
}

export const Avatar = (props: AvatarProps) => {
    const {
        className,
        src,
        alt,
        size
    } = props

    const mods: Mods = {}

    const styles = useMemo<CSSProperties>(() => {
        return {
            width: size || 100,
            height: size || 100
        }
    }, [size])

    return (
        <img
            className={classNames(cls.Avatar, mods, [className])}
            src={src}
            style={styles}
            alt={alt}
        />
    )
}
