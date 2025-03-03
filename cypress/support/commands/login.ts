import { USER_LOCAL_STORAGE_KEY } from '../../../src/shared/const/localStorage'

export const login = (
    username: string = 'testuser',
    password: string = '123'
) => {
    return cy
        .request({
            method: 'POST',
            url: 'http://localhost:8000/login',
            body: {
                username,
                password
            }
        })
        .then(({ body }) => {
            window.localStorage.setItem(
                USER_LOCAL_STORAGE_KEY,
                JSON.stringify(body)
            )
            return body
        })
}
