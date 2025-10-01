import type { ToastProps } from '#ui/types'

export const showToast = (options: Partial<ToastProps>) => {
  useToast().add(options)
}

export const fireErrorToast = (errorTitle = 'Ocurrió un error inesperado', errorDescription = '') => {
  showToast({
    title: errorTitle,
    description: errorDescription ? errorDescription : undefined,
    icon: 'fa6-solid:circle-exclamation',
    color: 'error'
  })
}

export const fireSuccessToast = (successMessage = 'Operación realizada exitosamente') => {
  showToast({
    title: successMessage,
    icon: 'fa6-solid:check',
    color: 'success'
  })
}
