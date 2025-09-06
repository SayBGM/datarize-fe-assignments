import { getCustomerPurchases, getCustomers } from '@/domains/customer/api'
import { createQueryKeys } from '@lukemorales/query-key-factory'
import type { GetCustomersParams } from '@/domains/customer/api'

export const customerQueryKey = createQueryKeys('customer', {
  listWithParams: (params: GetCustomersParams) => ({
    queryKey: [params],
    queryFn: () => {
      const { name, ...rest } = params
      return getCustomers({ name: name ?? undefined, ...rest })
    },
  }),
  purchases: (id: number) => ({
    queryKey: [id],
    queryFn: () => getCustomerPurchases(id),
  }),
})
