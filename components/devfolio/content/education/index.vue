<script setup lang="ts">
interface Props {
  educations: {
    title: string
    school: string
    startDate: string
    endDate: string | null
    isCurrentSchool: boolean
  }[]
}

const props = defineProps<Props>()
</script>

<template>
  <section
    id="education"
    class="w-full flex flex-col gap-8 items-center py-8 mt-8"
  >
    <ui-devfolio-section-title text="Formación" />

    <div
      :class="[
        'grid grid-cols-1 w-full gap-8 md:gap-4 justify-items-center md:justify-items-normal',
        props.educations.length > 1 ? 'md:grid-cols-2' : 'md:grid-cols-1 md:justify-items-center'
      ]"
    >
      <devfolio-content-education-card
        v-for="education in props.educations"
        :key="education.title"
        v-bind="education"
      />
    </div>
  </section>
</template>
