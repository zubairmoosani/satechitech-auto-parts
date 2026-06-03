const trimEnv = (value?: string) => value?.trim() ?? ''

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export const flutterwaveConfig = {
  publicKey: trimEnv(process.env.FLUTTERWAVE_PUBLIC_KEY ?? process.env.FLW_PUBLIC_KEY),
  secretKey: trimEnv(process.env.FLUTTERWAVE_SECRET_KEY ?? process.env.FLW_SECRET_KEY),
  encryptionKey: trimEnv(
    process.env.FLUTTERWAVE_ENCRYPTION_KEY ?? process.env.FLW_ENCRYPTION_KEY,
  ),
  clientId: trimEnv(process.env.FLUTTERWAVE_CLIENT_ID ?? process.env.FLW_CLIENT_ID),
  clientSecret: trimEnv(
    process.env.FLUTTERWAVE_CLIENT_SECRET ?? process.env.FLW_CLIENT_SECRET,
  ),
  v3ApiUrl: trimEnv(process.env.FLUTTERWAVE_API_URL) || 'https://api.flutterwave.com/v3',
  v4ApiUrl:
    trimEnv(process.env.FLUTTERWAVE_V4_API_URL) || 'https://f4bexperience.flutterwave.com',
  checkoutBaseUrl:
    trimEnv(process.env.FLUTTERWAVE_CHECKOUT_BASE_URL) ||
    'https://checkout-v3-ui-prod.f4b-flutterwave.com/v4/pay',
}

export const isV3SecretKey = (value: string) => value.startsWith('FLWSECK')

export const isV4ClientId = (value: string) => UUID_PATTERN.test(value)

export const getFlutterwaveAuthMode = (): 'v3-secret' | 'v4-oauth' | 'missing' => {
  const { secretKey, publicKey, clientId, clientSecret } = flutterwaveConfig

  if (secretKey && isV3SecretKey(secretKey)) {
    return 'v3-secret'
  }

  if (clientId && clientSecret) {
    return 'v4-oauth'
  }

  if (publicKey && secretKey && isV4ClientId(publicKey)) {
    return 'v4-oauth'
  }

  return 'missing'
}

export const getFlutterwaveClientCredentials = () => {
  const { publicKey, secretKey, clientId, clientSecret } = flutterwaveConfig

  if (clientId && clientSecret) {
    return { clientId, clientSecret }
  }

  if (publicKey && secretKey && getFlutterwaveAuthMode() === 'v4-oauth') {
    return { clientId: publicKey, clientSecret: secretKey }
  }

  throw new Error('Flutterwave v4 Client ID and Client Secret are not configured.')
}

export const getFlutterwaveConfigHint = (): string | null => {
  const mode = getFlutterwaveAuthMode()

  if (mode === 'missing') {
    return 'Set Flutterwave credentials on Vercel: v3 uses FLWSECK- secret, v4 uses Client ID (UUID) + Client Secret in FLUTTERWAVE_PUBLIC_KEY and FLUTTERWAVE_SECRET_KEY.'
  }

  if (mode === 'v3-secret') {
    const { secretKey, publicKey } = flutterwaveConfig
    if (secretKey.startsWith('FLWPUBK')) {
      return 'FLUTTERWAVE_SECRET_KEY has a public key. Use the Secret Key (FLWSECK-).'
    }
    if (publicKey && secretKey.includes('TEST') && !publicKey.includes('TEST')) {
      return 'Use matching test or live Flutterwave keys — do not mix them.'
    }
  }

  return null
}

export const assertFlutterwaveConfigured = () => {
  if (getFlutterwaveAuthMode() === 'missing') {
    throw new Error('Flutterwave is not configured on the server.')
  }

  const hint = getFlutterwaveConfigHint()
  if (hint) {
    throw new Error(hint)
  }
}
