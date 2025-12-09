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
  <section
    id="proyectos"
    class="w-full flex flex-col gap-8 items-center py-8 mt-16"
  >
    <ui-devfolio-section-title text="Proyectos" />
    <div
      class="grid grid-cols-1 w-full gap-8 md:grid-cols-2"
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
