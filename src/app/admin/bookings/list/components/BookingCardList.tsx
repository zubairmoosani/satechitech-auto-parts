"use client";
import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import { bookingLists } from "../data";
import BookingCard from "./BookingCard";

const BookingCardList = () => {
  return (
    <>
      <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xxl-5 g-4">
        {bookingLists.map((booking, idx) => {
          return (
            <Col key={idx}>
              <BookingCard booking={booking} />
            </Col>
          );
        })}
      </Row>
      <div className="d-sm-flex justify-content-sm-between align-items-sm-center mt-4">
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
    </>
  );
};

export default BookingCardList;
