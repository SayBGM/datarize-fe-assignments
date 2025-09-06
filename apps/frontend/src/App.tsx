import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import './App.css'

const DashboardPage = React.lazy(() => import('@/domains/purchase/pages/DashboardPage'))
const CustomersPage = React.lazy(() => import('@/domains/customer/pages/CustomersPage'))

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<p>로딩 중…</p>}>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/customers" element={<CustomersPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  )
}
