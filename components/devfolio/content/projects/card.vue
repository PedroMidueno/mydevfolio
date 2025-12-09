<script setup lang="ts">
import { motion } from 'motion-v'

interface Props {
  title: string
  description: string
  techStack: { name: string, logo: string }[]
  repositoryUrl: string | null
  deployUrl: string
  image: string
  isEven: boolean
}
const props = defineProps<Props>()
const projectDetailsRef = useTemplateRef('project-details')
</script>

<template>
  <motion.article
    class="rounded-md overflow-clip flex flex-col items-center md:last:odd:col-span-2 md:last:odd:justify-self-center md:last:odd:max-w-1/2"
    :initial="{
      opacity: 0,
      filter: 'blur(10px)',
      x: props.isEven ? 30 : -30
    }"
    :while-in-view="{
      opacity: 1,
      filter: 'blur(0px)',
      x: 0
    }"
    :in-view-options="{ once: true }"
    :transition="{
      duration: 0.6,
      ease: 'easeOut',
      delay: 0.3
    }"
  >
    <div class="relative w-full aspect-og-image">
      <div class="absolute w-full h-full bg-linear-to-b from-transparent from-20% to-gray-950"></div>
      <img :src="props.image" :alt="`Imagen del proyecto ${props.title}`" />
    </div>

    <div class="flex flex-col w-full gap-4 px-4 -mt-6 z-10 pb-4">
      <h3 class="text-xl font-semibold text-center">
        {{ props.title }}
      </h3>
      <ui-devfolio-clamped-paragraph
        :text="props.description"
        class="text-center text-gray-300"
        @request-show-more="projectDetailsRef?.open()"
      />
      <div class="w-full flex justify-center gap-2 lg:gap-3 flex-wrap">
        <ui-devfolio-tech-skill
          v-for="techSkill in props.techStack"
          :key="techSkill.name"
          v-bind="techSkill"
          class="h-6 w-6 md:h-8 md:w-8"
        />
      </div>
      <div class="flex gap-2 justify-center">
        <u-tooltip v-if="props.repositoryUrl" text="Repositorio" :delay-duration="150">
          <u-button
            :to="props.repositoryUrl"
            target="_blank"
            variant="link"
            icon="fa6-brands:github"
          />
        </u-tooltip>
        <u-tooltip text="Visitar" :delay-duration="150">
          <u-button
            :to="props.deployUrl"
            target="_blank"
            variant="link"
            icon="fa6-solid:link"
          />
        </u-tooltip>
      </div>
    </div>

    <dialogs-devfolio-project-details
      ref="project-details"
      :title="props.title"
      :description="props.description"
    />
  </motion.article>
</template>
