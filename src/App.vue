<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { getLayoutMeta } from '@/router/meta.ts'
import type { Component } from 'vue'

const route = useRoute()
const meta = getLayoutMeta(route)
const layouts: Record<string, Component> = {
  default: DefaultLayout,
}
</script>

<template>
  <component :is="layouts[meta.layout || 'default']">
    <RouterView />
  </component>
</template>

<style scoped></style>
