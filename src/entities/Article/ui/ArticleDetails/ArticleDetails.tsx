import { memo, useCallback, useEffect } from 'react'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import cls from './ArticleDetails.module.scss'

import { ArticleBlockType } from '../../model/constants/articleConstants'
import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading
} from '../../model/selectors/getArticleDetails'
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById'
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice'
import { type ArticleBlock } from '../../model/types/article'
import { ArticleCodeBlockComponent } from '../ArticleICodeBlockComponent/ArticleCodeBlockComponent'
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent'
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent'
import CalendarIcon from '@/shared/assets/icons/calendar.svg'
import EyeIcon from '@/shared/assets/icons/eye.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { DynamicModuleLoader, type ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Avatar } from '@/shared/ui/Avatar'
import { Icon } from '@/shared/ui/Icon'
import { Skeleton } from '@/shared/ui/Skeleton'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Text, TextAlign, TextSize, TextTheme } from '@/shared/ui/Text'

interface ArticleDetailsProps {
    className?: string
    id: string
}

const reducers: ReducersList = {
    articleDetails: articleDetailsReducer
}

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
    const {
        className,
        id
    } = props

    const { t } = useTranslation('article-details')
    const dispatch = useAppDispatch()
    const isLoading = useSelector(getArticleDetailsIsLoading)
    const article = useSelector(getArticleDetailsData)
    const error = useSelector(getArticleDetailsError)

    const renderBlock = useCallback((block: ArticleBlock) => {
        switch (block?.type) {
        case ArticleBlockType.CODE:
            return <ArticleCodeBlockComponent
                key={block.id}
                className={cls.block}
                block={block}
            />
        case ArticleBlockType.IMAGE:
            return <ArticleImageBlockComponent
                key={block.id}
                className={cls.block}
                block={block}
            />
        case ArticleBlockType.TEXT:
            return <ArticleTextBlockComponent
                key={block.id}
                className={cls.block}
                block={block}
            />
        default: return null
        }
    }, [])

    useEffect(() => {
        dispatch(fetchArticleById(id))
    }, [dispatch, id])

    let content

    if (isLoading) {
        content = (
            <>
                <Skeleton className={cls.avatar} width={200} height={200} border="50%" />
                <Skeleton className={cls.title} width={300} height={32} />
                <Skeleton className={cls.skeleton} width={600} height={24} />
                <Skeleton className={cls.skeleton} width="100%" height={200} />
                <Skeleton className={cls.skeleton} width="100%" height={200} />
            </>
        )
    } else if (error) {
        content = (
            <Text
                align={TextAlign.CENTER}
                theme={TextTheme.ERROR}
                title={t('Произошла ошибка при загрузке статьи')}
            />
        )
    } else {
        content = (
            <>
                <HStack
                    max
                    justify='center'
                    className={cls.avatarWrapper}>
                    <Avatar
                        size={200}
                        src={article?.img}
                        className={cls.avatar}
                    />
                </HStack>
                <VStack max gap='4'>
                    <Text
                        title={article?.title}
                        text={article?.subtitle}
                        size={TextSize.L}
                    />
                    <HStack gap='8'>
                        <Icon
                            Svg={EyeIcon}
                            className={cls.icon}
                        />
                        <Text
                            text={String(article?.views)}
                        />
                    </HStack>
                    <HStack gap='8'>
                        <Icon
                            Svg={CalendarIcon}
                            className={cls.icon}
                        />
                        <Text
                            text={article?.createdAt}
                        />
                    </HStack>
                </VStack>
                {article?.blocks.map(renderBlock)}
            </>
        )
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <VStack
                gap='16'
                className={classNames(cls.ArticleDetails, {}, [className])}
            >
                {content}
            </VStack>
        </DynamicModuleLoader>
    )
})
