import { listProducts } from '@/lib/db/repositories/products'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function GET() {
  try {
    const products = await listProducts()
    return NextResponse.json({ products })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to load products.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
