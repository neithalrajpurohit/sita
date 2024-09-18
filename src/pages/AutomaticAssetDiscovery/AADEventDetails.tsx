import React from "react";
import {
  ButtonContainer,
  MainContent,
  PageContainer,
  PageTitle,
} from "../EntityOnboarding/EntityStyles";
import { Button, Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../configureStore";
import { PageMiddleTitle } from "../../component/Entity/EntityStyles";
import {
  AADDataCard,
  AADDataCardBody,
  SingleContent,
  SingleContentLabel,
  SingleContentValue,
} from "./AADStyleComponents";

function AADEventDetails() {
  const { t } = useTranslation();
  const history = useHistory();
  const eventDetails = useSelector(
    (state: RootState) => state.AutomaticAssetDiscovery.eventDetails
  );
  return (
    <PageContainer>
      <Row lg={12} className="mt-2">
        <PageTitle>{t("automaticassetdiscovery")}</PageTitle>
      </Row>
      <Row lg={12} className="mt-4 mb-1">
        <PageMiddleTitle>{eventDetails.label}</PageMiddleTitle>
      </Row>

      <MainContent paddingBottom="0.85rem">
        <Row xs={12} className="g-2">
          <Col xs={12} lg={3}>
            {eventDetails.box_one.length > 0 && (
              <AADDataCard>
                <AADDataCardBody>
                  {eventDetails.box_one.map((record, index) => (
                    <SingleContent key={index}>
                      <SingleContentLabel>{record.label}</SingleContentLabel>
                      <SingleContentValue>{record.value}</SingleContentValue>
                    </SingleContent>
                  ))}
                </AADDataCardBody>
              </AADDataCard>
            )}
          </Col>
          <Col xs={12} lg={3}>
            {eventDetails.box_two.length > 0 && (
              <AADDataCard>
                <AADDataCardBody>
                  {eventDetails.box_two.map((record, index) => (
                    <SingleContent key={index}>
                      <SingleContentLabel>{record.label}</SingleContentLabel>
                      <SingleContentValue>{record.value}</SingleContentValue>
                    </SingleContent>
                  ))}
                </AADDataCardBody>
              </AADDataCard>
            )}
          </Col>
          <Col xs={12} lg={6}>
            {eventDetails.box_three.length > 0 && (
              <AADDataCard>
                <AADDataCardBody>
                  {eventDetails.box_three.map((record, index) => (
                    <SingleContent key={index}>
                      <SingleContentLabel>{record.label}</SingleContentLabel>
                      <SingleContentValue>{record.value}</SingleContentValue>
                    </SingleContent>
                  ))}
                </AADDataCardBody>
              </AADDataCard>
            )}
          </Col>
        </Row>
      </MainContent>

      <ButtonContainer>
        <Button
          variant="outline-secondary"
          size="sm"
          className="unfilled-btn-style"
          onClick={() => history.goBack()}
        >
          {t("previous")}
        </Button>
      </ButtonContainer>
    </PageContainer>
  );
}

export default AADEventDetails;
