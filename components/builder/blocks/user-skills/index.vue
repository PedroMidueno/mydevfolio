<script setup lang="ts">
import type { TechSkillKey } from '@/prisma/seeds/catalogs/tech-skills'

const { data: userSkills, error, refresh, pending } = await useFetch('/api/user/tech-skills')
if (error.value) {
  fireErrorToast('Ocurrió un erro al recuperar el catálogo de tecnologías')
}
const { techSkillCat } = useTechSkillCat()
const selectedTech = ref<TechSkillKey | undefined>(undefined)
const isAddingTech = ref(false)
const isLoading = ref(false)
const availableTech = computed(() => {
  return techSkillCat.value?.filter(tech => {
    return !userSkills.value?.some(userSkill => userSkill.techKey === tech.techKey)
  }).map(skill => ({
    label: skill.name,
    techSkillKey: skill.techKey,
    avatar: {
      src: skill.logo,
      alt: `Logo de tecnología ${skill.name}`
    }
  }))
})

const addTechSkill = async (skill: TechSkillKey) => {
  isLoading.value = true
  try {
    await $fetch(`/api/user/tech-skills/${skill}`, {
      method: 'POST'
    })
    await refresh()
    isAddingTech.value = false
    fireSuccessToast('Tecnología agregada')
    selectedTech.value = undefined
  } catch (error) {
    fireErrorToast('Ocurrió un error al agregar la tecnología')
  } finally {
    isLoading.value = false
  }
}

watch(selectedTech, async selected => {
  if (!selected) return

  await addTechSkill(selected)
})
</script>

<template>
  <section id="stack-tecnologico" class="custom-container flex flex-col gap-2">
    <h2 class="text-xl font-semibold mb-2">
      Mi stack tecnológico
    </h2>

    <div class="flex gap-2 items-center">
      <u-button :loading="pending || isLoading" @click="isAddingTech = true">
        Agregar
      </u-button>
      <u-input-menu
        v-if="isAddingTech"
        v-model="selectedTech"
        value-key="techSkillKey"
        :items="availableTech"
        :ui="{
          itemLeadingAvatar: 'rounded-none [&_img]:object-contain bg-transparent'
        }"
        placeholder="Buscar"
        class="ml-2"
        :loading="isLoading"
        :disabled="isLoading"
      />
      <u-button
        v-if="isAddingTech"
        color="error"
        variant="outline"
        :loading="isLoading"
        @click="isAddingTech = false"
      >
        Cancelar
      </u-button>
    </div>

    <div v-if="userSkills && userSkills.length > 0" class="flex gap-8 mt-8 w-full flex-wrap">
      <builder-blocks-user-skills-card
        v-for="skill in userSkills"
        :key="skill.techKey"
        v-bind="{ ...skill }"
        @refresh-list="refresh"
      />
    </div>
    <span v-else class="text-gray-400">
      Agrega tecnologías para mostrar en tu portfolio
    </span>
  </section>
</template>
