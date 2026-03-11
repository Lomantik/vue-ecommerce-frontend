<script setup lang="ts">
import MediaBanner from '@/components/blocks/MediaBanner.vue'
import { RouterLink } from 'vue-router'

defineProps<{
  title?: string
}>()
</script>

<template>
  <section class="banner-grid container">
    <h3 v-if="title" class="banner-grid__title" v-html="title"></h3>
    <div class="row g-30 g-sm-60">
      <div class="banner-grid__banner-wrapper col-12 col-md-4">
        <MediaBanner class="banner" image-key="m2" :lazy="true">
          <h4 class="banner__title">Home / Indoor<br />Plants</h4>
          <div>
            <RouterLink class="btn btn-white" to="/shop"> FOR MY HOME </RouterLink>
          </div>
        </MediaBanner>
      </div>
      <div class="banner-grid__banner-wrapper col-12 col-md-4">
        <MediaBanner class="banner" image-key="m3" :lazy="true">
          <h4 class="banner__title">Holiday Gifts <br />Collection</h4>
          <div>
            <RouterLink class="btn btn-white" to="/shop"> SHOP GIFTS </RouterLink>
          </div>
        </MediaBanner>
      </div>
      <div class="banner-grid__banner-wrapper banner-grid__banner-wrapper--last col-12 col-md-4">
        <MediaBanner class="banner" image-key="m04" :lazy="true">
          <h4 class="banner__title">Eco-Friendly <br />Supplies</h4>
          <div>
            <RouterLink class="btn btn-white" to="/shop"> PLANTS CARE </RouterLink>
          </div>
        </MediaBanner>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/assets/styles/bootstrap-api' as *;

.banner-grid {
  &__title {
    margin-bottom: pxtorem(30px);
  }
  &__banner-wrapper {
    margin-bottom: pxtorem(30px);
    @include media-breakpoint-up(md) {
      margin-bottom: 0;
    }
    &--last {
      margin-bottom: 0;
    }
  }
}
.banner {
  border-radius: 6px;
  overflow: hidden;
  &__title {
    font-size: pxtorem(28px);
    margin-bottom: pxtorem(176px);
    font-weight: 600;
    color: color-token(banner-text);
  }
}
</style>
