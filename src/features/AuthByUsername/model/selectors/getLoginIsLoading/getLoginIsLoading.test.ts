import { getLoginIsLoading } from './getLoginIsLoading'

import { type StateSchema } from '@/app/providers/StoreProvider'

describe('getLoginIsLoading.test', () => {
    test('should return true', () => {
        const state: DeepPartial<StateSchema> = {
            // @ts-expect-error
            loginForm: {
                isLoading: true
            }
        }
        expect(getLoginIsLoading(state as StateSchema)).toEqual(true)
    })
    test('should work with empty state', () => {
        // @ts-expect-error
        const state: DeepPartial<StateSchema> = {}
        expect(getLoginIsLoading(state as StateSchema)).toEqual(false)
    })
})
