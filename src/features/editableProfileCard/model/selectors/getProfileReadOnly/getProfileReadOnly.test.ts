import { getProfileReadOnly } from './getProfileReadOnly'

import { type StateSchema } from '@/app/providers/StoreProvider'

describe('getProfileReadonly.test', () => {
    test('should work with filled state', () => {
        const state: DeepPartial<StateSchema> = {
            // @ts-expect-error
            profile: {
                readonly: true
            }
        }
        expect(getProfileReadOnly(state as StateSchema)).toEqual(true)
    })
    test('should work with empty state', () => {
        // @ts-expect-error
        const state: DeepPartial<StateSchema> = {}
        expect(getProfileReadOnly(state as StateSchema)).toEqual(undefined)
    })
})
