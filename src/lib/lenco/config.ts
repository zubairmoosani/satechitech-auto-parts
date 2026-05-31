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

export const assertLencoConfigured = () => {
  if (!lencoConfig.secretKey) {
    throw new Error('LENCO_SECRET_KEY is not configured.')
  }
  if (!lencoConfig.publicKey) {
    throw new Error('LENCO_PUBLIC_KEY is not configured.')
  }
}
