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
  title: 'Booking - NextJS | Multipurpose Online Bookinga Template',
  description: 'Booking - Multipurpose Online Bookinga Template',
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
