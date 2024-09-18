import { Col, Row } from "react-bootstrap";
import SecurityGovernance from "./SecurityGovernance";
import { RiskOnBoardingProps } from "./SecurityTypes";
import SecurityOrginazationForm from "./SecurityOrginazationForm";
import SecurityComplianceForm from "./SecurityComplianceForm";

const SecurityManagement = (props: RiskOnBoardingProps) => {
  const { pageData, onPageDataChange } = props;

  return (
    <div>
      <Row className="g-3 height-auto " md={12}>
        {/* -------SecurityGovernance--------  */}
        <Col md={6} lg={4}>
          <SecurityGovernance
            onPageDataChange={onPageDataChange}
            pageData={pageData}
          />
        </Col>

        {/* -------- SecurityOrganzationForm--------  */}

        <Col md={6} lg={5}>
          <SecurityOrginazationForm
            onPageDataChange={onPageDataChange}
            pageData={pageData}
          />
        </Col>

        {/* -------- SecurityComplianceForm--------  */}

        <Col md={6} lg={3}>
          <SecurityComplianceForm
            onPageDataChange={onPageDataChange}
            pageData={pageData}
          />
        </Col>
      </Row>
    </div>
  );
};

export default SecurityManagement;
