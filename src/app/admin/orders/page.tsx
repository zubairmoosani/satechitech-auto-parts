import OrdersAdminList from '@/app/admin/orders/components/OrdersAdminList'
import { listOrders } from '@/lib/db/repositories/orders'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Orders | SATECHI TECH Admin',
}

const AdminOrdersPage = async () => {
  const orders = await listOrders()

  return <OrdersAdminList orders={orders} />
}

export default AdminOrdersPage
