import { Col, Row, Stack } from "react-bootstrap";
import { SecurityPropType } from "./SecurityTypes";
import { useTranslation } from "react-i18next";
import CertificateRegulationInput from "./Inputs/CertificateRegulationInput";

const SecurityComplianceForm = (props: SecurityPropType) => {
  const { onPageDataChange, pageData } = props;
  const { t } = useTranslation();
  return (
    <div className="securityContainerStyle">
      <Row md={12}>
        <Col md={12}>
          <h1 className="securityTitleStyle">
            {t("securitycompliance").toUpperCase()}
          </h1>
        </Col>
      </Row>

      <div className="p-3">
        <Row md={12}>
          <Col md={12}>
            <h1 className="securityCompliance-wcabhbc">
              {t("wcabhbc").toUpperCase()}
            </h1>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Row md={12} className="d-flex">
              <Col md={7}>
                <h1 className="securityCompliance-rcr">{t("rcr")}</h1>
              </Col>
              <Col md={5}>
                <h1 className="securityCompliance-rcr">{t("cycles")}</h1>
              </Col>
            </Row>
            <Stack gap={1}>
              <CertificateRegulationInput
                deleted_regulation_others={
                  pageData["security_compliance"]["deleted_regulation_others"]
                }
                predefined_regulation={
                  pageData["security_compliance"]["predefined_regulation"]
                }
                regulation_others={
                  pageData["security_compliance"]["regulation_others"]
                }
                selected_regulation={
                  pageData["security_compliance"]["selected_regulation"]
                }
                onChange={(
                  selected_regulation,
                  regulation_others,
                  deleted_regulation_others
                ) => {
                  onPageDataChange({
                    ...pageData,
                    security_compliance: {
                      ...pageData["security_compliance"],
                      selected_regulation: selected_regulation,
                      regulation_others: regulation_others,
                      deleted_regulation_others: deleted_regulation_others,
                    },
                  });
                }}
              />
            </Stack>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SecurityComplianceForm;
