<script setup lang="ts">
import TabDescription from '@/components/product/tabs/TabDescription.vue'
import TabSpecifications from '@/components/product/tabs/TabSpecifications.vue'
import TabReviews from '@/components/product/tabs/TabReviews.vue'
import type { Product } from '@/types/product.ts'
import type { Review } from '@/types/review.ts'
import { onMounted, ref, watch } from 'vue'
import { getReviewsByProductId } from '@/api/reviews.api.ts'

const props = defineProps<{
  product: Product
}>()

const reviews = ref<Review[]>([])
watch(
  () => props.product,
  async (product) => {
    reviews.value = await getReviewsByProductId(product.id)
  },
  { immediate: true },
)

const activeTab = ref<string>('description')
onMounted(() => {
  const hash = window.location.hash.replace('#', '')
  if (hash) activeTab.value = hash
})

function setTab(tab: string) {
  activeTab.value = tab
  const url = new URL(window.location.href)
  if (tab === 'description') {
    url.hash = ''
  } else {
    url.hash = tab
  }
  history.replaceState(history.state, '', url)
}
</script>

<template>
  <div class="product-tabs">
    <ul class="product-tabs__buttons nav nav-pills" role="tablist">
      <li class="nav-item" role="presentation">
        <button
          class="product-tabs__buttons-button nav-link"
          role="tab"
          @click="setTab('description')"
          :class="{ 'product-tabs__buttons-button--active': activeTab === 'description' }"
        >
          Description
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="product-tabs__buttons-button nav-link"
          role="tab"
          @click="setTab('specs')"
          :class="{ 'product-tabs__buttons-button--active': activeTab === 'specs' }"
        >
          Additional information
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="product-tabs__buttons-button nav-link"
          role="tab"
          @click="setTab('reviews')"
          :class="{ 'product-tabs__buttons-button--active': activeTab === 'reviews' }"
        >
          Reviews ({{ reviews.length }})
        </button>
      </li>
    </ul>
    <div class="product-tabs__tab-content tab-content">
      <div class="tab-pane" role="tabpanel" :class="{ 'active show': activeTab === 'description' }">
        <TabDescription :product="product" />
      </div>
      <div class="tab-pane" role="tabpanel" :class="{ 'active show': activeTab === 'specs' }">
        <TabSpecifications :product="product" />
      </div>
      <div class="tab-pane" role="tabpanel" :class="{ 'active show': activeTab === 'reviews' }">
        <TabReviews :product="product" :reviews="reviews" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/bootstrap-api' as *;
@use 'sass:color';

.product-tabs {
  padding-top: pxtorem(40px);
  border-top: 1px solid color-token(border-tabs);
  &__buttons {
    &-button {
      border-radius: 120px !important;
      padding: pxtorem(12px 20px);
      font-size: pxtorem(14px);
      line-height: 1;
      font-weight: 500;
      color: color-token(primary);
      &--active {
        background: color.adjust(color-token(primary), $alpha: -0.9);
        color: color-token(primary) !important;
      }
      &:hover {
        color: color-token(primary);
      }
    }
  }
  &__tab-content {
    padding-top: pxtorem(80px);
    padding-bottom: pxtorem(45px);
  }
}
</style>
