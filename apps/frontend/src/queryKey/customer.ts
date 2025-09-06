import { getCustomerPurchases, getCustomers } from '@/remotes'
import { createQueryKeys } from '@lukemorales/query-key-factory'

export const customerQueryKey = createQueryKeys('customer', {
  list: {
    queryKey: ['list'],
    queryFn: () => getCustomers(),
  },
  purchases: (id: string) => ({
    queryKey: ['purchases', id],
    queryFn: () => getCustomerPurchases(id),
  }),
})
