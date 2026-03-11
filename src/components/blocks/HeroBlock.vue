<script setup lang="ts">
import { RouterLink } from 'vue-router'
import MediaBanner from '@/components/blocks/MediaBanner.vue'
</script>

<template>
  <section class="hero container-fluid">
    <MediaBanner class="banner" :grayed="true" image-key="hero-img">
      <h1 class="banner__title">Plants made easy</h1>
      <p class="banner__info">
        Blooms co. helps you discover the best plants for your space, delivers
        <br />
        them to your door and helps you look after them.
      </p>
      <div>
        <RouterLink class="btn btn-secondary" to="/shop"> SHOP PLANTS </RouterLink>
      </div>
    </MediaBanner>
  </section>
</template>

<style scoped lang="scss">
@use '@/assets/styles/bootstrap-api' as *;

.hero {
  padding-left: pxtorem(50px);
  padding-right: pxtorem(50px);
  @include media-breakpoint-up(xl) {
    padding-left: 0;
    padding-right: 0;
  }
}
.banner {
  display: flex;
  max-width: 100vw;
  min-height: 65vh;
  max-height: 246px;
  overflow: hidden;
  aspect-ratio: unset;
  justify-content: start;
  align-items: end;
  margin-left: pxtorem(-50px);
  margin-right: pxtorem(-50px);
  @include media-breakpoint-up(xl) {
    padding: pxtorem(123px);
    margin-left: 0;
    margin-right: 0;
  }
  &__title {
    color: color-token(hero-text);
  }
  &__info {
    color: color-token(hero-text);
    margin-bottom: pxtorem(46px);
  }
}
</style>
