<script setup lang="ts">
import ProductPrice from '@/components/product/ProductPrice.vue'
import ProductActionsSimple from '@/components/product/purchase/ProductActionsSimple.vue'
import ProductActionsGrouped from '@/components/product/purchase/ProductActionsGrouped.vue'
import ProductActionsConfigurable from '@/components/product/purchase/ProductActionsConfigurable.vue'
import ProductMeta from '@/components/product/ProductMeta.vue'
import ProductTabs from '@/components/product/ProductTabs.vue'
import RelatedProductsBlock from '@/components/blocks/RelatedProductsBlock.vue'
import ProductRating from '@/components/product/ProductRating.vue'
import { getReviewsByProductId } from '@/api/reviews.api.js'
import ProductImageGallery from '@/components/product/ProductImageGallery.vue'
import type { Product } from '@/types/product.ts'
import { type Component, computed, ref, watch } from 'vue'
import type { Review } from '@/types/review.ts'

const props = defineProps<{
  product: Product
}>()

const actionComponents: Record<string, Component> = {
  simple: ProductActionsSimple,
  grouped: ProductActionsGrouped,
  configurable: ProductActionsConfigurable,
}
const reviews = ref<Review[]>([])
const additionalMessage = computed(() => {
  if (reviews.value.length === 0) return ''
  return (
    '(' +
    reviews.value.length +
    ' customer ' +
    (reviews.value.length > 1 ? 'reviews' : 'review') +
    ')'
  )
})

watch(
  () => props.product,
  async (product) => {
    reviews.value = await getReviewsByProductId(product.id)
  },
  { immediate: true },
)

const currentVariant = ref<Product>(props.product)
function onVariantChange(variant: Product) {
  if (variant) {
    currentVariant.value = variant
  } else {
    currentVariant.value = props.product
  }
}
</script>

<template>
  <div class="product-page" v-if="product">
    <div class="container">
      <div class="product-page__main-area row">
        <div class="col-12 col-md-6 col-xl-auto">
          <div class="product-page__main-area-image-wrapper">
            <ProductImageGallery :product="currentVariant" />
          </div>
        </div>
        <div class="product-page__main-area-info-col col-12 col-md-6 col-xl">
          <div class="product-page__main-area-info-wrapper">
            <h1 class="product-page__main-area-title">{{ product.title }}</h1>
            <div v-if="reviews.length > 0" class="product-page__main-area-reviews-wrapper">
              <ProductRating class="product-page__main-area-rating" :product="product" />
              <span class="product-page__main-area-reviews-info">{{ additionalMessage }}</span>
            </div>
            <div class="product-page__main-area-price">
              <ProductPrice :product="currentVariant" />
            </div>
            <p class="product-page__main-area-info">
              {{ currentVariant.shortDescription }}
            </p>
            <component
              :is="actionComponents[product.type]"
              :product="product"
              class="product-page__main-area-actions"
              @variant-change="onVariantChange"
            />
            <ProductMeta :product="product" />
          </div>
        </div>
      </div>
    </div>
    <ProductTabs class="container" :product="product" />
    <RelatedProductsBlock :product="product" />
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/bootstrap-api' as *;

.product-page {
  padding-bottom: pxtorem(40px);
  @include media-breakpoint-up(md) {
    padding-bottom: pxtorem(60px);
  }
  &__main-area {
    --bs-gutter-x: 30px;
    margin-bottom: pxtorem(80px);
    @include media-breakpoint-up(xl) {
      --bs-gutter-x: 80px;
    }
    &-info-col {
      margin-top: pxtorem(30px);
      @include media-breakpoint-up(md) {
        margin-top: 0;
      }
    }
    &-image-wrapper {
      border-radius: 6px;
      overflow: hidden;
      width: 100%;
      @include media-breakpoint-up(xl) {
        width: 540px;
      }
    }
    &-info-wrapper {
      @include media-breakpoint-up(md) {
        max-width: 530px;
      }
    }
    &-title {
      font-size: pxtorem(34px);
      line-height: 1.2;
      margin-bottom: pxtorem(12px);
    }
    &-price {
      margin-top: pxtorem(18px);
      font-size: pxtorem(22px);
      line-height: 1.7;
      padding: pxtorem(0 0 19px 0);
    }
    &-info {
      font-size: pxtorem(14px);
      margin-bottom: pxtorem(25px);
    }
    &-actions {
      margin-bottom: pxtorem(30px);
    }
    &-reviews-wrapper {
      margin-bottom: pxtorem(-2px);
    }
    &-rating {
      font-size: pxtorem(14px);
      line-height: 1;
      display: inline-block;
      height: 14px;
    }
    &-reviews-info {
      font-size: pxtorem(14px);
      margin-left: pxtorem(8px);
      line-height: 1;
      display: inline-block;
      height: 14px;
    }
  }
}
</style>
