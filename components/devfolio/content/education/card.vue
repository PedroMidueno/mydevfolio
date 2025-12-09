<script setup lang="ts">
import { motion } from 'motion-v'

interface Props {
  title: string
  school: string
  startDate: string
  endDate: string | null
  isCurrentSchool: boolean
}

const props = defineProps<Props>()
</script>

<template>
  <motion.article
    class="w-full flex flex-col gap-1 items-center md:last:odd:col-span-2 md:last:odd:justify-self-center md:last:odd:max-w-1/2"
    :initial="{
      opacity: 0,
      filter: 'blur(5px)'
    }"
    :while-in-view="{
      opacity: 1,
      filter: 'blur(0px)'
    }"
    :transition="{
      duration: 0.7,
      delay: 0.3,
      ease: 'easeOut'
    }"
    :in-view-options="{ once: true }"
  >
    <h3 class="text-xl md:text-2xl">
      {{ props.title }}
    </h3>

    <div class="w-full flex flex-col items-center">
      <span
        class="block text-gray-400 text-sm sm:text-base italic"
      >
        {{ props.school }}
      </span>

      <span
        class="block text-gray-400 text-xs sm:text-sm italic"
      >
        {{ `${parseDateToMonthAndYear(props.startDate)} - ${props.isCurrentSchool ? 'actualidad' : parseDateToMonthAndYear(props.endDate!)}` }}
      </span>
    </div>
  </motion.article>
</template>
