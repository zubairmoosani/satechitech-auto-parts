export const lencoConfig = {
  publicKey: process.env.LENCO_PUBLIC_KEY ?? '',
  secretKey: process.env.LENCO_SECRET_KEY ?? '',
  apiUrl:
    process.env.LENCO_API_URL ??
    (process.env.LENCO_ENV === 'production'
      ? 'https://api.lenco.co/access/v2'
      : 'https://sandbox.lenco.co/access/v2'),
  widgetScriptUrl:
    process.env.LENCO_WIDGET_URL ??
    (process.env.LENCO_ENV === 'production'
      ? 'https://pay.lenco.co/js/v1/inline.js'
      : 'https://pay.sandbox.lenco.co/js/v1/inline.js'),
}

const isPlaceholderKey = (value: string) =>
  !value ||
  value.includes('your-lenco') ||
  value === 'your-lenco-public-key' ||
  value === 'your-lenco-secret-key'

export const assertLencoConfigured = () => {
  if (isPlaceholderKey(lencoConfig.secretKey)) {
    throw new Error(
      'LENCO_SECRET_KEY is missing on the server. Add your Lenco sandbox secret key in Vercel → Settings → Environment Variables, then redeploy.',
    )
  }
  if (isPlaceholderKey(lencoConfig.publicKey) || !lencoConfig.publicKey.startsWith('pub-')) {
    throw new Error(
      'LENCO_PUBLIC_KEY is missing or invalid on the server. Add your Lenco public key (starts with pub-) in Vercel → Environment Variables, then redeploy.',
    )
  }
}
