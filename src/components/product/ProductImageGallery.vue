<script setup lang="ts">
import ResponsiveImage from '@/components/ui/ResponsiveImage.vue'
import type { Product } from '@/types/product.ts'

defineProps<{
  product: Product
}>()
</script>

<template>
  <div class="image-gallery">
    <ResponsiveImage
      :image-key="product.mainImageId"
      class="image-gallery__main-image"
      loading="lazy"
    />
    <div class="image-gallery__thumbnails">
      <ResponsiveImage
        class="image-gallery__thumbnails-thumbnail"
        :image-key="image.id"
        v-for="image in product.images"
        :key="image.id"
        loading="lazy"
        :class="{ 'image-gallery__thumbnails-thumbnail--active': image.id === product.mainImageId }"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/bootstrap-api' as *;

.image-gallery {
  width: 100%;
  &__main-image {
    width: 100%;
    height: auto;
    margin-bottom: 9px;
    border-radius: 6px;
  }
  &__thumbnails {
    display: flex;
    gap: 8px;
    &-thumbnail {
      height: 90px;
      width: 90px;
      border-radius: 6px;
      padding: 2px;
      &--active {
        border: 1px solid black;
      }
    }
  }
}
</style>
