<script setup lang="ts">
import type { Product } from '@/types/product.ts'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Zoom } from 'swiper/modules'
import ResponsiveImage from '@/components/ui/ResponsiveImage.vue'
import ArrowsRemove from '@/components/ui/ArrowsRemove.vue'
import ZoomIn from '@/components/ui/ZoomIn.vue'
import { computed, ref, watch } from 'vue'
import { getImageById } from '@/api/images.api.ts'
import { Swiper as SwiperType } from 'swiper'

const props = defineProps<{
  product: Product
}>()
const visible = defineModel<boolean>('visible', { default: false, required: true })
const activeIndex = defineModel<number>('activeIndex', { default: 0, required: true })
const imageCaptions = ref<Record<string, string>>({})
const mainSwiper = ref<SwiperType | null>(null)
const setMainSwiper = (swiper: SwiperType): void => {
  mainSwiper.value = swiper
}
const handleSwiperInternalClick = (swiper: SwiperType, event: MouseEvent | TouchEvent) => {
  swiper.zoom.toggle(event)
}
const handleZoomClick = (): void => {
  const swiper = mainSwiper.value
  if (!swiper?.zoom) return

  swiper.zoom.toggle()
}
const zoomed = ref<boolean>(false)
const handleZoomChange = (_swiper: SwiperType, scale: number): void => {
  zoomed.value = scale > 1
}
const handleSlideChange = (swiper: SwiperType): void => {
  if (activeIndex.value !== swiper.realIndex) {
    activeIndex.value = swiper.realIndex
  }
}
const imageCaption = computed(() => {
  const currentImage = props.product?.images[activeIndex.value]
  if (currentImage) {
    return imageCaptions.value[currentImage.id] ?? ''
  }
  return ''
})

watch(
  () => props.product,
  async (product) => {
    const entries = await Promise.all(
      product.images.map(async (x) => {
        const img = await getImageById(x.id)
        return [x.id, img?.slug ?? '']
      }),
    )
    imageCaptions.value = Object.fromEntries(entries)
  },
  { immediate: true },
)
</script>

<template>
  <Teleport to="body">
    <div v-if="visible" class="product-lightbox">
      <div class="product-lightbox__bar product-lightbox__bar--top">
        <div class="product-lightbox__bar-group">
          <div class="product-lightbox__counter">
            {{ `${activeIndex + 1} / ${product.images.length}` }}
          </div>
        </div>
        <div class="product-lightbox__bar-group">
          <button class="product-lightbox__zoom-in" type="button" @click="handleZoomClick">
            <ZoomIn />
          </button>
          <button class="product-lightbox__close" type="button" @click="visible = false">
            <ArrowsRemove />
          </button>
        </div>
      </div>
      <div class="product-lightbox__main-bar">
        <Swiper
          :navigation="{
            prevEl: '.product-lightbox__arrow--prev',
            nextEl: '.product-lightbox__arrow--next',
          }"
          @swiper="setMainSwiper"
          @zoom-change="handleZoomChange"
          @slide-change="handleSlideChange"
          @click="handleSwiperInternalClick"
          :modules="[Navigation, Zoom]"
          :slides-per-view="1"
          :space-between="0"
          :loop="true"
          :zoom="{
            maxRatio: 1.43,
            minRatio: 1,
            toggle: false,
          }"
          :speed="0"
          :initial-slide="activeIndex"
          class="product-lightbox__slider"
        >
          <SwiperSlide v-for="image in product.images" :key="image.id" :draggable="false">
            <div class="swiper-zoom-container">
              <ResponsiveImage
                :image-key="image.id"
                class="product-lightbox__main-image"
                loading="lazy"
                :draggable="false"
                :class="{ 'product-lightbox__main-image--zoomed': zoomed }"
              />
            </div>
          </SwiperSlide>
          <button class="product-lightbox__arrow product-lightbox__arrow--prev">
            <span></span>
          </button>
          <button class="product-lightbox__arrow product-lightbox__arrow--next">
            <span></span>
          </button>
        </Swiper>
      </div>
      <div class="product-lightbox__bar product-lightbox__bar--bottom">
        <div class="product-lightbox__caption">
          {{ imageCaption }}
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
@use '@/assets/styles/bootstrap-api' as *;
@use 'sass:color';

.product-lightbox {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background: color.adjust(color-token('white'), $alpha: -0.05);
  display: flex;
  flex-direction: column;
  &__main-image-container {
    position: relative;
  }
  &__bar {
    height: 44px;
    width: 100%;
    flex-shrink: 0;
    display: flex;
    &--top {
      padding: pxtorem(0 20px 0 30px);
      justify-content: space-between;
    }
    &--bottom {
      justify-content: center;
    }
    &-group {
      display: flex;
    }
  }
  &__main-bar {
    flex-grow: 1;
    min-height: 0;
    min-width: 0;
    overflow: hidden;
    text-align: center;
  }
  &__slider {
    height: 100%;
    width: 100%;
    min-width: 0;
    :deep(.swiper-wrapper),
    :deep(.swiper-slide),
    :deep(.swiper-zoom-container) {
      height: 100%;
    }
  }
  &__main-image {
    object-fit: contain;
    max-width: 100%;
    max-height: 100%;
    width: auto;
    cursor: zoom-in;
    &--zoomed {
      cursor: grab;
    }
  }
  &__close {
    display: flex;
    height: 45px;
    width: 45px;
    padding: pxtorem(5px);
    background: none;
    border: none;
    margin-top: pxtorem(20px);
  }
  &__zoom-in {
    display: flex;
    height: 45px;
    width: 45px;
    padding: pxtorem(12.5px);
    background: none;
    border: none;
    margin-top: pxtorem(19px);
  }
  &__counter {
    color: color-token('almost-black');
    font-size: pxtorem(20px);
    margin-top: pxtorem(23px);
  }
  &__caption {
    font-size: pxtorem(13px);
    line-height: pxtorem(20px);
    color: color-token('almost-black');
    align-self: center;
    padding-bottom: pxtorem(4px);
  }
  &__arrow {
    position: absolute;
    top: 50%;
    z-index: 1;
    font-size: pxtorem(14px);
    width: 33px;
    height: 42px;
    border: none;
    color: color-token(primary);
    margin-top: pxtorem(-21px);
    background: color-token('transparent');
    text-align: center;
    & > span {
      margin-left: -3px;
    }
    & > span::before,
    span::after {
      height: 1px;
      width: 26px;
      background: color-token('almost-black');
      content: '';
      display: block;
      position: absolute;
    }
    &--prev {
      left: pxtorem(30px);
      & > span::before {
        transform: rotateZ(45deg);
        bottom: 11px;
      }
      & > span::after {
        transform: rotateZ(-45deg);
        top: 11px;
      }
    }
    &--next {
      right: pxtorem(30px);
      & > span::before {
        transform: rotateZ(-45deg);
        bottom: 11px;
      }
      & > span::after {
        transform: rotateZ(45deg);
        top: 11px;
      }
    }
  }
}
</style>
