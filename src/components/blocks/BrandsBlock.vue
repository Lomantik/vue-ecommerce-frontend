<script setup lang="ts">
import ResponsiveImage from '@/components/ui/ResponsiveImage.vue'
</script>

<template>
  <div class="brands container">
    <div class="brands__wrapper">
      <div class="brands__wrapper-row row g-40 g-md-60">
        <div class="col-md">
          <ResponsiveImage class="brands__image" image-key="l-1" loading="lazy" />
        </div>
        <div class="col-md">
          <ResponsiveImage class="brands__image" image-key="l-2" loading="lazy" />
        </div>
        <div class="col-md">
          <ResponsiveImage class="brands__image" image-key="l-3" loading="lazy" />
        </div>
        <div class="col-md">
          <ResponsiveImage class="brands__image" image-key="l-4" loading="lazy" />
        </div>
        <div class="col-md">
          <ResponsiveImage class="brands__image" image-key="l-5" loading="lazy" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/bootstrap-api' as *;

.brands {
  &__wrapper {
    padding-left: 0;
    padding-right: 0;
    @include media-breakpoint-up(md) {
      padding-left: pxtorem(90px);
      padding-right: pxtorem(90px);
    }
    &-row {
      text-align: center;
      width: 100%;
    }
  }
  &__image {
    max-width: 180px;
    height: auto;
    @include media-breakpoint-up(md) {
      width: 100%;
      min-width: 100%;
    }
  }
}
</style>
