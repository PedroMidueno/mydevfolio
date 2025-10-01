<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { IProjectItem, TechStackItem } from '../builder/blocks/user-project/types'

const emit = defineEmits<{
  (e: 'refresh-list'): void
}>()
const requiredMessage = 'Este campo es obligatorio'
const form = useTemplateRef('form')
const showDialog = ref<boolean>(false)
const updating = ref<boolean>(false)
const projectToUpdateId = ref<number | null>(null)
const projectImageFile = ref<File | null>(null)
const projectImageUrl = ref('')
const filePickerRef = ref<{
  pickFile: () => void
}>()
const cropperDialog = ref<{
  open: (file: File, ratio?: number) => void
}>()

const selectedtech = ref<TechStackItem[]>([])
const remainingTech = ref<TechStackItem[]>([])


const schema = z.object({
  title: z.string({ message: requiredMessage }).min(1, requiredMessage),
  description: z.string({ message: requiredMessage }).min(1, requiredMessage),
  repositoryUrl: z.string().optional(),
  deployUrl: z.string({ message: requiredMessage }).url('Url inválida')
})

type Schema = z.output<typeof schema>

type FormProps = {
  title: string
  description: string
  repositoryUrl?: string
  deployUrl: string
}

const state = reactive<Partial<FormProps>>({
  title: undefined,
  description: undefined,
  repositoryUrl: undefined,
  deployUrl: undefined
})

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  if (!selectedtech.value?.length) {
    fireErrorToast('Seleccione al menos una tecnología')
    return
  }

  if (!updating.value && !projectImageFile.value) {
    fireErrorToast('Agrega una imagen de tu proyecto')
    return
  }

  try {
    const form = new FormData()
    form.append('title', event.data.title)
    form.append('description', event.data.description)
    form.append('repositoryUrl', event.data.repositoryUrl ?? '')
    form.append('deployUrl', event.data.deployUrl)
    selectedtech.value.forEach(({ techKey }) => {
      form.append('techStack', techKey)
    })
    if (projectImageFile.value) {
      form.append('file', projectImageFile.value)
    }

    if (updating.value) {
      await $fetch(`/api/user/projects/${projectToUpdateId.value}`, {
        method: 'PUT',
        body: form
      })
      fireSuccessToast('Proyecto actualizado exitosamente')
    } else {
      await $fetch('/api/user/projects', {
        method: 'POST',
        body: form
      })
      fireSuccessToast('Proyecto creado exitosamente')
    }

    emit('refresh-list')
    close()
  } catch (error) {
    fireErrorToast(updating.value ? 'Ocurrió un error al actualizar el proyecto' : 'Ocurrió un error al crear el proyecto')
  }
}

const open = (isUpdate = false, dataToUpdate?: IProjectItem) => {
  updating.value = isUpdate
  if (isUpdate) {
    projectToUpdateId.value = dataToUpdate?.id || null
    state.title = dataToUpdate?.title
    state.description = dataToUpdate?.description
    state.repositoryUrl = dataToUpdate?.repositoryUrl
    state.deployUrl = dataToUpdate?.deployUrl
    projectImageUrl.value = dataToUpdate?.imageKey ?? ''
    selectedtech.value = dataToUpdate?.techStack ?? []
  }
  showDialog.value = true
}

const close = () => {
  updating.value = false
  projectToUpdateId.value = null
  state.title = undefined
  state.description = undefined
  state.repositoryUrl = undefined
  state.deployUrl = undefined
  selectedtech.value = []
  if (projectImageUrl.value && projectImageFile.value) {
    URL.revokeObjectURL(projectImageUrl.value)
  }
  projectImageFile.value = null
  projectImageUrl.value = ''
  form.value?.clear()
  showDialog.value = false
}

const onCropImage = (file: File) => {
  projectImageFile.value = file
  createObjectUrl(file)
}

const createObjectUrl = (file: File) => {
  if (projectImageUrl.value && projectImageFile.value) {
    URL.revokeObjectURL(projectImageUrl.value)
  }
  return projectImageUrl.value = URL.createObjectURL(file)
}

const onFileChange = (file: File | null) => {
  if (!file) return

  cropperDialog.value?.open(file, 1.91 / 1)
}

defineExpose({ open })

// Tech Stack picker logic
const { data } = await useFetch('/api/tech-cat', {
  method: 'get'
})
const techCat = data.value ?? [] as TechStackItem[]


watch(selectedtech, () => {
  remainingTech.value = techCat.filter(tech =>
    !selectedtech.value?.some(selected => tech.techKey === selected.techKey)
  )
}, { deep: true, immediate: true })

const toggleTechSkill = ({ currentScope, techItem }: { currentScope: 'added' | 'available', techItem: TechStackItem }) => {
  if (currentScope === 'available') {
    selectedtech.value.push(techItem)
  } else {
    selectedtech.value = selectedtech.value.filter(selected => selected.techKey !== techItem.techKey)
  }
}
</script>

<template>
  <u-drawer
    v-model:open="showDialog"
    :dismissible="false"
    :title="updating ? 'Editando proyecto' : 'Agregando proyecto'"
    :ui="{
      container: 'max-w-[1400px] mx-auto h-fit'
    }"
    :handle="false"
    :description="
      updating
        ? 'Actualiza la información de tu proyecto'
        : 'Registra la información de tu proyecto'"
  >
    <template #body>
      <u-form
        ref="form"
        :schema="schema"
        :state="state"
        class="flex flex-col gap-4"
        @submit.prevent="onSubmit"
      >
        <section class="flex gap-4 flex-nowrap">
          <div class="h-[246px] flex justify-center aspect-og-image rounded-lg overflow-clip relative group">
            <ui-file-picker ref="filePickerRef" :accept="['image/jpeg', 'image/png', 'image/webp']" @update:file="onFileChange" />
            <lazy-dialogs-cropper ref="cropperDialog" @crop="onCropImage" />
            <template v-if="projectImageUrl">
              <img
                :src="projectImageUrl"
                alt="OG Image"
                class="h-full w-auto"
              />
              <u-button
                class="w-8 h-8 text-sm bg-orange-500 hover:bg-orange-400 hover:top-1.5 opacity-0 justify-center
                items-center absolute right-2 top-1 p-0 group-hover:top-2 group-hover:opacity-100 transition-all duration-200"
                @click="filePickerRef?.pickFile()"
              >
                <u-icon class="text-white" :size="15" name="fa6-solid:arrows-rotate" />
              </u-button>
            </template>

            <template v-else>
              <ui-dropzone :accept="['image/jpeg', 'image/png', 'image/webp']" recommended-size="1200 x 630 px" @change="onFileChange" />
            </template>
          </div>

          <div class="flex grow flex-col gap-2">
            <u-form-field
              required
              label="Nombre del proyecto"
              name="title"
              class="h-[86px]"
            >
              <u-input v-model="state.title" class="w-full" />
            </u-form-field>
            <u-form-field
              required
              label="Url del despligue"
              name="deployUrl"
              class="h-[86px]"
            >
              <u-input v-model="state.deployUrl" class="w-full" />
            </u-form-field>
            <u-form-field label="Url del repositorio de código (opcional)" name="repositoryUrl">
              <u-input v-model="state.repositoryUrl" class="w-full" />
            </u-form-field>
          </div>
        </section>
        <section class="w-full flex gap-4">
          <div class="w-[470px] h-[200px] flex flex-col gap-1 items-center">
            <p class="font-semibold">
              Selecciona las tecnologías usadas en este proyecto:
            </p>
            <div class="flex gap-1 w-full h-full">
              <div class="flex-1 grow flex flex-col gap-2 border rounded-sm p-1">
                <p class="text-sm text-slate-400">
                  Disponibles (click para agregar)
                </p>
                <div class="flex flex-col gap-1 grow overflow-auto">
                  <builder-blocks-user-project-tech-badge
                    v-for="tech in remainingTech"
                    :key="'available -' + tech.techKey"
                    :tech-item="tech"
                    scope="available"
                    @toggle-tech="toggleTechSkill"
                  />
                </div>
              </div>
              <div class="flex-1 grow flex flex-col gap-2 border rounded-sm p-1">
                <p class="text-sm text-green-400">
                  Seleccionadas (click para quitar)
                </p>
                <div class="flex flex-col gap-1 grow overflow-auto">
                  <builder-blocks-user-project-tech-badge
                    v-for="tech in selectedtech"
                    :key="'added -' + tech.techKey"
                    :tech-item="tech"
                    scope="added"
                    @toggle-tech="toggleTechSkill"
                  />
                </div>
              </div>
            </div>
          </div>
          <u-form-field
            label="Descripción de tu proyecto"
            :hint="`${state.description?.length ?? 0} / 1000`"
            name="description"
            class="h-32 grow"
            required
          >
            <u-textarea
              v-model="state.description"
              maxlength="1000"
              :ui="{ base: 'resize-none' }"
              class="w-full"
              :rows="8"
              placeholder="Este asombroso proyecto 🤩 es para..."
            />
          </u-form-field>
        </section>
        <div class="w-full flex justify-end gap-4">
          <u-button
            variant="outline"
            color="error"
            @click="close"
          >
            Cancelar
          </u-button>
          <u-button type="submit">
            Guardar
          </u-button>
        </div>
      </u-form>
    </template>
  </u-drawer>
</template>
