import { Button } from '@/components/ui/button'
import { purchaseQueryKey } from '@/queryKey/purchase'
import { useQuery } from '@tanstack/react-query'
import { isBefore, isSameDay, parse } from 'date-fns'
import { useMemo, useState } from 'react'
import { FrequencyBarChart } from './components/FrequencyBarChart'

export default function DashboardPage() {
  const [from, setFrom] = useState<string>('2024-07-01')
  const [to, setTo] = useState<string>('2024-07-31')

  const enabledStatus = useMemo(() => {
    if (!from || !to) return 'EMPTY'

    const parsedFrom = parse(from, 'yyyy-MM-dd', new Date())
    const parsedTo = parse(to, 'yyyy-MM-dd', new Date())
    console.log(parsedFrom, parsedTo)

    if (isSameDay(parsedFrom, parsedTo) || isBefore(parsedFrom, parsedTo)) {
      return 'VALID'
    }

    return 'INVALID'
  }, [from, to])
  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    ...purchaseQueryKey.frequency({ from, to }),
    enabled: enabledStatus === 'VALID',
  })

  return (
    <section className="w-full">
      <h2 className="text-xl font-semibold mb-3">가격대별 구매 빈도</h2>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="flex items-center gap-2">
          <label className="text-sm text-muted-foreground">From</label>
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-muted-foreground">To</label>
          <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="border rounded px-2 py-1" />
        </div>
        <Button className="border px-3 py-1 rounded" variant="outline" onClick={() => refetch()} disabled={isFetching}>
          조회
        </Button>
      </div>

      {(() => {
        if (enabledStatus === 'EMPTY') {
          return <div>날짜를 선택해주세요.</div>
        }
        if (enabledStatus === 'INVALID') {
          return <div>날짜를 올바르게 선택해주세요.</div>
        }
        if (isLoading) {
          return <div>불러오는 중…</div>
        }
        if (isError) {
          return <div>에러가 발생했습니다.</div>
        }
        if (data) {
          return <FrequencyBarChart data={data} />
        }
        return null
      })()}
    </section>
  )
}
