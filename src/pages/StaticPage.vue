<script setup lang="ts">
import type { Page } from '@/types/page.ts'
import { resolveHtmlUrls } from '@/domain/urls.ts'

defineProps<{
  page: Page
}>()
</script>

<template>
  <div class="static-page">
    <h1 v-if="page.showTitle && page.title">
      {{ page.title }}
    </h1>
    <div class="static-content" v-html="resolveHtmlUrls(page.content)" />
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/bootstrap-api' as *;

.static-page {
  margin-bottom: pxtorem(70px);
}
</style>
