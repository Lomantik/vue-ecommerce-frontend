export interface FixedTrail {
  title: string
  path: string
}

export interface Category {
  id: number
  slug: string
  title: string
  parentId: number | null
  parents: Category[]
  children: Category[]
}

export interface CategoryLink {
  id: number
  title: string
  link: string
}
