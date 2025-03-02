import { selectByTestId } from '../helpers/selectByTestId'

describe('Роутинг', () => {
    describe('Пользователь не авторизован', () => {
        it('Переход на главную страницу', () => {
            cy.visit('/')
            cy.get(selectByTestId('MainPage')).should('exist')
        })

        it('Переход открывыет страницу профиля', () => {
            cy.visit('/profile/1')
            cy.get(selectByTestId('MainPage')).should('exist')
        })

        it('Переход открывыет страницу профиля', () => {
            cy.visit('/pepepa')
            cy.get(selectByTestId('NotFoundPage')).should('exist')
        })
    })

    describe('Пользователь авторизован', () => {
        beforeEach(() => {
            cy.login('testuser', '123')
        })

        it('Переход открывыет страницу профиля', () => {
            cy.visit('/profile/4')
            cy.get(selectByTestId('ProfilePage')).should('exist')
        })

        it('Переход открывыет страницу профиля', () => {
            cy.visit('/articles')
            cy.get(selectByTestId('ArticlesPage')).should('exist')
        })
    })
})
