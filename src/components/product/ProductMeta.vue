<script setup lang="ts">
import type { Product } from '@/types/product.ts'
import { computed, ref, watch } from 'vue'
import type { CategoryLink } from '@/types/category.ts'
import { getProductCategories } from '@/api/products.api.ts'

const props = defineProps<{
  product: Product
}>()

const tags = computed(() => {
  return [...props.product.tags].sort((a, b) => a.localeCompare(b))
})

const categories = ref<CategoryLink[]>([])

watch(
  () => props.product,
  async (product) => {
    categories.value = await getProductCategories(product)
  },
  { immediate: true },
)
</script>

<template>
  <div class="product-meta">
    <div class="product-meta__item">SKU: {{ product.sku }}</div>
    <div class="product-meta__item">
      Categories:
      <template v-for="(category, index) in categories" :key="category.id">
        <template v-if="index > 0">, </template>
        <RouterLink :to="category.link">{{ category.title }}</RouterLink>
      </template>
    </div>
    <div class="product-meta__item product-meta__item--tags">
      Tags:
      <template v-for="(tag, index) in tags" :key="tag">
        <template v-if="index > 0">, </template>
        <RouterLink to="/">{{ tag }}</RouterLink>
      </template>
    </div>
    <div class="product-meta__item">
      <ul class="product-meta__item-social-wrapper">
        <li class="product-meta__item-social product-meta__item-social--bird"><span></span></li>
        <li class="product-meta__item-social product-meta__item-social--f"><span></span></li>
        <li class="product-meta__item-social product-meta__item-social--handset"><span></span></li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/bootstrap-api' as *;
@use 'sass:map';

.product-meta {
  font-size: pxtorem(12px);
  line-height: 1.5;
  &__item {
    margin-bottom: pxtorem(3px);
    &-social-wrapper {
      list-style: none;
      padding-left: 0;
    }
    &--tags {
      margin-bottom: pxtorem(25px);
    }
    &-social {
      font-family: font-family-token(social-logos);
      color: #090909;
      font-size: pxtorem(18px);
      display: inline-block;
      cursor: pointer;
      line-height: 1;
      font-weight: 400;
      font-style: normal;
      margin-left: pxtorem(15px);
      &:hover {
        color: color-token(link-hovered);
      }
      &--bird {
        margin-left: 0;
        & > span::before {
          content: content-token(bird);
        }
      }
      &--f {
        & > span::before {
          content: content-token(f);
        }
      }
      &--handset {
        & > span::before {
          content: content-token(handset);
        }
      }
    }
  }
}
</style>
