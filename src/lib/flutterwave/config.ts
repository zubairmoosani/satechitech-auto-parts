export const flutterwaveConfig = {
  publicKey: process.env.FLUTTERWAVE_PUBLIC_KEY ?? '',
  secretKey: process.env.FLUTTERWAVE_SECRET_KEY ?? '',
  encryptionKey: process.env.FLUTTERWAVE_ENCRYPTION_KEY ?? '',
  apiUrl: process.env.FLUTTERWAVE_API_URL ?? 'https://api.flutterwave.com/v3',
}

export const assertFlutterwaveConfigured = () => {
  if (!flutterwaveConfig.secretKey) {
    throw new Error('FLUTTERWAVE_SECRET_KEY is not configured.')
  }
}
