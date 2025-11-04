<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import z from 'zod'

const requiredMessage = 'Este campo es obligatorio'
const showDialog = ref(false)
const isUpdating = ref(false)
const form = useTemplateRef('form')
let idToUpdate: number | undefined = undefined
const isLoading = ref(false)
const emit = defineEmits<{
  (e: 'refresh-list'): void
}>()

const schema = z.object({
  title: z.string({ message: requiredMessage }).min(1, requiredMessage),
  school: z.string({ message: requiredMessage }).min(1, requiredMessage),
  startDate: z.string({ message: requiredMessage }).date('Fecha Inválida'),
  endDate: z.string().optional(),
  isCurrentSchool: z.boolean().default(false)
}).refine(
  data => data.isCurrentSchool || !!data.endDate,
  {
    message: 'Este campo es obligatorio',
    path: ['endDate']
  })

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  title: undefined,
  school: undefined,
  startDate: undefined,
  endDate: undefined,
  isCurrentSchool: false
})

const handleSubmit = async (event: FormSubmitEvent<Schema>) => {
  isLoading.value = true
  try {
    if (isUpdating.value) {
      await $fetch(`/api/user/education/${idToUpdate}`, {
        method: 'PUT',
        body: event.data
      })
    } else {
      await $fetch('/api/user/education', {
        method: 'POST',
        body: event.data
      })
    }

    emit('refresh-list')
    fireSuccessToast('Formación guardada')
    close()
  } catch (error) {
    fireErrorToast('Ocurrió un error al guardar la formación')
  } finally {
    isLoading.value = false
  }
}

const clearForm = () => {
  idToUpdate = undefined
  state.title = undefined
  state.school = undefined
  state.startDate = undefined
  state.endDate = undefined
  state.isCurrentSchool = false
  form.value?.clear()
}

const open = (isUpdate = false, dataToUpdate: Schema & { id: number } | null = null) => {
  isUpdating.value = isUpdate

  if (isUpdate) {
    idToUpdate = dataToUpdate!.id
    state.title = dataToUpdate!.title
    state.school = dataToUpdate!.school
    state.startDate = parseDateString(dataToUpdate!.startDate)
    state.endDate = dataToUpdate?.endDate ? parseDateString(dataToUpdate.endDate) : undefined
    state.isCurrentSchool = dataToUpdate!.isCurrentSchool
  }
  showDialog.value = true
}

const close = () => {
  clearForm()
  showDialog.value = false
}

defineExpose({
  open
})
</script>

<template>
  <u-drawer
    v-model:open="showDialog"
    :dismissible="false"
    :title="isUpdating ? 'Editando formación' : 'Creando formación'"
    :ui="{
      container: 'max-w-[1400px] mx-auto'
    }"
    :handle="false"
    :description="
      isUpdating
        ? 'Actualiza la información de tu formación'
        : 'Registra la información de tu formación'"
  >
    <template #body>
      <u-form
        ref="form"
        :schema="schema"
        :state="state"
        @submit="handleSubmit"
      >
        <div class="flex gap-4">
          <u-form-field
            label="Título de la formación"
            name="title"
            required
            class="flex-2"
            :hint="`${state.title?.length ?? 0}/150 `"
          >
            <u-input v-model="state.title" class="w-full" :maxlength="150" />
          </u-form-field>

          <u-form-field
            label="Escuela / Institución"
            name="school"
            required
            class="flex-1"
            :hint="`${state.school?.length ?? 0}/150 `"
          >
            <u-input v-model="state.school" class="w-full" :maxlength="150" />
          </u-form-field>
        </div>

        <div class="flex justify-between items-center">
          <div class="flex gap-4">
            <u-form-field label="Fecha de inicio" name="startDate" required>
              <u-input v-model="state.startDate" type="date" class="w-52" />
            </u-form-field>

            <u-form-field
              v-if="!state.isCurrentSchool"
              label="Fecha de finalización"
              name="endDate"
              required
            >
              <u-input v-model="state.endDate" type="date" class="w-52" />
            </u-form-field>

            <u-form-field
              name="isCurrentSchool"
              class="w-max flex items-center"
              size="xl"
            >
              <u-checkbox
                v-model="state.isCurrentSchool"
                label="Cursando actualmente"
                @change="() => {
                  state.endDate = undefined
                  form?.clear('endDate')
                }"
              />
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
        </div>
      </u-form>
    </template>
  </u-drawer>
</template>
