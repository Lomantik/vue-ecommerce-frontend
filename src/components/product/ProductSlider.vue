<script setup lang="ts">
import ProductCard from '@/components/product/ProductCard.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import { RouterLink } from 'vue-router'
import type { Product } from '@/types/product.ts'

defineProps<{
  products: Product[]
  title?: string | undefined
  linkTitle?: string | undefined
  linkUrl?: string | undefined
}>()
</script>

<template>
  <section class="product-carousel container" v-if="products">
    <div class="product-carousel__wrapper row">
      <div class="col-6">
        <h3 v-if="title">{{ title }}</h3>
      </div>
      <div v-if="linkTitle" class="product-carousel__main-link col-6">
        <RouterLink class="product-carousel__main-link-link shop-all" :to="linkUrl ?? ''">
          {{ linkTitle }}
        </RouterLink>
      </div>
    </div>
    <Swiper
      :slides-per-view="4"
      :space-between="30"
      :breakpoints="{ 320: { slidesPerView: 2 }, 555: { slidesPerView: 4 } }"
    >
      <SwiperSlide v-for="product in products" :key="product.id">
        <ProductCard :product="product" />
      </SwiperSlide>
    </Swiper>
  </section>
</template>

<style scoped lang="scss"></style>
