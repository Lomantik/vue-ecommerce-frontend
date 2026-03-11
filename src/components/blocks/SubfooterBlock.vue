<script setup lang="ts"></script>

<template>
  <div class="subfooter">
    <div class="container">
      <div>Copyright&nbsp;&nbsp;©&nbsp;&nbsp;2026</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/bootstrap-api' as *;
@use 'sass:color';

.subfooter {
  font-size: pxtorem(12px);
  color: color.adjust(color-token(footer-text), $alpha: -0.4);
  padding-top: pxtorem(30px);
  padding-bottom: pxtorem(30px);
  background: color-token(primary);
  display: flex;
  justify-content: center;
  @include media-breakpoint-up(md) {
    justify-content: start;
  }
}
</style>
