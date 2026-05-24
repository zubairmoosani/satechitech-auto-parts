"use client";
import SelectFormInput from "@/components/form/SelectFormInput";
import clsx from "clsx";
import Link from "next/link";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Row,
  Table,
} from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { upcomingBookings } from "../data";

const UpcomingBookings = () => {
  return (
    <Card className="border rounded-3">
      <CardHeader className="border-bottom">
        <div className="d-sm-flex justify-content-between align-items-center">
          <h5 className="mb-2 mb-sm-0">Upcoming Bookings</h5>
          <Link href="" className="btn btn-sm btn-primary mb-0">
            View All
          </Link>
        </div>
      </CardHeader>
      <CardBody>
        <Row className="g-3 align-items-center justify-content-between mb-3">
          <Col md={8}>
            <form className="rounded position-relative">
              <input
                className="form-control pe-5"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn border-0 px-3 py-0 position-absolute top-50 end-0 translate-middle-y"
                type="submit"
              >
                <FaSearch />
              </button>
            </form>
          </Col>
          <Col md={3}>
            <form>
              <SelectFormInput
                className="form-select js-choice"
                aria-label=".form-select-sm"
              >
                <option value={-1}>Sort by</option>
                <option>Free</option>
                <option>Newest</option>
                <option>Oldest</option>
              </SelectFormInput>
            </form>
          </Col>
        </Row>
        <div className="table-responsive border-0">
          <Table className="align-middle p-4 mb-0 table-hover table-shrink">
            <thead className="table-light">
              <tr>
                <th scope="col" className="border-0 rounded-start">
                  #
                </th>
                <th scope="col" className="border-0">
                  Name
                </th>
                <th scope="col" className="border-0">
                  Type
                </th>
                <th scope="col" className="border-0">
                  Date
                </th>
                <th scope="col" className="border-0">
                  status
                </th>
                <th scope="col" className="border-0">
                  Payment
                </th>
                <th scope="col" className="border-0 rounded-end">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="border-top-0">
              {upcomingBookings.map((booking, idx) => {
                return (
                  <tr key={idx}>
                    <td>
                      <h6 className="mb-0">{booking.id}</h6>
                    </td>
                    <td>
                      <h6 className="mb-0">
                        <Link href="">{booking.name}</Link>
                      </h6>
                    </td>
                    <td> {booking.type} </td>
                    <td> {booking.date} </td>
                    <td>
                      <div
                        className={clsx(
                          "badge",
                          booking.status == "Reserved"
                            ? "text-bg-info"
                            : "text-bg-success"
                        )}
                      >
                        {booking.status}
                      </div>
                    </td>
                    <td>
                      <div
                        className={clsx(
                          "badge bg-opacity-10",
                          booking.payment == "On Property"
                            ? "bg-warning text-warning"
                            : booking.payment == "Half Payment"
                              ? "bg-info text-info"
                              : "bg-success text-success"
                        )}
                      >
                        {booking.payment}
                      </div>
                    </td>
                    <td>
                      <Link href="" className="btn btn-sm btn-light mb-0">
                        View
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <div className="d-sm-flex justify-content-sm-between align-items-sm-center">
          <p className="mb-sm-0 text-center text-sm-start">
            Showing 1 to 8 of 20 entries
          </p>
          <nav
            className="mb-sm-0 d-flex justify-content-center"
            aria-label="navigation"
          >
            <ul className="pagination pagination-sm pagination-primary-soft mb-0">
              <li className="page-item disabled">
                <Link className="page-link" href="" tabIndex={-1}>
                  Prev
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" href="">
                  1
                </Link>
              </li>
              <li className="page-item active">
                <Link className="page-link" href="">
                  2
                </Link>
              </li>
              <li className="page-item disabled">
                <Link className="page-link" href="">
                  ..
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" href="">
                  15
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" href="">
                  Next
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </CardFooter>
    </Card>
  );
};

export default UpcomingBookings;
