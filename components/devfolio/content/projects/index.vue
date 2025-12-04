<script setup lang="ts">
interface Props {
  projects: {
    title: string
    description: string
    techStack: { name: string, logo: string }[]
    repositoryUrl: string | null
    deployUrl: string
    image: string
  }[]
}

const props = defineProps<Props>()
</script>

<template>
  <section class="w-full flex flex-col gap-8 items-center py-8 mt-16">
    <ui-devfolio-section-title text="Proyectos" />
    <div
      :class="[
        'w-full grid grid-cols-1 gap-8 md:gap-4 justify-items-center md:justify-normal',
        props.projects.length > 1 ? 'md:grid-cols-2' : 'md:grid-cols-1 md:justify-items-center'
      ]"
    >
      <devfolio-content-projects-card
        v-for="(project, index) in props.projects"
        :key="project.title"
        v-bind="project"
        :is-even="(index + 1) % 2 === 0"
      />
    </div>
  </section>
</template>
