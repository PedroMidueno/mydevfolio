<script setup lang="ts">
interface Props {
  code: string
}

const props = defineProps<Props>()

const { data: devfolioData, error } = await useFetch(`/api/devfolio/${props.code}`)
</script>

<template>
  <section class="w-full min-h-dvh bg-gray-950 text-white flex flex-col items-center overflow-hidden relative">
    <devfolio-seo-tags />

    <devfolio-navbar />

    <main class="devfolio-container flex flex-col items-center gap-8 xl:border-x border-slate-800">
      <devfolio-content-hero v-bind="devfolioData!.heroInfo" />

      <devfolio-content-experience
        v-if="devfolioData?.jobExperiences && devfolioData.jobExperiences.length > 0"
        :experiences="devfolioData.jobExperiences"
      />

      <devfolio-content-projects
        v-if="devfolioData?.projects && devfolioData.projects.length > 0"
        :projects="devfolioData.projects"
      />

      <devfolio-content-skills
        v-if="devfolioData?.techSkills && devfolioData.techSkills.length > 0"
        :tech-skills="devfolioData.techSkills"
      />

      <devfolio-content-education
        v-if="devfolioData?.educations && devfolioData.educations.length > 0"
        :educations="devfolioData.educations"
      />

      <devfolio-content-certificates
        v-if="devfolioData?.certifications && devfolioData.certifications.length > 0"
        :certifications="devfolioData.certifications"
      />
    </main>

    <devfolio-footer />
  </section>
</template>
