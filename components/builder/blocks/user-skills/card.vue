<script setup lang="ts">
interface Props {
  techKey: string
  name: string
  logo: string
}
const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'refresh-list'): void
}>()

const onDeleteTechSkill = async () => {
  try {
    await $fetch(`/api/user/tech-skills/${props.techKey}`, {
      method: 'DELETE'
    })
    emit('refresh-list')
    fireSuccessToast('Tecnología removida')
  } catch (error) {
    fireErrorToast('Ocurrió un error al remover la tecnología')
  }
}
</script>

<template>
  <div class="flex flex-col items-center gap-2 relative">
    <u-tooltip :text="`Remover ${props.name}`">
      <u-button
        size="xs"
        icon="fa6-solid:xmark"
        class="rounded-full absolute -top-4 -right-4"
        color="error"
        @click="onDeleteTechSkill"
      />
    </u-tooltip>
    <figure class="h-20 w-20 flex justify-center items-center">
      <img :src="props.logo" :alt="`Logo de ${props.name}`" class="h-full w-full object-contain" />
    </figure>
    <p class="text-xs text-gray-400">
      {{ props.name }}
    </p>
  </div>
</template>
