<script setup lang="ts">
import type { MotionProps } from 'motion-v'

interface Props {
  techSkills: {
    name: string
    logo: string
  }[]
}

const props = defineProps<Props>()

const containerVariants: MotionProps['variants'] = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
}

const itemVariants: MotionProps['variants'] = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      visualDuration: 0.3,
      bounce: 0.5
    }
  }
}
</script>

<template>
  <section id="stack" class="w-full flex flex-col gap-8 items-center py-8 mt-8">
    <ui-devfolio-section-title text="Habilidades técnicas" />

    <Motion
      :variants="containerVariants"
      initial="hidden"
      while-in-view="visible"
      :in-view-options="{ amount: 0.2, once: true }"
      class="w-full flex-wrap flex justify-center gap-8"
    >
      <Motion
        v-for="techSkill in props.techSkills"
        :key="'skill' + techSkill.name"
        :variants="itemVariants"
        class="w-16 h-16 md:w-20 md:h-20"
      >
        <ui-devfolio-tech-skill
          :name="techSkill.name"
          :logo="techSkill.logo"
        />
      </Motion>
    </Motion>
  </section>
</template>
