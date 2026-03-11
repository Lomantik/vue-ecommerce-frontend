<script setup lang="ts">
import { getProductAttributes } from '@/api/products.api.js'
import type { Product } from '@/types/product.ts'
import { ref, watch } from 'vue'
import type { Attribute } from '@/types/attribute.ts'

const props = defineProps<{
  product: Product
}>()

const attributes = ref<Attribute[]>([])
watch(
  () => props.product,
  async (product) => {
    attributes.value = await getProductAttributes(product.id)
  },
  { immediate: true },
)
</script>

<template>
  <div class="product-specifications">
    <table class="product-specifications__table">
      <tbody>
        <tr class="product-specifications__row">
          <th class="product-specifications__row-cell product-specifications__row-cell--title">
            Weight
          </th>
          <td class="product-specifications__row-cell product-specifications__row-cell--value">
            {{ product?.shipping?.weight }} kg
          </td>
        </tr>
        <tr class="product-specifications__row" v-for="attribute in attributes" :key="attribute.id">
          <th class="product-specifications__row-cell product-specifications__row-cell--title">
            {{ attribute.title }}
          </th>
          <td class="product-specifications__row-cell product-specifications__row-cell--value">
            {{ attribute?.options && attribute.options.map((x) => x.title).join(', ') }}
          </td>
        </tr>
        <tr class="product-specifications__row product-specifications__row--last">
          <th class="product-specifications__row-cell product-specifications__row-cell--title">
            Dimensions
          </th>
          <td class="product-specifications__row-cell product-specifications__row-cell--value">
            {{
              product?.shipping?.dimensions.length +
              'x' +
              product?.shipping?.dimensions.width +
              'x' +
              product?.shipping?.dimensions.height
            }}
            cm
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/bootstrap-api' as *;

.product-specifications {
  width: 100%;
  font-size: pxtorem(14px);
  &__table {
    width: 100%;
    table-layout: fixed;
  }
  &__row {
    border-bottom: 1px solid color-token(border);
    &--last {
      border-bottom: none;
    }
    &-cell {
      padding: pxtorem(15px 0);
      &--title {
        color: color-token(table-header);
        font-weight: 500;
        max-width: 449px;
        width: 38%;
      }
    }
  }
}
</style>
