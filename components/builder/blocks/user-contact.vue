<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const isEditingData = ref<boolean>(false)
const isLoading = ref(false)
const { bucketPrefixUrl } = useRuntimeConfig().public
const { data: userContact, refresh } = await useFetch('/api/user/contact', {
  method: 'get'
})
const filePickerRef = useTemplateRef<{ pickFile: () => void }>('filePickerRef')
const schema = z.object({
  githubUser: z.string().optional(),
  linkedinUser: z.string().optional(),
  twitterUser: z.string().optional()
})

type Schema = z.output<typeof schema>
interface IForm {
  githubUser: string | undefined
  linkedinUser: string | undefined
  twitterUser: string | undefined
}
const state = reactive<IForm>({
  githubUser: userContact.value?.githubUser ?? '',
  linkedinUser: userContact.value?.linkedinUser ?? '',
  twitterUser: userContact.value?.twitterUser ?? ''
})

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  isLoading.value = true
  try {
    await $fetch('/api/user/contact', {
      method: 'PUT',
      body: event.data
    })
    await refresh()
    isEditingData.value = false
    fireSuccessToast('Información actualizada')
  } catch (error) {
    fireErrorToast('Ocurrió un error al actualizar las redes de contacto')
  } finally {
    isLoading.value = false
  }
}

const handleFilePickerChange = async (file: File | null) => {
  if (!file) return
  isLoading.value = true
  try {
    const form = new FormData()
    form.append('file', file)
    await $fetch('/api/user/contact/resume', {
      method: 'PUT',
      body: form
    })
    await refresh()
    fireSuccessToast('Currículum actualizado')
  } catch (error) {
    fireErrorToast('Ocurrió un error al actualizar el currículum')
  } finally {
    isLoading.value = false
  }
}

const viewCurrentResume = () => {
  window.open(`${bucketPrefixUrl}/${userContact.value?.resumeFile?.fileKey}`, 'blank')
}

watch(isEditingData, () => {
  state.githubUser = userContact.value?.githubUser ?? ''
  state.linkedinUser = userContact.value?.linkedinUser ?? ''
  state.twitterUser = userContact.value?.twitterUser ?? ''
})
</script>

<template>
  <section id="contacto" class="custom-container flex flex-col gap-2">
    <ui-file-picker ref="filePickerRef" :accept="['application/pdf']" @update:file="handleFilePickerChange" />
    <h2 class="text-xl font-semibold mb-2">
      Información y redes de contacto
    </h2>

    <div class="flex flex-col gap-4 w-full">
      <div class="flex gap-2 justify-between">
        <div class="w-1/3 flex flex-col justify-between gap-1">
          <span class="block text-sm">Email registrado:</span>
          <div class="flex items-center gap-2">
            <u-input
              class="w-full"
              disabled
              :model-value="userContact?.email"
            />
            <u-tooltip
              v-if="isEditingData"
              text="El email no se puede cambiar"
              :delay-duration="0"
            >
              <u-icon name="fa6-solid:circle-info" size="xs" />
            </u-tooltip>
            <div v-else class="w-4 h-4"></div>
          </div>
        </div>
        <div class="w-2/3 flex flex-col justify-between gap-1">
          <span class="text-sm">Curriculum:</span>
          <div class="flex items-center gap-2">
            <u-input class="grow" disabled :model-value="userContact?.resumeFile?.originalName ?? 'Aún no has subido ningún currículum'" />
            <u-tooltip
              :text="userContact?.resumeFile ? 'Actualizar currículum' : 'Cargar currículum'"
            >
              <u-button
                class="text-white w-12 place-content-center"
                color="primary"
                :icon="userContact?.resumeFile ? 'fa6-solid:arrows-rotate' : 'fa6-solid:upload' "
                size="xs"
                :loading="isLoading"
                @click="filePickerRef?.pickFile()"
              />
            </u-tooltip>
            <u-tooltip v-if="userContact?.resumeFile" text="Ver currículum cargado">
              <u-button
                class="text-white w-12 place-content-center"
                icon="fa6-solid:eye"
                size="xs"
                :loading="isLoading"
                @click="viewCurrentResume"
              />
            </u-tooltip>
          </div>
        </div>
      </div>
      <u-form
        class="flex flex-col gap-4 items-end"
        :state="state"
        :schema="schema"
        @submit="onSubmit"
      >
        <div class="w-full flex gap-2 justify-between">
          <u-form-field label="GitHub" name="githubUser" class="w-1/3">
            <u-input
              v-model="state.githubUser"
              :disabled="!isEditingData"
              class="w-full disabled:cursor-auto"
              spellcheck="false"
              placeholder="tu-usuario-de-github"
              :ui="{
                base: 'pl-[135px]',
                leading: 'pointer-events-none'
              }"
            >
              <template #leading>
                <p class="text-sm text-muted">
                  https://github.com/
                </p>
              </template>
            </u-input>
          </u-form-field>
          <u-form-field label="LinkedIn" name="linkedinUser" class="w-1/3">
            <u-input
              v-model="state.linkedinUser"
              :disabled="!isEditingData"
              class="w-full"
              spellcheck="false"
              placeholder="tu-usuario-de-linkedin"
              :ui="{
                base: 'pl-[198px]',
                leading: 'pointer-events-none'
              }"
            >
              <template #leading>
                <p class="text-sm text-muted">
                  https://www.linkedin.com/in/
                </p>
              </template>
            </u-input>
          </u-form-field>
          <u-form-field label="X" name="twitterUser" class="w-1/3">
            <u-input
              v-model="state.twitterUser"
              :disabled="!isEditingData"
              class="w-full"
              spellcheck="false"
              placeholder="tu-usuario-de-x"
              :ui="{
                base: 'pl-[102px]',
                leading: 'pointer-events-none'
              }"
            >
              <template #leading>
                <p class="text-sm text-muted">
                  https://x.com/
                </p>
              </template>
            </u-input>
          </u-form-field>
        </div>
        <div class="flex gap-4">
          <u-button
            v-if="isEditingData"
            color="error"
            variant="outline"
            @click="isEditingData = false"
          >
            Cancelar
          </u-button>
          <u-button v-if="isEditingData" type="submit" :loading="isLoading">
            Guardar
          </u-button>
          <u-button v-if="!isEditingData" @click="isEditingData = true">
            Actualizar redes
          </u-button>
        </div>
      </u-form>
    </div>
  </section>
</template>
