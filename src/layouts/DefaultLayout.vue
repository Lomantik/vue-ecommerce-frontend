<script setup lang="ts">
import LayoutPromoBar from '@/components/layout/LayoutPromoBar.vue'
import LayoutHeader from '@/components/layout/LayoutHeader.vue'
import LayoutBreadcrumbs from '@/components/layout/LayoutBreadcrumbs.vue'
import LayoutFooter from '@/components/layout/LayoutFooter.vue'
</script>

<template>
  <div class="d-flex flex-column min-vh-100">
    <LayoutPromoBar />
    <LayoutHeader />
    <LayoutBreadcrumbs />
    <main class="flex-grow-1">
      <RouterView />
    </main>
    <LayoutFooter />
  </div>
</template>

<style scoped></style>
