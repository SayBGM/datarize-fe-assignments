import { Purchase } from '@/models'
import { apiClient } from '@/utils/apiClient'

export const getPurchaseFrequency = async () => {
  const response = await apiClient.get<Purchase[]>('/api/purchase-frequency')
  return response.json()
}
