<script setup lang="ts">
import type { LazyDialogsCertificationForm } from '#components'

const { data: userCertifications, refresh, pending } = await useFetch('/api/user/certifications', { method: 'GET' })
const certificationForm = useTemplateRef<InstanceType<typeof LazyDialogsCertificationForm>>('certificationForm')
</script>

<template>
  <section id="certificaciones" class="custom-container flex flex-col gap-2 px-4">
    <lazy-dialogs-certification-form ref="certificationForm" @refresh-list="refresh" />
    <h2 class="text-xl font-semibold mb-2">
      Mis certificaciones
    </h2>

    <div class="w-full flex flex-col gap-4 items-start">
      <u-button :loading="pending" @click="certificationForm?.open()">
        Agregar certificación
      </u-button>

      <div v-if="userCertifications && userCertifications.length > 0" class="grid grid-cols-3 gap-4 w-full">
        <builder-blocks-user-certification-card
          v-for="certification in userCertifications"
          :key="certification.id"
          v-bind="{ ...certification }"
          @request-update="certificationForm?.open(true, certification)"
          @refresh-list="refresh"
        />
      </div>
      <span v-else class="text-gray-400">
        Aún no has agregado ninguna certificación
      </span>
    </div>
  </section>
</template>
