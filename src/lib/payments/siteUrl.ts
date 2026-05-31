const trimTrailingSlash = (url: string) => url.replace(/\/$/, '')

/** Public HTTPS base for payment redirect/callback URLs (Vercel, ngrok, etc.). */
export const getPaymentPublicBaseUrl = () => {
  const configured =
    process.env.DPO_PUBLIC_SITE_URL ??
    process.env.FLUTTERWAVE_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : undefined) ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXTAUTH_URL ??
    'http://localhost:3000'

  return trimTrailingSlash(configured)
}

export const assertPaymentPublicBaseUrl = () => {
  const base = getPaymentPublicBaseUrl()

  if (!base.startsWith('https://')) {
    throw new Error(
      'Payments require a public HTTPS site URL. Set DPO_PUBLIC_SITE_URL or FLUTTERWAVE_PUBLIC_SITE_URL (e.g. https://satechitech-auto-parts.vercel.app).',
    )
  }

  try {
    const host = new URL(base).hostname
    if (host === 'localhost' || host === '127.0.0.1' || host.endsWith('.local')) {
      throw new Error(
        'Payment gateways block localhost. Use ngrok locally or deploy to Vercel with your HTTPS URL in environment variables.',
      )
    }
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('Payment')) throw error
    throw new Error('Public site URL is not valid.')
  }

  return base
}

export const getPaymentCallbackUrls = (orderNumber: string) => {
  const base = getPaymentPublicBaseUrl()
  return {
    redirectUrl: `${base}/checkout/confirmation?order=${encodeURIComponent(orderNumber)}`,
  }
}
