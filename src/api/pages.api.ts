import { dataService } from '@/services/data.service.ts'
import type { Page } from '@/types/page.ts'

export async function getAllPages(): Promise<Page[]> {
  return dataService.getAllPages()
}

export async function getPageBySlug(pageSlug: string): Promise<Page | null> {
  return dataService.getPageBySlug(pageSlug)
}
