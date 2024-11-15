import { type StateSchema } from 'app/providers/StoreProvider'

import { getLoginUsername } from './getLoginUsername'

describe('getLoginIsLoading.test', () => {
    test('should return value', () => {
        // @ts-expect-error
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                username: 'admin',
                password: '123123',
                isLoading: false
            }
        }
        expect(getLoginUsername(state as StateSchema)).toEqual('admin')
    })
    test('should work with empty state', () => {
        // @ts-expect-error
        const state: DeepPartial<StateSchema> = {}
        expect(getLoginUsername(state as StateSchema)).toEqual('')
    })
})
