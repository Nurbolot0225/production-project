import { memo, useCallback } from 'react'

import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import EyeIcon from 'shared/assets/icons/eye.svg'
import { RoutePath } from 'shared/config/routerConifg/routeConfig'
import { classNames } from 'shared/lib/classNames/classNames'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import { Button } from 'shared/ui/Button/Button'
import { Card } from 'shared/ui/Card/Card'
import { Icon } from 'shared/ui/Icon/Icon'
import { Text } from 'shared/ui/Text/Text'

import cls from './ArticleListItem.module.scss'

import { type Article, ArticleBlockType, type ArticleTextBlock, ArticleView } from '../../model/types/article'
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent'

interface ArticleListItemProps {
    className?: string
    article: Article
    view: ArticleView
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
    const {
        className,
        article,
        view
    } = props

    const { t } = useTranslation()
    const navigate = useNavigate()

    const onOpenArticle = useCallback(() => {
        navigate(`${RoutePath.article_details}${article.id}`)
    }, [navigate, article.id])

    const types = <Text text={article.type.join(', ')} className={cls.types} />
    const views = (
        <>
            <Text text={String(article.views)} className={cls.views}/>
            <Icon Svg={EyeIcon}/>
        </>
    )

    if (view === ArticleView.BIG) {
        const textBlock = article.blocks.find(
            block => block.type === ArticleBlockType.TEXT
        ) as ArticleTextBlock
        return (
            <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
                <Card className={cls.card}>
                    <div className={cls.header}>
                        <Avatar size={30} src={article.user.avatar}/>
                        <Text text={article.user.username} className={cls.username}/>
                        <Text text={article.createdAt} className={cls.date}/>
                    </div>
                    <Text text={String(article.title)} className={cls.title}/>
                    {types}
                    <img src={article.img} alt={article.title} className={cls.img} />
                    {textBlock && (
                        <ArticleTextBlockComponent block={textBlock} className={cls.textBlock} />
                    )}
                    <div className={cls.footer}>
                        <Button
                            onClick={onOpenArticle}
                        >
                            {t('Читать далее')}
                        </Button>
                        {views}
                    </div>
                </Card>
            </div>
        )
    }

    return (
        <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
            <Card className={cls.card} onClick={onOpenArticle}>
                <div className={cls.imageWrapper}>
                    <img src={article.img} alt={article.title} className={cls.img}/>
                    <Text text={article.createdAt} className={cls.date}/>
                </div>
                <div className={cls.infoWrapper}>
                    {types}
                    {views}
                </div>
                <Text text={article.title} className={cls.title}/>
            </Card>
        </div>
    )
})
