import { Customer } from '@/models/customer'
import { overlay } from 'overlay-kit'
import { useCallback } from 'react'
import { CustomerPurchasesSheet } from '@/domains/customer/components/CustomerPurchasesSheet'

export const useCustomerPurchasesSheet = () => {
  return useCallback((selectedCustomer: Customer) => {
    overlay.open(({ isOpen, close }) => {
      return <CustomerPurchasesSheet selectedCustomer={selectedCustomer} open={isOpen} close={close} />
    })
  }, [])
}
