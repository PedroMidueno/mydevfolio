<script setup lang="ts">

</script>

<template>
  <div class="min-h-dvh grid grid-rows-[auto_1fr_auto] grid-cols-1 w-full">
    <div class="h-16 bg-blue-900 sticky top-0 z-10">
      <builder-navbar />
    </div>

    <main>
      <slot />
    </main>

    <builder-footer />
  </div>
</template>
