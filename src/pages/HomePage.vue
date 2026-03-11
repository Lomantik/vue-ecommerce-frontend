<script setup lang="ts">
import HeroBlock from '@/components/blocks/HeroBlock.vue'
import BlogPromoBlock from '@/components/blocks/BlogPromoBlock.vue'
import BannerGrid from '@/components/blocks/BannerGrid.vue'
import BrandsBlock from '@/components/blocks/BrandsBlock.vue'
import SubscribeBlock from '@/components/blocks/SubscribeBlock.vue'
import JourneyBlock from '@/components/blocks/JourneyBlock.vue'
import BestSellersBlock from '@/components/blocks/BestSellersBlock.vue'
</script>

<template>
  <div class="page page--home">
    <HeroBlock class="section section--hero" />
    <BestSellersBlock :title="'Best Sellers'" class="section section--carousel" />
    <BlogPromoBlock class="section section--blog" />
    <BannerGrid
      class="section section--banners"
      :title="'Shop Your <em>Favorite Collections</em>'"
    />
    <BrandsBlock class="section section--brands" />
    <SubscribeBlock class="section section--subscribe" />
    <JourneyBlock class="section section--journey" />
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/bootstrap-api' as *;

.page--home {
  display: flex;
  flex-direction: column;
  gap: 30px;
  .section {
    &--hero {
      margin-bottom: pxtorem(50px);
    }
    &--carousel {
      margin-bottom: pxtorem(90px);
    }
    &--blog {
      margin-bottom: pxtorem(102px);
    }
    &--banners {
      margin-bottom: pxtorem(80px);
      @include media-breakpoint-up(sm) {
        margin-bottom: pxtorem(30px);
      }
    }
    &--brands {
      margin-bottom: pxtorem(50px);
      @include media-breakpoint-up(sm) {
        margin-bottom: 0;
      }
    }
    &--subscribe {
      margin-bottom: pxtorem(100px);
    }
    &--journey {
      margin-bottom: pxtorem(70px);
    }
  }
}
</style>
