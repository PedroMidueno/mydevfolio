<script setup lang="ts">
import { motion } from 'motion-v'

interface Props {
  title: string
  certificateIssuer: string
  issuedDate: string
  certificateUrl: string
}

const props = defineProps<Props>()
</script>

<template>
  <motion.article
    class="flex flex-col w-full items-center md:last:odd:col-span-2 md:last:odd:justify-self-center md:last:odd:max-w-1/2"
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
    <h3 class="text-lg md:text-xl text-center">
      <a
        :href="props.certificateUrl"
        rel="noopener, noreferrer"
        target="_blank"
      >
        <span>{{ props.title }}</span>
        <u-icon name="fa6-solid:arrow-up-right-from-square" class="w-3 h-3 text-blue-400 ml-2" />
      </a>
    </h3>

    <div class="flex gap-1">
      <span class="block text-sm md:text-base text-gray-400">{{ props.certificateIssuer }}</span>
      <span class="block text-sm md:text-base text-gray-400">{{ parseDateToMonthAndYear(props.issuedDate) }}</span>
    </div>
  </motion.article>
</template>
