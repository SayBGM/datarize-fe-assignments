import { getPurchaseFrequency } from '@/remotes'
import { createQueryKeys } from '@lukemorales/query-key-factory'

export const purchaseQueryKey = createQueryKeys('purchase', {
  frequency: (params: { from?: string; to?: string } = {}) => ({
    queryKey: ['frequency', params],
    queryFn: () => getPurchaseFrequency(params),
  }),
})
