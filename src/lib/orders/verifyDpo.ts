import { verifyDpoToken } from '@/lib/dpo'
import { getOrder, markOrderPaid } from '@/lib/db/repositories/orders'

/**
 * Confirms a DPO order with DPO's verifyToken API, using only the token we stored when the
 * order was created (the token itself was created server-side for the exact order amount).
 */
export async function confirmDpoOrder(orderNumber: string) {
  const order = await getOrder(orderNumber)
  if (!order || order.paymentMethod !== 'dpo') return { order: null, paid: false }
  if (order.paymentStatus === 'paid') return { order, paid: true }
  if (!order.dpoTransToken) return { order, paid: false }

  const verified = await verifyDpoToken(order.dpoTransToken)
  if (!verified.paid) return { order, paid: false, result: verified.result, resultExplanation: verified.resultExplanation }

  const updated = await markOrderPaid(orderNumber)
  return { order: updated ?? order, paid: true, result: verified.result, resultExplanation: verified.resultExplanation }
}
