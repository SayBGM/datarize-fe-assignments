import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { customerQueryKey } from '@/domains/customer/queryKeys'
import { useQuery } from '@tanstack/react-query'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useCustomerPurchasesSheet } from '@/domains/customer/hooks/useCustomerPurchasesSheet'
import { useDebounce } from '@/lib/useDebounce'

const DEBOUNCE_MS = 300

export default function CustomersPage() {
  const [keyword, setKeyword] = useState('')
  const [sortBy, setSortBy] = useState<'asc' | 'desc'>('desc')
  const debouncedKeyword = useDebounce(keyword, DEBOUNCE_MS)
  const openCustomerPurchasesSheet = useCustomerPurchasesSheet()

  const loweredKeyword = useMemo(() => debouncedKeyword.trim().toLowerCase(), [debouncedKeyword])

  const { data, isLoading, isError } = useQuery(customerQueryKey.listWithParams({ name: debouncedKeyword, sortBy }))

  return (
    <section className="w-full">
      <h2 className="text-xl font-semibold mb-2">고객 목록</h2>

      <div className="mb-4 flex gap-2 items-center">
        <Input
          placeholder="이름 검색"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
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
                onClick={() => setSortBy((prev) => (prev === 'asc' ? 'desc' : 'asc'))}
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
