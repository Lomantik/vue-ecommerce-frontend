<script setup lang="ts">
import ProductSlider from '@/components/product/ProductSlider.vue'
import { ref, watchEffect } from 'vue'
import { getProductById } from '@/api/products.api.ts'
import type { Product } from '@/types/product.ts'

defineProps<{
  title: string
}>()

const products = ref<Product[]>([])
watchEffect(async () => {
  products.value = (
    await Promise.all([1, 2, 3, 4].map(async (id) => await getProductById(id)))
  ).filter((p): p is Product => p !== null)
})
</script>

<template>
  <ProductSlider
    :title="title"
    :products="products"
    class="section section--carousel"
    link-title="SHOP ALL BEST-SELLERS"
    link-url="/shop"
  />
</template>

<style scoped></style>
