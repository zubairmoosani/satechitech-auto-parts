export { default as middleware } from 'next-auth/middleware'

export const config = {
  matcher: ['/admin/:path*', '/agent/:path*', '/user-profile/:path*'],
}
