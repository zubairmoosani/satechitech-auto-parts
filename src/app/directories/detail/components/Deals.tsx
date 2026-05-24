'use client'
import { Col, Row } from "react-bootstrap";
import CouponCode from "./CouponCode";
import DealCard from "./DealCard";
import YourOrder from "./YourOrder";
import { directoryDeals } from "../data";

const Deals = () => {
  return (
    <Row className="g-4">
      <Col lg={8}>
        {directoryDeals.map((deal, idx) => (
          <DealCard deal={deal} key={idx} />
        ))}
      </Col>
      <Col lg={4}>
        <YourOrder />

        <CouponCode />
      </Col>
    </Row>
  );
};

export default Deals;
