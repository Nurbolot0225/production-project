import { type Country, type Currency } from 'shared/const/common'

export interface Profile {
    first: string
    lastName: string
    age: number
    currency: Currency
    city: Country
    country: 'KYRGYZSTAN'
    username: string
    avatar: string
}

export interface ProfileSchema {
    data?: Profile
    isLoading: boolean
    error?: string
    readonly?: boolean
}
