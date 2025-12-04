<script setup lang="ts">
interface Props {
  experiences: {
    jobTitle: string
    company: string
    startDate: string
    endDate: string | null
    isCurrentJob: boolean
    jobDescription: string
  }[]
}

const props = defineProps<Props>()
</script>

<template>
  <section
    v-if="props.experiences.length > 0"
    class="flex flex-col gap-8 items-center w-full"
  >
    <h2 class="text-2xl font-semibold md:font-bold">
      Experiencia
    </h2>

    <div
      :class="[
        'grid grid-cols-1 w-full gap-4',
        props.experiences.length > 1 ? 'md:grid-cols-2' : 'md:grid-cols-1 md:justify-items-center'
      ]"
    >
      <devfolio-content-experience-card
        v-for="experience in props.experiences"
        :key="experience.jobTitle + experience.company"
        v-bind="experience"
      />
    </div>
  </section>
</template>
