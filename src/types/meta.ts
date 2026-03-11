import 'vue-router'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

export interface Breadcrumb {
  label: string
  path: string
}

declare module 'vue-router' {
  interface RouteMeta {
    layout?: string
    hideHome: boolean
    hideBreadcrumbs: boolean
    breadcrumb?: string | ((route: RouteLocationNormalizedLoaded) => string)
    parentBreadcrumb?: (route: RouteLocationNormalizedLoaded) => Breadcrumb
  }
}
