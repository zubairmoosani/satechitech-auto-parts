import mongoose, { Schema, models } from 'mongoose'

export type MongoUserDoc = {
  _id: mongoose.Types.ObjectId
  email: string
  passwordHash: string
  name: string
  role: 'Admin'
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<MongoUserDoc>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    role: { type: String, enum: ['Admin'], default: 'Admin' },
  },
  { timestamps: true },
)

export const UserModel = models.User ?? mongoose.model<MongoUserDoc>('User', UserSchema)
