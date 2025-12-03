<script setup lang="ts">
const { params } = useRoute()

definePageMeta({
  layout: false
})
</script>

<template>
  <devfolio :code="(params.code as string)" />
</template>
