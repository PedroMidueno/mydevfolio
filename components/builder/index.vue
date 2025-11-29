<script setup lang="ts">
const { data: portfolioStatus, refresh, pending } = await useFetch('/api/user/page/status')
const isLoading = ref(false)

const publishPortfolio = async () => {
  isLoading.value = true
  try {
    await $fetch('/api/user/page/status', {
      method: 'PUT',
      body: {
        status: true
      }
    })
    await refresh()

    fireSuccessToast('Ahora tu Devfolio está publicado')
  } catch (error) {
    fireErrorToast('Ocurrió un error al publicar tu portfolio')
  } finally {
    isLoading.value = false
  }
}

const confirmPublishPortfolio = () => {
  showToast({
    title: '¿Publicar portfolio?',
    description: 'Esta acción no se puede revertir',
    actions: [
      {
        label: 'Publicar',
        color: 'primary',
        onClick: async () => { await publishPortfolio() }
      },
      {
        label: 'Cancelar',
        color: 'error',
        variant: 'outline'
      }
    ],
    duration: 10000,
    icon: 'fa6-solid:triangle-exclamation'
  })
}

const copyPortfolioUrl = () => {
  // TODO: Copiar enlace al devfolio
  fireSuccessToast('Enlace copiado')
}
</script>

<template>
  <section class="flex flex-col gap-8 py-8 w-full min-h-[calc(100vh-64px)]">
    <div class="custom-container flex justify-between">
      <h1 class="text-2xl font-bold text-primary">
        Consulta y edita la información de tu Devfolio
      </h1>

      <div class="flex gap-2 items-center">
        <template v-if="portfolioStatus?.isPublished === true">
          <u-tooltip text="Copiar enlace a mi Devfolio" :delay-duration="150">
            <u-button
              variant="link"
              icon="fa6-solid:copy"
              class="text-white"
              @click="copyPortfolioUrl"
            />
          </u-tooltip>
          <u-chip standalone inset color="success" />
          <span class="block text text-green-400">Publicado</span>
        </template>

        <template v-else>
          <u-tooltip text="Publicar" :delay-duration="150">
            <u-button
              variant="link"
              class="text-white"
              @click="confirmPublishPortfolio"
            >
              <u-icon
                :name="isLoading || pending ? 'fa6-solid:arrows-rotate' :'fa6-solid:arrow-up-from-bracket'"
                :class="[{ 'animate-rotate': isLoading || pending }]"
              />
            </u-button>
          </u-tooltip>
          <u-chip standalone inset color="warning" />
          <span class="block text text-yellow-400">No publicado</span>
        </template>
      </div>
    </div>
    <builder-blocks-user-data />
    <builder-blocks-user-contact />
    <builder-blocks-user-experience />
    <builder-blocks-user-project />
    <builder-blocks-user-skills />
    <builder-blocks-user-education />
    <builder-blocks-user-certification />
  </section>
</template>
