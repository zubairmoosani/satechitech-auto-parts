/**
 * Seeds the default admin user into MongoDB.
 * Run: npm run db:seed
 */
import bcrypt from 'bcryptjs'
import { config } from 'dotenv'
import mongoose from 'mongoose'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env.local') })

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    role: { type: String, enum: ['Admin'], default: 'Admin' },
  },
  { timestamps: true },
)

const UserModel = mongoose.models.User ?? mongoose.model('User', UserSchema)

async function main() {
  const uri = process.env.MONGODB_URI?.trim()
  if (!uri) {
    console.error('MONGODB_URI missing in .env.local')
    process.exit(1)
  }

  const email = (process.env.ADMIN_EMAIL || 'admin@satechitech.com').toLowerCase().trim()
  const password = process.env.ADMIN_PASSWORD || 'Admin@123456'
  const name = process.env.ADMIN_NAME || 'SATECHI TECH Admin'

  await mongoose.connect(uri)
  console.log('Connected to MongoDB')

  const existing = await UserModel.findOne({ email })
  if (existing) {
    console.log('Admin already exists in MongoDB:')
    console.log({
      id: existing._id.toString(),
      email: existing.email,
      name: existing.name,
      role: existing.role,
    })
    await mongoose.disconnect()
    process.exit(0)
  }

  const passwordHash = await bcrypt.hash(password, 12)
  const user = await UserModel.create({ email, passwordHash, name, role: 'Admin' })

  console.log('Admin user created in MongoDB:')
  console.log({
    id: user._id.toString(),
    email: user.email,
    name: user.name,
    role: user.role,
  })
  console.log(`\nLogin: ${email} / ${password}`)

  await mongoose.disconnect()
}

main().catch(async (error) => {
  console.error(error)
  await mongoose.disconnect().catch(() => {})
  process.exit(1)
})
