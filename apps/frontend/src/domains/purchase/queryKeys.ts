import { getPurchaseFrequency } from '@/domains/purchase/api'
import { createQueryKeys } from '@lukemorales/query-key-factory'

export const purchaseQueryKey = createQueryKeys('purchase', {
  frequency: (params: { from?: string; to?: string } = {}) => ({
    queryKey: [params],
    queryFn: () => getPurchaseFrequency(params),
  }),
})
