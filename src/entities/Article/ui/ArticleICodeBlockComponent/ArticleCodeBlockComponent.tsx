import { memo } from 'react'

import cls from './ArticleCodeBlockComponent.module.scss'

import { type ArticleCodeBlock } from '../../model/types/article'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Code } from '@/shared/ui/Code/Code'

interface ArticleCodeBlockComponentProps {
    className?: string
    block: ArticleCodeBlock
}

export const ArticleCodeBlockComponent = memo((props: ArticleCodeBlockComponentProps) => {
    const {
        className,
        block
    } = props

    return (
        <div className={classNames(cls.ArticleImageBlockComponent, {}, [className])}>
            <Code text={block.code} />
        </div>
    )
})
