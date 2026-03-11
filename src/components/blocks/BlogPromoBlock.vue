<script setup lang="ts">
import { RouterLink } from 'vue-router'
import MediaSplit from '@/components/blocks/MediaSplit.vue'
import ResponsiveImage from '@/components/ui/ResponsiveImage.vue'
</script>

<template>
  <section class="blog-promo container">
    <MediaSplit class="media-split">
      <template #content>
        <div class="media-split__wrapper">
          <p class="media-split__subtitle">CERTIFIED GREENERY</p>
          <h2>Our <em>plant finder</em> makes it real easy</h2>
          <p class="media-split__info">
            We only work with the very best! Our team of expert plant care specialists take great
            care to make sure your plants are healthy and thriving when they arrive at your
            doorstep. Plants are usually only in our care for a few days.
          </p>
          <RouterLink class="btn btn-primary" to="/shop"> TAKE THE QUIZ </RouterLink>
        </div>
      </template>
      <template #media>
        <ResponsiveImage image-key="m1-2" loading="lazy" class="media-split__image" />
      </template>
    </MediaSplit>
  </section>
</template>

<style scoped lang="scss">
@use '@/assets/styles/bootstrap-api' as *;

.media-split {
  &__wrapper {
    max-width: 462px;
  }
  &__subtitle {
    font-size: pxtorem(13px);
    letter-spacing: 0.15em;
    font-weight: 500;
    margin-bottom: pxtorem(5px);
  }
  &__info {
    margin-bottom: pxtorem(36px);
    line-height: line-height(base);
  }
  &__image {
    width: 100%;
    height: auto;
  }
}
</style>
