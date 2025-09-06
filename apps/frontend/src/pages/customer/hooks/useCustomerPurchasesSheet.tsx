import { Customer } from '@/models'
import { overlay } from 'overlay-kit'
import { useCallback } from 'react'
import { CustomerPurchasesSheet } from '../components/CustomerPurchasesSheet'

export const useCustomerPurchasesSheet = () => {
  return useCallback((selectedCustomer: Customer) => {
    overlay.open(({ isOpen, close }) => {
      return <CustomerPurchasesSheet selectedCustomer={selectedCustomer} open={isOpen} close={close} />
    })
  }, [])
}
