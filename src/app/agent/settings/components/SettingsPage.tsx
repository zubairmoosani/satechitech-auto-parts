'use client'
import dynamic from "next/dynamic";
import {
    Col,
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContainer,
    TabContent,
    TabPane
} from "react-bootstrap";
import { FaBell, FaCog, FaUserCircle } from "react-icons/fa";

const AccountSettings = dynamic(() => import("../components/AccountSettings"));
const NotificationSettings = dynamic(
  () => import("../components/NotificationSettings")
);
const EditProfile = dynamic(() => import("../components/EditProfile"));

const SettingsPage = () => {
  return (
    <>
      <TabContainer defaultActiveKey="1">
        <Row className="g-4">
          <Col xs={12}>
            <div className="bg-light pb-0 px-2 px-lg-0 rounded-top">
              <Nav
                className="nav nav-tabs nav-bottom-line nav-responsive border-0 nav-justified"
                role="tablist"
              >
                <NavItem>
                  <NavLink eventKey="1" className="mb-0 flex-centered">
                    <FaCog className="fa-fw me-2" />
                    Edit Profile
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink eventKey="2" className="mb-0 flex-centered">
                    <FaBell className="fa-fw me-2" />
                    Notification Settings
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink eventKey="3" className="mb-0 flex-centered">
                    <FaUserCircle className="fa-fw me-2" />
                    Account Settings
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
          </Col>
        </Row>
        <Row className="g-4">
          <Col xs={12}>
            <TabContent>
              <TabPane eventKey="1">
                <EditProfile />
              </TabPane>

              <TabPane eventKey="2">
                <NotificationSettings />
              </TabPane>

              <TabPane eventKey="3">
                <AccountSettings />
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      </TabContainer>
    </>
  );
};

export default SettingsPage;
