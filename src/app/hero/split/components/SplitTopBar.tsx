'use client'
import AppMenu from "@/components/AppMenu";
import Link from "next/link";
import { Container } from "react-bootstrap";

const SplitTopBar = () => {
  return (
    <nav className="navbar navbar-expand-xl navbar-divider">
      <Container className="px-0">
        <div className="navbar-collapse w-100 collapse" id="navbarCollapse2">
          <ul className="navbar-nav nav-active-line navbar-nav-scroll mx-auto">
            <li className="nav-item d-none d-xl-block">
              <Link className="nav-link" href="/hotels/home">
                Hotels
              </Link>
            </li>
            <li className="nav-item d-none d-xl-block">
              <Link className="nav-link" href="/flights/home">
                Flights
              </Link>
            </li>
            <li className="nav-item d-none d-xl-block">
              <Link className="nav-link" href="/tours/home">
                Tours
              </Link>
            </li>
            <li className="nav-item d-none d-xl-block">
              <Link className="nav-link" href="/cabs/home">
                Cabs
              </Link>
            </li>

            <AppMenu mobileMenuOpen={false} showExtraPages />
          </ul>
        </div>
      </Container>
    </nav>
  );
};

export default SplitTopBar;
