'use client'
import avatar1 from '@/assets/images/avatar/01.jpg'
import AppMenu from '@/components/AppMenu'
import LogoBox from '@/components/LogoBox'
import { useScrollEvent, useToggle } from '@/hooks'
import { useAuthContext, useLayoutContext, type LayoutState } from '@/states'
import { toSentenceCase } from '@/utils'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Container,
    Dropdown,
    DropdownDivider,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    ListGroup,
    ListGroupItem,
    Navbar,
    OverlayTrigger,
    Tooltip,
} from 'react-bootstrap'
import { type IconType } from 'react-icons'
import { BsBell, BsBookmarkCheck, BsCircleHalf, BsGear, BsHeart, BsInfoCircle, BsLightningCharge, BsMoonStars, BsPower, BsSun } from 'react-icons/bs'
import { notificationData } from './data'

type ThemeModeType = {
  theme: LayoutState['theme']
  icon: IconType
}

const themeModes: ThemeModeType[] = [
  {
    icon: BsSun,
    theme: 'light',
  },
  {
    icon: BsMoonStars,
    theme: 'dark',
  },
  {
    icon: BsCircleHalf,
    theme: 'auto',
  },
]

const TopNavBar4 = () => {
  const { scrollY } = useScrollEvent()
  const { theme, updateTheme } = useLayoutContext()
  const { removeSession } = useAuthContext()
  const { isOpen, toggle } = useToggle()
  return (
    <>
      <header
        className={clsx('navbar-light header-sticky', {
          'header-sticky-on': scrollY >= 400,
        })}>
        <Navbar expand="lg">
          <Container>
            <LogoBox />
            <button
              onClick={toggle}
              className="navbar-toggler ms-auto mx-3 me-md-0 p-0 p-sm-2"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
              aria-controls="navbarCollapse"
              aria-expanded={isOpen}
              aria-label="Toggle navigation">
              <span className="navbar-toggler-animation">
                <span />
                <span />
                <span />
              </span>
            </button>

            <AppMenu mobileMenuOpen={isOpen} />

            <ul className="nav flex-row align-items-center list-unstyled ms-xl-auto">
              <Dropdown className="nav-item ms-0 ms-md-3">
                <DropdownToggle as={Link} href="" className="arrow-none nav-link p-0" role="button">
                  <BsBell className=" fa-fw fs-5" />
                </DropdownToggle>
                <span className="notif-badge animation-blink" />

                <DropdownMenu align="end" className="dropdown-animation dropdown-menu-size-md shadow-lg p-0" renderOnMount>
                  <Card className="bg-transparent">
                    <CardHeader className="bg-transparent d-flex justify-content-between align-items-center border-bottom">
                      <h6 className="m-0">
                        Notifications
                        <span className="badge bg-danger bg-opacity-10 text-danger ms-2">4 new</span>
                      </h6>
                      <Link className="small" href="">
                        Clear all
                      </Link>
                    </CardHeader>

                    <CardBody className="p-0">
                      <ListGroup className="list-group-flush list-unstyled p-2">
                        {(notificationData ?? []).map((notification, idx) => (
                          <li key={idx}>
                            <ListGroupItem className={clsx('list-group-item-action rounded border-0 mb-1 p-3', { 'notif-unread': idx === 0 })}>
                              <h6 className="mb-2">{notification.title}</h6>
                              {notification.content && <p className="mb-0 small">{notification.content}</p>}
                              <span>{notification.time}</span>
                            </ListGroupItem>
                          </li>
                        ))}
                      </ListGroup>
                    </CardBody>

                    <CardFooter className="bg-transparent text-center border-top">
                      <Link href="" className="btn btn-sm btn-link mb-0 p-0">
                        See all incoming activity
                      </Link>
                    </CardFooter>
                  </Card>
                </DropdownMenu>
              </Dropdown>
              <Dropdown className="nav-item ms-3">
                <DropdownToggle as={Link} href="" className="arrow-none avatar avatar-xs p-0" id="profileDropdown" role="button">
                  <Image className="avatar-img rounded-circle" src={avatar1} alt="avatar" />
                </DropdownToggle>
                <DropdownMenu
                  align={'end'}
                  className="dropdown-animation dropdown-menu-end shadow pt-3"
                  aria-labelledby="profileDropdown"
                  renderOnMount>
                  <li className="px-3 mb-3">
                    <div className="d-flex align-items-center">
                      <div className="avatar me-3">
                        <Image className="avatar-img rounded-circle shadow" src={avatar1} alt="avatar" />
                      </div>
                      <div>
                        <h6 className="h6 mt-2 mt-sm-0">Lori Ferguson</h6>
                        <p className="small m-0">example@gmail.com</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <DropdownDivider />
                  </li>
                  <li>
                    <DropdownItem>
                      <BsBookmarkCheck className=" fa-fw me-2" />
                      My Bookings
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem>
                      <BsHeart className=" fa-fw me-2" />
                      My Wishlist
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem>
                      <BsGear className=" fa-fw me-2" />
                      Settings
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem>
                      <BsInfoCircle className=" fa-fw me-2" />
                      Help Center
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem className="bg-danger-soft-hover" onClick={removeSession}>
                      <BsPower className=" fa-fw me-2" />
                      Sign Out
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownDivider />
                  </li>
                  <li>
                    <div className="nav-pills-primary-soft theme-icon-active d-flex justify-content-between align-items-center p-2 pb-0">
                      <span>Mode:</span>
                      {(themeModes ?? []).map((mode, idx) => {
                        const Icon = mode.icon
                        return (
                          <OverlayTrigger key={mode.theme + idx} overlay={<Tooltip>{toSentenceCase(mode.theme)}</Tooltip>}>
                            <button
                              onClick={() => updateTheme(mode.theme)}
                              type="button"
                              className={clsx('btn btn-link nav-link text-primary-hover mb-0 p-0', { active: theme === mode.theme })}
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              data-bs-title="Light">
                              <Icon />
                            </button>
                          </OverlayTrigger>
                        )
                      })}
                    </div>
                  </li>
                </DropdownMenu>
              </Dropdown>
              <li className="nav-item ms-3 d-none d-sm-block">
                <Button variant="primary-soft" size="sm" className="mb-0" href="">
                  <BsLightningCharge /> Upgrade now
                </Button>
              </li>
            </ul>
          </Container>
        </Navbar>
      </header>
    </>
  )
}

export default TopNavBar4
