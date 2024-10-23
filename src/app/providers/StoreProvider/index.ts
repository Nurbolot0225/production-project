import type { ReduxStoreWithManager, StateSchema, ThunkConfig } from './config/StateSchema'
import { type AppDispatch, createReduxStore } from './config/store'
import { StoreProvider } from './ui/StoreProvider'

export {
    StoreProvider,
    createReduxStore,
    type StateSchema,
    type ReduxStoreWithManager,
    type AppDispatch,
    type ThunkConfig
}
