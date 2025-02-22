export interface Notification {
    id: string
    title: string
    description: string
    userId: string
    type: string
    href: string
    createdAt: Date | string
    read: boolean
}
