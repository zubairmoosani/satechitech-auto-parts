import axios from 'axios'
import {
  assertFlutterwaveConfigured,
  flutterwaveConfig,
  getFlutterwaveAuthMode,
} from '@/lib/flutterwave/config'
import { getFlutterwaveAccessToken } from '@/lib/flutterwave/oauth'

export type FlutterwaveCreatePaymentInput = {
  txRef: string
  amount: number
  currency: string
  redirectUrl: string
  customerName: string
  customerEmail: string
  customerPhone: string
  description: string
}

export type FlutterwaveCreatePaymentResult = {
  success: boolean
  paymentUrl?: string
  message?: string
  sessionId?: string
}

export type FlutterwaveVerifyResult = {
  success: boolean
  paid: boolean
  status?: string
  amount?: number
  currency?: string
  message?: string
}

export class FlutterwaveApiError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'FlutterwaveApiError'
  }
}

const splitCustomerName = (fullName: string) => {
  const parts = fullName.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) {
    return { first: 'Customer', last: 'Guest' }
  }
  if (parts.length === 1) {
    return { first: parts[0], last: 'Customer' }
  }
  return { first: parts[0], last: parts.slice(1).join(' ') }
}

const normalizePhone = (phone: string) => phone.replace(/\D/g, '').slice(-9) || phone

const v3Client = axios.create({
  baseURL: flutterwaveConfig.v3ApiUrl,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
})

const createV3Payment = async (
  input: FlutterwaveCreatePaymentInput,
): Promise<FlutterwaveCreatePaymentResult> => {
  const response = await v3Client.post(
    '/payments',
    {
      tx_ref: input.txRef,
      amount: input.amount,
      currency: input.currency,
      redirect_url: input.redirectUrl,
      customer: {
        email: input.customerEmail,
        name: input.customerName,
        phonenumber: input.customerPhone,
      },
      customizations: {
        title: 'SATECHI TECH ENTERPRISES',
        description: input.description,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${flutterwaveConfig.secretKey}`,
      },
      validateStatus: () => true,
    },
  )

  const payload = response.data as {
    status?: string
    message?: string
    data?: { link?: string }
  }

  if (response.status >= 400 || payload.status !== 'success' || !payload.data?.link) {
    throw new FlutterwaveApiError(payload.message ?? `Flutterwave error (HTTP ${response.status})`)
  }

  return {
    success: true,
    paymentUrl: payload.data.link,
    message: payload.message,
  }
}

const createV4CheckoutSession = async (
  input: FlutterwaveCreatePaymentInput,
): Promise<FlutterwaveCreatePaymentResult> => {
  const token = await getFlutterwaveAccessToken()
  const { first, last } = splitCustomerName(input.customerName)
  const phone = normalizePhone(input.customerPhone)

  const response = await fetch(`${flutterwaveConfig.v4ApiUrl}/checkout/sessions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'X-Trace-Id': `satechitech-${Date.now()}`,
      'X-Idempotency-Key': input.txRef,
    },
    body: JSON.stringify({
      amount: input.amount,
      currency: input.currency,
      reference: input.txRef,
      redirect_url: input.redirectUrl,
      customer: {
        email: input.customerEmail,
        name: { first, last },
        phone: { country_code: '260', number: phone },
      },
      customizations: {
        title: 'SATECHI TECH ENTERPRISES',
        description: input.description,
      },
    }),
  })

  const payload = (await response.json()) as {
    status?: string
    message?: string
    data?: { id?: string }
    error?: { message?: string }
  }

  if (!response.ok || payload.status !== 'success' || !payload.data?.id) {
    throw new FlutterwaveApiError(
      payload.error?.message ?? payload.message ?? `Flutterwave v4 error (HTTP ${response.status})`,
    )
  }

  const sessionId = payload.data.id
  const paymentUrl = `${flutterwaveConfig.checkoutBaseUrl}/${sessionId}`

  return {
    success: true,
    paymentUrl,
    sessionId,
    message: payload.message,
  }
}

export const createFlutterwavePayment = async (
  input: FlutterwaveCreatePaymentInput,
): Promise<FlutterwaveCreatePaymentResult> => {
  assertFlutterwaveConfigured()

  if (getFlutterwaveAuthMode() === 'v4-oauth') {
    return createV4CheckoutSession(input)
  }

  return createV3Payment(input)
}

const verifyV3Transaction = async (transactionId: string): Promise<FlutterwaveVerifyResult> => {
  const response = await v3Client.get(`/transactions/${transactionId}/verify`, {
    headers: {
      Authorization: `Bearer ${flutterwaveConfig.secretKey}`,
    },
    validateStatus: () => true,
  })

  const payload = response.data as {
    status?: string
    message?: string
    data?: {
      status?: string
      amount?: number
      currency?: string
    }
  }

  if (response.status >= 400 || payload.status !== 'success') {
    throw new FlutterwaveApiError(payload.message ?? `Flutterwave verify failed (HTTP ${response.status})`)
  }

  const txStatus = payload.data?.status?.toLowerCase()

  return {
    success: true,
    paid: txStatus === 'successful',
    status: payload.data?.status,
    amount: payload.data?.amount,
    currency: payload.data?.currency,
    message: payload.message,
  }
}

const verifyV4ByReference = async (reference: string): Promise<FlutterwaveVerifyResult> => {
  const token = await getFlutterwaveAccessToken()
  const response = await fetch(
    `${flutterwaveConfig.v4ApiUrl}/charges?reference=${encodeURIComponent(reference)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Trace-Id': `satechitech-verify-${Date.now()}`,
      },
    },
  )

  const payload = (await response.json()) as {
    status?: string
    message?: string
    data?: Array<{
      status?: string
      amount?: number
      currency?: string
    }>
    error?: { message?: string }
  }

  if (!response.ok || payload.status !== 'success') {
    throw new FlutterwaveApiError(
      payload.error?.message ?? payload.message ?? `Flutterwave v4 verify failed (HTTP ${response.status})`,
    )
  }

  const charge = payload.data?.[0]
  const status = charge?.status?.toLowerCase()

  return {
    success: true,
    paid: status === 'succeeded' || status === 'successful' || status === 'completed',
    status: charge?.status,
    amount: charge?.amount,
    currency: charge?.currency,
    message: payload.message,
  }
}

export const verifyFlutterwaveTransaction = async (
  transactionId: string,
): Promise<FlutterwaveVerifyResult> => {
  assertFlutterwaveConfigured()

  if (getFlutterwaveAuthMode() === 'v4-oauth') {
    return verifyV4ByReference(transactionId)
  }

  return verifyV3Transaction(transactionId)
}

export const verifyFlutterwaveOrderReference = async (
  reference: string,
): Promise<FlutterwaveVerifyResult> => {
  assertFlutterwaveConfigured()

  if (getFlutterwaveAuthMode() === 'v4-oauth') {
    return verifyV4ByReference(reference)
  }

  throw new FlutterwaveApiError('Order reference verification requires Flutterwave v4 credentials.')
}
