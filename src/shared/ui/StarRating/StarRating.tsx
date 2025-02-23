import { memo, useState } from 'react'

import StarIcon from 'shared/assets/icons/star.svg'

import cls from './StarRating.module.scss'

import { classNames, Mods } from '@/shared/lib/classNames/classNames'
import { Icon } from '@/shared/ui/Icon/Icon'

interface StarRatingProps {
    className?: string
    onSelect?: (starsCount: number) => void
    size?: number
    selectedStars?: number
}

const starts = [1, 2, 3, 4, 5]

export const StarRating = memo((props: StarRatingProps) => {
    const {
        className,
        onSelect,
        size = 30,
        selectedStars = 0
    } = props

    const [currentStarsCount, setCurrentStarsCount] = useState<number>(0)
    const [isSelected, setIsSelected] = useState<boolean>(Boolean(selectedStars))

    const onHover = (starsCount: number) => () => {
        if (!isSelected) {
            setCurrentStarsCount(starsCount)
        }
    }

    const onLeave = () => {
        if (!isSelected) {
            setCurrentStarsCount(0)
        }
    }

    const onClick = (starsCount: number) => () => {
        if (!isSelected) {
            onSelect?.(starsCount)
            setCurrentStarsCount(starsCount)
            setIsSelected(true)
        }
    }

    const mods: Mods = {
        [cls.selected]: isSelected
    }

    return (
        <div className={classNames(cls.StartRating, {}, [className])}>
            {starts.map((starNumber) => (
                <Icon
                    Svg={StarIcon}
                    key={starNumber}
                    className={classNames(
                        cls.starIcon,
                        mods,
                        [currentStarsCount >= starNumber ? cls.hovered : cls.normal]
                    )}
                    width={size}
                    height={size}
                    onMouseLeave={onLeave}
                    onMouseEnter={onHover(starNumber)}
                    onClick={onClick(starNumber)}
                />
            ))}
        </div>
    )
})
