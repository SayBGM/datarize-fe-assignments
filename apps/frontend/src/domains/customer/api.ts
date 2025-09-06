import { Customer, CustomerPurchase } from '@/models/customer'
import { apiClient } from '@/lib/apiClient'

export type GetCustomersParams = { name?: string; sortBy?: 'asc' | 'desc' }

export const getCustomers = async (params?: GetCustomersParams) => {
  const response = await apiClient.get<Customer[]>('api/customers', {
    searchParams: params,
  })
  return await response.json()
}

export const getCustomerPurchases = async (id: number) => {
  const response = await apiClient.get<CustomerPurchase[]>(`api/customers/${id}/purchases`)
  return await response.json()
}
