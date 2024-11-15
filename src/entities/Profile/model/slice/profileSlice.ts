import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { fetchProfileData, type Profile } from 'entities/Profile'

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
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfileData.pending, (state) => {
                state.error = undefined
                state.isLoading = true
            })
            .addCase(fetchProfileData.fulfilled, (state, action: PayloadAction<Profile>) => {
                state.isLoading = false
                state.data = action.payload
            })
            .addCase(fetchProfileData.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    }
})

export const { actions: profileActions } = profileSlice
export const { reducer: profileReducer } = profileSlice
