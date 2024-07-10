import { createSlice } from '@reduxjs/toolkit'

import { type UserSchema } from '../types/user'

const initialState: UserSchema = {}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        se: (state) => {
            state.authData.username += 1
        },
        decrement: (state) => {
            state.authData.username += 1
        }
    }
})

export const { actions: userActions } = userSlice
export const { reducer: userReducer } = userSlice
