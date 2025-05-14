<script setup lang="ts">
// const testEndpoint = async () => {
//   try {
//     if (!data.file) return
//     const form = new FormData()
//     form.append('file', (data.file as File))
//     const res = await $fetch('/api/user/resources', {
//       method: 'POST',
//       body: form
//     })
//     console.log({ res })
//     fireSuccessToast('Archivo subido exitosamente')
//   } catch (error) {
//     console.log('error =>', error)
//     fireErrorToast('Ocurrió un error al subir el archivo')
//   }
// }

// const handleInputFileChange = (event: any) => {
//   console.log({ file: event.target.files[0] })
//   data.file = event.target.files[0]
// }
definePageMeta({
  layout: false
})
</script>

<template>
  <portfolio-example />
</template>
