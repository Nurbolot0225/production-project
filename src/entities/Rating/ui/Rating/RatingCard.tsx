import { memo, useCallback, useState } from 'react'

import { BrowserView, MobileView } from 'react-device-detect'
import { useTranslation } from 'react-i18next'

import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button'
import { Card } from '@/shared/ui/Card/Card'
import { Drawer } from '@/shared/ui/Drawer/Drawer'
import { Input } from '@/shared/ui/Input/Input'
import { Modal } from '@/shared/ui/Modal/Modal'
import { HStack, VStack } from '@/shared/ui/Stack'
import { StarRating } from '@/shared/ui/StarRating/StarRating'
import { Text } from '@/shared/ui/Text/Text'

interface RatingCardProps {
    className?: string
    title?: string
    feedbackTitle?: string
    hasFeedback?: boolean
    rate?: number
    onCancel?: (starsCount: number) => void
    onAccept?: (starsCount: number, feedback?: string) => void
}

export const RatingCard = memo((props: RatingCardProps) => {
    const {
        className,
        title,
        feedbackTitle,
        hasFeedback,
        rate = 0,
        onCancel,
        onAccept
    } = props

    const { t } = useTranslation('article-details')
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [startsCount, setStarsCount] = useState<number>(rate)
    const [feedback, setFeedback] = useState<string>('')

    const onSelectStars = useCallback((selectedStarsCount: number) => {
        setStarsCount(selectedStarsCount)
        if (hasFeedback) {
            setIsModalOpen(true)
        } else {
            onAccept?.(selectedStarsCount)
        }
    }, [hasFeedback, onAccept])

    const acceptHandler = useCallback(() => {
        setIsModalOpen(false)
        onAccept?.(startsCount, feedback)
    }, [feedback, onAccept, startsCount])

    const cancelHandler = useCallback(() => {
        setIsModalOpen(false)
        onCancel?.(startsCount)
    }, [onCancel, startsCount])

    const modalContent = (
        <>
            <Text
                title={feedbackTitle}
            />
            <Input
                autofocus
                value={feedback}
                onChange={setFeedback}
                placeholder={t('Ваш отзыв')}
            />
        </>
    )

    return (
        <Card max className={className}>
            <VStack
                align='center'
                gap='8'
            >
                <Text
                    title={startsCount ? t('Спасибо за оценку') : title}
                />
                <StarRating
                    selectedStars={startsCount}
                    size={40}
                    onSelect={onSelectStars}
                />
            </VStack>
            <BrowserView>
                <Modal
                    lazy
                    isOpen={isModalOpen}
                >
                    <VStack
                        max
                        gap='32'
                    >
                        {modalContent}
                        <HStack
                            max
                            gap='16'
                            justify='end'>
                            <Button
                                theme={ButtonTheme.OUTLINE_RED}
                                onClick={cancelHandler}
                            >
                                {t('Отменить')}
                            </Button>
                            <Button
                                onClick={acceptHandler}
                            >
                                {t('Отправить')}
                            </Button>
                        </HStack>
                    </VStack>
                </Modal>
            </BrowserView>
            <MobileView>
                <Drawer
                    lazy
                    isOpen={isModalOpen}
                    onClose={cancelHandler}
                >
                    <Modal
                        lazy
                        isOpen={isModalOpen}
                    >
                        <VStack gap='32'>
                            {modalContent}
                            <Button
                                fullWidth
                                size={ButtonSize.L}
                                onClick={acceptHandler}>
                                {t('Отправить')}
                            </Button>
                        </VStack>
                    </Modal>
                </Drawer>
            </MobileView>
        </Card>
    )
})
