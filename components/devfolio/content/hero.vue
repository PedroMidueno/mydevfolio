<script setup lang="ts">
import { motion } from 'motion-v'

interface Props {
  image: string | null
  name: string | null
  jobName: string | null
  description: string | null
  email: string | null
  cvFile: string | null
  githubUser: string | null
  linkedinUser: string | null
  twitterUser: string | null
}

const props = defineProps<Props>()

const emailCopied = ref(false)

const copyEmail = () => {
  if (!props.email) return

  navigator.clipboard.writeText(props.email)
    .then(() => {
      emailCopied.value = true
      setTimeout(() => {
        emailCopied.value = false
      }, 3_000)
    })
    .catch(() => {
      fireErrorToast('No se pudo copiar el texto')
    })
}

const downloadCv = async () => {
  if (!props.cvFile) return

  try {
    const response = await fetch(props.cvFile)
    const blob = await response.blob()

    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = `CV de ${props.name}`
    document.body.appendChild(a)
    a.click()

    a.remove()
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Error descargando el archivo:', error)
  }
}
</script>

<template>
  <section id="home" class="flex flex-col w-full items-center pt-12 gap-2 sm:gap-4 min-h-[100dvh] sm:pt-24 lg:justify-center lg:pt-0">
    <motion.div
      class="flex flex-col items-center sm:gap-1"
      :initial="{
        scale: 1.1,
        opacity: 0,
        filter: 'blur(20px)'
      }"
      :animate="{
        scale: 1,
        opacity: 1,
        filter: 'blur(0px)'
      }"
      :transition="{
        duration: 0.6,
        delay: 0.1
      }"
    >
      <img
        :src="props.image ?? 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'"
        class="w-48 aspect-square rounded-full border-2 border-slate-500"
      />
      <h1 class="mt-2 text-2xl font-bold text-center">
        {{ props.name ?? '' }}
      </h1>
      <h2 class="text-slate-400">
        {{ props.jobName ?? '' }}
      </h2>
      <p class="w-full max-w-2xl text-center mt-2 text-sm text-balance sm:text-base">
        {{ props.description ?? '' }}
      </p>
    </motion.div>

    <motion.div
      class="flex flex-col items-center"
      :initial="{
        scale: 1.1,
        opacity: 0,
        filter: 'blur(20px)'
      }"
      :animate="{
        scale: 1,
        opacity: 1,
        filter: 'blur(0px)'
      }"
      :transition="{
        duration: 0.6,
        delay: 0.3
      }"
    >
      <u-button
        variant="link"
        size="lg"
        class="text-lg"
        @click="copyEmail"
      >
        <u-icon
          size="16"
          :name="emailCopied ? 'fa6-solid:check' : 'fa6-solid:copy'"
          :class="[{ 'text-green-500': emailCopied }]"
        />
        <span class="block max-w-full break-all">{{ props.email }}</span>
      </u-button>

      <template v-if="props.cvFile">
        <u-button variant="link" class="flex items-center text-lg" @click="downloadCv">
          <u-icon name="fa6-solid:file-arrow-down" />
          Descargar cv
        </u-button>
      </template>
    </motion.div>

    <motion.div
      class="flex gap-4"
      :initial="{
        scale: 1.1,
        opacity: 0,
        filter: 'blur(20px)'
      }"
      :animate="{
        scale: 1,
        opacity: 1,
        filter: 'blur(0px)'
      }"
      :transition="{
        duration: 0.6,
        delay: 0.5
      }"
    >
      <template v-if="props.githubUser">
        <u-button
          size="xl"
          variant="link"
          icon="fa6-brands:github"
          class="text-white rounded-full"
          :to="`https://github.com/${props.githubUser}`"
          target="_blank"
          rel="noopener noreferrer"
        />
      </template>
      <template v-if="props.linkedinUser">
        <u-button
          size="xl"
          variant="link"
          icon="fa6-brands:linkedin"
          class="text-white rounded-full"
          :to="`https://www.linkedin.com/in/${props.linkedinUser}`"
          target="_blank"
          rel="noopener noreferrer"
        />
      </template>
      <template v-if="props.twitterUser">
        <u-button
          size="xl"
          variant="link"
          icon="fa6-brands:x-twitter"
          class="text-white rounded-full"
          :to="`https://x.com/${props.twitterUser}`"
          target="_blank"
          rel="noopener noreferrer"
        />
      </template>
    </motion.div>
  </section>
</template>
