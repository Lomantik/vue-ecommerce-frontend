<script setup lang="ts">
import MediaBanner from '@/components/blocks/MediaBanner.vue'
</script>

<template>
  <section class="subscription container">
    <MediaBanner class="subscription__banner-wrapper" image-key="boxbg" :lazy="true">
      <h4 class="subscription__title">Subscribe to get notified about exclusive offers!</h4>
      <div class="subscription__form">
        <div class="subscription__form-wrapper">
          <input
            type="email"
            name="email"
            autocomplete="off"
            class="subscription__form-input form-control"
          />
          <div>
            <button class="btn btn-secondary">SUBSCRIBE</button>
          </div>
        </div>
      </div>
    </MediaBanner>
  </section>
</template>

<style scoped lang="scss">
@use '@/assets/styles/bootstrap-api' as *;

.subscription {
  &__banner-wrapper {
    border-radius: 6px;
    overflow: hidden;
    text-align: center;
    justify-content: center;
    padding: 6%;
    @include media-breakpoint-up(md) {
      padding: 6% 10%;
    }
  }
  &__title {
    color: color-token(tertiary);
    margin-bottom: pxtorem(46px);
  }
  &__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    &-wrapper {
      max-width: 440px;
      width: 100%;
    }
    &-input {
      margin-bottom: pxtorem(25px);
      width: 100%;
      line-height: 1;
    }
  }
}
</style>
