'use client'

export type LencoWidgetConfig = {
  scriptUrl: string
  publicKey: string
  reference: string
  email: string
  amount: number
  currency: string
  label: string
  channels: string[]
  customer: {
    firstName: string
    lastName: string
    phone: string
  }
}

type LencoPayWidgetOptions = {
  key: string
  reference: string
  email: string
  amount: number
  currency: string
  label: string
  channels: string[]
  customer: {
    firstName: string
    lastName: string
    phone: string
  }
  onSuccess: (response: { reference: string }) => void
  onClose: () => void
  onConfirmationPending?: () => void
}

declare global {
  interface Window {
    LencoPay?: {
      getPaid: (options: LencoPayWidgetOptions) => void
    }
  }
}

const loadLencoScript = (scriptUrl: string) =>
  new Promise<void>((resolve, reject) => {
    if (window.LencoPay) {
      resolve()
      return
    }

    const existing = document.querySelector<HTMLScriptElement>(`script[src="${scriptUrl}"]`)
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true })
      existing.addEventListener('error', () => reject(new Error('Could not load Lenco payment widget.')), { once: true })
      return
    }

    const script = document.createElement('script')
    script.src = scriptUrl
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Could not load Lenco payment widget.'))
    document.body.appendChild(script)
  })

export const openLencoWidget = async (
  config: LencoWidgetConfig,
  callbacks: {
    onSuccess: (reference: string) => void
    onClose: () => void
    onConfirmationPending?: () => void
  },
) => {
  await loadLencoScript(config.scriptUrl)

  if (!window.LencoPay) {
    throw new Error('Lenco payment widget is unavailable.')
  }

  if (!config.publicKey.startsWith('pub-')) {
    throw new Error(
      'Lenco is not configured on this server. The payment public key is missing — add LENCO_PUBLIC_KEY in Vercel and redeploy.',
    )
  }

  window.LencoPay.getPaid({
    key: config.publicKey,
    reference: config.reference,
    email: config.email,
    amount: config.amount,
    currency: config.currency,
    label: config.label,
    channels: config.channels,
    customer: config.customer,
    onSuccess: (response) => callbacks.onSuccess(response.reference),
    onClose: callbacks.onClose,
    onConfirmationPending: callbacks.onConfirmationPending,
  })
}
