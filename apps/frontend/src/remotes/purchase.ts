import { PurchaseFrequency } from '@/models'
import { apiClient } from '@/lib/apiClient'

export type GetPurchaseFrequencyParams = { from?: string; to?: string }

export const getPurchaseFrequency = async (params?: GetPurchaseFrequencyParams) => {
  const response = await apiClient.get<PurchaseFrequency[]>('api/purchase-frequency', {
    searchParams: params,
  })
  return await response.json()
}
