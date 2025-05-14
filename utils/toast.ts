import type { ToastProps } from '#ui/types'

export const showToast = (options: Partial<ToastProps>) => {
  useToast().add(options)
}

export const fireErrorToast = (errorMessage = 'Ocurrió un error inesperado') => {
  showToast({
    title: errorMessage,
    icon: 'i-mdi-error',
    color: 'error'
  })
}

export const fireSuccessToast = (successMessage = 'Operación realizada exitosamente') => {
  showToast({
    title: successMessage,
    icon: 'i-mdi-success',
    color: 'success'
  })
}
