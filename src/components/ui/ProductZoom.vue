<script setup lang="ts"></script>

<template>
  <svg class="product-zoom" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 25">
    <path d="M15.75 5H19.5V8.75" stroke="#2F2F2F" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M14.25 10.25L19.5 5" stroke="#2F2F2F" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M8.25 20H4.5V16.25" stroke="#2F2F2F" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M9.75 14.75L4.5 20" stroke="#2F2F2F" stroke-linecap="round" stroke-linejoin="round" />
    <path
      d="M19.5 16.25V20H15.75"
      stroke="#2F2F2F"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M14.25 14.75L19.5 20"
      stroke="#2F2F2F"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path d="M4.5 8.75V5H8.25" stroke="#2F2F2F" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M9.75 10.25L4.5 5" stroke="#2F2F2F" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
</template>

<style scoped lang="scss">
@use '@/assets/styles/bootstrap-api' as *;

.product-zoom {
  width: 24px;
  height: 25px;
  fill: none;
}
</style>
