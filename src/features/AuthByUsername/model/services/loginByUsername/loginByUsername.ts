import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { type User, userActions } from 'entities/User'
import { USER_LOCAL_STORAGE_KEY } from 'shared/const/localStorage'

interface LoginByUsernameProps {
    username: string
    password: string
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, { rejectValue: string }>(
    'LoginByUsername',
    async (authData, thunkAPI) => {
        try {
            const response = await axios.post<User>('http://localhost:8000/login', authData)

            if (!response.data) {
                throw new Error()
            }

            localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(response.data))
            thunkAPI.dispatch(userActions.setAuthData(response.data))

            return response.data
        } catch (e) {
            console.error(e)
            return thunkAPI.rejectWithValue('error')
        }
    }
)
