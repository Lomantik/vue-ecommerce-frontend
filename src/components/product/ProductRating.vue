<script setup lang="ts">
import RatingIndicator from '@/components/ui/RatingIndicator.vue'
import type { Product } from '@/types/product.ts'
import { computed, ref, watch } from 'vue'
import { getReviewsByProductId } from '@/api/reviews.api.ts'
import type { Review } from '@/types/review.ts'

const props = defineProps<{
  product: Product
}>()

const reviews = ref<Review[]>([])
const productRating = computed(() => {
  return (
    reviews.value.reduce((acc, cur) => {
      return acc + cur.rating
    }, 0) / reviews.value.length
  )
})

watch(
  () => props.product,
  async (product) => {
    reviews.value = await getReviewsByProductId(product.id)
  },
  { immediate: true },
)
</script>

<template>
  <RatingIndicator v-if="productRating > 0" :rating="productRating" />
</template>

<style scoped lang="scss"></style>
