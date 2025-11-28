<template>
  <footer class="bg-[var(--ui-bg)] border-t border-gray-500">
    <div class="custom-container grid grid-cols-3 py-4 items-center">
      <h3 class="text-xl font-bold">
        My Devfolio Logo
      </h3>
      <p class="text-center">
        Hecho con <ui-icons-heart class="h-5 w-5 fill-[#42b883] inline-block mx-1" /> por<a href="#"> Pedro Midueño</a>
      </p>
      <div class="flex justify-end">
        <u-tooltip :delay-duration="100" text="Reportar un bug">
          <u-button
            icon="fa6-solid:bug"
            to="#"
            variant="link"
            aria-label="Reportar un bug"
          />
        </u-tooltip>
      </div>
    </div>
  </footer>
</template>
