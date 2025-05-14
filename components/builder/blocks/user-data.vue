<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { LazyDialogsCropper } from '#components'

const { bucketPrefixUrl } = useRuntimeConfig().public
const form = useTemplateRef('form')
const cropperDialog = ref<typeof LazyDialogsCropper>()
const isEditingData = ref(false)
const { data: userPage, refresh } = await useFetch('/api/user/page', {
  method: 'get'
})

const userImageUrl = computed(() => {
  if (userPage.value?.userImageFileKey) {
    return `${bucketPrefixUrl}/${userPage.value?.userImageFileKey}`
  } else {
    return 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
  }
})

const schema = z.object({
  firstName: z.string().min(1, 'Este campo es obligatorio'),
  lastName: z.string().min(1, 'Este campo es obligatorio'),
  userJobPositionName: z.string().optional(),
  userDescription: z.string().optional()
})

type Schema = z.output<typeof schema>

interface IForm {
  firstName: string | undefined
  lastName: string | undefined
  userJobPositionName: string | undefined
  userDescription: string | undefined
}
const state = reactive<IForm>({
  firstName: userPage.value?.userFirstName,
  lastName: userPage.value?.userLastName,
  userJobPositionName: userPage.value?.userJobPositionName ?? '',
  userDescription: userPage.value?.userDescription ?? ''
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    await $fetch('/api/user/page', {
      method: 'PUT',
      body: event.data
    })
    fireSuccessToast('Información actualizada')
    await refresh()
    isEditingData.value = false
  } catch (error) {
    fireErrorToast('Ocurrió un error al actualizar la información')
  }
}

const handleFileInputChange = (event: any) => {
  const file = event.target.files[0]

  if (!file) return
  cropperDialog.value?.open(file)
}

const clearInput = () => {
  const fileInput = document.getElementById('fileInput')!

  const newInput = document.createElement('input')
  newInput.type = 'file'
  newInput.id = 'fileInput'
  newInput.style = 'display: none;'
  newInput.onchange = handleFileInputChange
  fileInput.parentNode?.replaceChild(newInput, fileInput)
}

const pickFile = () => {
  const fileInput = document.getElementById('fileInput')!
  fileInput.click()
}

const updateUserImage = async (file: File) => {
  try {
    const form = new FormData()
    form.append('file', file)

    await $fetch('/api/user/page/image', {
      method: 'PUT',
      body: form
    })
    await refresh()
  } catch (error) {
    fireErrorToast('Ocurrió un error al actualizar la imagen')
  }
}

watch(isEditingData, value => {
  if (value === false) {
    form.value?.clear()
    state.firstName = userPage.value?.userFirstName
    state.lastName = userPage.value?.userLastName
    state.userJobPositionName = userPage.value?.userJobPositionName ?? ''
    state.userDescription = userPage.value?.userDescription ?? ''
  }
})
</script>

<template>
  <section class="flex flex-col gap-2 px-4">
    <lazy-dialogs-cropper ref="cropperDialog" @clear="clearInput" @crop="updateUserImage" />
    <input
      id="fileInput"
      accept="image/png, image/jpeg, image/webp"
      type="file"
      class="hidden"
      @change="handleFileInputChange"
    />

    <h2 class="text-xl font-semibold mb-2">
      Información general
    </h2>
    <div class="flex items-center gap-4 h-68">
      <div class="h-full flex flex-col items-center justify-between">
        <div class="h-52 w-52">
          <img class="h-full w-full rounded-full bg-gray-50" :src="userImageUrl" alt="User image" />
        </div>
        <span class="text-[10px] text-gray-300">Tamaño recomendado: 500x500px</span>
        <u-button label="Actualizar imagen" @click="pickFile" />
      </div>
      <u-form
        ref="form"
        :schema="schema"
        :state="state"
        class="flex flex-col justify-between items-end grow h-full"
        @submit="onSubmit"
      >
        <div class="flex gap-2 w-full">
          <u-form-field class="grow" label="Nombre(s)" name="firstName">
            <u-input
              v-model="state.firstName"
              class="w-full"
              placeholder="Jhon"
              :disabled="!isEditingData"
            />
          </u-form-field>

          <u-form-field class="grow" label="Apellido(s)" name="lastName">
            <u-input
              v-model="state.lastName"
              class="w-full"
              placeholder="Doe"
              :disabled="!isEditingData"
            />
          </u-form-field>

          <u-form-field class="grow" label="Posición" name="jobPositionName">
            <u-input
              v-model="state.userJobPositionName"
              class="w-full"
              placeholder="Desarrollador Web Full Stack"
              :disabled="!isEditingData"
            />
          </u-form-field>
        </div>
        <u-form-field
          class="w-full"
          label="Perfil profesional"
          name="userDescription"
          :hint="isEditingData ? `${state.userDescription?.length} / 1000` : undefined"
        >
          <u-textarea
            v-model="state.userDescription"
            class="w-full"
            maxlength="1000"
            placeholder="Soy un asombroso desarrollador web full stack con tremendad habilidades en..."
            :disabled="!isEditingData"
            :style="{ resize: 'none' }"
          />
        </u-form-field>

        <div class="flex gap-4">
          <u-button v-if="!isEditingData" @click="isEditingData = true">
            Editar
          </u-button>
          <u-button
            v-if="isEditingData"
            color="error"
            variant="outline"
            @click="isEditingData = false"
          >
            Cancelar
          </u-button>
          <u-button v-if="isEditingData" type="submit">
            Guardar
          </u-button>
        </div>
      </u-form>
    </div>
  </section>
</template>
