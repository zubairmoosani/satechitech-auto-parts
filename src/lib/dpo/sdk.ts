/**
 * DPO Pay API v6 client for Next.js server routes.
 * Docs: https://docs.dpopay.com/dpo-pay-by-network/reference/dpo-pay-api-v6
 */
import axios from 'axios'
import { dpoConfig } from '@/lib/dpo/config'

export type DpoCreateTokenInput = {
  amount: number
  currency: string
  companyRef: string
  redirectUrl: string
  backUrl: string
  customerFirstName: string
  customerLastName: string
  customerEmail: string
  serviceDescription: string
}

export type DpoCreateTokenResult = {
  success: boolean
  transToken?: string
  transRef?: string
  result?: string
  resultExplanation?: string
  rawXml?: string
}

export type DpoVerifyTokenResult = {
  success: boolean
  paid: boolean
  result?: string
  resultExplanation?: string
  rawXml?: string
}

export class DpoApiError extends Error {
  status?: number
  result?: string
  resultExplanation?: string

  constructor(message: string, options?: { status?: number; result?: string; resultExplanation?: string }) {
    super(message)
    this.name = 'DpoApiError'
    this.status = options?.status
    this.result = options?.result
    this.resultExplanation = options?.resultExplanation
  }
}

const escapeXml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

export const readDpoXmlTag = (xml: string, tag: string) => {
  const match = xml.match(new RegExp(`<${tag}>([^<]*)</${tag}>`, 'i'))
  return match?.[1]?.trim()
}

const isHtmlErrorPage = (body: string) => body.trimStart().startsWith('<!DOCTYPE') || body.includes('<HTML>')

const dpoHttp = axios.create({
  timeout: 30000,
  headers: {
    'Content-Type': 'application/xml; charset=utf-8',
    Accept: 'application/xml, text/plain, */*',
    'User-Agent': 'Mozilla/5.0 (compatible; SATECHI-TECH-DPO/1.0)',
    'Cache-Control': 'no-cache',
  },
  validateStatus: () => true,
})

const postDpoXml = async (xml: string) => {
  const response = await dpoHttp.post(dpoConfig.apiUrl, xml)
  const body = typeof response.data === 'string' ? response.data : String(response.data ?? '')

  if (isHtmlErrorPage(body)) {
    throw new DpoApiError(
      `DPO gateway blocked the request (HTTP ${response.status}). Use a public HTTPS DPO_PUBLIC_SITE_URL and ensure your server can reach secure.3gdirectpay.com.`,
      { status: response.status },
    )
  }

  const result = readDpoXmlTag(body, 'Result')
  const resultExplanation = readDpoXmlTag(body, 'ResultExplanation')

  if (response.status >= 400) {
    throw new DpoApiError(resultExplanation ?? `DPO HTTP ${response.status}`, {
      status: response.status,
      result,
      resultExplanation,
    })
  }

  return { body, result, resultExplanation }
}

export const buildCreateTokenXml = (input: DpoCreateTokenInput) => {
  const serviceDate = new Date().toISOString().slice(0, 10).replace(/-/g, '/') + ' 12:00'

  return `<?xml version="1.0" encoding="utf-8"?>
<API3G>
  <CompanyToken>${escapeXml(dpoConfig.companyToken)}</CompanyToken>
  <Request>createToken</Request>
  <Transaction>
    <PaymentAmount>${input.amount.toFixed(2)}</PaymentAmount>
    <PaymentCurrency>${escapeXml(input.currency)}</PaymentCurrency>
    <CompanyRef>${escapeXml(input.companyRef)}</CompanyRef>
    <RedirectURL>${escapeXml(input.redirectUrl)}</RedirectURL>
    <BackURL>${escapeXml(input.backUrl)}</BackURL>
    <CompanyRefUnique>1</CompanyRefUnique>
    <PTL>24</PTL>
    <customerFirstName>${escapeXml(input.customerFirstName)}</customerFirstName>
    <customerLastName>${escapeXml(input.customerLastName)}</customerLastName>
    <customerEmail>${escapeXml(input.customerEmail)}</customerEmail>
  </Transaction>
  <Services>
    <Service>
      <ServiceType>${escapeXml(dpoConfig.serviceType)}</ServiceType>
      <ServiceDescription>${escapeXml(input.serviceDescription)}</ServiceDescription>
      <ServiceDate>${serviceDate}</ServiceDate>
    </Service>
  </Services>
</API3G>`
}

export const buildVerifyTokenXml = (transactionToken: string) => `<?xml version="1.0" encoding="utf-8"?>
<API3G>
  <CompanyToken>${escapeXml(dpoConfig.companyToken)}</CompanyToken>
  <Request>verifyToken</Request>
  <TransactionToken>${escapeXml(transactionToken)}</TransactionToken>
</API3G>`

export const createDpoToken = async (input: DpoCreateTokenInput): Promise<DpoCreateTokenResult> => {
  const { body, result, resultExplanation } = await postDpoXml(buildCreateTokenXml(input))
  const transToken = readDpoXmlTag(body, 'TransToken')

  return {
    success: result === '000' && Boolean(transToken),
    transToken,
    transRef: readDpoXmlTag(body, 'TransRef'),
    result,
    resultExplanation,
    rawXml: body,
  }
}

/** verifyToken: Result 000 = paid */
export const verifyDpoToken = async (transactionToken: string): Promise<DpoVerifyTokenResult> => {
  const { body, result, resultExplanation } = await postDpoXml(buildVerifyTokenXml(transactionToken))

  return {
    success: result === '000' || result === '001',
    paid: result === '000',
    result,
    resultExplanation,
    rawXml: body,
  }
}

export const splitCustomerName = (fullName: string) => {
  const parts = fullName.trim().split(/\s+/)
  const firstName = parts[0] ?? 'Customer'
  const lastName = parts.slice(1).join(' ') || 'Guest'
  return { firstName, lastName }
}
