import { type Country } from 'entities/Country/model/types/country'
import { type Currency } from 'entities/Currency/model/types/currency'

export interface Profile {
    first?: string
    lastName?: string
    age?: number
    currency?: Currency
    country?: Country
    city?: string
    username?: string
    avatar?: string
}

export interface ProfileSchema {
    data?: Profile
    form?: Profile
    isLoading: boolean
    error?: string
    readonly: boolean
}
