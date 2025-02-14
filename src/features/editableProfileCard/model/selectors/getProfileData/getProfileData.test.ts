import { type StateSchema } from 'app/providers/StoreProvider'
import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'

import { getProfileData } from './getProfileData'

describe('getProfileData.test', () => {
    test('should return error', () => {
        const data = {
            first: 'Нурболот',
            lastName: 'Бердибеков',
            age: 22,
            currency: Currency.KGZ,
            country: Country.Kyrgyzstan,
            city: 'Bishkek',
            username: 'admin'
        }
        const state: DeepPartial<StateSchema> = {
            // @ts-expect-error
            profile: {
                data
            }
        }
        expect(getProfileData(state as StateSchema)).toEqual(data)
    })
    test('should work with empty state', () => {
        // @ts-expect-error
        const state: DeepPartial<StateSchema> = {}
        expect(getProfileData(state as StateSchema)).toEqual(undefined)
    })
})
