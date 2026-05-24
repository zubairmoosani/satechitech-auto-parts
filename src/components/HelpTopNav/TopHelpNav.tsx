"use client";
import { useScrollEvent, useToggle } from "@/hooks";
import { useAuthContext, useLayoutContext, type LayoutState } from "@/states";
import { toSentenceCase } from "@/utils";
import clsx from "clsx";
import {
    Container,
    Dropdown,
    DropdownDivider,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Navbar,
    OverlayTrigger,
    Tooltip,
} from "react-bootstrap";
import { type IconType } from "react-icons";
import {
    BsBookmarkCheck,
    BsCircleHalf,
    BsGear,
    BsHeart,
    BsInfoCircle,
    BsMoonStars,
    BsPower,
    BsSun,
} from "react-icons/bs";

import avatar1 from "@/assets/images/avatar/01.jpg";
import Image from "next/image";
import Link from "next/link";
import LogoBox from "../LogoBox";
import TopHelpMenu from "./TopHelpMenu";

type ThemeModeType = {
  theme: LayoutState["theme"];
  icon: IconType;
};

const themeModes: ThemeModeType[] = [
  {
    icon: BsSun,
    theme: "light",
  },
  {
    icon: BsMoonStars,
    theme: "dark",
  },
  {
    icon: BsCircleHalf,
    theme: "auto",
  },
];

const TopHelpNav = () => {
  const { isOpen, toggle } = useToggle();
  const { theme, updateTheme } = useLayoutContext();
  const { removeSession } = useAuthContext();
  const { scrollY } = useScrollEvent();

  return (
    <>
      <header
        className={clsx("navbar-light header-sticky", {
          "header-sticky-on": scrollY >= 400,
        })}
      >
        <Navbar expand="xl">
          <Container>
            <LogoBox />
            <button
              onClick={toggle}
              className="navbar-toggler ms-auto"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
              aria-controls="navbarCollapse"
              aria-expanded={isOpen}
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-animation">
                <span />
                <span />
                <span />
              </span>
            </button>

            <TopHelpMenu mobileMenuOpen={isOpen} />

            <Dropdown className="nav nav-item ms-2">
              <DropdownToggle
                as={Link}
                href=""
                className="arrow-none avatar avatar-sm p-0"
              >
                <Image
                  className="avatar-img rounded-2"
                  src={avatar1}
                  alt="avatar"
                />
              </DropdownToggle>
              <DropdownMenu
                align={"end"}
                className="dropdown-animation dropdown-menu-end shadow pt-3"
                aria-labelledby="profileDropdown"
                renderOnMount
              >
                <li className="px-3 mb-3">
                  <div className="d-flex align-items-center">
                    <div className="avatar me-3">
                      <Image
                        className="avatar-img rounded-circle shadow"
                        src={avatar1}
                        alt="avatar"
                      />
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
                  <DropdownItem
                    className="bg-danger-soft-hover"
                    onClick={removeSession}
                  >
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
                      const Icon = mode.icon;
                      return (
                        <OverlayTrigger
                          key={mode.theme + idx}
                          overlay={
                            <Tooltip>{toSentenceCase(mode.theme)}</Tooltip>
                          }
                        >
                          <button
                            onClick={() => updateTheme(mode.theme)}
                            type="button"
                            className={clsx(
                              "btn btn-link nav-link text-primary-hover mb-0 p-0",
                              { active: theme === mode.theme }
                            )}
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            data-bs-title="Light"
                          >
                            <Icon />
                          </button>
                        </OverlayTrigger>
                      );
                    })}
                  </div>
                </li>
              </DropdownMenu>
            </Dropdown>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default TopHelpNav;
