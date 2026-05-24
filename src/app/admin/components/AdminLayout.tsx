'use client'
import LogoBox from '@/components/LogoBox'
import Preloader from '@/components/Preloader'
import { useToggle } from '@/hooks'
import { useAuthContext } from '@/states'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import 'overlayscrollbars/overlayscrollbars.css'
import { Suspense, type ReactNode } from 'react'
import { Offcanvas, OffcanvasBody } from 'react-bootstrap'
import { BsGearFill } from 'react-icons/bs'
import { FaArrowRightFromBracket } from 'react-icons/fa6'
const AdminMenu = dynamic(() => import('./AdminMenu'))
const TopBar = dynamic(() => import('./TopBar'))

const AdminLeftMenu = () => {
  const { removeSession } = useAuthContext()

  return (
    <>
      <Suspense>
        <AdminMenu />
      </Suspense>

      <div className="d-flex align-items-center justify-content-between text-primary-hover mt-auto p-3">
        <Link onClick={removeSession} className="h6 fw-light mb-0 text-body d-flex align-items-center" href="">
          <FaArrowRightFromBracket className="me-1" />
          Log out
        </Link>
        <Link className="h6 mb-0 text-body" href="/admin/settings">
          <BsGearFill />
        </Link>
      </div>
    </>
  )
}

const AdminLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  const { isOpen, toggle } = useToggle()

  return (
    <main>
      <nav className="navbar sidebar navbar-expand-xl navbar-light">
        <div className="d-flex align-items-center">
          <LogoBox />
        </div>
        <div className="flex-row custom-scrollbar h-100" tabIndex={-1}>
          <div className="sidebar-content d-flex flex-column pt-4">
            <AdminLeftMenu />
          </div>
        </div>

        <Offcanvas show={isOpen} onHide={toggle} placement="start" className="flex-row custom-scrollbar h-100" tabIndex={-1}>
          <OverlayScrollbarsComponent className="w-100">
            <OffcanvasBody className="sidebar-offcanvas-wrapper d-flex flex-column pt-4">
              <AdminLeftMenu />
            </OffcanvasBody>
          </OverlayScrollbarsComponent>
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
