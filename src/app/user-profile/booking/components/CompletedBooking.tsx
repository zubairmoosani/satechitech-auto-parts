"use client";
import element17 from "@/assets/images/element/17.svg";
import Image from "next/image";
import Link from "next/link";
import { Col, Row } from "react-bootstrap";

const CompletedBooking = () => {
  return (
    <div className="bg-mode shadow p-4 rounded overflow-hidden">
      <Row className="g-4 align-items-center">
        <Col md={9}>
          <h6>Looks like you have never booked with BOOKING</h6>
          <h4 className="mb-2">When you book your trip will be shown here.</h4>
          <Link href="/hotels/list" className="btn btn-primary-soft mb-0">
            Start booking now
          </Link>
        </Col>

        <Col md={3} className="text-end">
          <Image alt="" src={element17} className="mb-n5" />
        </Col>
      </Row>
    </div>
  );
};

export default CompletedBooking;
