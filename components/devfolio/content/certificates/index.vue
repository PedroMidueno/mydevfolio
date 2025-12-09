<script setup lang="ts">
interface Props {
  certifications: {
    title: string
    certificateIssuer: string
    issuedDate: string
    certificateUrl: string
  }[]
}

const props = defineProps<Props>()
</script>

<template>
  <section
    id="certificaciones"
    class="w-full flex flex-col gap-8 items-center py-8 mt-8"
  >
    <ui-devfolio-section-title text="Certificaciones" />

    <div
      class="grid grid-cols-1 w-full gap-8 md:grid-cols-2"
    >
      <devfolio-content-certificates-card
        v-for="(certification, index) in props.certifications"
        :key="certification.title + index"
        v-bind="certification"
      />
    </div>
  </section>
</template>
