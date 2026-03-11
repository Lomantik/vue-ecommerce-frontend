<script setup lang="ts">
import SearchIcon from '@/components/ui/SearchIcon.vue'
import UserAreaIcon from '@/components/ui/UserAreaIcon.vue'
import CartIcon from '@/components/ui/CartIcon.vue'
</script>

<template>
  <nav class="user-actions">
    <ul class="user-actions__wrapper">
      <li class="user-actions__item user-actions__item-search">
        <SearchIcon />
      </li>
      <li class="user-actions__item">
        <UserAreaIcon />
      </li>
      <li class="user-actions__item user-actions__item-cart">
        <CartIcon />
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
@use '@/assets/styles/bootstrap-api' as *;

.user-actions {
  &__wrapper {
    display: flex;
    margin: 0;
    padding: 0;
  }
  &__item {
    display: flex;
    padding-left: pxtorem(22px);
    list-style: none;
    &-search {
      display: none;
      @include media-breakpoint-up(lg) {
        display: flex;
      }
    }
    &-cart {
      padding-left: pxtorem(18px);
      @include media-breakpoint-up(lg) {
        padding-left: pxtorem(22px);
      }
    }
  }
}
</style>
