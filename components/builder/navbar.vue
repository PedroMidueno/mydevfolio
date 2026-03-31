<script setup lang="ts">
const hideSignInButton = createRouteMatcher(['/sign-in', '/sign-up'])
const route = useRoute()
</script>

<template>
  <nav class="custom-container top-0 flex justify-between h-full items-center w-full">
    <div>
      <u-link class="text-xl font-bold text-gray-50 block h-12" to="/">
        <picture class="h-full flex justify-center items-center">
          <img class="h-full object-contain" src="/logo.png" alt="MyDevfolio logo" />
        </picture>
      </u-link>
    </div>
    <div>
      <signed-out>
        <u-link v-if="!hideSignInButton(route)" class="text-gray-50" to="/sign-in">
          Iniciar sesión
        </u-link>
      </signed-out>

      <signed-in>
        <div class="flex gap-8 items-center h-full">
          <div class="flex gap-4 text-sm">
            <u-link class="text-white hover:underline hover:text-white" to="#informacion-general">
              General
            </u-link>
            <u-link class="text-white hover:underline hover:text-white" to="#contacto">
              Contacto
            </u-link>
            <u-link class="text-white hover:underline hover:text-white" to="#experiencia-laboral">
              Experiencia
            </u-link>
            <u-link class="text-white hover:underline hover:text-white" to="#proyectos">
              Proyectos
            </u-link>
            <u-link class="text-white hover:underline hover:text-white" to="#stack-tecnologico">
              Stack
            </u-link>
            <u-link class="text-white hover:underline hover:text-white" to="#formacion">
              Formación
            </u-link>
            <u-link class="text-white hover:underline hover:text-white" to="#certificaciones">
              Certificaciones
            </u-link>
          </div>
          <div class="min-w-32">
            <user-button show-name />
          </div>
        </div>
      </signed-in>
    </div>
  </nav>
</template>
