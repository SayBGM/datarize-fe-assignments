import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Customer } from '@/models/customer'
import { customerQueryKey } from '@/queryKey/customer'
import { useQuery } from '@tanstack/react-query'

interface Props {
  selectedCustomer: Customer
  open: boolean
  close: () => void
}

export const CustomerPurchasesSheet = ({ selectedCustomer, open, close }: Props) => {
  const { data, isLoading, isError } = useQuery(customerQueryKey.purchases(selectedCustomer.id))

  return (
    <Sheet
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          close()
        }
      }}
    >
      <SheetContent side="right" className="w-[500px]">
        <SheetHeader>
          <SheetTitle>고객 상세</SheetTitle>
        </SheetHeader>
        <div className="mt-4 text-sm text-muted-foreground">
          <div className="px-4">
            <div className="font-medium mb-2">{selectedCustomer.name}</div>
            <div>총 구매 횟수: {selectedCustomer.count}</div>
            <div>총 구매 금액: {selectedCustomer.totalAmount.toLocaleString()}원</div>
            <div className="mt-4" />
            {isLoading && <div>구매 내역 불러오는 중…</div>}
            {isError && <div>구매 내역 로드 실패</div>}
            {!!data && (
              <div className="max-h-[60vh] overflow-auto pr-2">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>날짜</TableHead>
                      <TableHead>상품</TableHead>
                      <TableHead className="text-right">수량</TableHead>
                      <TableHead className="text-right">가격</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.map((purchase, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{new Date(purchase.date).toLocaleDateString()}</TableCell>
                        <TableCell className="flex items-center gap-2">
                          <img
                            src={purchase.imgSrc}
                            alt={purchase.product}
                            className="w-10 h-10 object-cover rounded"
                          />
                          <span>{purchase.product}</span>
                        </TableCell>
                        <TableCell className="text-right">{purchase.quantity}</TableCell>
                        <TableCell className="text-right">{purchase.price.toLocaleString()}원</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </div>
        <SheetFooter>
          <SheetClose>닫기</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
