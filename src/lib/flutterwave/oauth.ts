import { flutterwaveConfig, getFlutterwaveClientCredentials } from '@/lib/flutterwave/config'

const TOKEN_URL =
  'https://idp.flutterwave.com/realms/flutterwave/protocol/openid-connect/token'

type TokenCache = {
  accessToken: string
  expiresAtMs: number
}

let tokenCache: TokenCache | null = null

export async function getFlutterwaveAccessToken(): Promise<string> {
  const now = Date.now()

  if (tokenCache && tokenCache.expiresAtMs - now > 60_000) {
    return tokenCache.accessToken
  }

  const { clientId, clientSecret } = getFlutterwaveClientCredentials()

  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'client_credentials',
    }),
  })

  const payload = (await response.json()) as {
    access_token?: string
    expires_in?: number
    error_description?: string
    error?: string
  }

  if (!response.ok || !payload.access_token) {
    throw new Error(
      payload.error_description ?? payload.error ?? `Flutterwave OAuth failed (HTTP ${response.status})`,
    )
  }

  tokenCache = {
    accessToken: payload.access_token,
    expiresAtMs: now + (payload.expires_in ?? 600) * 1000,
  }

  return tokenCache.accessToken
}
