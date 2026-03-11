<script setup lang="ts">
import ProductList from '@/components/product/ProductList.vue'
import PageTitle from '@/components/blocks/PageTitle.vue'
import ResponsiveImage from '@/components/ui/ResponsiveImage.vue'
</script>

<template>
  <section>
    <div class="shop-page">
      <div class="shop-page__banner">
        <ResponsiveImage image-key="shop-header" class="shop-page__banner-image" />
      </div>
      <PageTitle title="Shop" />
      <div class="shop-page__product-list container">
        <ProductList :titleTag="'h3'" />
      </div>
      <p class="shop-page__info container">
        The difference between style and fashion is quality. Age is something only in your head or a
        stereotype. Age means nothing when you are passionate about something. I can't get sucked
        into that celebrity thing, because I think it's just crass. I've always tried to push myself
        technically and to push myself visually. That's been part of the journey. I would like to be
        a one-man multinational fashion phenomenon. My aim is to make the poor look rich and the
        rich look poor. If you wear clothes that don't suit you, you're a fashion victim. You have
        to wear clothes that make you look better. I am not interested in shock tactics. I just want
        to make beautiful clothes. Money is the most corrosive aspect of life today because it means
        that all attention to detail is forgotten. I always loved aesthetics. Not particularly
        fashion, but an idea of beauty. It is not easy to dress well. Over the years I have learned
        that what is important in a dress is the woman who is wearing it. It is not easy to dress
        well. For me, art is about learning and about living with people. It's alive. A lot of
        self-importance goes on in the fashion industry. I'm not like that.
      </p>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/assets/styles/bootstrap-api' as *;

.shop-page {
  padding-bottom: pxtorem(40px);
  @include media-breakpoint-up(md) {
    padding-bottom: pxtorem(60px);
  }
  &__banner {
    height: 180px;
    @include media-breakpoint-up(md) {
      height: 360px;
    }
    &-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &__product-list {
    padding-top: pxtorem(30px);
    padding-bottom: pxtorem(30px);
  }
  &__info {
    font-size: pxtorem(13px);
    line-height: 1.7;
    padding-top: pxtorem(40px);
    border-top: 1px solid color-token(border);
  }
}
</style>
