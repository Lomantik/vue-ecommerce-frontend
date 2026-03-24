<script setup lang="ts">
import ResponsiveImage from '@/components/ui/ResponsiveImage.vue'
import type { Product } from '@/types/product.ts'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Thumbs, Zoom } from 'swiper/modules'
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import type { Swiper as SwiperType } from 'swiper'
import ProductLightbox from '@/components/product/ProductLightbox.vue'
import ProductZoom from '@/components/ui/ProductZoom.vue'

defineProps<{
  product: Product
}>()

const mainSwiper = ref<SwiperType | null>(null)
const setMainSwiper = (swiper: SwiperType): void => {
  mainSwiper.value = swiper
}
const thumbsSwiper = ref<SwiperType | null>(null)
const setThumbsSwiper = (swiper: SwiperType): void => {
  thumbsSwiper.value = swiper
}

const zoomState = reactive({
  active: false,
  mouseX: 50,
  mouseY: 50,
})

const isTouchDevice = ref(false)
const checkDevice = () => {
  isTouchDevice.value = window.matchMedia('(pointer: coarse)').matches
}
const swiperZoomEnabled = computed(() => {
  return isTouchDevice.value
})
const handleMouseEnter = () => {
  if (!isTouchDevice.value) zoomState.active = true
}
const handleMouseMove = (e: MouseEvent) => {
  if (isTouchDevice.value) return

  const target = e.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()

  zoomState.mouseX = ((e.clientX - rect.left) / rect.width) * 100
  zoomState.mouseY = ((e.clientY - rect.top) / rect.height) * 100
}
const handleMouseLeave = () => {
  zoomState.active = false
}
const imageStyle = computed(() => {
  if (isTouchDevice.value) return {}

  return {
    transform: zoomState.active ? 'scale(2)' : 'scale(1)',
    transformOrigin: `${zoomState.mouseX}% ${zoomState.mouseY}%`,
  }
})
const showLightbox = ref<boolean>(false)

const activeIndex = ref<number>(0)
const handleSlideChange = (swiper: SwiperType): void => {
  if (activeIndex.value !== swiper.realIndex) {
    activeIndex.value = swiper.realIndex
  }
}

onMounted(() => {
  checkDevice()
  window.matchMedia('(pointer: coarse)').addEventListener('change', checkDevice)
})
onUnmounted(() => {
  window.matchMedia('(pointer: coarse)').removeEventListener('change', checkDevice)
})

watch(
  () => activeIndex.value,
  (index) => {
    mainSwiper.value?.slideTo(index)
  },
)
</script>

<template>
  <ProductLightbox
    :product="product"
    v-model:visible="showLightbox"
    v-model:active-index="activeIndex"
  />
  <div class="image-gallery">
    <button class="image-gallery__zoom-icon" type="button" @click="showLightbox = true">
      <ProductZoom />
    </button>
    <Swiper
      :navigation="{
        prevEl: '.image-gallery__arrow--prev',
        nextEl: '.image-gallery__arrow--next',
      }"
      :modules="[Navigation, Thumbs, Zoom]"
      :slides-per-view="1"
      :space-between="0"
      :rewind="true"
      :thumbs="{ swiper: thumbsSwiper }"
      :key="isTouchDevice ? 'touch' : 'desktop'"
      :zoom="swiperZoomEnabled"
      @swiper="setMainSwiper"
      @slide-change="handleSlideChange"
    >
      <SwiperSlide v-for="image in product.images" :key="product.id">
        <div
          @mouseenter="handleMouseEnter"
          @mousemove="handleMouseMove"
          @mouseleave="handleMouseLeave"
          class="image-gallery__main-image-container swiper-zoom-container"
          :class="{ 'overflow-hidden': !isTouchDevice }"
        >
          <ResponsiveImage
            :image-key="image.id"
            class="image-gallery__main-image"
            loading="lazy"
            :style="imageStyle"
          />
        </div>
      </SwiperSlide>
      <button class="image-gallery__arrow image-gallery__arrow--prev"><span></span></button>
      <button class="image-gallery__arrow image-gallery__arrow--next"><span></span></button>
    </Swiper>
    <Swiper
      :modules="[Thumbs]"
      :slides-per-view="4"
      space-between="8"
      :watch-slides-progress="true"
      @swiper="setThumbsSwiper"
    >
      <SwiperSlide class="image-gallery__thumb" v-for="image in product.images" :key="image.id">
        <ResponsiveImage
          class="image-gallery__thumb-image"
          :image-key="image.id"
          loading="lazy"
          :wdt="200"
          :draggable="false"
        />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/bootstrap-api' as *;

.image-gallery {
  width: 100%;
  position: relative;
  &__main-image-container {
    position: relative;
  }
  &__main-image {
    width: 100%;
    height: auto;
    margin-bottom: 9px;
    border-radius: 6px;
  }
  &__thumb {
    height: 90px;
    width: 90px !important;
    padding: 1px;
    border-radius: 6px;
    &.swiper-slide-thumb-active {
      padding: 2px;
      border: 1px solid black;
    }
    &-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 6px;
    }
  }
  &__arrow {
    position: absolute;
    top: 50%;
    z-index: 1;
    font-size: pxtorem(14px);
    width: 46px;
    height: 46px;
    border-radius: 50%;
    border: 1px solid color-token(primary);
    color: color-token(primary);
    margin-top: pxtorem(-23px);
    background: color-token('white');
    &--prev {
      left: pxtorem(30px);
      & > span::after {
        font-family: font-family-token(blooms);
        content: content-token(big-arrow-left);
      }
    }
    &--next {
      right: pxtorem(30px);
      & > span::after {
        font-family: font-family-token(blooms);
        content: content-token(big-arrow-right);
      }
    }
  }
  &__zoom-icon {
    position: absolute;
    z-index: 100;
    top: 20px;
    right: 20px;
    padding: 0;
    width: 24px;
    height: 25px;
    border: none;
    display: flex;
    background: none;
  }
}
</style>
