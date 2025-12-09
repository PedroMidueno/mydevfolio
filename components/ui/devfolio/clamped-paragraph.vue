<script setup lang="ts">
interface Props {
  text: string
}

const props = defineProps<Props>()

const descRef = useTemplateRef('description-paragraph')
const showSeeMoreButton = ref(false)
let observer: ResizeObserver | null = null

const emit = defineEmits<{
  'request-show-more': []
}>()

const checkTextOverflow = () => {
  const el = descRef.value
  if (!el) return

  const isOverflowing = el.scrollHeight > el.clientHeight
  showSeeMoreButton.value = isOverflowing
}

onMounted(() => {
  const el = descRef.value
  if (!el) return

  observer = new ResizeObserver(() => {
    checkTextOverflow()
  })

  observer.observe(el)
  checkTextOverflow()
})

onBeforeUnmount(() => {
  if (observer && descRef.value) {
    observer.unobserve(descRef.value)
  }
})
</script>

<template>
  <p
    ref="description-paragraph"
    class="text-balance text-sm md:text-base relative whitespace-pre-line line-clamp-5 md:min-h-[120px]"
  >
    {{ props.text }}
    <u-button
      v-if="showSeeMoreButton"
      variant="link"
      class="absolute text-secondary !py-0 flex items-end right-0 bottom-0 pl-4 text-right bg-linear-to-l from-gray-950 from-80% to-transparent"
      @click="emit('request-show-more')"
    >
      Ver más
    </u-button>
  </p>
</template>
