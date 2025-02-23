import { memo, useCallback, useState } from 'react'

import { BrowserView, MobileView } from 'react-device-detect'
import { useTranslation } from 'react-i18next'

import { classNames } from '@/shared/lib/classNames/classNames'
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
    onCancel?: (starsCount: number) => void
    onAccept?: (starsCount: number, feedback?: string) => void
}

export const RatingCard = memo((props: RatingCardProps) => {
    const {
        className,
        title,
        feedbackTitle,
        hasFeedback,
        onCancel,
        onAccept
    } = props

    const { t } = useTranslation()
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [startsCount, setStarsCount] = useState<number>(0)
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
    }, [hasFeedback, onAccept, startsCount])

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
                value={feedback}
                onChange={setFeedback}
                placeholder={t('Ваш отзыв')}
            />
        </>
    )

    return (
        <Card className={classNames('', {}, [className])}>
            <VStack
                align='center'
                gap='8'
            >
                <Text
                    title={title}
                />
                <StarRating
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
