import { type StateSchema } from 'app/providers/StoreProvider'

import { getLoginError } from './getLoginError'

describe('getLoginError.test', () => {
    test('should return error', () => {
        const state: DeepPartial<StateSchema> = {
            // @ts-expect-error
            loginForm: {
                error: 'error'
            }
        }
        expect(getLoginError(state as StateSchema)).toEqual('error')
    })
    test('should work with empty state', () => {
        // @ts-expect-error
        const state: DeepPartial<StateSchema> = {}
        expect(getLoginError(state as StateSchema)).toEqual(undefined)
    })
})
