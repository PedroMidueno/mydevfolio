<script setup lang="ts">
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'

const showDialog = ref(false)
const imageUrl = ref<string | null>('https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg')
const aspectRatio = ref<number | undefined>(undefined)
const cropper = useTemplateRef('cropper')
const fileName = ref<string | null>(null)
const fileType = ref<string | null>(null)

const emit = defineEmits(['clear', 'crop'])

const setImage = (file: File) => {
  if (imageUrl.value) {
    URL.revokeObjectURL(imageUrl.value)
  }

  const blob = URL.createObjectURL(file)

  imageUrl.value = blob
}

const open = (file: File, ratio: number = 1 / 1) => {
  if (!file) return

  fileName.value = file.name.split('.')[0]
  fileType.value = file.type
  setImage(file)
  aspectRatio.value = ratio

  showDialog.value = true
}

const closeDialog = () => {
  showDialog.value = false
  URL.revokeObjectURL(imageUrl.value!)

  imageUrl.value = null
  fileName.value = null
  fileType.value = null

  emit('clear')
}

const onCrop = async () => {
  const { canvas } = cropper.value!.getResult()
  const name = fileName.value
  const type = fileType.value as string

  if (canvas) {
    canvas.toBlob(blob => {
      const file = new File([blob as Blob], `${name}.webp`, { type })
      console.log('width', canvas.width)
      console.log('height', canvas.height)

      emit('crop', file)
    }, 'image/webp')

    closeDialog()
  } else {
    fireErrorToast('No se pudo procesar el archivo intente de nuevo')
  }
}

defineExpose({
  open
})
</script>

<template>
  <u-modal
    v-model:open="showDialog"
    :dismissible="false"
    description="Ajusta el tamaño de tu imagen de portfolio"
    title="Recortar"
    :ui="{
      content: 'max-w-[1000px] w-[600px]',
      overlay: 'bg-black/40',
      body: 'flex justify-center items-center',
    }"
    :close="{
      class: 'hidden',
    }"
  >
    <template #body>
      <div class="flex justify-center items-center w-[450px] h-[450px] border-4 border-gray-400">
        <Cropper
          v-if="imageUrl"
          ref="cropper"
          :src="imageUrl"
          image-restriction="fit-area"
          :stencil-props="{ aspectRatio }"
          class="w-full h-full"
          :min-height="500"
          :min-width="500"
        />
        <div v-else class="w-full h-full text-base flex justify-center items-center italic text-gray-500">
          No se cargó imagen
        </div>
      </div>
    </template>

    <template #footer>
      <div class="w-full flex justify-end gap-2">
        <u-button
          label="Cancelar"
          color="error"
          variant="outline"
          @click="closeDialog"
        />
        <u-button label="Usar imagen" @click="onCrop" />
      </div>
    </template>
  </u-modal>
</template>
