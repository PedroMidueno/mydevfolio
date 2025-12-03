<script setup lang="ts">
import type { ToastProps } from '@nuxt/ui'

type Props = {
  id: number
  title: string
  certificateIssuer: string
  issuedDate: string
  certificateUrl: string
}
const isLoading = ref(false)
const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'request-update', data: Props): void
  (e: 'refresh-list'): void
}>()

const onDeleteCertification = async () => {
  isLoading.value = true
  try {
    await $fetch(`/api/user/certifications/${props.id}`, {
      method: 'DELETE'
    })
    emit('refresh-list')
    fireSuccessToast('Certificación eliminada')
  } catch (error) {
    fireErrorToast('Ocurrió un error al intentar eliminar la certificación')
  } finally {
    isLoading.value = false
  }
}

const confirmDeleteCertification = () => {
  const toastConfig: Partial<ToastProps> = {
    title: '¿Eliminar certificación permanentemente?',
    description: 'Esta acción no se puede deshacer',
    actions: [
      {
        label: 'Eliminar',
        color: 'error',
        variant: 'outline',
        onClick: async () => { await onDeleteCertification() }
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
  <article class="border text-gray-100 p-4 rounded-md bg-[var(--ui-bg)] border-gray-600 flex flex-col gap-2">
    <div class="text-xl font-semibold">
      {{ props.title }}
    </div>
    <div class="text-sm text-gray-400">
      {{ props.certificateIssuer }}
    </div>
    <div class="flex justify-between items-center">
      {{ parseDateToMonthAndYear(props.issuedDate) }}
      <div>
        <u-button :to="props.certificateUrl" target="_blank">
          Ver certificado
        </u-button>
      </div>
    </div>

    <hr class="w-full border border-gray-600" />

    <div class="flex gap-2 mt-4 justify-end">
      <u-button
        variant="outline"
        color="error"
        :loading="isLoading"
        @click="confirmDeleteCertification"
      >
        Eliminar
      </u-button>
      <u-button :disabled="isLoading" @click="emit('request-update', props)">
        Editar
      </u-button>
    </div>
  </article>
</template>
