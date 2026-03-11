<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { getLayoutMeta } from '@/router/meta.js'
import { usePageContextStore } from '@/stores/pageContext.store.js'
import { useNavigationStore } from '@/stores/navigation.store.js'
import type { Category } from '@/types/category.ts'
import type { Breadcrumb } from '@/types/meta.ts'
import type { Product } from '@/types/product.ts'
import type { Page } from '@/types/page.ts'

function buildCategoryBreadcrumbs(category: Category): Breadcrumb[] {
  const crumbs: Breadcrumb[] = []
  let path = ''
  for (const parent of category.parents) {
    path += '/' + parent.slug
    crumbs.push({ label: parent.title, path: path })
  }
  path += '/' + category.slug
  crumbs.push({ label: category.title, path: path })
  return crumbs
}

const route = useRoute()

const meta = computed(() => getLayoutMeta(route))

const pageContext = usePageContextStore()

const hideBreadcrumbs = computed(() => {
  return meta?.value?.hideBreadcrumbs
    ? meta.value.hideBreadcrumbs
    : pageContext?.type === 'category'
})

const navStore = useNavigationStore()

const breadcrumbs = computed(() => {
  const crumbs = []

  if (!meta.value.hideHome) crumbs.push({ label: 'Home', path: '/' })

  if (meta.value.breadcrumb) {
    crumbs.push({ label: meta.value.breadcrumb, path: route.path })
  } else {
    let data: Product | Category | Page | null = null
    switch (pageContext.type) {
      case 'product':
        data = pageContext.data as Product
        if (navStore.categoryTrail) {
          const trail = navStore.categoryTrail
          crumbs.push(...buildCategoryBreadcrumbs(trail))
        } else if (navStore.fixedTrail) {
          const trail = navStore.fixedTrail
          crumbs.push({ label: trail.title, path: trail.path })
        }
        crumbs.push({ label: data.title, path: data.slug })
        break
      case 'category':
        data = pageContext.data as Category
        crumbs.push(...buildCategoryBreadcrumbs(data))
        break
      case 'page':
        data = pageContext.data as Page
        crumbs.push({ label: data.title, path: data.slug })
        break
      case 'not-found':
        crumbs.length = 0
    }
  }
  return crumbs
})
</script>

<template>
  <nav v-if="!hideBreadcrumbs" aria-label="breadcrumb" class="breadcrumbs container-fluid">
    <div class="">
      <ol class="breadcrumbs__wrapper breadcrumb">
        <li
          v-for="(crumb, index) in breadcrumbs"
          :key="index"
          class="breadcrumbs__wrapper-item breadcrumb-item"
        >
          <RouterLink v-if="index < breadcrumbs.length - 1" :to="crumb.path">
            {{ crumb.label }}
          </RouterLink>
          <span v-else class="breadcrumbs__wrapper-item--active">{{ crumb.label }}</span>
        </li>
      </ol>
    </div>
  </nav>
</template>

<style scoped lang="scss">
@use '@/assets/styles/bootstrap-api' as *;

.breadcrumbs {
  padding-top: pxtorem(15px);
  padding-bottom: pxtorem(15px);
  @include media-breakpoint-up(md) {
    padding: pxtorem(15px 50px);
  }
  @include media-breakpoint-up(lg) {
    padding: pxtorem(25px 50px);
  }
  &__wrapper {
    margin-bottom: 0;
    &-item {
      font-size: pxtorem(12px);
      &--active {
        color: color-token(link-active);
      }
    }
  }
}
</style>
