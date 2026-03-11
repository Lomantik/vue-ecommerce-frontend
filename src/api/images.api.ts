import { dataService } from '@/services/data.service.ts'
import type { Image } from '@/types/image.ts'

export async function getImageById(imageId: number): Promise<Image | null> {
  return dataService.getImageById(imageId)
}

export async function getImageBySlug(imageSlug: string): Promise<Image | null> {
  return dataService.getImageBySlug(imageSlug)
}
