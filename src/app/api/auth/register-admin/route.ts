import { createAdminUser, ensureDefaultAdmin } from '@/lib/db/repositories/users'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

/** Seeds default admin when store is empty. Safe to call on setup. */
export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as {
      email?: string
      password?: string
      name?: string
      setupSecret?: string
    }

    const setupSecret = process.env.ADMIN_SETUP_SECRET?.trim()
    if (setupSecret && body.setupSecret !== setupSecret) {
      return NextResponse.json({ error: 'Invalid setup secret.' }, { status: 403 })
    }

    if (body.email && body.password && body.name) {
      const user = await createAdminUser({
        email: body.email,
        password: body.password,
        name: body.name,
      })
      return NextResponse.json({
        message: 'Admin user registered.',
        user: { id: user.id, email: user.email, name: user.name, role: user.role },
      })
    }

    const user = await ensureDefaultAdmin()
    return NextResponse.json({
      message: 'Default admin is ready.',
      user: user ? { id: user.id, email: user.email, name: user.name, role: user.role } : null,
      hint: 'Login at /auth/sign-in then manage products at /admin/products/add',
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Registration failed.'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}

export async function GET() {
  const user = await ensureDefaultAdmin()
  return NextResponse.json({
    ready: Boolean(user),
    email: user?.email ?? null,
  })
}
