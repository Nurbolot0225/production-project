import { memo, type MutableRefObject, type ReactNode, type UIEvent, useRef } from 'react'

import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import cls from './Page.module.scss'

import { type StateSchema } from '@/app/providers/StoreProvider'
import { getUIScrollByPath, uiActions } from '@/features/UI'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll'
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect'
import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle'

interface PageProps {
    className?: string
    children: ReactNode
    onScrollEnd?: () => void
}

export const Page = memo((props: PageProps) => {
    const {
        className,
        children,
        onScrollEnd
    } = props

    const dispatch = useAppDispatch()
    const { pathname } = useLocation()
    const scrollPosition = useSelector(
        (state: StateSchema) => getUIScrollByPath(state, pathname)
    )

    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>

    const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
        dispatch(uiActions.setScrollPosition({
            position: e.currentTarget.scrollTop,
            path: pathname
        }))
    }, 500)

    useInfiniteScroll({
        triggerRef,
        wrapperRef,
        callback: onScrollEnd
    })

    useInitialEffect(() => {
        wrapperRef.current.scrollTop = scrollPosition
    })

    return (
        <main
            ref={wrapperRef}
            className={classNames(cls.Page, {}, [className])}
            onScroll={onScroll}
        >
            {children}
            {onScrollEnd && <div className={cls.trigger} ref={triggerRef}/>}
        </main>
    )
})
