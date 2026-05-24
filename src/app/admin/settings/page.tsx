import { Col, Row } from "react-bootstrap";
import ActiveLogs from "./components/ActiveLogs";
import EmailNotification from "./components/EmailNotification";
import GeneralPermission from "./components/GeneralPermission";
import ModeSettings from "./components/ModeSettings";
import ProfileSettings from "./components/ProfileSettings";
import WebsiteSettings from "./components/WebsiteSettings";

const AdminSettings = () => {
  return (
    <>
      <Row>
        <Col xs={12} className="mb-4 mb-sm-5">
          <h1 className="h3 mb-0">Settings</h1>
        </Col>
      </Row>
      <Row className="g-4">
        <Col lg={6}>
          <ProfileSettings />
        </Col>

        <Col lg={6}>
          <EmailNotification />

          <GeneralPermission />
        </Col>

        <Col lg={6}>
          <ModeSettings />

          <WebsiteSettings />
        </Col>

        <ActiveLogs />
      </Row>
    </>
  );
};

export default AdminSettings;
