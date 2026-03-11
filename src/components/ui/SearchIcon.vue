<script setup lang="ts"></script>

<template>
  <svg class="search-icon" viewBox="0 0 21 20" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M13.74 13.34L19.4 19M15.4 8.2C15.4 12.1764 12.1764 15.4 8.2 15.4C4.22355 15.4 1 12.1764 1 8.2C1 4.22355 4.22355 1 8.2 1C12.1764 1 15.4 4.22355 15.4 8.2Z"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></path>
  </svg>
</template>

<style scoped lang="scss">
@use '@/assets/styles/bootstrap-api' as *;

.search-icon {
  width: 21px;
  height: 20px;
  fill: none;
  stroke: color-token(primary);
}
</style>
