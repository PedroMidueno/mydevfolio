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
    id="experiencia"
    class="flex flex-col gap-8 items-center w-full !scroll-m-12 sm:!scroll-m-20"
  >
    <ui-devfolio-section-title text="Experiencia" />

    <div
      class="grid grid-cols-1 w-full gap-8 md:grid-cols-2 justify-items-center"
    >
      <devfolio-content-experience-card
        v-for="experience in props.experiences"
        :key="experience.jobTitle + experience.company"
        v-bind="experience"
      />
    </div>
  </section>
</template>
