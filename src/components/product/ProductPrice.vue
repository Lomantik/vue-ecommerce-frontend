<script setup lang="ts">
import type { Product } from '@/types/product.ts'
import { computed, ref, watch } from 'vue'
import { getAllChildProducts } from '@/api/products.api.ts'

const props = defineProps<{
  product: Product
}>()

const prices = ref<number[]>([])
const minPrice = computed(() => {
  return prices.value.length ? Math.min(...prices.value).toFixed(2) : null
})
const maxPrice = computed(() => {
  return prices.value.length ? Math.max(...prices.value).toFixed(2) : null
})
const isRange = computed(() => {
  return minPrice.value && maxPrice.value && minPrice.value < maxPrice.value
})
const hasDiscount = computed(() => {
  return typeof props.product.salePrice === 'number'
})
const salePrice = computed(() => {
  return props.product.salePrice?.toFixed(2)
})

watch(
  () => props.product,
  async (product) => {
    prices.value = []
    if (product.type === 'simple') {
      prices.value.push(product.price)
    } else {
      const childProducts = await getAllChildProducts(product)
      for (const childProduct of childProducts) {
        prices.value.push(childProduct.salePrice ? childProduct.salePrice : childProduct.price)
      }
    }
  },
  { immediate: true },
)
</script>

<template>
  <span class="price">
    <template v-if="isRange">
      <bdi> <span>$</span>{{ minPrice }} </bdi>
      –
      <bdi> <span>$</span>{{ maxPrice }} </bdi>
    </template>
    <template v-else-if="hasDiscount">
      <del class="price__del">
        <bdi> <span>$</span>{{ minPrice }} </bdi>
      </del>
      <ins class="price__ins">
        <bdi> <span>$</span>{{ salePrice }} </bdi>
      </ins>
    </template>
    <template v-else>
      <bdi> <span>$</span>{{ minPrice }} </bdi>
    </template>
  </span>
</template>

<style scoped lang="scss">
@use '@/assets/styles/bootstrap-api' as *;

.price {
  &__del {
    opacity: 0.6;
  }
  &__ins {
    text-decoration: none;
    margin-left: pxtorem(7px);
  }
}
</style>
