<script setup lang="ts">
const hideSignInButton = createRouteMatcher(['/sign-in', '/sign-up'])
const route = useRoute()
</script>

<template>
  <section class="max-w-[1400px] mx-auto min-h-screen relative">
    <header class="flex justify-between h-16 items-center px-4 bg-blue-800 sticky top-0 z-10 rounded-sm">
      <div>
        <u-link class="text-xl font-bold text-gray-50" to="/">
          MyDevfolio Logo
        </u-link>
      </div>
      <div>
        <SignedOut>
          <u-link v-if="!hideSignInButton(route)" class="text-gray-50" to="/sign-in">
            Iniciar sesión
          </u-link>
        </SignedOut>
        <SignedIn>
          <user-button show-name />
        </SignedIn>
      </div>
    </header>

    <slot />
  </section>
</template>
