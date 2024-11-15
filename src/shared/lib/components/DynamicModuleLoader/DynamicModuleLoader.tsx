import { type FC, useEffect } from 'react'

import { type Reducer } from '@reduxjs/toolkit'
import type { ReduxStoreWithManager, StateSchemaKey } from 'app/providers/StoreProvider/config/StateSchema'
import { useDispatch, useStore } from 'react-redux'

export type ReducerList = {
    [name in StateSchemaKey]?: Reducer
}

interface DynamicModuleLoaderProps {
    reducers: ReducerList
    removeAfterUnmount?: boolean
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
    const {
        children,
        reducers,
        removeAfterUnmount
    } = props
    const store = useStore() as ReduxStoreWithManager
    const dispatch = useDispatch()

    useEffect(() => {
        Object.entries(reducers).forEach(([name, reducer]) => {
            store.reducerManager.add(name as StateSchemaKey, reducer)
            dispatch({ type: `@INIT ${name} reducer` })
        })
        return () => {
            if (removeAfterUnmount) {
                Object.entries(reducers).forEach(([name]) => {
                    store.reducerManager.remove(name as StateSchemaKey)
                    dispatch({ type: `@DESTROY ${name} reducer` })
                })
            }
        }
        // eslint-disable-next-line
    }, [])

    return (
        <>
            {children}
        </>
    )
}
