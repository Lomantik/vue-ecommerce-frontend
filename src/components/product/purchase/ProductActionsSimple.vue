<script setup lang="ts">
import ProductQuantity from '@/components/ui/ProductQuantity.vue'
import type { Product } from '@/types/product.ts'
import { computed, ref } from 'vue'

const props = defineProps<{
  product: Product
}>()

defineEmits(['variant-change'])

const qty = ref<number>(1)

const zeroQty = computed(() => {
  return Number(qty.value) === 0
})

const handlePurchase = () => {
  if (zeroQty.value) {
    alert('Please set quantity greater than 0 before adding this product to your cart.')
  } else {
    alert(`Product added to cart!\nsimple_id = ${props.product?.id}; qty = ${qty.value}`)
  }
}

const purchaseDisabled = computed(() => {
  return zeroQty.value
})
</script>

<template>
  <div class="product-actions-simple">
    <div class="product-actions-simple__wrapper row">
      <div class="col-auto"><ProductQuantity :min-qty="1" v-model="qty" /></div>
      <div class="col">
        <button
          class="product-actions-simple__button btn btn-primary"
          :class="{ 'product-actions-simple__button--disabled': purchaseDisabled }"
          @click="handlePurchase"
        >
          Add To Cart
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/bootstrap-api' as *;

.product-actions-simple {
  &__wrapper {
    --bs-gutter-x: 10px;
  }
  &__button {
    text-transform: uppercase;
    width: auto;
    @include media-breakpoint-up(lg) {
      width: 280px;
    }
    &--disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
}
</style>
