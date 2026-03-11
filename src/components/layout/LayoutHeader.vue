<script setup lang="ts">
import LayoutMenu from '@/components/layout/LayoutMenu.vue'
import NavbarTogglerIcon from '@/components/ui/NavbarTogglerIcon.vue'
import UserActions from '@/components/UserActions.vue'
import MainLogo from '@/components/MainLogo.vue'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const showMobileMenu = ref<boolean>(false)
const route = useRoute()
watch(
  () => route.fullPath,
  () => {
    showMobileMenu.value = false
  },
)
</script>

<template>
  <header class="header">
    <nav class="main-menu navbar navbar-expand-lg">
      <div class="main-menu__wrapper container-fluid">
        <MainLogo class="navbar-brand" />
        <button
          class="main-menu__toggler navbar-toggler"
          type="button"
          @click="showMobileMenu = !showMobileMenu"
        >
          <span class="main-menu__toggler-icon navbar-toggler-icon-1">
            <NavbarTogglerIcon />
          </span>
        </button>
        <LayoutMenu :show-mobile-menu="showMobileMenu" />
        <UserActions />
      </div>
    </nav>
  </header>
</template>

<style scoped lang="scss">
@use '@/assets/styles/bootstrap-api' as *;

.header {
  padding-left: pxtorem(15px);
  padding-right: pxtorem(15px);
  border-bottom: 1px solid color-token(header-border);
  background: color-token(header-bg);
  position: sticky;
  top: 0;
  z-index: 3;
  @include media-breakpoint-up(md) {
    padding-left: pxtorem(50px);
    padding-right: pxtorem(50px);
  }
}
.main-menu {
  margin-top: auto;
  padding: 0;
  font-size: pxtorem(14px);
  letter-spacing: 0.02em;
  &__wrapper {
    padding: 0;
  }
  &__toggler {
    order: -1;
    border: none;
    padding: 0;
    display: flex;
    box-shadow: none !important;
    @include media-breakpoint-up(lg) {
      display: none;
    }
    &-icon {
      align-items: center;
      display: flex;
    }
  }
}
</style>
