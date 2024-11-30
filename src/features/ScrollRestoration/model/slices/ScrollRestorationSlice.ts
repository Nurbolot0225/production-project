import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type ScrollRestorationSchema } from 'features/ScrollRestoration'

export const initialState: ScrollRestorationSchema = {
    scroll: {}
}

export const scrollRestorationSlice = createSlice({
    name: 'ScrollRestorationSlice',
    initialState,
    reducers: {
        setScrollPosition: (state, { payload }: PayloadAction<{ path: string, position: number }>) => {
            state.scroll[payload.path] = payload.position
        }
    }
})

export const { actions: scrollRestorationActions } = scrollRestorationSlice
export const { reducer: scrollRestorationReducer } = scrollRestorationSlice
