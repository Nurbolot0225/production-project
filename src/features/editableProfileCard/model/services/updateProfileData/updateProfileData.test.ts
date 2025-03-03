import { updateProfileData } from './updateProfileData'

import { ValidateProfileError } from '../../constants/constants'
import { Country } from '@/entities/Country'
import { Currency } from '@/entities/Currency'
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk'

const data = {
    id: '1',
    first: 'Нурболот',
    lastName: 'Бердибеков',
    age: 22,
    currency: Currency.KGZ,
    city: 'Bishkek',
    country: Country.Kyrgyzstan,
    username: 'admin',
    lastname: 'Berdibekov'
}

describe('updateProfileData.test', () => {
    test('success', async () => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            // @ts-expect-error
            profile: {
                form: data
            }
        })

        thunk.api.put.mockReturnValue(Promise.resolve({ data }))

        const result = await thunk.callThunk()

        // eslint-disable-next-line
        expect(thunk.api.put).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(data)
    })

    test('error', async () => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            // @ts-expect-error
            profile: {
                form: data
            }
        })
        thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }))

        const result = await thunk.callThunk()

        expect(result.meta.requestStatus).toBe('rejected')
        expect(result.payload).toEqual([
            ValidateProfileError.SERVER_ERROR
        ])
    })

    test('validate error', async () => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            // @ts-expect-error
            profile: {
                form: { ...data, lastname: '' }
            }
        })
        const result = await thunk.callThunk()

        expect(result.meta.requestStatus).toBe('rejected')
        expect(result.payload).toEqual([
            ValidateProfileError.INCORRECT_USER_DATA
        ])
    })
})
