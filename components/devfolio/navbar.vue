<script setup lang="ts">
import { motion, type MotionProps } from 'motion-v'

const containerVariants: MotionProps['variants'] = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
}

const itemVariants: MotionProps['variants'] = {
  hidden: { y: 60 },
  visible: {
    y: 0,
    transition: {
      type: 'spring',
      visualDuration: 0.3,
      bounce: 0.5
    }
  }
}
</script>

<template>
  <nav
    class="fixed bottom-0 sm:bottom-auto sm:border-0 sm:mt-4 w-full border-t border-slate-800 bg-gray-950 sm:bg-transparent z-100"
  >
    <motion.div
      id="navbar"
      class="mx-auto flex justify-between w-full sm:w-fit py-2 px-4 overflow-y-hidden sm:justify-center sm:gap-4 sm:border sm:border-slate-800 sm:rounded-full sm:bg-gray-950/70"
      initial="hidden"
      animate="visible"
      :variants="containerVariants"
    >
      <Motion :variants="itemVariants">
        <u-tooltip text="Inicio" :delay-duration="100">
          <u-button
            to="#"
            variant="link"
          >
            <u-icon class="w-6 h-6 text-blue-400" name="fa6-solid:house" />
          </u-button>
        </u-tooltip>
      </Motion>

      <Motion :variants="itemVariants">
        <u-tooltip text="Experiencia" :delay-duration="100">
          <u-button
            to="#experiencia"
            variant="link"
          >
            <u-icon class="w-6 h-6 text-blue-400" name="fa6-solid:user-tie" />
          </u-button>
        </u-tooltip>
      </Motion>

      <Motion :variants="itemVariants">
        <u-tooltip text="Proyectos" :delay-duration="100">
          <u-button
            to="#proyectos"
            variant="link"
          >
            <u-icon class="w-6 h-6 text-blue-400" name="fa6-solid:suitcase" />
          </u-button>
        </u-tooltip>
      </Motion>

      <Motion :variants="itemVariants">
        <u-tooltip text="Stack" :delay-duration="100">
          <u-button
            to="#stack"
            variant="link"
          >
            <u-icon class="w-6 h-6 text-blue-400" name="fa6-solid:toolbox" />
          </u-button>
        </u-tooltip>
      </Motion>

      <Motion :variants="itemVariants">
        <u-tooltip text="Formación" :delay-duration="100">
          <u-button
            to="#formacion"
            variant="link"
          >
            <u-icon class="w-6 h-6 text-blue-400" name="fa6-solid:user-graduate" />
          </u-button>
        </u-tooltip>
      </Motion>

      <Motion :variants="itemVariants">
        <u-tooltip text="Certificaciones" :delay-duration="100">
          <u-button
            to="#certificaciones"
            variant="link"
          >
            <u-icon class="w-6 h-6 text-blue-400" name="fa6-solid:certificate" />
          </u-button>
        </u-tooltip>
      </Motion>
    </motion.div>
  </nav>
</template>

<style scoped>
#navbar {
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}
</style>
