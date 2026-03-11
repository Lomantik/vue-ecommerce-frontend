import { dataService } from '@/services/data.service.ts'
import type { Category } from '@/types/category.ts'

export async function getAllCategories(): Promise<Category[]> {
  return dataService.getAllCategories()
}

export async function getCategoryById(categoryId: number): Promise<Category | null> {
  return dataService.getCategoryById(categoryId)
}

export async function getCategoryTree(
  categoryId: Category | null = null,
): Promise<Category | null> {
  return dataService.getCategoryTree(categoryId)
}

export async function buildCategoryPath(category: Category): Promise<string[]> {
  return dataService.buildCategoryPath(category)
}

export async function getCategoryBySlug(categorySlug: string): Promise<Category | null> {
  return dataService.getCategoryBySlug(categorySlug)
}
