import { useTranslation } from 'react-i18next'

import { RatingCard } from '@/entities/Rating'
import { Page } from '@/widgets/Page/Page'

const MainPage = () => {
    const { t } = useTranslation('main')

    return (
        <Page>
            {t('Главная страница')}
            <RatingCard />
        </Page>
    )
}

export default MainPage
