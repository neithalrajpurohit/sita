import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  StyledContainer,
  BoxCard,
  BoxHeader,
  ItemContainer,
  ItemText,
  ColorDot,
} from "./AdminStyles";
import RiskHomeCard from "../../component/Risk/RiskHomeCard";
// import WorkInProgress from "../component/WorkInProgress";
import { EntityCard } from "../../Data/EntityCardData";
import { axiosPrivate } from "../../helpers/ApiClient";
import { EndPoints } from "../../helpers/ApiEndPoints";
import { RootState } from "../../configureStore";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Admin() {
  const { t } = useTranslation();
  const [data, setData] = useState<any>([]);
  const role = useSelector(
    (state: RootState) => state.UserAuthentication?.userDetails?.user?.role
  );
  useEffect(() => {
    document.title = "Admin";
  }, []);
  const history = useHistory();
  const { UPLOADED_DATA_STATUS } = EndPoints;

  useEffect(() => {
    if (role === "SitaAdmin") return;
    const fetchRes = async () => {
      const respFeeds = await axiosPrivate.post(UPLOADED_DATA_STATUS, {});
      setData(respFeeds.data.data);
    };
    fetchRes();
  }, [UPLOADED_DATA_STATUS, role]);

  return (
    <>
      {role === "SitaAdmin" ? (
        // <WorkInProgress />
        history.push(`/AddPredefFunctions`)
      ) : (
        <StyledContainer>
          <Container fluid>
            <Row xl={12} className="g-2">
              <Col md={12} lg={9}>
                <Row className="g-2">
                  {EntityCard().map((e, index) => (
                    <Col lg={4} key={index} className="mt-1">
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
              <Col md={12} lg={3}>
                <BoxCard>
                  <BoxHeader>{t("integratedstatus")}</BoxHeader>
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
      )}
    </>
  );
}

export default Admin;
