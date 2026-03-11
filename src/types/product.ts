interface ImageRef {
  id: number
  order: number
}

interface ShippingDimensions {
  length: number
  width: number
  height: number
  unit: string
}

interface Shipping {
  weight: number
  dimensions: ShippingDimensions
}

export interface Product {
  id: number
  slug: string
  title: string
  type: string
  categoryIds: number[]
  primaryCategoryId: number
  price: number
  salePrice: number | null
  description: string
  shortDescription: string
  sku: string
  tags: string[]
  images: ImageRef[]
  mainImageId: number
  qty: number | null
  shipping?: Shipping | null
  attributes: Record<string, number> | null
  configurableAttributeIds: number[]
  variantIds: number[]
  defaultVariantId: number
  relatedProductIds: number[]
  showInCatalog: boolean
  active: boolean
}

export interface ProductVariant {
  id: number
  [key: string]: string | number
}
