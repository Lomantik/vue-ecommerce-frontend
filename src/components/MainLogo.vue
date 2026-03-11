<script setup lang="ts">
import { RouterLink } from 'vue-router'
import ResponsiveImage from '@/components/ui/ResponsiveImage.vue'
</script>

<template>
  <div class="main-logo logo">
    <RouterLink class="main-logo__link" to="/">
      <ResponsiveImage class="main-logo__link-image" image-key="logo-2x" />
    </RouterLink>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/bootstrap-api' as *;

.main-logo {
  padding-top: pxtorem(20px);
  padding-bottom: pxtorem(20px);
  display: flex;
  margin-left: pxtorem(45px);
  margin-right: 0;
  @include media-breakpoint-up(lg) {
    padding-top: 0;
    padding-bottom: 0;
    margin-left: 0;
    margin-right: pxtorem(45px);
  }
  &__link {
    display: flex;
    &-image {
      width: auto;
      max-height: 22px;
    }
  }
}
</style>
