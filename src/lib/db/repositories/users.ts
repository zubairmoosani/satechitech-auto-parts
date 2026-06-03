import bcrypt from 'bcryptjs'
import { connectMongo, isMongoConfigured } from '@/lib/db/connect'
import {
  fileCreateUser,
  fileFindUserByEmail,
  type StoredUser,
} from '@/lib/db/fileStore'
import { UserModel } from '@/lib/db/models/User'

export type PublicUser = {
  id: string
  email: string
  name: string
  role: 'Admin'
}

const toPublicUser = (user: { id?: string; _id?: { toString(): string }; email: string; name: string; role: 'Admin' }): PublicUser => ({
  id: user.id ?? user._id?.toString() ?? '',
  email: user.email,
  name: user.name,
  role: user.role,
})

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, passwordHash: string): Promise<boolean> {
  return bcrypt.compare(password, passwordHash)
}

export async function findUserByEmail(email: string): Promise<(PublicUser & { passwordHash: string }) | null> {
  if (isMongoConfigured()) {
    await connectMongo()
    const user = await UserModel.findOne({ email: email.toLowerCase().trim() }).lean()
    if (!user) return null
    return {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
      passwordHash: user.passwordHash,
    }
  }

  const user = await fileFindUserByEmail(email)
  if (!user) return null
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    passwordHash: user.passwordHash,
  }
}

export async function createAdminUser(input: {
  email: string
  password: string
  name: string
}): Promise<PublicUser> {
  const email = input.email.toLowerCase().trim()
  const existing = await findUserByEmail(email)
  if (existing) {
    throw new Error('An account with this email already exists.')
  }

  const passwordHash = await hashPassword(input.password)

  if (isMongoConfigured()) {
    await connectMongo()
    const user = await UserModel.create({
      email,
      passwordHash,
      name: input.name.trim(),
      role: 'Admin',
    })
    return toPublicUser(user)
  }

  const user: Omit<StoredUser, 'id' | 'createdAt'> = {
    email,
    passwordHash,
    name: input.name.trim(),
    role: 'Admin',
  }
  const created = await fileCreateUser(user)
  return toPublicUser(created)
}

export async function ensureDefaultAdmin(): Promise<PublicUser | null> {
  const email = process.env.ADMIN_EMAIL?.trim() || 'admin@satechitech.com'
  const password = process.env.ADMIN_PASSWORD?.trim() || 'Admin@123456'
  const name = process.env.ADMIN_NAME?.trim() || 'SATECHI TECH Admin'

  const existing = await findUserByEmail(email)
  if (existing) {
    return {
      id: existing.id,
      email: existing.email,
      name: existing.name,
      role: existing.role,
    }
  }

  return createAdminUser({ email, password, name })
}

export async function authenticateUser(email: string, password: string): Promise<PublicUser | null> {
  await ensureDefaultAdmin()
  const user = await findUserByEmail(email)
  if (!user) return null

  const valid = await verifyPassword(password, user.passwordHash)
  if (!valid) return null

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  }
}
