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
    id="formacion"
    class="w-full flex flex-col gap-8 items-center py-8 mt-8"
  >
    <ui-devfolio-section-title text="Formación" />

    <div
      class="grid grid-cols-1 w-full gap-8 md:grid-cols-2 justify-items-center"
    >
      <devfolio-content-education-card
        v-for="education in props.educations"
        :key="education.title"
        v-bind="education"
      />
    </div>
  </section>
</template>
