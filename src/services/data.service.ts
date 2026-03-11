import { mockService } from '@/services/mock.service.ts'
import { httpService } from '@/services/http.service.ts'
import type { IDataService } from '@/types/api.ts'

const USE_MOCK = true

export const dataService: IDataService = USE_MOCK ? mockService : httpService
