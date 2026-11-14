import { connectMongo, isMongoConfigured } from '@/lib/db/connect'
import { fileCreateOrder, fileFindOrder, fileListOrders, fileUpdateOrder } from '@/lib/db/fileStore'
import { OrderModel } from '@/lib/db/models/Order'
import type { NewOrderInput, OrderUpdateInput, StoredOrder } from '@/types/order'

type MongoOrderDoc = Omit<StoredOrder, 'createdAt' | 'updatedAt'> & { createdAt: Date; updatedAt: Date }

const mapMongoOrder = (doc: MongoOrderDoc): StoredOrder => ({
  orderNumber: doc.orderNumber,
  items: doc.items,
  subtotal: doc.subtotal,
  currency: doc.currency,
  details: doc.details,
  paymentMethod: doc.paymentMethod,
  paymentStatus: doc.paymentStatus,
  placedAt: doc.placedAt,
  paidAt: doc.paidAt,
  dpoTransToken: doc.dpoTransToken,
  flutterwaveTransactionId: doc.flutterwaveTransactionId,
  lencoReference: doc.lencoReference,
  createdAt: new Date(doc.createdAt).toISOString(),
  updatedAt: new Date(doc.updatedAt).toISOString(),
})

export async function listOrders(): Promise<StoredOrder[]> {
  if (isMongoConfigured()) {
    await connectMongo()
    const docs = await OrderModel.find().sort({ createdAt: -1 }).limit(500).lean<MongoOrderDoc[]>()
    return docs.map(mapMongoOrder)
  }
  return fileListOrders()
}

export async function getOrder(orderNumber: string): Promise<StoredOrder | null> {
  if (isMongoConfigured()) {
    await connectMongo()
    const doc = await OrderModel.findOne({ orderNumber }).lean<MongoOrderDoc>()
    return doc ? mapMongoOrder(doc) : null
  }
  return fileFindOrder(orderNumber)
}

export async function createOrder(input: NewOrderInput): Promise<StoredOrder> {
  if (isMongoConfigured()) {
    await connectMongo()
    const doc = await OrderModel.create(input)
    return mapMongoOrder(doc.toObject() as MongoOrderDoc)
  }
  return fileCreateOrder(input)
}

export async function updateOrder(orderNumber: string, patch: OrderUpdateInput): Promise<StoredOrder | null> {
  if (isMongoConfigured()) {
    await connectMongo()
    const doc = await OrderModel.findOneAndUpdate({ orderNumber }, { $set: patch }, { new: true }).lean<MongoOrderDoc>()
    return doc ? mapMongoOrder(doc) : null
  }
  return fileUpdateOrder(orderNumber, patch)
}

/** Marks an order paid once (idempotent). */
export async function markOrderPaid(orderNumber: string, patch: OrderUpdateInput = {}): Promise<StoredOrder | null> {
  const current = await getOrder(orderNumber)
  if (!current) return null
  if (current.paymentStatus === 'paid') return current
  return updateOrder(orderNumber, { ...patch, paymentStatus: 'paid', paidAt: new Date().toISOString() })
}
