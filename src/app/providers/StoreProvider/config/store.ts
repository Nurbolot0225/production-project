import { configureStore, type ReducersMapObject } from '@reduxjs/toolkit'
import { type CombinedState, type Reducer } from 'redux'

import { createReducerManager } from './reducerManager'
import { type StateSchema, type ThunkExtraArg } from './StateSchema'

import { userReducer } from '@/entities/User'
import { uiReducer } from '@/features/UI'
import { $api } from '@/shared/api/api'
import { rtkApi } from '@/shared/api/rtkApi'

export function createReduxStore (
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>
) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        user: userReducer,
        ui: uiReducer,
        [rtkApi.reducerPath]: rtkApi.reducer
    }

    const reducerManager = createReducerManager(rootReducers)

    const extraArg: ThunkExtraArg = {
        api: $api
    }

    const store = configureStore({
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            thunk: {
                extraArgument: extraArg
            }
        }).concat(rtkApi.middleware)
    })

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    store.reducerManager = reducerManager

    return store
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
