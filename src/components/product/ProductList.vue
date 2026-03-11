<script setup lang="ts">
import ProductCard from '@/components/product/ProductCard.vue'
import type { Category } from '@/types/category.ts'
import { ref, watch } from 'vue'
import type { Product } from '@/types/product.ts'
import { getAllProducts, getProductsByCategoryId } from '@/api/products.api.ts'

const props = defineProps<{
  category?: Category | undefined
  titleTag?: string | undefined
}>()

const products = ref<Product[]>([])
watch(
  () => props.category?.id,
  async (categoryId) => {
    if (categoryId) products.value = await getProductsByCategoryId(categoryId)
    else products.value = await getAllProducts()
  },
  { immediate: true },
)
</script>

<template>
  <div class="row g-30">
    <div class="col-6 col-lg-3" v-for="product in products" :key="product.id">
      <ProductCard :product="product" :category="category" :titleTag="titleTag" />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
