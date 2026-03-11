<script setup lang="ts">
import { resolveHtmlUrls } from '@/domain/urls.js'
import type { Product } from '@/types/product.ts'

defineProps<{
  product: Product
}>()
</script>

<template>
  <div class="product-description" v-html="resolveHtmlUrls(product.description)" />
</template>

<style scoped lang="scss"></style>
