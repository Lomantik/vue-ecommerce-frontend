<script setup lang="ts">
import { watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import ProductPage from '@/pages/ProductPage.vue'
import CategoryPage from '@/pages/CategoryPage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'
import StaticPage from '@/pages/StaticPage.vue'
import { usePageContextStore } from '@/stores/pageContext.store.js'
import { useNavigationStore } from '@/stores/navigation.store.js'

import { ref, shallowRef } from 'vue'
import { getProductBySlug } from '@/api/products.api.ts'
import { buildCategoryPath, getCategoryById, getCategoryBySlug } from '@/api/categories.api.ts'
import { arraysEqual } from '@/utils/general.ts'
import { getPageBySlug } from '@/api/pages.api.ts'
import type { Category } from '@/types/category.ts'
import type { Product } from '@/types/product.ts'
import type { Page } from '@/types/page.ts'

const route = useRoute()
const pageContext = usePageContextStore()
const navStore = useNavigationStore()

const resolvedType = ref<string>('')
const resolvedData = shallowRef<Product | Category | Page | null>(null)
const loading = ref<boolean>(false)

async function resolve() {
  loading.value = true
  const segments = route.params.pathMatch
  if (Array.isArray(segments)) {
    const slug = segments ? segments[segments.length - 1] : ''
    if (slug) {
      const product = await getProductBySlug(slug)
      if (product && segments?.length === 1) {
        resolvedType.value = 'product'
        resolvedData.value = product
        loading.value = false
        return
      }

      const category = await getCategoryBySlug(slug)
      if (category) {
        const canonicalPath = await buildCategoryPath(category)
        if (arraysEqual(canonicalPath, segments)) {
          const parents = []
          let current = category
          while (current.parentId) {
            const parent = await getCategoryById(current.parentId)
            if (!parent) break
            parents.push(parent)
            current = parent
          }

          resolvedType.value = 'category'
          resolvedData.value = {
            ...category,
            parents: parents,
          } as Category
          loading.value = false
          return
        }
      }

      const page = await getPageBySlug(slug)
      if (page && segments.length === 1) {
        resolvedType.value = 'page'
        resolvedData.value = page
        loading.value = false
        return
      }
    }
  }

  resolvedType.value = 'not-found'
  resolvedData.value = null
  loading.value = false
}

watchEffect(async () => {
  await resolve()
  pageContext.type = resolvedType.value
  pageContext.data = resolvedData.value
  pageContext.loading = loading.value

  if (pageContext.type !== 'product') {
    navStore.clearTrails()
  }
})
</script>

<template>
  <div v-if="loading">Loading...</div>
  <ProductPage v-if="resolvedType === 'product'" :product="resolvedData as Product" />
  <CategoryPage v-else-if="resolvedType === 'category'" :category="resolvedData as Category" />
  <StaticPage v-else-if="resolvedType === 'page'" :page="resolvedData as Page" />
  <NotFoundPage v-else />
</template>

<style scoped></style>
