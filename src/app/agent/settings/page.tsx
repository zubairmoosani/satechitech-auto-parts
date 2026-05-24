import { Col, Container, Row } from "react-bootstrap";
import { BsGear } from "react-icons/bs";
import SettingsPage from "./components/SettingsPage";

const Settings = () => {
  return (
    <>
      <section className="pt-0">
        <Container className="vstack gap-4">
          <Row>
            <Col xs={12}>
              <h1 className="fs-4 mb-0 items-center gap-1">
                <BsGear className=" fa-fw me-1" />
                Settings
              </h1>
            </Col>
          </Row>
          <SettingsPage />
        </Container>
      </section>
    </>
  );
};

export default Settings;
