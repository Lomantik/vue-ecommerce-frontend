<script setup lang="ts"></script>

<template>
  <div class="media-split row">
    <div class="media-split__content col-12 col-md-6">
      <slot name="content" />
    </div>
    <div class="col-12 col-md-6">
      <slot name="media" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/bootstrap-api' as *;

.media-split {
  &__content {
    margin-bottom: pxtorem(80px);
    @include media-breakpoint-up(md) {
      margin-bottom: 0;
    }
  }
}
</style>
