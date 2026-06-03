'use client'

import AdminCompanyLogo from '@/app/admin/components/AdminCompanyLogo'
import AdminMenu from '@/app/admin/components/AdminMenu'
import Preloader from '@/components/Preloader'
import { useToggle } from '@/hooks'
import dynamic from 'next/dynamic'
import { signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { Suspense, useEffect, type ReactNode } from 'react'
import { Offcanvas, OffcanvasBody } from 'react-bootstrap'
import { FaArrowRightFromBracket } from 'react-icons/fa6'
import './admin-panel.scss'

const TopBar = dynamic(() => import('./TopBar'))

const AdminLogoutButton = () => {
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/auth/sign-in' })
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="h6 fw-light mb-0 text-body d-flex align-items-center btn btn-link p-0 text-decoration-none"
    >
      <FaArrowRightFromBracket className="me-1" />
      Log out
    </button>
  )
}

const AdminLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  const pathname = usePathname()
  const { isOpen, toggle, hide } = useToggle()

  useEffect(() => {
    hide()
  }, [pathname, hide])

  return (
    <main className="admin-panel-root">
      <nav className="navbar sidebar navbar-expand-xl navbar-light admin-sidebar-shell">
        <div className="d-none d-xl-flex admin-sidebar-logo">
          <AdminCompanyLogo />
        </div>

        <div className="admin-sidebar-body d-none d-xl-flex">
          <div className="sidebar-content admin-sidebar-content">
            <div className="admin-sidebar-nav">
              <Suspense>
                <AdminMenu />
              </Suspense>
            </div>
            <div className="admin-sidebar-logout">
              <AdminLogoutButton />
            </div>
          </div>
        </div>

        <Offcanvas show={isOpen} onHide={hide} placement="start" className="admin-offcanvas d-xl-none">
          <OffcanvasBody className="admin-offcanvas-body">
            <div className="admin-offcanvas-logo">
              <AdminCompanyLogo />
            </div>
            <div className="admin-offcanvas-nav">
              <Suspense>
                <AdminMenu onItemClick={hide} />
              </Suspense>
            </div>
            <div className="admin-offcanvas-logout">
              <AdminLogoutButton />
            </div>
          </OffcanvasBody>
        </Offcanvas>
      </nav>

      <div className="page-content">
        <Suspense>
          <TopBar toggle={toggle} />
        </Suspense>

        <div className="page-content-wrapper p-xxl-4">
          <Suspense fallback={<Preloader />}>{children}</Suspense>
        </div>
      </div>
    </main>
  )
}

export default AdminLayout
