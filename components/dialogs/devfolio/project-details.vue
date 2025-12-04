<script setup lang="ts">
interface Props {
  title: string
  description: string
}
const props = defineProps<Props>()
const showDialog = ref(false)

defineExpose({
  open: () => {
    showDialog.value = true
  }
})
</script>

<template>
  <u-modal
    v-model:open="showDialog"
    :title="`Detalles del proyecto ${props.title}`"
    :description="`Descripción completa del proyecto ${props.title}`"
    :ui="{
      content: 'max-w-2xl'
    }"
  >
    <template #content>
      <div class="w-full py-8 px-4 md:py-12 md:px-6 max-h-[90dvh] overflow-y-auto flex flex-col gap-2">
        <p class="text-primary text-base font-semibold md:text-lg">
          Descripción completa del proyecto {{ props.title }}
        </p>
        <p class="text-sm md:text-base text-gray-200">
          {{ props.description }}
        </p>

        <div class="w-full flex justify-end">
          <u-button class="text-sm md:text-base" variant="subtle" @click="showDialog = false">
            Cerrar
          </u-button>
        </div>
      </div>
    </template>
  </u-modal>
</template>
