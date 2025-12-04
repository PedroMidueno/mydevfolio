<script setup lang="ts">
interface Props {
  code: string
}

const props = defineProps<Props>()

const { data: devfolioData, error } = await useFetch(`/api/devfolio/${props.code}`)
</script>

<template>
  <section class="w-full min-h-[100dvh] bg-gray-950 text-white flex flex-col items-center overflow-hidden relative">
    <devfolio-seo-tags />

    <devfolio-navbar />

    <main class="devfolio-container flex flex-col items-center gap-8 xl:border-x border-slate-800">
      <devfolio-content-hero v-bind="devfolioData!.heroInfo" />

      <devfolio-content-experience :experiences="devfolioData?.jobExperiences ?? []" />

      <devfolio-content-projects />

      <devfolio-content-skills />

      <devfolio-content-education />

      <devfolio-content-certificates />
    </main>

    <devfolio-footer />
  </section>
</template>
