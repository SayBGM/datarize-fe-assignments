import { getPurchaseFrequency } from '@/remotes/purchase'
import { createQueryKeys } from '@lukemorales/query-key-factory'

export const purchaseQueryKey = createQueryKeys('purchase', {
  frequency: (params: { from?: string; to?: string } = {}) => ({
    queryKey: [params],
    queryFn: () => getPurchaseFrequency(params),
  }),
})
