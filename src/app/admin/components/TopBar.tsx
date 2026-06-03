'use client'

import AdminCompanyLogo from '@/app/admin/components/AdminCompanyLogo'
import { Container } from 'react-bootstrap'
import { BsList } from 'react-icons/bs'

const TopBar = ({ toggle }: { toggle: () => void }) => {
  return (
    <nav className="navbar top-bar navbar-light py-2 py-xl-3">
      <Container fluid className="p-0">
        <div className="d-flex align-items-center justify-content-between w-100 px-2 px-sm-3">
          <div className="d-flex align-items-center gap-2 d-xl-none admin-topbar-logo">
            <AdminCompanyLogo compact />
          </div>
          <button
            type="button"
            onClick={toggle}
            className="btn btn-light border-0 p-2 d-xl-none admin-menu-btn ms-auto"
            aria-label="Open menu"
          >
            <BsList className="text-primary fa-fw fs-5" />
          </button>
        </div>
      </Container>
    </nav>
  )
}

export default TopBar
