import 'pinia-plugin-persistedstate'
import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { PersistenceOptions } from 'pinia-plugin-persistedstate'
import type { Category, FixedTrail } from '@/types/category.ts'

export const useNavigationStore = defineStore(
  'navigation',
  () => {
    const categoryTrail = ref<Category | null>(null)
    const fixedTrail = ref<FixedTrail | null>(null)

    function setCategoryTrail(trail: Category): void {
      categoryTrail.value = trail
    }

    function setFixedTrail(trail: FixedTrail): void {
      fixedTrail.value = trail
    }

    function clearTrails(): void {
      categoryTrail.value = null
      fixedTrail.value = null
    }

    return {
      categoryTrail,
      fixedTrail,
      setCategoryTrail,
      setFixedTrail,
      clearTrails,
    }
  },
  {
    persist: {
      key: 'nav',
      storage: sessionStorage,
      paths: ['categoryTrail', 'fixedTrail'],
    } as PersistenceOptions,
  },
)
