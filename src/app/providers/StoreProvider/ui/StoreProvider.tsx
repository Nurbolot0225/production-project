import { type ReactNode } from 'react'

import { type ReducersMapObject } from '@reduxjs/toolkit'
import { type StateSchema } from 'app/providers/StoreProvider/config/StateSchema'
import { createReduxStore } from 'app/providers/StoreProvider/config/store'
import { Provider } from 'react-redux'
import { useNavigate } from 'react-router-dom'

interface StoreProviderProps {
    children?: ReactNode
    initialState?: DeepPartial<StateSchema>
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
}

export const StoreProvider = (props: StoreProviderProps) => {
    const {
        children,
        initialState,
        asyncReducers
    } = props

    const navigate = useNavigate()

    const store = createReduxStore(
        initialState as StateSchema,
        asyncReducers as ReducersMapObject<StateSchema>,
        navigate
    )

    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}
