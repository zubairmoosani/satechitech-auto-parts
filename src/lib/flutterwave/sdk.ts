import axios from 'axios'
import { assertFlutterwaveConfigured, flutterwaveConfig } from '@/lib/flutterwave/config'

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

const flutterwaveClient = axios.create({
  baseURL: flutterwaveConfig.apiUrl,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const createFlutterwavePayment = async (
  input: FlutterwaveCreatePaymentInput,
): Promise<FlutterwaveCreatePaymentResult> => {
  assertFlutterwaveConfigured()

  const response = await flutterwaveClient.post(
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

export const verifyFlutterwaveTransaction = async (transactionId: string): Promise<FlutterwaveVerifyResult> => {
  assertFlutterwaveConfigured()

  const response = await flutterwaveClient.get(`/transactions/${transactionId}/verify`, {
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
      tx_ref?: string
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
