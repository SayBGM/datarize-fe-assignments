import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { customerQueryKey } from '@/domains/customer/queryKeys'
import { useQuery } from '@tanstack/react-query'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { useMemo } from 'react'
import { useCustomerPurchasesSheet } from '@/domains/customer/hooks/useCustomerPurchasesSheet'
import { useDebounce } from '@/lib/useDebounce'
import { useSearchParams } from 'react-router-dom'

const DEBOUNCE_MS = 300
const DEFAULT_SORT: 'asc' | 'desc' = 'desc'

export default function CustomersPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const rawName = searchParams.get('name') ?? ''
  const sortParam = searchParams.get('sort')
  const sortBy: 'asc' | 'desc' = sortParam === 'asc' ? 'asc' : DEFAULT_SORT
  const debouncedName = useDebounce(rawName, DEBOUNCE_MS)
  const openCustomerPurchasesSheet = useCustomerPurchasesSheet()

  const loweredKeyword = useMemo(() => debouncedName.trim().toLowerCase(), [debouncedName])

  const { data, isLoading, isError } = useQuery(
    customerQueryKey.listWithParams({ name: debouncedName || undefined, sortBy }),
  )

  return (
    <section className="w-full">
      <h2 className="text-xl font-semibold mb-2">고객 목록</h2>

      <div className="mb-4 flex gap-2 items-center">
        <Input
          placeholder="이름 검색"
          defaultValue={rawName}
          onChange={(e) => {
            const value = e.target.value
            setSearchParams((prev) => {
              const next = new URLSearchParams(prev)
              if (value) {
                next.set('name', value)
              } else {
                next.delete('name')
              }
              return next
            })
          }}
          className="max-w-xs"
        />
      </div>

      {isLoading && <div>불러오는 중…</div>}
      {isError && <div>에러가 발생했습니다.</div>}
      {!!data && (
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>이름</TableHead>
              <TableHead>총 구매 횟수</TableHead>
              <TableHead
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  const nextSort: 'asc' | 'desc' = sortBy === 'asc' ? 'desc' : 'asc'
                  setSearchParams((prev) => {
                    const next = new URLSearchParams(prev)
                    next.set('sort', nextSort)
                    return next
                  })
                }}
              >
                총 구매 금액 {sortBy === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data
              .filter((customer) => customer.name.toLowerCase().includes(loweredKeyword))
              .map((customer) => (
                <TableRow
                  key={customer.id}
                  className="cursor-pointer"
                  onClick={() => openCustomerPurchasesSheet(customer)}
                >
                  <TableCell>{customer.id}</TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.count}</TableCell>
                  <TableCell>{customer.totalAmount.toLocaleString()}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
    </section>
  )
}
