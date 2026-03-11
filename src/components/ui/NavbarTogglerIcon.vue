<script setup lang="ts"></script>

<template>
  <svg
    class="navbar-toggler-icon"
    viewBox="0 0 30 18"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M12.6091 15.1015C13.226 15.6443 13.9109 16.1139 14.6503 16.5015H0.778979C0.39238 16.5015 0.0789795 16.1881 0.0789795 15.8015C0.0789795 15.4149 0.39238 15.1015 0.778979 15.1015H12.6091ZM9.32928 9.109C9.40623 9.59085 9.51445 10.058 9.65176 10.509H0.778979C0.39238 10.509 0.0789795 10.1956 0.0789795 9.809C0.0789795 9.4224 0.39238 9.109 0.778979 9.109H9.32928ZM9.99424 3.11648C9.81437 3.56898 9.66254 4.03642 9.54096 4.51648H0.778979C0.39238 4.51648 0.0789795 4.20308 0.0789795 3.81648C0.0789795 3.42988 0.39238 3.11648 0.778979 3.11648L9.99424 3.11648Z"
      class="navbar-toggler-icon__part1"
      fill-rule="evenodd"
      clip-rule="evenodd"
    ></path>
    <path
      d="M24.1723 11.7865L28.9663 17M25.97 6.99251C25.97 10.3021 23.2871 12.985 19.9775 12.985C16.668 12.985 13.985 10.3021 13.985 6.99251C13.985 3.68294 16.668 1 19.9775 1C23.2871 1 25.97 3.68294 25.97 6.99251Z"
      class="navbar-toggler-icon__part2"
      stroke-width="1.4"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></path>
  </svg>
</template>

<style scoped lang="scss">
@use '@/assets/styles/bootstrap-api' as *;

.navbar-toggler-icon {
  background: none;
  width: 30px;
  height: 18px;
  fill: none;
  stroke: color-token(primary);
  &__part1 {
    stroke: none;
    fill: color-token(primary);
  }
  &__part2 {
    stroke: color-token(primary);
  }
}
</style>
