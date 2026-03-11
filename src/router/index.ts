import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import CartPage from '@/pages/CartPage.vue'
import CheckoutPage from '@/pages/CheckoutPage.vue'
import ShopPage from '@/pages/ShopPage.vue'
import SlugResolver from '@/components/SlugResolver.vue'
import { useNavigationStore } from '@/stores/navigation.store.ts'
import { getLayoutMeta, resolveBreadcrumb } from '@/router/meta.ts'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: HomePage,
    meta: {
      breadcrumb: 'Home',
      hideHome: true,
      hideBreadcrumbs: true,
    },
  },
  {
    path: '/shop',
    component: ShopPage,
    meta: {
      breadcrumb: 'Shop',
      hideHome: false,
      hideBreadcrumbs: true,
    },
  },
  {
    path: '/cart',
    component: CartPage,
    meta: {
      breadcrumb: 'Cart',
      hideHome: true,
      hideBreadcrumbs: true,
    },
  },
  {
    path: '/checkout',
    component: CheckoutPage,
    meta: {
      breadcrumb: 'Checkout',
      hideHome: true,
      hideBreadcrumbs: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    component: SlugResolver,
    meta: {
      hideHome: false,
      hideBreadcrumbs: false,
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0, behavior: 'smooth' }
  },
})

router.beforeEach((_to, from) => {
  const fromMeta = getLayoutMeta(from)
  const breadcrumb = resolveBreadcrumb(fromMeta, from)

  if (breadcrumb) {
    const navStore = useNavigationStore()
    navStore.clearTrails()
    if (breadcrumb === 'Shop') {
      navStore.setFixedTrail({ title: breadcrumb, path: from.path })
    }
  }
})

export default router
