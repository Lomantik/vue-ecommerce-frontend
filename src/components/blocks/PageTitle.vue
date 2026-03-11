<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <div class="page-title">
    <h1 class="page-title__string container">{{ title }}</h1>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/bootstrap-api' as *;

.page-title {
  padding: pxtorem(35px 0);
  border-bottom: 1px solid color-token(border);
  margin: 0;
  &__string {
    line-height: 1;
    margin-bottom: 0;
    @include media-breakpoint-up(lg) {
      font-size: pxtorem(30px);
    }
  }
}
</style>
