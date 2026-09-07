export interface Notificacion{
    title: string,
    message: string,
    type: 'success' | 'danger' | 'warning' | 'info',
    visible: boolean
}