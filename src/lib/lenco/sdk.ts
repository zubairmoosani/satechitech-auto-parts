import axios from 'axios'
import { assertLencoConfigured, lencoConfig } from '@/lib/lenco/config'

export type LencoVerifyResult = {
  success: boolean
  paid: boolean
  status?: string
  amount?: string
  currency?: string
  message?: string
}

export class LencoApiError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'LencoApiError'
  }
}

const lencoClient = axios.create({
  timeout: 30000,
  headers: {
    Accept: 'application/json',
  },
})

export const verifyLencoCollection = async (reference: string): Promise<LencoVerifyResult> => {
  assertLencoConfigured()

  const response = await lencoClient.get(`/collections/status/${encodeURIComponent(reference)}`, {
    baseURL: lencoConfig.apiUrl,
    headers: {
      Authorization: `Bearer ${lencoConfig.secretKey}`,
    },
    validateStatus: () => true,
  })

  const payload = response.data as {
    status?: boolean
    message?: string
    data?: {
      status?: string
      amount?: string
      currency?: string
      reference?: string
    }
  }

  if (response.status >= 400 || payload.status === false) {
    throw new LencoApiError(payload.message ?? `Lenco verify failed (HTTP ${response.status})`)
  }

  const collectionStatus = payload.data?.status?.toLowerCase()

  return {
    success: true,
    paid: collectionStatus === 'successful',
    status: payload.data?.status,
    amount: payload.data?.amount,
    currency: payload.data?.currency,
    message: payload.message,
  }
}
