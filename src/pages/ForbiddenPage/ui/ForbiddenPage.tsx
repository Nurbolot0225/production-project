import { useTranslation } from 'react-i18next'

import { Page } from '@/widgets/Page/Page'

const ForbiddenPage = () => {
    const { t } = useTranslation()

    return (
        <Page>
            {t('Forbidden')}
        </Page>
    )
}

export default ForbiddenPage
