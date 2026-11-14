'use client'

import { formatPrice } from '@/app/auto-parts/data'
import type { StoredOrder } from '@/types/order'
import { useMemo, useState } from 'react'
import { Badge, Card, Form, Table } from 'react-bootstrap'

const paymentLabels: Record<string, string> = {
  dpo: 'DPO Pay',
  flutterwave: 'Flutterwave',
  lenco: 'Lenco',
  mobile_money: 'Mobile money',
  cash: 'Cash',
  bank_transfer: 'Bank transfer',
}

const statusVariant = { paid: 'success', pending: 'warning', failed: 'danger' } as const

type StatusFilter = 'all' | StoredOrder['paymentStatus']

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString('en-ZM', { dateStyle: 'medium', timeStyle: 'short' })

const OrdersAdminList = ({ orders }: { orders: StoredOrder[] }) => {
  const [filter, setFilter] = useState<StatusFilter>('paid')

  const visible = useMemo(
    () => (filter === 'all' ? orders : orders.filter((order) => order.paymentStatus === filter)),
    [orders, filter],
  )

  return (
    <Card className="shadow-sm border-0">
      <Card.Body className="p-4 p-md-5">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
          <div>
            <h1 className="h4 mb-1">Orders</h1>
            <p className="text-body-secondary mb-0">Online orders placed on the website.</p>
          </div>
          <Form.Select
            value={filter}
            onChange={(event) => setFilter(event.target.value as StatusFilter)}
            style={{ maxWidth: 200 }}
            aria-label="Filter by payment status"
          >
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="all">All orders</option>
          </Form.Select>
        </div>

        {visible.length === 0 ? (
          <p className="text-body-secondary text-center py-5 mb-0">No orders to show.</p>
        ) : (
          <div className="table-responsive">
            <Table hover className="align-middle mb-0 small">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Payment</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((order) => (
                  <tr key={order.orderNumber}>
                    <td>
                      <div className="fw-semibold">{order.orderNumber}</div>
                      <div className="text-body-secondary">{formatDate(order.createdAt)}</div>
                    </td>
                    <td>
                      <div className="fw-semibold">{order.details.fullName}</div>
                      <div>
                        <a href={`tel:${order.details.phone}`}>{order.details.phone}</a>
                      </div>
                      {order.details.email && <div className="text-body-secondary">{order.details.email}</div>}
                      <div className="text-body-secondary">
                        {order.details.fulfilment === 'delivery' ? `Delivery: ${order.details.address}` : 'Collect from shop'}
                      </div>
                      {order.details.notes && <div className="text-body-secondary">Notes: {order.details.notes}</div>}
                    </td>
                    <td>
                      {order.items.map((item) => (
                        <div key={`${item.id}-${item.price}`}>
                          {item.name} × {item.quantity}
                        </div>
                      ))}
                    </td>
                    <td className="fw-semibold text-nowrap">{formatPrice(order.subtotal)}</td>
                    <td>
                      <Badge bg={statusVariant[order.paymentStatus] ?? 'secondary'} className="text-capitalize">
                        {order.paymentStatus}
                      </Badge>
                      <div className="text-body-secondary mt-1">{paymentLabels[order.paymentMethod] ?? order.paymentMethod}</div>
                      {order.paidAt && <div className="text-body-secondary">{formatDate(order.paidAt)}</div>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Card.Body>
    </Card>
  )
}

export default OrdersAdminList
