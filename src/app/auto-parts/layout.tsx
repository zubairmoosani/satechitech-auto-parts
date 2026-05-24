import { companyInfo } from '@/app/auto-parts/data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Auto Parts | ${companyInfo.legalName}`,
  description: companyInfo.metaDescription,
}

export default function AutoPartsLayout({ children }: { children: React.ReactNode }) {
  return children
}
