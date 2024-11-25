import { memo } from 'react'

import { classNames } from 'shared/lib/classNames/classNames'
import { Text, TextAlign } from 'shared/ui/Text/Text'

import cls from './ArticleImageBlockComponent.module.scss'

import { type ArticleImageBlock } from '../../model/types/article'

interface ArticleImageBlockComponentProps {
    className?: string
    block: ArticleImageBlock
}

export const ArticleImageBlockComponent = memo((props: ArticleImageBlockComponentProps) => {
    const {
        className,
        block
    } = props

    return (
        <div className={classNames(cls.ArticleImageBlockComponent, {}, [className])}>
            <img
                className={cls.img}
                src={block.src}
                alt={block.title}
            />
            {block.title && (
                <Text
                    align={TextAlign.CENTER}
                    text={block.title}
                />
            )}
        </div>
    )
})
