<script setup lang="ts">
import type { DialogsExperienceForm } from '#components'

const experienceForm = ref<InstanceType<typeof DialogsExperienceForm>>()

const { data: userExperiences, refresh, pending } = await useFetch('/api/user/experience', {
  method: 'get'
})

interface IExperienceItem {
  id: number | undefined
  jobTitle: string | undefined
  company: string | undefined
  jobDescription: string | undefined
  startDate: string | undefined
  endDate: string | undefined
  isCurrentJob: boolean
}
</script>

<template>
  <section class="flex flex-col gap-2 px-4">
    <dialogs-experience-form ref="experienceForm" @update-records="refresh" />
    <h2 class="text-xl font-semibold mb-2">
      Experiencia laboral
    </h2>

    <div class="w-full flex flex-col gap-4 items-start">
      <u-button :loading="pending" @click="experienceForm?.open()">
        Agregar experiencia laboral
      </u-button>

      <div class="flex gap-2 flex-wrap w-full">
        <template v-if="(userExperiences ?? []).length > 0">
          <builder-blocks-user-experience-card
            v-for="userExperience of userExperiences"
            v-bind="({ ...userExperience } as IExperienceItem)"
            :key="userExperience.id"
            @update-records="refresh"
            @request-update="(data: IExperienceItem) => { experienceForm!.open(true, data) }"
          />
        </template>
        <span v-else class="text-gray-400">
          No has registrado ninguna de tus experiencias laborales aún
        </span>
      </div>
    </div>
  </section>
</template>
