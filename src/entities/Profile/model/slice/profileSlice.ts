import { createSlice } from '@reduxjs/toolkit'

import { type ProfileSchema } from '../types/Profile'

const initialState: ProfileSchema = {
    isLoading: false,
    readonly: true,
    error: undefined,
    data: undefined
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {

    }
})

export const { actions: profileActions } = profileSlice
export const { reducer: profileReducer } = profileSlice
