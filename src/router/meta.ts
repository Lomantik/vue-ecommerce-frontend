import type { RouteLocationNormalizedLoadedGeneric } from 'vue-router'
import type { RouteMeta } from 'vue-router'

export function getLayoutMeta(route: RouteLocationNormalizedLoadedGeneric): RouteMeta {
  return route.meta
}

export function resolveBreadcrumb(meta: RouteMeta, route: RouteLocationNormalizedLoadedGeneric) {
  if (!meta.breadcrumb) return null

  return typeof meta.breadcrumb === 'function' ? meta.breadcrumb(route) : meta.breadcrumb
}
