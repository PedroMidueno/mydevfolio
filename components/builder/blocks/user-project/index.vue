<script setup lang="ts">
import type { LazyDialogsProjectForm } from '#components'
import type { IProjectItem } from './types'

const projectForm = useTemplateRef<InstanceType<typeof LazyDialogsProjectForm>>('projectForm')
const { data: userProjects, refresh } = await useFetch('/api/user/projects', {
  method: 'get'
})
</script>

<template>
  <section class="flex flex-col gap-2 px-4">
    <lazy-dialogs-project-form ref="projectForm" @refresh-list="refresh" />
    <h2 class="text-xl font-semibold mb-2">
      Proyectos
    </h2>

    <div class="w-full flex flex-col gap-4 items-start">
      <u-button @click="projectForm?.open()">
        Agregar proyecto
      </u-button>

      <div class="flex flex-wrap w-full gap-8">
        <template v-if="(userProjects ?? []).length > 0">
          <builder-blocks-user-project-card
            v-for="userProject of userProjects"
            v-bind="({ ...userProject } as IProjectItem)"
            :key="userProject.id"
            @refresh-list="refresh"
            @request-update="(data: IProjectItem) => { projectForm!.open(true, data) }"
          />
        </template>
        <span v-else class="text-gray-400">
          No has registrado ningún proyecto
        </span>
      </div>
    </div>
  </section>
</template>
