import { ref, shallowRef } from 'vue'
import { defineStore } from 'pinia'
import type { Product } from '@/types/product.ts'
import type { Category } from '@/types/category.ts'
import type { Page } from '@/types/page.ts'

export const usePageContextStore = defineStore('pageContext', () => {
  const type = ref<string>('not-found')
  const data = shallowRef<Product | Category | Page | null>(null)
  const loading = ref<boolean>(false)

  return {
    type,
    data,
    loading,
  }
})
