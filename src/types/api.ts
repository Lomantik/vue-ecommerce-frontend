import type { Image } from '@/types/image.ts'
import type { Category, CategoryLink } from '@/types/category.ts'
import type { Page } from '@/types/page.ts'
import type { Product } from '@/types/product.ts'
import type { Attribute } from '@/types/attribute.ts'
import type { ProductVariant } from '@/types/product.ts'
import type { Review } from '@/types/review.ts'

export interface IDataService {
  getAllProducts(activeOnly: boolean, showInCatalogOnly: boolean): Promise<Product[]>
  getProductsByCategoryId(categoryId: number): Promise<Product[]>
  getProductsByCategorySlug(categorySlug: string): Promise<Product[] | null>
  getProductById(productId: number): Promise<Product | null>
  getProductBySlug(productSlug: string): Promise<Product | null>
  getProductAttributes(productId: number): Promise<Attribute[]>
  getProductVariants(productId: number): Promise<ProductVariant[]>
  getAllChildProducts(product: Product): Promise<Product[]>
  getVariantProducts(product: Product): Promise<Product[]>
  getProductCategories(_product: Product): Promise<CategoryLink[]>
  getAllCategories(): Promise<Category[]>
  getCategoryById(categoryId: number): Promise<Category | null>
  getCategoryTree(category: Category | null): Promise<Category | null>
  buildCategoryPath(category: Category): Promise<string[]>
  getCategoryBySlug(categorySlug: string): Promise<Category | null>
  getAllPages(): Promise<Page[]>
  getPageBySlug(pageSlug: string): Promise<Page | null>
  getReviewsByProductId(productId: number): Promise<Review[]>
  getImageById(imageId: number): Promise<Image | null>
  getImageBySlug(imageSlug: string): Promise<Image | null>
  getAttributeById(attributeId: number): Promise<Attribute | null>
}
