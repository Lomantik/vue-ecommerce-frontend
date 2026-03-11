<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { computed, onMounted, onUnmounted, provide, type Ref, ref, watch, watchEffect } from 'vue'
import MenuCategoryItem from '@/components/blocks/MenuCategoryItem.vue'
import type { Category } from '@/types/category.ts'
import { getCategoryTree } from '@/api/categories.api.ts'
import { ActiveMenuKey } from '@/types/injectionKeys.ts'

const props = defineProps<{
  showMobileMenu: boolean
}>()

function useBreakpoint(): { isMobile: Ref<boolean> } {
  const isMobile = ref<boolean>(false)
  const check = () => (isMobile.value = window.matchMedia('(max-width: 991px)').matches)
  onMounted(() => {
    check()
    window.addEventListener('resize', check)
  })
  onUnmounted(() => {
    window.removeEventListener('resize', check)
  })

  return {
    isMobile,
  }
}

const showMobileMenuClass = computed(() => {
  return props.showMobileMenu ? 'show' : ''
})
const activeMenu = ref<string[]>([])
const route = useRoute()
const categoryTree = ref<Category | null>(null)
const { isMobile } = useBreakpoint()

function openLevel(level: number, slug: string): void {
  activeMenu.value[level] = slug
}

function closeAll(): void {
  activeMenu.value = []
}

provide(ActiveMenuKey, {
  activeMenu,
  openLevel(level: number, slug: string): void {
    activeMenu.value[level] = slug
  },
  toggleLevel(level: number, slug: string): void {
    if (activeMenu.value[level] === slug) activeMenu.value[level] = ''
    else activeMenu.value[level] = slug
  },
})

watch(
  () => route.fullPath,
  () => {
    closeAll()
  },
)

watchEffect(async () => {
  categoryTree.value = await getCategoryTree()
})
</script>

<template>
  <div
    class="menu navbar-collapse collapse"
    :class="showMobileMenuClass"
    @mouseleave="!isMobile && closeAll()"
  >
    <ul class="menu__wrapper navbar-nav" :class="{ 'is-mobile': isMobile }">
      <li class="menu__item nav-item" @mouseenter="!isMobile && openLevel(0, 'home')">
        <RouterLink
          to="/"
          class="menu__item-link nav-link"
          exact-active-class="active"
          :class="{ 'menu__item-link--is-mobile': isMobile }"
          >Home</RouterLink
        >
      </li>
      <MenuCategoryItem
        v-if="categoryTree"
        :is-mobile="isMobile"
        :category="categoryTree"
        :link="{ title: 'Shop', slug: 'shop' }"
      />
      <li class="menu__item nav-item" @mouseenter="!isMobile && openLevel(0, 'about')">
        <RouterLink
          to="/about"
          class="menu__item-link nav-link"
          exact-active-class="active"
          :class="{ 'menu__item-link--is-mobile': isMobile }"
          >About</RouterLink
        >
      </li>
      <li class="menu__item nav-item" @mouseenter="!isMobile && openLevel(0, 'contact')">
        <RouterLink
          to="/contact"
          class="menu__item-link nav-link"
          exact-active-class="active"
          :class="{ 'menu__item-link--is-mobile': isMobile }"
          >Contact</RouterLink
        >
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/bootstrap-api' as *;
@use 'sass:color';

.menu {
  //start-0 end-0
  background: color-token(menu-bg);
  position: absolute;
  top: 100%;
  margin-left: pxtorem(-15px);
  margin-right: pxtorem(-15px);
  height: 100vh;
  left: 0;
  right: 0;
  @include media-breakpoint-up(md) {
    margin-left: pxtorem(-50px);
    margin-right: pxtorem(-50px);
  }
  @include media-breakpoint-up(lg) {
    position: static;
    margin-left: 0;
    margin-right: 0;
    height: auto;
  }
  &__wrapper {
    line-height: 1;
    padding-left: pxtorem(15px);
    padding-right: pxtorem(15px);
    @include media-breakpoint-up(lg) {
      padding-left: 0;
      padding-right: 0;
    }
  }
  &__item {
    padding-top: 0;
    padding-bottom: 0;
    border-bottom: 1px solid color-token(header-border);
    @include media-breakpoint-up(lg) {
      border-bottom: none;
      padding-top: pxtorem(20px);
      padding-bottom: pxtorem(20px);
    }
    &-link {
      padding-top: pxtorem(17px);
      padding-bottom: pxtorem(17px);
      min-height: 38px;
      display: flex;
      align-items: center;
      border-radius: 120px;
      font-size: pxtorem(17px);
      @include media-breakpoint-up(lg) {
        border-bottom: none;
        padding: pxtorem(10px 20px);
        font-size: pxtorem(14px);
      }
      &--is-mobile {
        color: color-token(primary) !important;
        &:hover {
          background: color-token(menu-bg) !important;
          color: color-token(link-hovered) !important;
        }
      }
      &:hover {
        background-color: color.adjust(color-token(menu-item-bg), $alpha: -0.9);
      }
    }
  }
}
</style>
