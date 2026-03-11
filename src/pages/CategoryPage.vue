<script setup lang="ts">
import ProductList from '@/components/product/ProductList.vue'
import PageTitle from '@/components/blocks/PageTitle.vue'
import type { Category } from '@/types/category.ts'

defineProps<{
  category: Category
}>()
</script>

<template>
  <section>
    <div class="category-page">
      <PageTitle :title="category.title" v-if="category" />
      <div class="category-page__product-list container">
        <ProductList :category="category" :titleTag="'h3'" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/assets/styles/bootstrap-api' as *;

.category-page {
  padding-bottom: pxtorem(40px);
  @include media-breakpoint-up(md) {
    padding-bottom: pxtorem(60px);
  }
  &__product-list {
    padding-top: pxtorem(30px);
    padding-bottom: pxtorem(30px);
  }
}
</style>
