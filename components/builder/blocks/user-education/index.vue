<script setup lang="ts">
import type { LazyDialogsEducationForm } from '#components'

type UserEducation = {
  id: number
  title: string
  school: string
  startDate: string
  endDate?: string
  isCurrentSchool: boolean
}

const educationForm = useTemplateRef<InstanceType<typeof LazyDialogsEducationForm>>('educationForm')
const { data: userEducation, refresh } = await useFetch('/api/user/education')
</script>

<template>
  <section class="flex flex-col gap-2 px-4">
    <lazy-dialogs-education-form ref="educationForm" @refresh-list="refresh" />
    <h2 class="text-xl font-semibold mb-2">
      Mi formación
    </h2>

    <div class="w-full flex flex-col gap-4 items-start">
      <u-button @click="educationForm?.open()">
        Agregar formación
      </u-button>

      <div v-if="userEducation && userEducation.length > 0" class="grid grid-cols-3 gap-4 w-full">
        <builder-blocks-user-education-card
          v-for="education in userEducation"
          :key="education.id"
          v-bind="({ ...education } as UserEducation)"
          @request-update="educationForm?.open(true, education as UserEducation)"
          @refresh-list="refresh"
        />
      </div>
      <span v-else class="text-gray-400">
        Aún no has agregado ninguna formación
      </span>
    </div>
  </section>
</template>
