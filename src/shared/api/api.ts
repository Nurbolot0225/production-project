import axios, { type AxiosRequestConfig } from 'axios'
import { USER_LOCAL_STORAGE_KEY } from 'shared/const/localStorage'

export const $api = axios.create({
    baseURL: __API__
})

$api.interceptors.request.use((config: AxiosRequestConfig) => {
    if (config.headers) {
        config.headers.Authorization = localStorage.getItem(USER_LOCAL_STORAGE_KEY) || ''
    }
    return config
})
