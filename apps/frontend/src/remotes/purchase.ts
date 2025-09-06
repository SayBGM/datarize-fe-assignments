import { PurchaseFrequency } from '@/models'
import { apiClient } from '@/lib/apiClient'

export const getPurchaseFrequency = async () => {
  const response = await apiClient.get<PurchaseFrequency[]>('api/purchase-frequency')
  return await response.json()
}
