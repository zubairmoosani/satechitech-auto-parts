'use client'
import Link from 'next/link'
import { NavItem, NavLink } from 'react-bootstrap'
import { BsBriefcase, BsHouseDoor, BsPercent, BsPersonCircle } from 'react-icons/bs'

const Footer = () => {
  return (
    <div className="navbar navbar-mobile">
      <ul className="navbar-nav">
        <NavItem>
          <NavLink active as={Link} href="/">
            <BsHouseDoor className=" fa-fw" />
            <span className="mb-0 nav-text">Home</span>
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink as={Link} href="/user/bookings">
            <BsBriefcase className=" fa-fw" />
            <span className="mb-0 nav-text">My Trips</span>
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink as={Link} href="/offer-detail">
            <BsPercent className=" fa-fw" />
            <span className="mb-0 nav-text">Offer</span>
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink as={Link} href="/user/profile">
            <BsPersonCircle className=" fa-fw" />
            <span className="mb-0 nav-text">Account</span>
          </NavLink>
        </NavItem>
      </ul>
    </div>
  )
}

export default Footer
