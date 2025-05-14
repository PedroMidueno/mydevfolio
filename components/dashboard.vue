<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const { data, refresh } = await useFetch('/api/user/page')

const schema = z.object({
  firstName: z.string().min(1, 'Este campo es obligatorio'),
  lastName: z.string().min(1, 'Este campo es obligatorio'),
  slug: z.string().min(1, 'Este campo es obligatorio').regex(/^[a-zA-Z0-9_-]+$/, 'Sólo se permiten los caracteres especiales - y _')
})

type Schema = z.output<typeof schema>

const { user } = useUser()

const creatingPage = ref(false)
interface State {
  firstName: string | undefined
  lastName: string | undefined
  slug: string | undefined
}
const state = reactive<State>({
  slug: '',
  firstName: user.value?.firstName ?? '',
  lastName: user.value?.lastName ?? ''
})

watch(user, user => {
  state.firstName = user?.firstName ?? ''
  state.lastName = user?.lastName ?? ''
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    await $fetch('/api/user/page', {
      method: 'POST',
      body: {
        slug: event.data.slug,
        firstName: event.data.firstName,
        lastName: event.data.lastName
      }
    })
    fireSuccessToast('Devfolio creado')
    await refresh()
  } catch (error: any) {
    fireErrorToast('Ocurrio un error al crear Devfolio')
  }
}
</script>

<template>
  <section class="flex justify-start">
    <template v-if="data?.userFirstName">
      <builder />
    </template>
    <template v-else>
      <div class="min-h-[calc(100vh-64px)] w-full flex flex-col justify-center items-center gap-4">
        <p class="text-xl font-light">
          Comienza a construir tu Devfolio
        </p>
        <template v-if="!creatingPage">
          <u-button
            variant="outline"
            class="rounded-lg p-8 h-32 flex flex-col items-center gap-2 cursor-pointer w-80"
            @click="creatingPage = true"
          >
            <span class="text-blue-300 text-xl font-bold">Crear Devfolio</span>
            <u-icon class="text-4xl" name="fa6-regular:square-plus" />
          </u-button>
        </template>
        <div v-if="creatingPage" class="h-32 flex items-start flex-col gap-2 w-fit">
          <u-form
            :schema="schema"
            :state="state"
            class="space-y-4"
            @submit="onSubmit"
          >
            <div class="flex gap-4">
              <u-form-field label="Nombre(s)" name="firstName" required>
                <u-input v-model="state.firstName" />
              </u-form-field>
              <u-form-field label="Apellido(s)" name="lastName" required>
                <u-input v-model="state.lastName" />
              </u-form-field>
            </div>
            <u-form-field label="Elige tu código" name="slug" required>
              <u-input
                v-model="state.slug"
                class="w-full"
                spellcheck="false"
                placeholder="tu-código-unico"
                :ui="{
                  base: 'pl-[154px]',
                  leading: 'pointer-events-none',
                }"
              >
                <template #leading>
                  <p class="text-sm text-muted">
                    https://mydevfolio.fyi/
                  </p>
                </template>
              </u-input>
            </u-form-field>
            <u-button type="submit">
              Comenzar
            </u-button>
          </u-form>
        </div>
      </div>
    </template>
  </section>
</template>
