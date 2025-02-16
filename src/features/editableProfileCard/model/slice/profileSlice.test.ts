import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'

import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData'
import { profileActions, profileReducer } from '../../model/slice/profileSlice'
import { ValidateProfileError } from '../constants/constants'
import { type ProfileSchema } from '../types/editableProfileCardSchema'

const data = {
    first: 'Нурболот',
    lastName: 'Бердибеков',
    age: 22,
    currency: Currency.KGZ,
    country: Country.Kyrgyzstan,
    city: 'Bishkek',
    username: 'admin'
}

describe('profileSlice.test', () => {
    test('test set readonly', () => {
        // @ts-expect-error
        const state: DeepPartial<ProfileSchema> = { readonly: false }
        expect(profileReducer(
            state as ProfileSchema,
            profileActions.setReadOnly(true)
        )).toEqual({ readonly: true })
    })

    test('test cancel edit', () => {
        // @ts-expect-error
        const state: DeepPartial<ProfileSchema> = { data, form: { username: '' } }

        expect(profileReducer(
            state as ProfileSchema,
            profileActions.cancelEdit()
        )).toEqual({
            readonly: true,
            validateErrors: undefined,
            data,
            form: data
        })
    })

    test('test update profile', () => {
        // @ts-expect-error
        const state: DeepPartial<ProfileSchema> = { form: { username: '123' } }

        expect(profileReducer(
            state as ProfileSchema,
            profileActions.updateProfile({
                username: '123456'
            })
        )).toEqual({
            form: { username: '123456' }
        })
    })

    test('test update profile service pending', () => {
        // @ts-expect-error
        const state: DeepPartial<ProfileSchema> = {
            isLoading: false,
            validateErrors: [ValidateProfileError.SERVER_ERROR]
        }

        expect(profileReducer(
            state as ProfileSchema,
            updateProfileData.pending
        )).toEqual({
            isLoading: true,
            validateErrors: undefined
        })
    })

    test('test update profile service fulfilled', () => {
        // @ts-expect-error
        const state: DeepPartial<ProfileSchema> = {
            isLoading: true
        }

        expect(profileReducer(
            state as ProfileSchema,
            updateProfileData.fulfilled(data, '')
        )).toEqual({
            isLoading: false,
            validateErrors: undefined,
            readonly: true,
            validateError: undefined,
            form: data,
            data
        })
    })
})
