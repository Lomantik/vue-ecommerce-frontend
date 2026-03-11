<script setup lang="ts">
import ProductQuantity from '@/components/ui/ProductQuantity.vue'
import ProductPrice from '@/components/product/ProductPrice.vue'
import type { Product } from '@/types/product.ts'
import { computed, reactive, ref, watch } from 'vue'
import { getVariantProducts } from '@/api/products.api.ts'

const props = defineProps<{
  product: Product
}>()

defineEmits(['variant-change'])

const qtys = reactive<Record<number, number>>({})

const resultProducts = computed(() => {
  return Object.entries(qtys).reduce((acc: Record<string, number>, [k, v]) => {
    if (v > 0) acc[k] = v
    return acc
  }, {})
})

const groupedProducts = ref<Product[]>([])
watch(
  () => props.product,
  async (product) => {
    const variantProducts = await getVariantProducts(product)
    variantProducts.forEach((variantProduct) => (qtys[variantProduct.id] = 0))
    return (groupedProducts.value = variantProducts)
  },
  { immediate: true },
)

const zeroQtys = computed(() => {
  return Object.values({ ...qtys }).every((val) => Number(val) === 0)
})

const handlePurchase = () => {
  if (zeroQtys.value) {
    alert(
      'Please set quantity of any subproduct greater than 0 before adding this product to your cart.',
    )
  } else {
    const productsString = Object.entries(resultProducts.value)
      .map(([id, quantity]) => `simple_id = ${id}; qty = ${quantity}`)
      .join('\n')
    alert(`Product added to cart!\ngrouped_id = ${props.product.id};\n${productsString}`)
  }
}

const purchaseDisabled = computed(() => {
  return zeroQtys.value
})
</script>

<template>
  <div class="product-actions-grouped">
    <table class="product-actions-grouped__wrapper">
      <tr
        class="product-actions-grouped__item"
        v-for="groupedProduct in groupedProducts"
        :key="groupedProduct.id"
      >
        <td class="product-actions-grouped__item-field">
          <ProductQuantity
            :min-qty="0"
            :model-value="qtys[groupedProduct.id] ?? 0"
            @update:model-value="(qty) => (qtys[groupedProduct.id] = qty)"
          />
        </td>
        <td class="product-actions-grouped__item-field product-actions-grouped__item-field--title">
          <RouterLink :to="'/' + groupedProduct.slug">{{ groupedProduct.title }}</RouterLink>
        </td>
        <td class="product-actions-grouped__item-field product-actions-grouped__item-field--price">
          <ProductPrice :product="groupedProduct" />
        </td>
      </tr>
    </table>
    <button
      class="product-actions-grouped__button btn btn-primary"
      :class="{ 'product-actions-grouped__button--disabled': purchaseDisabled }"
      @click="handlePurchase"
    >
      Add To Cart
    </button>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/bootstrap-api' as *;

.product-actions-grouped {
  &__wrapper {
    margin-bottom: pxtorem(20px);
  }
  &__item {
    --bs-gutter-x: 10px;
    vertical-align: middle;
    &-field {
      padding-top: pxtorem(8px);
      padding-bottom: pxtorem(10px);
      padding-right: pxtorem(20px);
      @include media-breakpoint-up(xl) {
        padding-right: pxtorem(40px);
      }
      &--title {
        font-size: pxtorem(14px);
      }
      &--price {
        @include media-breakpoint-up(xl) {
          padding-right: pxtorem(20px);
        }
      }
    }
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
