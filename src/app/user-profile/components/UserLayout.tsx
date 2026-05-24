'use client'
import Preloader from '@/components/Preloader'
import { useToggle } from '@/hooks'
import dynamic from 'next/dynamic'
import { Suspense, useEffect, type ReactNode } from 'react'
import { Button, Col, Container, Offcanvas, OffcanvasBody, OffcanvasHeader, Row } from 'react-bootstrap'
import { FaSlidersH } from 'react-icons/fa'

const LeftPanel = dynamic(() => import('./LeftPanel'))

const UserLayout = ({ children }: { children: ReactNode }) => {
  const { isOpen, toggle } = useToggle()

  useEffect(() => {
    document.body.classList.add('dashboard')
    return () => {
      document.body.classList.remove('dashboard')
    }
  })
  return (
    <>
      <main>
        <section className="pt-3">
          <Container>
            <Row>
              <Col lg={4} xl={3}>
                <div className="d-none d-lg-block">
                  <Suspense>
                    <LeftPanel />
                  </Suspense>
                </div>
                <Offcanvas show={isOpen} onHide={toggle} placement="end" className="offcanvas-lg" tabIndex={-1} id="offcanvasSidebar">
                  <OffcanvasHeader className="justify-content-end pb-2">
                    <button type="button" onClick={toggle} className="btn-close" />
                  </OffcanvasHeader>
                  <OffcanvasBody className="p-3 p-lg-0">
                    <Suspense>
                      <LeftPanel />
                    </Suspense>
                  </OffcanvasBody>
                </Offcanvas>
              </Col>
              <Col lg={8} xl={9}>
                <div className="d-grid mb-0 d-lg-none w-100">
                  <Button variant="primary" className="mb-4 items-center justify-content-center gap-1" type="button" onClick={toggle}>
                    <FaSlidersH /> Menu
                  </Button>
                </div>

                <Suspense fallback={<Preloader />}>{children}</Suspense>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    </>
  )
}

export default UserLayout
