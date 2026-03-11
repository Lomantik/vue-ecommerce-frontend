import { dataService } from '@/services/data.service.ts'
import type { Product } from '@/types/product.ts'
import type { Attribute } from '@/types/attribute.ts'
import type { ProductVariant } from '@/types/product.ts'
import type { CategoryLink } from '@/types/category.ts'

export async function getAllProducts(
  activeOnly = true,
  showInCatalogOnly = true,
): Promise<Product[]> {
  return dataService.getAllProducts(activeOnly, showInCatalogOnly)
}

export async function getProductsByCategoryId(categoryId: number): Promise<Product[]> {
  return dataService.getProductsByCategoryId(categoryId)
}

export async function getProductsByCategorySlug(categorySlug: string): Promise<Product[] | null> {
  return dataService.getProductsByCategorySlug(categorySlug)
}

export async function getProductById(productId: number): Promise<Product | null> {
  return dataService.getProductById(productId)
}

export async function getProductBySlug(productSlug: string): Promise<Product | null> {
  return dataService.getProductBySlug(productSlug)
}

export async function getProductAttributes(productId: number): Promise<Attribute[]> {
  return dataService.getProductAttributes(productId)
}

export async function getProductVariants(productId: number): Promise<ProductVariant[]> {
  return dataService.getProductVariants(productId)
}

export async function getAllChildProducts(product: Product): Promise<Product[]> {
  return dataService.getAllChildProducts(product)
}

export async function getVariantProducts(product: Product): Promise<Product[]> {
  return dataService.getVariantProducts(product)
}

export async function getProductCategories(product: Product): Promise<CategoryLink[]> {
  return dataService.getProductCategories(product)
}
