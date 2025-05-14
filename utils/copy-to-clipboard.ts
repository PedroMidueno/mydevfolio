export const copyToClipboard = (str: string) => {
  navigator.clipboard.writeText(str)
    .then(() => {
      fireSuccessToast('Copiado al portapapeles')
    })
    .catch(() => {
      fireErrorToast('No se pudo copiar el texto')
    })
}
