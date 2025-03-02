import { screen } from '@testing-library/react'

import AppRouter from '../ui/AppRouter'
import { UserRole } from '@/entities/User'
import { getRouteAbout, getRouteAdmin, getRouteProfile } from '@/shared/const/router'
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender'

describe('app/router/AppRouter', () => {
    test('Страница должна отрендериться', async () => {
        componentRender(<AppRouter />, {
            route: getRouteAbout()
        })

        const page = await screen.findByTestId('AboutPage')
        expect(page).toBeInTheDocument()
    })

    test('Страница не найдена', async () => {
        componentRender(<AppRouter />, {
            route: '/asfasfasfasf'
        })

        const page = await screen.findByTestId('NotFoundPage')
        expect(page).toBeInTheDocument()
    })

    test('Редирект неавторизованного пользователя на главную', async () => {
        componentRender(<AppRouter />, {
            route: getRouteProfile('1')
        })

        const page = await screen.findByTestId('MainPage')
        expect(page).toBeInTheDocument()
    })

    test('Доступ и закрытой страницы для авторизаванного пользователя', async () => {
        componentRender(<AppRouter />, {
            route: getRouteProfile('1'),
            // eslint-disable-next-line
            // @ts-ignore
            initialState: {
                // @ts-expect-error
                user: { _inited: true, authData: {} }
            }
        })

        const page = await screen.findByTestId('ProfilePage')
        expect(page).toBeInTheDocument()
    })

    test('Доступ запрещен (отсутствует роль)', async () => {
        componentRender(<AppRouter />, {
            route: getRouteAdmin(),
            initialState: {
                // @ts-expect-error
                user: { _inited: true, authData: {} }
            }
        })

        const page = await screen.findByTestId('ForbiddenPage')
        expect(page).toBeInTheDocument()
    })

    test('Досутп запрещен (присутствует роль)', async () => {
        componentRender(<AppRouter />, {
            route: getRouteAdmin(),
            initialState: {
                // @ts-expect-error
                user: { _inited: true, authData: { roles: [UserRole.ADMIN] } }
            }
        })

        const page = await screen.findByTestId('AdminPanelPage')
        expect(page).toBeInTheDocument()
    })
})
