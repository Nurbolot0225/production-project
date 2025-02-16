import { type Profile } from 'entities/Profile'

import { ValidateProfileError } from '../../model/constants/constants'

export interface ProfileSchema {
    data?: Profile
    form?: Profile
    isLoading: boolean
    error?: string
    readonly: boolean
    validateErrors?: ValidateProfileError[]
}
