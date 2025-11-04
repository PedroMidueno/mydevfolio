<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import z from 'zod'

const requiredMessage = 'Este campo es obligatorio'
const showDialog = ref(false)
const isUpdating = ref(false)
const isLoading = ref(false)
const form = useTemplateRef('form')
const emit = defineEmits<{
  (e: 'refresh-list'): void
}>()
let idToUpdate = 0

const schema = z.object({
  title: z.string({ message: requiredMessage }).min(1, requiredMessage),
  certificateIssuer: z.string({ message: requiredMessage }).min(1, requiredMessage),
  issuedDate: z.string({ message: requiredMessage }).date('Formato de fecha inválido'),
  certificateUrl: z.string({ message: requiredMessage }).url('Formato de url inválida')
})
type Schema = z.output<typeof schema>
const state = reactive<Partial<Schema>>({
  title: undefined,
  certificateIssuer: undefined,
  issuedDate: undefined,
  certificateUrl: undefined
})

const handleSubmit = async (event: FormSubmitEvent<Schema>) => {
  isLoading.value = true
  try {
    if (isUpdating.value) {
      await $fetch(`/api/user/certifications/${idToUpdate}`, {
        method: 'PUT',
        body: event.data
      })
    } else {
      await $fetch('/api/user/certifications', {
        method: 'POST',
        body: event.data
      })
    }

    emit('refresh-list')
    fireSuccessToast('Certificatión guardada')
    close()
  } catch (error) {
    fireErrorToast('Ocurrió un error al guardar la certificación')
  } finally {
    isLoading.value = false
  }
}

const clearForm = () => {
  state.title = undefined
  state.certificateIssuer = undefined
  state.issuedDate = undefined
  state.certificateUrl = undefined
  form.value?.clear()
}

const open = (isUpdate: boolean = false, dataToUpdate?: Schema & { id: number }) => {
  isUpdating.value = isUpdate
  if (isUpdate && dataToUpdate) {
    state.title = dataToUpdate.title
    state.certificateIssuer = dataToUpdate.certificateIssuer
    state.issuedDate = parseDateString(dataToUpdate.issuedDate)
    state.certificateUrl = dataToUpdate.certificateUrl
    idToUpdate = dataToUpdate.id
  }
  showDialog.value = true
}

const close = () => {
  clearForm()
  showDialog.value = false
}

defineExpose({ open })
</script>

<template>
  <u-drawer
    v-model:open="showDialog"
    :dismissible="false"
    :title="isUpdating ? 'Editando certificación' : 'Creando certificación'"
    :ui="{
      container: 'max-w-[1400px] mx-auto'
    }"
    :handle="false"
    :description="
      isUpdating
        ? 'Actualiza la información de tu certificación'
        : 'Registra la información de tu certificación'"
  >
    <template #body>
      <u-form
        ref="form"
        :schema="schema"
        :state="state"
        @submit="handleSubmit"
      >
        <div class="flex w-full gap-2">
          <u-form-field
            label="Título del certificado"
            required
            name="title"
            class="flex-2"
            :hint="`${state.title?.length ?? 0}/150 `"
          >
            <u-input v-model="state.title" class="w-full" :maxlength="150" />
          </u-form-field>

          <u-form-field
            label="Emisor"
            required
            name="certificateIssuer"
            class="flex-1"
            :hint="`${state.certificateIssuer?.length ?? 0}/150 `"
          >
            <u-input v-model="state.certificateIssuer" class="w-full" :maxlength="150" />
          </u-form-field>
        </div>

        <div class="flex w-full gap-2 mt-2">
          <u-form-field
            label="Fecha de finalización"
            required
            name="issuedDate"
            class="flex-1"
          >
            <u-input v-model="state.issuedDate" type="date" class="w-full" />
          </u-form-field>

          <u-form-field
            label="Url del certificado"
            required
            name="certificateUrl"
            class="flex-3"
            :hint="`${state.certificateUrl?.length ?? 0}/300 `"
          >
            <u-input v-model="state.certificateUrl" class="w-full" :maxlength="300" />
          </u-form-field>
        </div>

        <div class="w-full flex justify-end gap-4">
          <u-button
            variant="outline"
            color="error"
            :disabled="isLoading"
            @click="close"
          >
            Cancelar
          </u-button>
          <u-button :loading="isLoading" type="submit">
            Guardar
          </u-button>
        </div>
      </u-form>
    </template>
  </u-drawer>
</template>
