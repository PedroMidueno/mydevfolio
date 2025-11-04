<script setup lang="ts">
import type { ToastProps } from '@nuxt/ui'
import type { IProjectItem } from './types'

const isLoading = ref(false)
const props = defineProps<IProjectItem>()
const emit = defineEmits<{
  (e: 'request-update', project: IProjectItem): void
  (e: 'refresh-list'): void
}>()

const { bucketPrefixUrl } = useRuntimeConfig().public

const onDeleteProject = async () => {
  isLoading.value = true
  try {
    await $fetch(`/api/user/projects/${props.id}`, {
      method: 'DELETE'
    })
    fireSuccessToast('Proyecto eliminado')
    emit('refresh-list')
  } catch (error) {
    fireErrorToast('Ocurrió un error al eliminar el proyecto')
  } finally {
    isLoading.value = false
  }
}

const confirmDeleteProject = () => {
  const toastConfig: Partial<ToastProps> = {
    title: '¿Eliminar proyecto permanentemente?',
    description: 'Esta acción no se puede deshacer',
    actions: [
      {
        label: 'Eliminar',
        color: 'error',
        variant: 'outline',
        onClick: async () => { await onDeleteProject() }
      },
      {
        label: 'Cancelar',
        color: 'primary'
      }
    ],
    duration: 10000,
    icon: 'fa6-solid:triangle-exclamation'
  }

  showToast(toastConfig)
}
</script>

<template>
  <article class="border text-gray-100 p-4 rounded-md bg-[var(--ui-bg)] border-gray-600 flex flex-col gap-2 items-center">
    <div class="w-96 aspect-og-image rounded-sm overflow-clip border border-gray-600">
      <img
        :src="`${bucketPrefixUrl}/${props.imageKey}`"
        :alt="`Imagen de proyecto ${props.title}`"
        loading="lazy"
        class="w-full aspect-og-image"
      />
    </div>

    <div>
      <h3 class="text-lg font-semibold">
        {{ props.title }}
      </h3>
    </div>

    <div class="w-full flex flex-col gap-1">
      <p class="text-gray-400 text-sm">
        Descripción del proyecto:
      </p>
      <p class="whitespace-pre-line h-32 overflow-y-auto rounded-sm border border-gray-600 p-1">
        {{ props.description }}
      </p>
    </div>

    <div class="w-full flex flex-col gap-1">
      <p class="text-gray-400 text-sm">
        Tecnologías usadas:
      </p>
      <div class="flex w-full gap-2 items-center px-2">
        <template v-for="tech in props.techStack" :key="tech.techKey">
          <u-tooltip :text="tech.name">
            <div class="w-6">
              <img :src="tech.logo" :alt="`Logo de ${tech.name}`" class="w-full object-contain" />
            </div>
          </u-tooltip>
        </template>
      </div>
    </div>

    <div class="w-full flex flex-col gap-1">
      <p class="text-gray-400 text-sm">
        Enlaces registrados:
      </p>
      <div class="flex items-center gap-4">
        <u-button
          label="Despliegue"
          icon="fa6-solid:arrow-up-right-from-square"
          :to="props.deployUrl"
          target="_blank"
        />
        <u-tooltip text="Sin información" :disabled="!!props.repositoryUrl">
          <u-button
            label="Repositorio"
            icon="fa6-brands:github"
            :disabled="!props.repositoryUrl"
            :to="props.repositoryUrl"
            target="_blank"
          />
        </u-tooltip>
      </div>
    </div>

    <hr class="w-full border border-gray-600 my-2" />

    <div class="flex justify-end w-full gap-2">
      <u-button
        variant="outline"
        color="error"
        :loading="isLoading"
        @click="confirmDeleteProject"
      >
        Eliminar
      </u-button>
      <u-button :disabled="isLoading" @click="emit('request-update', { ...props, imageKey: `${bucketPrefixUrl}/${imageKey}` })">
        Editar
      </u-button>
    </div>
  </article>
</template>
