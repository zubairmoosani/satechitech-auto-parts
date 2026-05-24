'use client'

import { Card, CardBody, CardHeader } from "react-bootstrap";
import { tourFlightDetail } from "../../data";
import TourFlightDetailCard from "./TourFlightDetailCard";
import Link from "next/link";

const TourFlightDetail = () => {
  return (
    <Card className="border">
      <CardHeader className="border-bottom d-flex justify-content-between">
        <h5 className="mb-0">Flight Details</h5>
        <Link
          href=""
          className="btn btn-link p-0 mb-0 text-primary-hover text-reset text-decoration-underline"
        >
          View details
        </Link>
      </CardHeader>
      <CardBody>
        {tourFlightDetail.map((flight, idx) => {
          return (
            <TourFlightDetailCard
              key={idx}
              arrival={flight.arrival}
              departure={flight.departure}
              travelDuration={flight.travelDuration}
            />
          );
        })}
      </CardBody>
    </Card>
  );
};

export default TourFlightDetail;
