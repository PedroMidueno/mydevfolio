<script setup lang="ts">
const props = defineProps<{
  file?: File | null
  accept: string[]
}>()

const emit = defineEmits<{
  (e: 'update:file', value: File | null): void
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const inputKey = ref(0)
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

const pickFile = () => {
  inputRef.value?.click()
}

const clearFilePicker = () => {
  inputKey.value++
}

const validatePickedFile = (file: File | null) => {
  if (!file) return {
    isValidFile: true,
    errorMessage: null
  }

  const validMIMETypes = props.accept
  if (!validMIMETypes?.includes(file.type)) {
    clearFilePicker()
    return {
      isValidFile: false,
      errorMessage: 'Formatos aceptados: jpg, jpeg, png, webp'
    }
  }

  if (file.size > MAX_FILE_SIZE) {
    clearFilePicker()
    return {
      isValidFile: false,
      errorMessage: 'El archivo supera el tamaño máximo (5MB)'
    }
  }

  return {
    isValidFile: true,
    errorMessage: null
  }
}

const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0] || null

  const { isValidFile, errorMessage } = validatePickedFile(file)
  if (!isValidFile) {
    fireErrorToast('Error en el archivo', errorMessage ?? '')
    return
  }

  emit('update:file', file)
  clearFilePicker()
}

const getDroppedFile = (file: File) => {
  const { isValidFile, errorMessage } = validatePickedFile(file)
  if (!isValidFile) {
    fireErrorToast('Error en el archivo', errorMessage ?? '')
    return
  }

  emit('update:file', file)
  clearFilePicker()
}

defineExpose({ pickFile, clearFilePicker, getDroppedFile })
</script>

<template>
  <input
    :key="inputKey"
    ref="inputRef"
    type="file"
    name="file-picker"
    class="hidden"
    :accept="props.accept.join(', ')"
    @change="onFileChange"
  />

  <slot :pick-file="pickFile" :clear="clearFilePicker"></slot>
</template>
