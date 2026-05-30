const trimTrailingSlash = (url: string) => url.replace(/\/$/, '')

/** Public HTTPS base URL for RedirectURL / BackURL (ngrok locally, Vercel URL in production). */
export const getDpoPublicBaseUrl = () => {
  const configured =
    process.env.DPO_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : undefined) ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXTAUTH_URL ??
    'http://localhost:3000'

  return trimTrailingSlash(configured)
}

export const dpoConfig = {
  companyToken: process.env.DPO_COMPANY_TOKEN ?? 'B3F59BE7-0756-420E-BB88-1D98E7A6B040',
  serviceType: process.env.DPO_SERVICE_TYPE ?? '54841',
  apiUrl: process.env.DPO_API_URL ?? 'https://secure.3gdirectpay.com/API/v6/',
  payUrl: process.env.DPO_PAY_URL ?? 'https://secure.3gdirectpay.com/pay.asp',
}

export const getDpoPaymentUrl = (transToken: string) =>
  `${dpoConfig.payUrl}?ID=${encodeURIComponent(transToken)}`

export const getDpoCallbackUrls = (orderNumber: string) => {
  const base = getDpoPublicBaseUrl()
  return {
    redirectUrl: `${base}/checkout/confirmation?order=${encodeURIComponent(orderNumber)}`,
    backUrl: `${base}/api/dpo/callback`,
  }
}

export const assertDpoPublicBaseUrl = () => {
  const base = getDpoPublicBaseUrl()

  if (!base.startsWith('https://')) {
    throw new Error(
      'DPO requires DPO_PUBLIC_SITE_URL to be a public HTTPS URL (e.g. https://your-app.ngrok-free.app). localhost is rejected by the DPO gateway.',
    )
  }

  try {
    const host = new URL(base).hostname
    if (host === 'localhost' || host === '127.0.0.1' || host.endsWith('.local')) {
      throw new Error(
        'DPO blocks localhost in payment URLs. Expose your dev server with ngrok and set DPO_PUBLIC_SITE_URL to that HTTPS address.',
      )
    }
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('DPO')) throw error
    throw new Error('DPO_PUBLIC_SITE_URL is not a valid URL.')
  }

  return base
}
