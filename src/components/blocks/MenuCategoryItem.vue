<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { Category } from '@/types/category.ts'
import { computed, inject, ref, watch } from 'vue'
import { ActiveMenuKey } from '@/types/injectionKeys.ts'
import { buildCategoryPath } from '@/api/categories.api.ts'

interface Link {
  title: string
  slug: string
}

const props = defineProps<{
  category: Category
  link?: Link
  level?: number
  isMobile: boolean
}>()
const context = inject(ActiveMenuKey)
if (!context) {
  throw new Error('ActiveMenuKey not provided')
}
const { activeMenu, openLevel, toggleLevel } = context
const itemTitle = computed(() => {
  return props.link?.title ? props.link.title : props.category?.title
})
const itemSlug = computed(() => {
  return props.link?.slug ? props.link.slug : joinedCanonicalPath.value
})
const hasChildren = computed(() => {
  return props.link ? true : props.category.children && props.category?.children?.length > 0
})
const currentLevel = computed(() => {
  return props.level ? props.level : 0
})
const showExpandable = computed(() => {
  return props.link?.slug
    ? activeMenu.value[currentLevel.value] === props.link.slug
    : activeMenu.value[currentLevel.value] === props.category.slug
})
const isDropend = computed(() => {
  return currentLevel.value % 2 !== 0
})
const joinedCanonicalPath = computed(() => {
  return canonicalPath.value.join('/')
})

const canonicalPath = ref<string[]>([])
watch(
  () => props.category,
  async (category) => {
    canonicalPath.value = await buildCategoryPath(category)
  },
  { immediate: true },
)
</script>

<template>
  <li
    class="expandable-menu__item nav-item"
    :class="{
      'expandable-menu__item--level0': currentLevel === 0,
      'expandable-menu__item--dropend': isDropend,
    }"
    @mouseenter="!isMobile && openLevel(currentLevel, itemSlug)"
  >
    <div class="row">
      <div class="col">
        <RouterLink
          class="expandable-menu__item-link"
          :to="'/' + itemSlug"
          :class="{
            'expandable-menu__item-link--level0 nav-link': currentLevel === 0,
            'expandable-menu__item-link--has-children': hasChildren,
            'expandable-menu__item-link--dropend': isDropend,
          }"
        >
          {{ itemTitle }}
        </RouterLink>
      </div>
      <div class="col" v-if="hasChildren && isMobile">
        <button
          class="expandable-menu__item-expander"
          :class="{
            'expandable-menu__item-expander--expanded': showExpandable,
          }"
          @click="isMobile && toggleLevel(currentLevel, itemSlug)"
        >
          <span class="text-primary"></span>
        </button>
      </div>
    </div>
    <ul
      class="expandable-menu__item-dropdown dropdown-menu"
      v-if="hasChildren"
      :class="{ 'expandable-menu__item-dropdown--show': showExpandable }"
    >
      <MenuCategoryItem
        v-for="child in category.children"
        :key="child.id"
        :category="child"
        :level="currentLevel + 1"
        :is-mobile="isMobile"
      />
    </ul>
  </li>
</template>

<style scoped lang="scss">
@use '@/assets/styles/bootstrap-api' as *;
@use 'sass:map';
@use 'sass:color';

.expandable-menu {
  &__item {
    padding: 0;
    position: relative;
    &-link {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: pxtorem(10px 0);
      width: 180px;
      border-radius: 120px;
      @include media-breakpoint-up(lg) {
        min-height: 38px;
        padding: pxtorem(10px 0);
      }
      &--level0 {
        width: auto;
        justify-content: flex-start;
        padding: pxtorem(17px 0);
        @include media-breakpoint-up(lg) {
          &:hover {
            background-color: color.adjust(color-token(menu-item-bg), $alpha: -0.9);
          }
          padding: pxtorem(10px 20px);
        }
      }
      &--has-children {
        &::after {
          display: none;
          content: content-token('arrow-down');
          font-family: font-family-token(blooms);
          font-size: pxtorem(16px);
          border: none;
          margin-left: pxtorem(10px);
          @include media-breakpoint-up(lg) {
            display: block;
          }
        }
        &.expandable-menu__item-link--dropend::after {
          content: content-token('arrow-right');
        }
      }
    }
    &-expander {
      display: flex;
      background: color-token(menu-bg);
      align-items: center;
      border: none;
      height: 100%;
      margin-left: auto;
      & > span::after {
        content: content-token('mobile-arrow-down');
        font-family: font-family-token(blooms);
        font-size: pxtorem(13px);
        border: none;
        margin-left: auto;
        display: block;
      }
      &--expanded {
        transform: rotateX(-180deg);
      }
    }
    &-dropdown {
      display: none;
      top: 100%;
      left: 0;
      padding: pxtorem(15px 15px 0 15px);
      border: none;
      @include media-breakpoint-up(lg) {
        margin-top: pxtorem(8px);
        margin-left: pxtorem(-8px);
        padding: pxtorem(18px 27px);
        border: 1px solid color-token(primary);
      }
      &--show {
        display: block;
      }
      &::before {
        pointer-events: auto;
        content: '';
        position: absolute;
        top: pxtorem(-9px);
        left: 0;
        right: 0;
        height: 10px;
        width: 100%;
      }
    }
    &--level0 {
      border-bottom: 1px solid var(--bs-border-color);
      font-size: pxtorem(17px);
      @include media-breakpoint-up(lg) {
        border-bottom: none;
        padding: pxtorem(20px 0);
        font-size: pxtorem(14px);
      }
      > .expandable-menu__item-dropdown {
        padding: pxtorem(0 15px 15px 15px);
        @include media-breakpoint-up(lg) {
          padding: pxtorem(18px 27px);
        }
      }
    }
    &--dropend {
      > .expandable-menu__item-dropdown {
        @include media-breakpoint-up(lg) {
          top: 0;
          left: 100%;
          margin-top: pxtorem(-16px);
          margin-left: pxtorem(35px);
          &::before {
            top: 0;
            left: pxtorem(-9px);
            bottom: 0;
            height: 100%;
            width: 10px;
          }
        }
      }
    }
  }
}
</style>
