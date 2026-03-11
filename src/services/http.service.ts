import type { Image } from '@/types/image.ts'
import type { IDataService } from '@/types/api.ts'
import type { Category, CategoryLink } from '@/types/category.ts'
import type { Page } from '@/types/page.ts'
import type { Product } from '@/types/product.ts'
import type { Attribute } from '@/types/attribute.ts'
import type { ProductVariant } from '@/types/product.ts'
import type { Review } from '@/types/review.ts'

export const httpService: IDataService = {
  async getAllProducts(
    _activeOnly: boolean = true,
    _showInCatalogOnly: boolean = true,
  ): Promise<Product[]> {
    throw new Error('httpService.getAllProducts not implemented yet')
  },
  async getProductsByCategoryId(_categoryId: number): Promise<Product[]> {
    throw new Error('httpService.getProductsByCategoryId not implemented yet')
  },
  async getProductsByCategorySlug(_categorySlug: string): Promise<Product[] | null> {
    throw new Error('httpService.getProductsByCategorySlug not implemented yet')
  },
  async getProductById(_productId: number): Promise<Product | null> {
    throw new Error('httpService.getProductById not implemented yet')
  },
  async getProductBySlug(_productSlug: string): Promise<Product | null> {
    throw new Error('httpService.getProductBySlug not implemented yet')
  },
  async getProductAttributes(_productId: number): Promise<Attribute[]> {
    throw new Error('httpService.getProductAttributes not implemented yet')
  },
  async getProductVariants(_productId: number): Promise<ProductVariant[]> {
    throw new Error('httpService.getProductVariants not implemented yet')
  },
  async getAllChildProducts(_product: Product): Promise<Product[]> {
    throw new Error('httpService.getAllChildProducts not implemented yet')
  },
  async getVariantProducts(_product: Product): Promise<Product[]> {
    throw new Error('httpService.getVariantProducts not implemented yet')
  },
  async getProductCategories(_product: Product): Promise<CategoryLink[]> {
    throw new Error('httpService.getVariantProducts not implemented yet')
  },
  async getAllCategories(): Promise<Category[]> {
    throw new Error('httpService.getAllCategories not implemented yet')
  },
  async getCategoryById(_categoryId: number): Promise<Category | null> {
    throw new Error('httpService.getCategoryById not implemented yet')
  },
  async getCategoryTree(_category: Category | null = null): Promise<Category | null> {
    throw new Error('httpService.getCategoryTree not implemented yet')
  },
  async buildCategoryPath(_category: Category): Promise<string[]> {
    throw new Error('httpService.buildCategoryPath not implemented yet')
  },
  async getCategoryBySlug(_categorySlug: string): Promise<Category | null> {
    throw new Error('httpService.getCategoryBySlug not implemented yet')
  },
  async getAllPages(): Promise<Page[]> {
    throw new Error('httpService.getAllPages not implemented yet')
  },
  async getPageBySlug(_pageSlug: string): Promise<Page | null> {
    throw new Error('httpService.getPageBySlug not implemented yet')
  },
  async getReviewsByProductId(_productId: number): Promise<Review[]> {
    throw new Error('httpService.getReviewsByProductId not implemented yet')
  },
  async getImageById(_imageId: number): Promise<Image | null> {
    throw new Error('httpService.getImageById not implemented yet')
  },
  async getImageBySlug(_imageSlug: string): Promise<Image | null> {
    throw new Error('httpService.getImageBySlug not implemented yet')
  },
  async getAttributeById(_attributeId: number): Promise<Attribute | null> {
    throw new Error('httpService.getAttributeById not implemented yet')
  },
}
