<script setup lang="ts">
import { motion } from 'motion-v'

interface Props {
  text: string
}

const props = defineProps<Props>()
</script>

<template>
  <motion.h2
    class="text-2xl font-semibold md:font-bold"
    :initial="{
      scale: 0.9,
      filter: 'blur(5px)',
      opacity: 0
    }"
    :while-in-view="{
      scale: 1,
      filter: 'blur(0px)',
      opacity: 1
    }"
    :in-view-options="{ once: true }"
    :transition="{
      delay: 0.1,
      duration: 0.6,
      ease: 'easeOut'
    }"
  >
    {{ props.text }}
  </motion.h2>
</template>
