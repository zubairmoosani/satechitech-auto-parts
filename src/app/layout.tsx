import '@/assets/css/style.css'
import '@/assets/scss/style.scss'
import BackToTop from '@/components/BackToTop'
import PageWrapper from '@/components/PageWrapper'
import type { Metadata } from 'next'

import { DM_Sans, Poppins } from 'next/font/google';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SATECHI TECH ENTERPRISES | Auto Parts in Mansa, Zambia',
  description:
    'SATECHI TECH ENTERPRISES supplies quality auto parts in Mansa, Zambia — brakes, filters, oils, batteries, and more. Shop online and pay in ZMW.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${poppins.variable}`}>
        <PageWrapper>
          {children}
          <BackToTop />
        </PageWrapper>
      </body>
    </html>
  )
}
