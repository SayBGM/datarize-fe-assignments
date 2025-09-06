import { getPurchaseFrequency } from '@/remotes'
import { createQueryKeys } from '@lukemorales/query-key-factory'

export const purchaseQueryKey = createQueryKeys('purchase', {
  frequency: {
    queryKey: ['frequency'],
    queryFn: () => getPurchaseFrequency(),
  },
})
