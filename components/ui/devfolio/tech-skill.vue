<script setup lang="ts">
interface Props {
  name: string
  logo: string
}
const props = defineProps<Props>()
</script>

<template>
  <u-tooltip :text="props.name">
    <picture>
      <img
        class="w-full h-full object-contain"
        :src="props.logo"
        :alt="`Logotipo de ${props.name}`"
      />
    </picture>
  </u-tooltip>
</template>
