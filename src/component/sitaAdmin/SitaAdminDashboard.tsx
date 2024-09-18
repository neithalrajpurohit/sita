import { Col, Container, Row } from "react-bootstrap";
import RiskHomeCard from "../Risk/RiskHomeCard";
// import WorkInProgress from "../component/WorkInProgress";
import { SitaAdminCardData } from "../../Data/EntityCardData";
import { useEffect, useState } from "react";
import { EndPoints } from "../../helpers/ApiEndPoints";
import { axiosPrivate } from "../../helpers/ApiClient";
import {
  StyledContainer,
  BoxCard,
  BoxHeader,
  ItemContainer,
  ItemText,
} from "./SitaAdminStyles";
import { useTranslation } from "react-i18next";
import { ColorDot } from "../../pages/Admin/AdminStyles";

const SitaAdminDashboard = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    document.title = "Admin";
  }, []);

  const { TENANT_DATA_STATUS } = EndPoints;

  useEffect(() => {
    const fetchRes = async () => {
      const respFeeds = await axiosPrivate.post(TENANT_DATA_STATUS, {});
      setData(respFeeds.data.data);
    };
    fetchRes();
  }, [TENANT_DATA_STATUS]);

  return (
    <StyledContainer>
      <Container fluid>
        <Row xl={12}>
          <Col md={12} lg={9} className="p-0">
            <Row className="p-0 margin-right-10 margin-left-10">
              {SitaAdminCardData().map((e, index) => (
                <Col lg={3} key={index} className="p-point-3em">
                  <RiskHomeCard
                    cardTitle={e.cardTitle}
                    icon={e.icon}
                    link={e.link}
                    isDisable={e.isDisabled}
                  />
                </Col>
              ))}
            </Row>
          </Col>
          <Col md={12} lg={3} className="py-point-6em">
            <BoxCard>
              <BoxHeader>{t("integratedstatus").toUpperCase()}</BoxHeader>
              {data.map((e: any, index: number) => (
                <ItemContainer key={index}>
                  <ColorDot background={e.color} />
                  <ItemText>{e.title}</ItemText>
                </ItemContainer>
              ))}
            </BoxCard>
          </Col>
        </Row>
      </Container>
    </StyledContainer>
  );
};

export default SitaAdminDashboard;
