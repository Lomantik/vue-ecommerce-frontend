<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { Image } from '@/types/image.ts'
import { getImageById, getImageBySlug } from '@/api/images.api.ts'

const props = defineProps<{
  imageKey: number | string
  wdt?: number | undefined
}>()

const image = ref<Image | null>(null)
const src = computed(() => {
  if (!image.value) return ''

  if (props.wdt) {
    const foundImage = image.value.srcset.find((x) => x.w === props.wdt)
    if (foundImage) return import.meta.env.BASE_URL + foundImage.src
  }
  return import.meta.env.BASE_URL + image.value.src
})
const srcset = computed(() => {
  if (!image.value?.srcset?.length || props.wdt) return ''

  return (
    image.value.srcset.map((i) => `${import.meta.env.BASE_URL}${i.src} ${i.w}w`).join(', ') +
    `, ${src.value} ${image.value.width}w`
  )
})
const resultWidth = computed(() => {
  return props.wdt ? props.wdt : image?.value?.width
})

const resultHeight = computed(() => {
  return props.wdt ? props.wdt : image?.value?.height
})

watch(
  () => props.imageKey,
  async (imageKey) => {
    if (typeof imageKey === 'number') {
      image.value = await getImageById(imageKey)
    } else {
      image.value = await getImageBySlug(imageKey)
    }
  },
  { immediate: true },
)
</script>

<template>
  <img
    v-if="image"
    :src="`${src}`"
    :alt="image.alt"
    :srcset="srcset !== '' ? srcset : undefined"
    :width="resultWidth"
    :height="resultHeight"
    :sizes="srcset !== '' ? `(max-width: ${image.width}px) 100vw, ${image.width}px` : undefined"
    decoding="async"
  />
</template>

<style scoped></style>
