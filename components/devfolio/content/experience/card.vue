<script setup lang="ts">
import { motion } from 'motion-v'

interface Props {
  jobTitle: string
  company: string
  startDate: string
  endDate: string | null
  isCurrentJob: boolean
  jobDescription: string
}

const props = defineProps<Props>()
const jobDetailsRef = useTemplateRef('jobDetailsModal')
</script>

<template>
  <motion.article
    class="border border-gray-700 p-4 rounded-md max-w-lg"
    :initial="{
      opacity: 0,
      y: 30
    }"
    :while-in-view="{
      opacity: 1,
      y: 0
    }"
    :transition="{
      duration: 0.6,
      delay: 0.3,
      ease: 'easeOut'
    }"
    :in-view-options="{ once: true }"
  >
    <h3 class="text-lg md:text-xl font-semibold">
      {{ props.jobTitle }}
    </h3>
    <div class="text-xs md:text-sm text-gray-400">
      {{ props.company }}
    </div>
    <div class="text-sm md:text-base mb-4">
      {{ `${parseDateToMonthAndYear(props.startDate)} - ${props.isCurrentJob ? 'actualidad' : parseDateToMonthAndYear(props.endDate!)}` }}
    </div>
    <div class="text-xs md:text-sm text-gray-400">
      Actividades principales:
    </div>
    <ui-devfolio-clamped-paragraph :text="props.jobDescription" @request-show-more="jobDetailsRef?.open()" />

    <dialogs-devfolio-job-details v-bind="props" ref="jobDetailsModal" />
  </motion.article>
</template>
