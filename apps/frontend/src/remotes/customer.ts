import { Customer, Purchase } from '@/models'
import { apiClient } from '@/utils/apiClient'

export const getCustomers = async () => {
  const response = await apiClient.get<Customer[]>('/api/customers')
  return response.json()
}

export const getCustomerPurchases = async (id: string) => {
  const response = await apiClient.get<Purchase[]>(`/api/customers/${id}/purchases`)
  return response.json()
}
