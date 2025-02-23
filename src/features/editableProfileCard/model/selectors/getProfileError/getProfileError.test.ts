import { getProfileError } from './getProfileError'

import { type StateSchema } from '@/app/providers/StoreProvider'

describe('getProfileError.test', () => {
    test('should return error', () => {
        const state: DeepPartial<StateSchema> = {
            // @ts-expect-error
            profile: {
                error: '123'
            }
        }
        expect(getProfileError(state as StateSchema)).toEqual('123')
    })
    test('should work with empty state', () => {
        // @ts-expect-error
        const state: DeepPartial<StateSchema> = {}
        expect(getProfileError(state as StateSchema)).toEqual(undefined)
    })
})
