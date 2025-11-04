<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const emit = defineEmits(['update-records'])
const requiredMessage = 'Este campo es obligatorio'
const form = useTemplateRef('form')
const showDialog = ref<boolean>(false)
const updating = ref<boolean>(false)
const isLoading = ref(false)
const recordToUpdateId = ref<number | null>(null)

const schema = z.object({
  jobTitle: z.string({ message: requiredMessage }).min(1, requiredMessage),
  company: z.string({ message: requiredMessage }).min(1, requiredMessage),
  jobDescription: z.string({ message: requiredMessage }).min(1, requiredMessage),
  startDate: z.string({ message: requiredMessage }).date(),
  endDate: z.string().date().optional(),
  isCurrentJob: z.boolean()
}).refine(data => {
  if (data.isCurrentJob === true) return true
  else {
    return data.endDate !== undefined ? true : false
  }
}, {
  message: 'Este campo es obligatorio',
  path: ['endDate']
})

type Schema = z.output<typeof schema>

interface IForm {
  jobTitle: string | undefined
  company: string | undefined
  jobDescription: string | undefined
  startDate: string | undefined
  endDate: string | undefined
  isCurrentJob: boolean
}

const state = reactive<IForm>({
  jobTitle: undefined,
  company: undefined,
  jobDescription: undefined,
  startDate: undefined,
  endDate: undefined,
  isCurrentJob: false
})

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  isLoading.value = true
  try {
    await $fetch(`${updating.value ? `/api/user/experience/${recordToUpdateId.value}` : '/api/user/experience'}`, {
      method: `${updating.value ? 'put' : 'post'}`,
      body: event.data
    })
    emit('update-records')
    close()
  } catch (error) {
    fireErrorToast(`Ocurrió un error al ${updating.value ? 'actualizar' : 'crear'} este elemento`)
  } finally {
    isLoading.value = false
  }
}

const open = (isUpdate = false, dataToUpdate: IForm & { id: number | undefined } | null = null) => {
  updating.value = isUpdate
  if (isUpdate) {
    recordToUpdateId.value = dataToUpdate?.id || null
    state.jobTitle = dataToUpdate?.jobTitle
    state.company = dataToUpdate?.company
    state.jobDescription = dataToUpdate?.jobDescription
    state.startDate = parseDateString(dataToUpdate?.startDate as string)
    state.endDate = dataToUpdate?.endDate ? parseDateString(dataToUpdate.endDate) : undefined
    state.isCurrentJob = dataToUpdate?.isCurrentJob as boolean
  }
  showDialog.value = true
}

const close = () => {
  updating.value = false
  state.jobTitle = undefined
  state.jobDescription = undefined
  state.startDate = undefined
  state.endDate = undefined
  state.isCurrentJob = false
  state.company = undefined
  form.value?.clear()
  showDialog.value = false
}

defineExpose({ open })
</script>

<template>
  <u-drawer
    v-model:open="showDialog"
    :dismissible="false"
    :title="updating ? 'Editando experiencia laboral' : 'Creando experiencia laboral'"
    :ui="{
      container: 'max-w-[1400px] mx-auto'
    }"
    :handle="false"
    :description="
      updating
        ? 'Actualiza la información de tu experiencia laboral'
        : 'Registra la información de tu experiencia laboral'"
  >
    <template #body>
      <u-form
        ref="form"
        :schema="schema"
        :state="state"
        class="h-[350px] flex flex-col"
        @submit="onSubmit"
      >
        <div class="flex w-full justify-between gap-2 h-[102px]">
          <u-form-field class="flex-2" label="Título del empleo" name="jobTitle">
            <u-input
              v-model="state.jobTitle"
              class="w-full"
              placeholder="Desarrollador Web Full Stack"
            />
          </u-form-field>

          <u-form-field class="flex-1" label="Nombre de la compañía" name="company">
            <u-input
              v-model="state.company"
              class="w-full"
              placeholder="Midudev's Inc."
            />
          </u-form-field>
        </div>

        <div class="flex gap-2 w-full h-[90px]">
          <u-form-field label="Desde" name="startDate" class="w-44">
            <u-input
              v-model="state.startDate"
              class="w-full"
              type="date"
            />
          </u-form-field>

          <u-form-field
            v-if="!state.isCurrentJob"
            label="Hasta"
            name="endDate"
            class="w-44"
          >
            <u-input
              v-model="state.endDate"
              class="w-full"
              type="date"
            />
          </u-form-field>

          <u-form-field
            name="isCurrentJob"
            class="mt-7 w-1/4"
            size="xl"
          >
            <u-checkbox
              v-model="state.isCurrentJob"
              label="Empleo actual"
              @change="() => {
                state.endDate = undefined
                form?.clear('endDate')
              }"
            />
          </u-form-field>
        </div>

        <u-form-field
          class="w-full h-[126px]"
          label="Descripción del empleo"
          name="jobDescription"
          :hint="`${state.jobDescription?.length ?? 0} / 1000`"
        >
          <u-textarea
            v-model="state.jobDescription"
            maxlength="1000"
            :ui="{ base: 'resize-none' }"
            class="w-full"
            placeholder="Mi primera chambaaa 🎵🎶"
          />
        </u-form-field>

        <div class="w-full flex justify-end gap-4">
          <u-button
            variant="outline"
            color="error"
            :disabled="isLoading"
            @click="close"
          >
            Cancelar
          </u-button>
          <u-button type="submit" :loading="isLoading">
            Guardar
          </u-button>
        </div>
      </u-form>
    </template>
  </u-drawer>
</template>
