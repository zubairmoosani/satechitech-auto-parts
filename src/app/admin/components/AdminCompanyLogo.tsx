'use client'

import { companyInfo } from '@/app/auto-parts/data'
import Image from 'next/image'
import Link from 'next/link'

type AdminCompanyLogoProps = {
  href?: string
  compact?: boolean
}

const AdminCompanyLogo = ({ href = '/admin/products', compact = false }: AdminCompanyLogoProps) => {
  return (
    <Link
      href={href}
      className="d-flex justify-content-center align-items-center navbar-brand py-0 my-0 w-100"
      style={{ lineHeight: 1 }}
    >
      <Image
        src={companyInfo.logo}
        alt={companyInfo.logoAlt}
        width={180}
        height={90}
        priority
        className="object-fit-contain rounded-2 bg-white d-inline-block"
        style={{
          width: 'auto',
          height: compact ? 40 : 52,
          maxWidth: compact ? 140 : 180,
          padding: '0.5rem 0.75rem',
        }}
      />
    </Link>
  )
}

export default AdminCompanyLogo
