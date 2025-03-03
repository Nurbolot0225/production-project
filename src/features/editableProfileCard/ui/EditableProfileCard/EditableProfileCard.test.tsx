import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { EditableProfileCard } from './EditableProfileCard'

import { profileReducer } from '../../model/slice/profileSlice'
import { Country } from '@/entities/Country'
import { Currency } from '@/entities/Currency'
import { Profile } from '@/entities/Profile'
import { $api } from '@/shared/api/api'
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender'

const profile: Profile = {
    id: '1',
    first: 'admin',
    lastname: 'admin',
    age: 22,
    currency: Currency.KGZ,
    country: Country.Kyrgyzstan,
    city: 'Bishkek',
    username: 'admin213'
}

const options = {
    initialState: {
        profile: {
            readonly: true,
            data: profile,
            form: profile
        },
        user: {
            authData: { id: '1', username: 'admin' }
        }
    },
    asyncReducers: {
        profile: profileReducer
    }
}

describe('features/EditableProfileCard', () => {
    test('Режим редактирование должен переключиться', async () => {
        // @ts-expect-error
        componentRender(<EditableProfileCard id='1' />, options)
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'))
        expect(screen.getByTestId('EditableProfileCardHeader.CancelButton')).toBeInTheDocument()
    })

    test('При отмене значения должны обнуляться', async () => {
        // @ts-expect-error
        componentRender(<EditableProfileCard id='1' />, options)
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'))

        await userEvent.clear(screen.getByTestId('ProfileCard.firstname'))
        await userEvent.clear(screen.getByTestId('ProfileCard.lastname'))

        await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user')
        await userEvent.type(screen.getByTestId('ProfileCard.lastname'), 'user')

        expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('user')
        expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('user')

        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.CancelButton'))

        expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('admin')
        expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('admin')
    })

    test('Должна появиться ошибка', async () => {
        // @ts-expect-error
        componentRender(<EditableProfileCard id='1' />, options)
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'))

        await userEvent.clear(screen.getByTestId('ProfileCard.firstname'))

        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'))

        expect(screen.getByTestId('EditableProfileCard.Error.Paragraph')).toBeInTheDocument()
    })

    test('Если нет ошибок валидации, то на сервер должен уйти PUT запрос', async () => {
        const mockPutReq = jest.spyOn($api, 'put')
        // @ts-expect-error
        componentRender(<EditableProfileCard id='1' />, options)
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'))

        await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user')

        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'))

        expect(mockPutReq).toHaveBeenCalled()
    })
})
