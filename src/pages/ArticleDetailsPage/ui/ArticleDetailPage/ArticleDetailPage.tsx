import { memo } from 'react'

import { ArticleDetails } from 'entities/Article'
import { ArticleRecommendationList } from 'features/articleRecommendationList'
import { articleDetailsPageReducer } from 'pages/ArticleDetailsPage/model/slices'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { classNames } from 'shared/lib/classNames/classNames'
import { DynamicModuleLoader, type ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { VStack } from 'shared/ui/Stack'
import { Page } from 'widgets/Page/Page'

import cls from './ArticleDetailPage.module.scss'

import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { ArticleDetailsComments } from '../../ui/ArticleDetailsComments/ArticleDetailsComments'
import {
    ArticlesDetailsPageHeader
} from '../../ui/ArticlesDetailsPageHeader/ArticlesDetailsPageHeader'

interface ArticleDetailPageProps {
    className?: string
}

const reducers: ReducersList = {
    articleDetailsPage: articleDetailsPageReducer
}

const ArticleDetailPage = ({ className }: ArticleDetailPageProps) => {
    const { id } = useParams<{ id: string }>()
    const { t } = useTranslation('article-details')
    const dispatch = useAppDispatch()

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id))
    })

    if (!id) {
        return (
            <Page className={classNames(cls.ArticleDetailPage, {}, [className])}>
                {t('Статья не найдена')}
            </Page>
        )
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Page className={classNames(cls.ArticleDetailPage, {}, [className])}>
                <VStack max gap='16'>
                    <ArticlesDetailsPageHeader />
                    <ArticleDetails id={id} />
                    <ArticleRecommendationList />
                    <ArticleDetailsComments id={id} />
                </VStack>
            </Page>
        </DynamicModuleLoader>
    )
}

export default memo(ArticleDetailPage)
