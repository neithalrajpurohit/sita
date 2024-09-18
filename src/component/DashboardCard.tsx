import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import ReactTooltip from "react-tooltip";
import {
  StyledDashboardCard,
  StyledDashboardCardBody,
  StyledDashboardCardTiTle,
} from "./GlobalComponentStyles";

interface DashboardCardProps {
  cardTitle: string;
  children: React.ReactNode;

  id?: string;
}

const DashboardCard = (props: DashboardCardProps) => {
  const { t } = useTranslation();
  const { cardTitle, children, id } = props;
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <StyledDashboardCard id={id}>
      <StyledDashboardCardTiTle
        className="drag_handler"
        id={id}
        data-tip={t("alerttooltip")}
        data-for="alert-tooltip"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {cardTitle}
      </StyledDashboardCardTiTle>
      <StyledDashboardCardBody id={id}>{children}</StyledDashboardCardBody>
      {showTooltip && id === t("alertbyconfidence").toUpperCase() && (
        <ReactTooltip
          id="alert-tooltip"
          place="top"
          type="light"
          effect="float"
          border
          textColor="var(--entityonboarding-text-color)"
          backgroundColor="var(--admin-card-bg-color)"
          borderColor="var(--entityonboarding-text-color)"
          getContent={(dataTip) => dataTip}
        />
      )}
    </StyledDashboardCard>
  );
};

export default DashboardCard;
