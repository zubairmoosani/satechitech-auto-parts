/** Stable cart/catalogue id derived from a product name (shared by client cart and server pricing). */
export const toCartId = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
