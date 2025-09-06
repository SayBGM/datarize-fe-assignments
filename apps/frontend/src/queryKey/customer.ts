import { getCustomerPurchases, getCustomers } from '@/remotes'
import { createQueryKeys } from '@lukemorales/query-key-factory'
import { GetCustomersParams } from '@/remotes/customer'

export const customerQueryKey = createQueryKeys('customer', {
  listWithParams: (params: GetCustomersParams) => ({
    queryKey: ['list', params],
    queryFn: () => {
      const { name, ...rest } = params
      return getCustomers({ name: name ?? undefined, ...rest })
    },
  }),
  purchases: (id: number) => ({
    queryKey: ['purchases', id],
    queryFn: () => getCustomerPurchases(id),
  }),
})
