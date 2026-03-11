import { dataService } from '@/services/data.service.ts'
import type { Review } from '@/types/review.ts'

export async function getReviewsByProductId(productId: number): Promise<Review[]> {
  return dataService.getReviewsByProductId(productId)
}
