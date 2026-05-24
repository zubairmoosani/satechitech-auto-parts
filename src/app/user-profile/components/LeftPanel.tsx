"use client";
import avatar1 from "@/assets/images/avatar/01.jpg";
import { getUserMenuItems } from "@/helpers/menu";
import { useAuthContext } from "@/states";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Card, CardBody, OverlayTrigger, Tooltip } from "react-bootstrap";
import { BsPencilSquare } from "react-icons/bs";
import { FaSignOutAlt } from "react-icons/fa";

const LeftPanel = () => {
  const pathname = usePathname();
  const { removeSession } = useAuthContext();
  const menuItems = getUserMenuItems();

  return (
    <Card className="bg-light w-100">
      <div className="position-absolute top-0 end-0 p-3">
        <OverlayTrigger
          overlay={<Tooltip>Edit profile</Tooltip>}
          placement="top"
        >
          <span>
            <BsPencilSquare />
          </span>
        </OverlayTrigger>
      </div>
      <CardBody className="p-3">
        <div className="text-center mb-3">
          <div className="avatar avatar-xl mb-2">
            <Image
              alt=""
              className="avatar-img rounded-circle border border-2 border-white"
              src={avatar1}
            />
          </div>
          <h6 className="mb-0">Jacqueline Miller</h6>
          <Link href="" className="text-reset text-primary-hover small">
            hello@gmail.com
          </Link>
          <hr />
        </div>
        <ul className="nav nav-pills-primary-soft flex-column">
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = item.url == pathname;
            return (
              item.url &&
              Icon && (
                <li key={idx} className="nav-item">
                  <Link
                    className={clsx(
                      "nav-link items-center",
                        {active: isActive,}
                    )}
                    href={item.url}
                  >
                    <Icon className=" fa-fw me-2" />
                    {item.label}
                  </Link>
                </li>
              )
            );
          })}
          <li role="button" className="nav-item" onClick={removeSession}>
            <Link className="nav-link text-danger bg-danger-soft-hover" href="">
              <FaSignOutAlt className="me-2" />
              Sign Out
            </Link>
          </li>
        </ul>
      </CardBody>
    </Card>
  );
};

export default LeftPanel;
