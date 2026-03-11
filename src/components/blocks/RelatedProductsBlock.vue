<script setup lang="ts">
import ProductSlider from '@/components/product/ProductSlider.vue'
import type { Product } from '@/types/product.ts'
import { ref, watchEffect } from 'vue'
import { getProductById } from '@/api/products.api.ts'

const props = defineProps<{
  product: Product
}>()

const products = ref<Product[]>([])

watchEffect(async () => {
  products.value = (
    await Promise.all(props.product.relatedProductIds.map(async (id) => await getProductById(id)))
  ).filter((p): p is Product => p !== null)
})
</script>

<template>
  <ProductSlider
    :title="'Related products'"
    :products="products"
    class="section section--carousel"
  />
</template>

<style scoped lang="scss"></style>
