<script setup lang="ts">
interface Props {
  jobTitle: string
  company: string
  startDate: string
  endDate: string | null
  isCurrentJob: boolean
  jobDescription: string
}

const props = defineProps<Props>()
const showDialog = ref(false)

defineExpose({
  open: () => {
    showDialog.value = true
  }
})
</script>

<template>
  <u-modal
    v-model:open="showDialog"
    :ui="{
      content: 'max-w-2xl'
    }"
    :title="`Detalle del empleo`"
    :description="`Información detallada del empleo ${props.jobTitle}`"
  >
    <template #content>
      <div class="py-8 px-4 md:py-12 md:px-6 max-h-[90dvh] overflow-y-auto">
        <div class="text-lg md:text-xl font-semibold">
          {{ props.jobTitle }}
        </div>
        <div class="text-xs md:text-sm text-gray-400">
          {{ props.company }}
        </div>
        <div class="text-sm md:text-base mb-4">
          {{ `${parseDateToMonthAndYear(props.startDate)} - ${props.isCurrentJob ? 'actualidad' : parseDateToMonthAndYear(props.endDate!)}` }}
        </div>
        <div class="text-xs md:text-sm text-gray-400">
          Actividades principales:
        </div>
        <p class="whitespace-pre-line text-sm md:text-base text-balance">
          {{ props.jobDescription }}
        </p>
        <div class="pt-8 w-full flex justify-end">
          <u-button class="text-sm md:text-base" variant="subtle" @click="showDialog = false">
            Cerrar
          </u-button>
        </div>
      </div>
    </template>
  </u-modal>
</template>
