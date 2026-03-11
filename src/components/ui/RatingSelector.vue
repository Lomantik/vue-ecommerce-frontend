<script setup lang="ts">
import { ref } from 'vue'

const rating = defineModel<number>({ required: true })
const currentValue = ref<number>(0)
function setValue() {
  rating.value = currentValue.value
}
</script>

<template>
  <span class="rating-selector">
    <span class="rating-selector__wrapper" @mouseleave="currentValue = rating">
      <button
        class="rating-selector__star"
        :class="{ 'rating-selector__star--filled': currentValue > 0 }"
        @mouseenter="currentValue = 1"
        @click="setValue"
        href="#"
        type="button"
      ></button>
      <button
        class="rating-selector__star"
        :class="{ 'rating-selector__star--filled': currentValue > 1 }"
        @mouseenter="currentValue = 2"
        @click="setValue"
        href="#"
        type="button"
      ></button>
      <button
        class="rating-selector__star"
        :class="{ 'rating-selector__star--filled': currentValue > 2 }"
        @mouseenter="currentValue = 3"
        @click="setValue"
        href="#"
        type="button"
      ></button>
      <button
        class="rating-selector__star"
        :class="{ 'rating-selector__star--filled': currentValue > 3 }"
        @mouseenter="currentValue = 4"
        @click="setValue"
        href="#"
        type="button"
      ></button>
      <button
        class="rating-selector__star"
        :class="{ 'rating-selector__star--filled': currentValue > 4 }"
        @mouseenter="currentValue = 5"
        @click="setValue"
        href="#"
        type="button"
      ></button>
    </span>
  </span>
</template>

<style scoped lang="scss">
@use '@/assets/styles/bootstrap-api' as *;
@use 'sass:map';

.rating-selector {
  font-size: pxtorem(20px);
  line-height: 1;
  &__star {
    font-size: pxtorem(20px);
    line-height: 1;
    border: none;
    background: none;
    padding: 0;
    width: 18px;
    &::before {
      content: content-token(star-empty);
      font-family: font-family-token(blooms);
      color: color-token(stars-filled);
    }
    &--filled {
      &::before {
        content: content-token(star-filled);
      }
    }
  }
}
</style>
