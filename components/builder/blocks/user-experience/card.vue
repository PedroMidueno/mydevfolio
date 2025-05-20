<script setup lang="ts">
import type { ToastProps } from '#ui/types'

interface IExperienceItem {
  id: number | undefined
  jobTitle: string | undefined
  company: string | undefined
  jobDescription: string | undefined
  startDate: string | undefined
  endDate: string | undefined
  isCurrentJob: boolean | undefined
}

const props = defineProps<IExperienceItem>()
const emit = defineEmits(['request-update', 'update-records'])

const MONTHS = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre'
]

const parseDateTimeString = (string: string) => {
  const [date] = string.split('T')
  const [year, month] = date.split('-')

  return `${MONTHS[+month]} ${year}`
}

const onDeleteExperience = async () => {
  await $fetch(`/api/user/experience/${props.id}`, {
    method: 'DELETE'
  })
  emit('update-records')
}

const confirmDeleteExperience = () => {
  const toastConfig: Partial<ToastProps> = {
    title: '¿Eliminar experiencia permanentemente?',
    description: 'Esta acción no se puede deshacer',
    actions: [
      {
        label: 'Eliminar',
        color: 'error',
        variant: 'outline',
        onClick: async () => { await onDeleteExperience() }
      },
      {
        label: 'Cancelar',
        color: 'primary'
      }
    ],
    duration: 10000,
    icon: 'i-material-symbols-warning'
  }

  showToast(toastConfig)
}
</script>

<template>
  <article class="border text-gray-100 p-4 rounded-md bg-[var(--ui-bg)] border-gray-600 w-[calc(50%-4px)] min-w-[500px]">
    <div class="text-xl font-semibold">
      {{ props.jobTitle }}
    </div>
    <div class="text-sm text-gray-400">
      {{ props.company }}
    </div>
    <div class="text-md mb-4">
      {{ parseDateTimeString(props.startDate!) }} - {{ props.isCurrentJob? 'actualidad' : parseDateTimeString(props.endDate as string) }}
    </div>
    <div class="text-sm text-gray-400 mb-1">
      Actividades principales:
    </div>
    <p class="whitespace-pre-line h-40 overflow-y-auto border border-gray-600 rounded-md p-2">
      {{ props.jobDescription }}
    </p>

    <div class="flex gap-2 mt-4 justify-end">
      <u-button variant="outline" color="error" @click="confirmDeleteExperience">
        Eliminar
      </u-button>
      <u-button @click="emit('request-update', props)">
        Editar
      </u-button>
    </div>
  </article>
</template>
