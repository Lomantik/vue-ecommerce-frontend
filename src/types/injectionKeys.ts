import { type InjectionKey, type Ref } from 'vue'

interface ActiveMenuContext {
  activeMenu: Ref<string[]>
  openLevel(level: number, slug: string): void
  toggleLevel(level: number, slug: string): void
}

export const ActiveMenuKey: InjectionKey<ActiveMenuContext> = Symbol('activeMenu')
