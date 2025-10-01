<script setup lang="ts">
import type { UiFilePicker } from '#components'

const MIMETypesMap = {
  'image/jpeg': 'jpg, jpeg',
  'image/png': 'png',
  'image/webp': 'webp',
  'application/pdf': 'pdf'
} as const

export type Props = {
  accept: (keyof typeof MIMETypesMap)[]
  recommendedSize?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'change', value: File | null): void
}>()

const isDragging = ref(false)
const dragCounter = ref(0)
const filePickerRef = useTemplateRef<InstanceType<typeof UiFilePicker>>('filePickerRef')

const handleDrop = (e: DragEvent) => {
  e.preventDefault()
  isDragging.value = false
  dragCounter.value = 0

  const files = e.dataTransfer?.files
  if (files) {
    filePickerRef.value?.getDroppedFile(files[0])
  }
}

const handleDragEnter = (e: DragEvent) => {
  e.preventDefault()
  dragCounter.value++

  if (dragCounter.value === 1) {
    isDragging.value = true
  }
}

const handleDragLeave = () => {
  dragCounter.value--

  if (dragCounter.value === 0) {
    isDragging.value = false
  }
}

const onFileChange = (file: File | null) => {
  if (!file) return

  emit('change', file)
}
</script>

<template>
  <div
    class="w-full h-full flex flex-col justify-center items-center border-2 border-dashed rounded-lg"
    :class="{
      'border-blue-400': isDragging
    }"
    @dragover.prevent
    @dragenter="handleDragEnter"
    @dragleave="handleDragLeave"
    @drop="handleDrop"
  >
    <ui-file-picker ref="filePickerRef" :accept="props.accept" @update:file="onFileChange" />
    <u-button
      icon="fa6-regular:square-plus"
      size="xl"
      variant="outline"
      @click="filePickerRef?.pickFile()"
    />
    <p>Agrega una imagen a tu proyecto</p>
    <span class="text-sm text-center text-slate-400">
      Formatos aceptados: {{ accept.map(a => MIMETypesMap[a]).join(', ') }}. (Max. 5MB)
      <template v-if="recommendedSize">
        <br />
        Tamaño recomendado: {{ recommendedSize }}
      </template>
    </span>
  </div>
</template>
