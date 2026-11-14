import mongoose, { Schema, models } from 'mongoose'

const OrderSchema = new Schema(
  {
    orderNumber: { type: String, required: true, unique: true, index: true },
    items: { type: [Schema.Types.Mixed], required: true },
    subtotal: { type: Number, required: true, min: 0 },
    currency: { type: String, required: true },
    details: { type: Schema.Types.Mixed, required: true },
    paymentMethod: { type: String, required: true },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
    placedAt: { type: String, required: true },
    paidAt: { type: String },
    dpoTransToken: { type: String },
    flutterwaveTransactionId: { type: String },
    lencoReference: { type: String },
  },
  { timestamps: true, minimize: false },
)

export const OrderModel = models.Order ?? mongoose.model('Order', OrderSchema)
