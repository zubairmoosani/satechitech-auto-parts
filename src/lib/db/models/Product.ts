import mongoose, { Schema, models } from 'mongoose'

export type MongoProductDoc = {
  _id: mongoose.Types.ObjectId
  productName: string
  price: number
  imageUrl: string
  createdAt: Date
  updatedAt: Date
}

const ProductSchema = new Schema<MongoProductDoc>(
  {
    productName: { type: String, required: true, unique: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    imageUrl: { type: String, required: true },
  },
  { timestamps: true },
)

export const ProductModel = models.Product ?? mongoose.model<MongoProductDoc>('Product', ProductSchema)
