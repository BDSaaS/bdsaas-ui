type MType = 'success' | 'info' | 'warn' | 'error'
type MIconType = 'none' | 'circular'
interface IMessageOptions {
    type?: MType,
    message?: string,
    duration?: number,
    iconType?: MIconType,
    offset?: number,
    onClose?: () => void
}

export type IMessageParams = IMessageOptions | string
