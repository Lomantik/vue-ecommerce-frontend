<script setup lang="ts">
import ProductPrice from '@/components/product/ProductPrice.vue'
import ProductRating from '@/components/product/ProductRating.vue'
import ResponsiveImage from '@/components/ui/ResponsiveImage.vue'
import type { Product } from '@/types/product.ts'
import type { Category } from '@/types/category.ts'
import { computed, ref, watch } from 'vue'
import { useNavigationStore } from '@/stores/navigation.store.ts'
import { getCategoryById } from '@/api/categories.api.ts'

const props = defineProps<{
  product: Product
  category?: Category | undefined
  titleTag?: string | undefined
}>()

const resolvedTitleTag = computed(() => {
  return props.titleTag ? props.titleTag : 'span'
})
const navStore = useNavigationStore()
const primaryCategory = ref<Category | null>(null)

watch(
  () => props.product?.primaryCategoryId,
  async (primaryCategoryId) => {
    primaryCategory.value = await getCategoryById(primaryCategoryId)
  },
  { immediate: true },
)
</script>

<template>
  <div class="product-card card">
    <div class="product-card__image-wrapper product-image">
      <RouterLink :to="'/' + product.slug" @click="category && navStore.setCategoryTrail(category)">
        <ResponsiveImage
          :image-key="product.mainImageId"
          class="product-card__image-wrapper-image card-img-top"
          loading="lazy"
        />
      </RouterLink>
    </div>
    <div class="product-card__info card-body">
      <span class="product-card__info-category-wrapper product-category" v-if="primaryCategory">
        <RouterLink :to="'/' + primaryCategory.slug">
          {{ primaryCategory.title }}
        </RouterLink>
      </span>
      <component :is="resolvedTitleTag" class="product-card__info-title card-title product-title">
        <RouterLink
          :to="'/' + product.slug"
          @click="category && navStore.setCategoryTrail(category)"
        >
          {{ product.title }}
        </RouterLink>
      </component>
      <div>
        <ProductPrice :product="product" class="product-card__info-price card-text" />
        <ProductRating :product="product" class="d-block" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/bootstrap-api' as *;
@use 'sass:map';

.product-card {
  height: 100%;
  width: 100%;
  border: none;
  @include media-breakpoint-up(sm) {
    margin-right: pxtorem(3px);
    margin-bottom: pxtorem(3px);
  }
  &__image-wrapper {
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: pxtorem(25px);
    &-image {
      height: auto;
    }
  }
  &__info {
    display: flex;
    flex-direction: column;
    padding: 0;
    &-category-wrapper {
      font-size: pxtorem(12px);
      margin-bottom: pxtorem(9px);
    }
    &-title {
      font-family: font-family-token(bitter);
      font-size: pxtorem(16px);
      margin-bottom: pxtorem(3px);
    }
    &-price {
      font-size: pxtorem(14px);
    }
  }
}
</style>
