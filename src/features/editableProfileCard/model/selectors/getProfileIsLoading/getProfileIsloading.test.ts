import { getProfileIsLoading } from './getProfileIsLoading'

import { type StateSchema } from '@/app/providers/StoreProvider'

describe('getProfileIsLoading.test', () => {
    test('should work with filled state', () => {
        const state: DeepPartial<StateSchema> = {
            // @ts-expect-error
            profile: {
                isLoading: true
            }
        }
        expect(getProfileIsLoading(state as StateSchema)).toEqual(true)
    })
    test('should work with empty state', () => {
        // @ts-expect-error
        const state: DeepPartial<StateSchema> = {}
        expect(getProfileIsLoading(state as StateSchema)).toEqual(undefined)
    })
})
