import { Card, CardBody, CardHeader, Col, Row } from "react-bootstrap";
import { BsEnvelopeFill, BsHeadset } from "react-icons/bs";

import avatar9 from "@/assets/images/avatar/09.jpg";
import Image from "next/image";
import Link from "next/link";
import { roomDetailList } from "./data";

const GuestsDetail = () => {
  return (
    <>
      <Card className="shadow">
        <CardHeader className="border-bottom d-sm-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center flex-shrink-0">
            <div className="avatar avatar-lg">
              <Image
                className="avatar-img rounded-circle"
                src={avatar9}
                alt="avatar"
              />
            </div>
            <div className="ms-3">
              <h5 className="mb-0">Lori Stevens</h5>
            </div>
          </div>
          <div className="d-block d-lg-flex gap-lg-5 flex-wrap mt-3 mt-lg-0">
            <h6 className="mb-2 mb-lg-0 items-center gap-1">
              <BsEnvelopeFill className="  fa-fw me-1" />
              Email id:
              <Link href="" className="fw-normal">
                hello@gmail.com
              </Link>
            </h6>
            <h6 className="mb-0 items-center gap-1">
              <BsHeadset className=" fa-fw me-1" />
              Contact no:
              <Link href="" className="fw-normal">
                +1(404) 586-854
              </Link>
            </h6>
          </div>
        </CardHeader>
        <CardBody>
          <h5 className="mb-3">Booking History</h5>
          <div className="bg-light rounded p-3 d-none d-lg-block">
            <Row className="row-cols-6 justify-content-between g-4">
              <Col>
                <h6 className="mb-0">Room Name</h6>
              </Col>
              <Col>
                <h6 className="mb-0">Bed type</h6>
              </Col>
              <Col>
                <h6 className="mb-0">Room Floor</h6>
              </Col>
              <Col>
                <h6 className="mb-0">Book Date</h6>
              </Col>
              <Col>
                <h6 className="mb-0">Action</h6>
              </Col>
            </Row>
          </div>

          {roomDetailList.map((room, idx) => {
            return (
              <Row
                key={idx}
                className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-6 g-2 g-sm-4 align-items-md-center justify-content-between border-bottom px-2 py-4"
              >
                <Col>
                  <small className="d-block d-lg-none">Room name:</small>
                  <div className="d-flex align-items-center">
                    <div className="w-80px flex-shrink-0">
                      <Image alt="" src={room.image} className="rounded" />
                    </div>
                    <h6 className="mb-0 ms-2">{room.name}</h6>
                  </div>
                </Col>
                <Col>
                  <small className="d-block d-lg-none">Bed type:</small>
                  <h6 className="mb-0 fw-normal">{room.bedType}</h6>
                </Col>
                <Col>
                  <small className="d-block d-lg-none">Room Floor:</small>
                  <h6 className="mb-0 fw-normal">{room.roomFloor}</h6>
                </Col>
                <Col>
                  <small className="d-block d-lg-none">Book date:</small>
                  <h6 className="text-success mb-0">{room.date}</h6>
                </Col>
                <Col>
                  <Link href="" className="btn btn-sm btn-light mb-0">
                    View
                  </Link>
                </Col>
              </Row>
            );
          })}
        </CardBody>
      </Card>
    </>
  );
};

export default GuestsDetail;
