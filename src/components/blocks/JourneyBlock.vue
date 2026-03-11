<script setup lang="ts">
import ResponsiveImage from '@/components/ui/ResponsiveImage.vue'
</script>

<template>
  <section class="journey container">
    <h3>The Journey to <em>Your New Plant</em></h3>
    <p class="journey__info">
      We only work with the very best! Our team of expert plant care specialists take great care to
      make sure your plants are healthy and thriving when they arrive at your doorstep.
    </p>
    <div class="journey__items row">
      <div class="col-12 col-md-4">
        <ResponsiveImage
          class="journey__items-image journey__items-image--first"
          image-key="icon1"
          loading="lazy"
        />
        <h5 class="journey__items-title">Find your plant</h5>
        <p class="journey__items-info">
          It’s the only way I know how to live. What feels good. What feels right. What is needed.
          Give me a problem and I will approach it creatively, from my gut.
        </p>
      </div>
      <div class="col-12 col-md-4">
        <ResponsiveImage
          class="journey__items-image journey__items-image--second"
          image-key="icon2"
          loading="lazy"
        />
        <h5 class="journey__items-title">Choose your pot</h5>
        <p class="journey__items-info">
          I wanted to have one that wasn’t like anyone else’s. My aim is to make the poor look rich
          and the rich look poor. Those designers are just crazy; but aren’t we all?
        </p>
      </div>
      <div class="col-12 col-md-4">
        <ResponsiveImage
          class="journey__items-image journey__items-image--last"
          image-key="icon3"
          loading="lazy"
        />
        <h5 class="journey__items-title">Deliver to your home</h5>
        <p class="journey__items-info journey__items-info--last">
          I have a fantastic relationship with money. I use it to buy my freedom. I’m a designer and
          people think, what do I know? I have an obsession with details and pattern.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/assets/styles/bootstrap-api' as *;

.journey {
  line-height: 1.45;
  width: 100%;
  &__info {
    @include media-breakpoint-up(md) {
      max-width: 62%;
    }
    margin-bottom: pxtorem(90px);
  }
  &__items {
    --bs-gutter-x: 0;
    width: 100%;
    @include media-breakpoint-up(sm) {
      width: auto;
      --bs-gutter-x: 140px;
    }
    &-image {
      height: auto;
      margin-bottom: pxtorem(14px);
      &--first {
        max-width: 68px;
      }
      &--second {
        max-width: 76px;
      }
      &--last {
        max-width: 81px;
        height: 80px;
      }
    }
    &-title {
      font-weight: 600;
    }
    &-info {
      font-size: pxtorem(14px);
      margin-bottom: pxtorem(90px);
      @include media-breakpoint-up(md) {
        margin-bottom: spacer(paragraph-padding-bottom);
      }
      &--last {
        margin-bottom: spacer(paragraph-padding-bottom);
      }
    }
  }
}
</style>
