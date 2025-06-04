<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { TechSkillName } from '~/prisma/seeds/catalogs/tech-skills'

const emit = defineEmits(['refetch-list'])
const requiredMessage = 'Este campo es obligatorio'
// const form = useTemplateRef('form')
const showDialog = ref<boolean>(true)
const updating = ref<boolean>(false)
const projectToUpdateId = ref<number | null>(null)

const schema = z.object({
  title: z.string({ message: requiredMessage }).min(1, requiredMessage),
  description: z.string({ message: requiredMessage }).min(1, requiredMessage),
  repositoryUrl: z.string().optional(),
  deployUrl: z.string({ message: requiredMessage }).url('Url inválida'),
  techStack: z.array(z.string(), { message: 'Seleccione al menos una tecnología' })
})

type Schema = z.output<typeof schema>

type FormProps = {
  title: string | undefined
  description: string | undefined
  repositoryUrl: string | undefined
  deployUrl: string | undefined
  techStack: TechSkillName[] | undefined
}

const state = reactive<FormProps>({
  title: undefined,
  description: undefined,
  repositoryUrl: undefined,
  deployUrl: undefined,
  techStack: undefined
})

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  console.log(event.data)
}
</script>

<template>
  <u-drawer
    v-model:open="showDialog"
    :dismissible="false"
    :title="updating ? 'Editando proyecto' : 'Creando proyecto'"
    :ui="{
      container: 'max-w-[1400px] mx-auto',
    }"
    :handle="false"
    :description="
      updating
        ? 'Actualiza la información de tu proyecto'
        : 'Registra la información de tu proyecto'"
  >
    <template #body>
    </template>
  </u-drawer>
</template>
