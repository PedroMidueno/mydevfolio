<script setup lang="ts">
import type { TechSkillKey } from '~/prisma/seeds/catalogs/tech-skills'

interface Props {
  techItem: {
    name: string
    logo: string
    techKey: TechSkillKey
  }
  scope: 'added' | 'available'
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'toggle-tech', options: { currentScope: 'added' | 'available', techItem: Props['techItem'] }): void
}>()

const onClick = () => {
  emit('toggle-tech', { currentScope: props.scope, techItem: props.techItem })
}
</script>

<template>
  <UButton
    :avatar="{
      src: `${props.techItem.logo}`,
      ui: {
        root: 'bg-transparent',
        image: 'rounded-none w-4 object-contain'
      }
    }"
    size="md"
    color="neutral"
    variant="outline"
    @click="onClick"
  >
    {{ props.techItem.name }}
  </UButton>
</template>
