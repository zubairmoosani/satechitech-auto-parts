import {
  assertPaymentPublicBaseUrl,
  getPaymentCallbackUrls,
  getPaymentPublicBaseUrl,
} from '@/lib/payments/siteUrl'

export const getDpoPublicBaseUrl = getPaymentPublicBaseUrl
export const assertDpoPublicBaseUrl = assertPaymentPublicBaseUrl

export const dpoConfig = {
  companyToken: process.env.DPO_COMPANY_TOKEN ?? 'B3F59BE7-0756-420E-BB88-1D98E7A6B040',
  serviceType: process.env.DPO_SERVICE_TYPE ?? '54841',
  apiUrl: process.env.DPO_API_URL ?? 'https://secure.3gdirectpay.com/API/v6/',
  payUrl: process.env.DPO_PAY_URL ?? 'https://secure.3gdirectpay.com/pay.asp',
}

export const getDpoPaymentUrl = (transToken: string) =>
  `${dpoConfig.payUrl}?ID=${encodeURIComponent(transToken)}`

export const getDpoCallbackUrls = (orderNumber: string) => {
  const base = getPaymentPublicBaseUrl()
  const { redirectUrl } = getPaymentCallbackUrls(orderNumber)
  return {
    redirectUrl,
    backUrl: `${base}/checkout/confirmation?order=${encodeURIComponent(orderNumber)}&payment=cancelled`,
  }
}
