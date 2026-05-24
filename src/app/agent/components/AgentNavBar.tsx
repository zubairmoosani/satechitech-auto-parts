'use client'
import { getAgentMenuItems } from "@/helpers/menu";
import clsx from "clsx";
import {
  Card,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Navbar,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
  OffcanvasTitle,
} from "react-bootstrap";
import { BsList, BsListUl, BsPlusLg } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa6";
import { useToggle } from "@/hooks";
import avatar1 from "@/assets/images/avatar/01.jpg";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const AgentMenu = () => {
  const  pathname  = usePathname();
  const menuItems = getAgentMenuItems();

  return (
    <ul className="navbar-nav navbar-offcanvas-menu">
      {menuItems.map((item, idx) => {
        const Icon = item.icon;
        const isActive =  item.url == pathname
        return (
          Icon &&
          item.url && (
            <li key={idx} className="nav-item">
              <Link
                className={clsx("nav-link items-center gap-1", {
                  active: isActive,
                })}
                href={item.url}
              >
                <Icon className=" fa-fw me-1" />
                {item.label}
              </Link>
            </li>
          )
        );
      })}

      <Dropdown className="nav-item">
        <DropdownToggle
          as={Link}
          className="arrow-none nav-link items-center gap-1"
          href=""
          id="dropdoanMenu"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <BsListUl className=" fa-fw me-1" />
          Dropdown <FaChevronDown size={12} className="ms-1" />
        </DropdownToggle>
        <DropdownMenu
          className="dropdown-menu"
          aria-labelledby="dropdoanMenu"
          renderOnMount
        >
          <li>
            <DropdownItem className="dropdown-item">
              Item 1
            </DropdownItem>
          </li>
          <li>
            <DropdownItem className="dropdown-item">
              Item 2
            </DropdownItem>
          </li>
        </DropdownMenu>
      </Dropdown>
    </ul>
  );
};

const AgentNavBar = () => {
  const { isOpen, toggle } = useToggle(false);

  return (
    <section className="pt-4">
      <Container>
        <Card className="rounded-3 border p-3 pb-2">
          <div className="d-sm-flex align-items-center">
            <div className="avatar avatar-xl mb-2 mb-sm-0">
              <Image alt="" className="avatar-img rounded-circle" src={avatar1} />
            </div>
            <h4 className="mb-2 mb-sm-0 ms-sm-3">
              <span className="fw-light">Hi</span> Jacqueline Miller
            </h4>
            <Link
              href="/listings/add"
              className="btn btn-sm btn-primary-soft mb-0 ms-auto flex-shrink-0"
            >
              <span className="items-center">
                <BsPlusLg className=" fa-fw me-2" />
                Add New Listing
              </span>
            </Link>
          </div>
          <button
            onClick={toggle}
            className="btn btn-primary w-100 d-block d-xl-none mt-2 items-center"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#dashboardMenu"
            aria-controls="dashboardMenu"
          >
            <BsList className="mb-1" /> Dashboard Menu
          </button>

          <div className="navbar mt-xl-3 navbar-expand-xl d-xl-block d-none">
            <AgentMenu />
          </div>

          <Offcanvas
            show={isOpen}
            onHide={toggle}
            responsive="xl"
            placement="end"
            tabIndex={-1}
            id="dashboardMenu"
          >
            <OffcanvasHeader closeButton className="border-bottom p-3">
              <OffcanvasTitle>Menu</OffcanvasTitle>
            </OffcanvasHeader>
            <OffcanvasBody className="p-3 p-xl-0">
              <Navbar expand="xl" className="navbar-expand-xl d-xl-none d-flex">
                <AgentMenu />
              </Navbar>
            </OffcanvasBody>
          </Offcanvas>
        </Card>
      </Container>
    </section>
  );
};

export default AgentNavBar;
