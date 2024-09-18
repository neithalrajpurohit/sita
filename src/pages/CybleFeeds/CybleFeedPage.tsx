import { PageContainer } from "../Risk/RiskPageStyles";
import { DateToStringForDashboardCards } from "../../utils/Common";
import {
  HiOutlineIdentification,
  HiOutlineFlag,
  HiOutlineBellAlert,
} from "react-icons/hi2";
import {
  BoderBox,
  ContentContainer,
  DateContainer,
  Dates,
  DesContent,
  DescriptionContainer,
  HeaderContainer,
  SubHeaderContainer,
  SubTitles,
  TitleContainer,
} from "./CyblesStyles";
import { useSelector } from "react-redux";
import { RootState } from "../../configureStore";
import { useTranslation } from "react-i18next";

function CybleFeedPage() {
  const selectedId = useSelector(
    (state: RootState) => state.Dashboard.selectedCybleId
  );
  const data = useSelector((state: RootState) => state.Dashboard.cybledata);
  const currentData = data.find((f) => f.id === selectedId);
  const { t } = useTranslation();

  const dataSet = [
    {
      // `${t("actions")}`
      title: `${t("description")}:`,
      data: currentData?.description,
    },
    {
      title: `${t("impactedcountries")}:`,
      data: currentData?.impacted_countries,
    },
    {
      title: `${t("impactedorganizations")}:`,
      data: currentData?.impacted_organizations,
    },
    {
      title: `${t("impactedregions")}:`,
      data: currentData?.impacted_regions,
    },
    {
      title: `${t("industrytypes")}:`,
      data: currentData?.industry_types,
    },
    {
      title: `${t("relatedwebsites")}:`,
      data: currentData?.related_websites,
    },
    {
      title: `${t("tags")}:`,
      data: currentData?.tags,
    },
  ];

  const AlertData = [
    {
      icon: <HiOutlineFlag color={currentData?.severity?.color} />,
      title: `${t("severity")}:`,
      value: currentData?.severity?.value,
      color: currentData?.severity?.color,
    },
    {
      icon: <HiOutlineBellAlert color={currentData?.status?.color} />,
      title: `${t("status")}:`,
      value: currentData?.status?.value,
      color: currentData?.status?.color,
    },
    {
      icon: <HiOutlineIdentification color={currentData?.alert_id?.color} />,
      title: `${t("alertid")}:`,
      value: currentData?.alert_id?.value,
      color: currentData?.alert_id?.color,
    },
  ];

  return (
    <PageContainer>
      <HeaderContainer>
        <TitleContainer>{currentData?.title}</TitleContainer>
      </HeaderContainer>
      <SubHeaderContainer>
        {AlertData.map((alert, index) => (
          <BoderBox key={index} color={alert.color}>
            {alert.icon}
            {alert.title}&nbsp;&nbsp;{alert.value}
          </BoderBox>
        ))}
      </SubHeaderContainer>
      <ContentContainer>
        {dataSet.map((set: any, index) => {
          if (
            set.title === "Impacted Countries:" ||
            set.title === "Paises impactados:"
          ) {
            return (
              <DescriptionContainer key={index}>
                <SubTitles>{set?.title}</SubTitles>
                <DesContent>{set?.data?.join(" , ")}</DesContent>
              </DescriptionContainer>
            );
          } else if (
            set.title === "Impacted Organizations:" ||
            set.title === "Organizaciones impactadas:"
          ) {
            return (
              <DescriptionContainer key={index}>
                <SubTitles>{set?.title}</SubTitles>
                <DesContent>{set?.data?.join(" , ")}</DesContent>
              </DescriptionContainer>
            );
          } else if (
            set.title === "Impacted Regions:" ||
            set.title === "Regiones impactadas:"
          ) {
            return (
              <DescriptionContainer key={index}>
                <SubTitles>{set?.title}</SubTitles>
                <DesContent>{set?.data?.join(" , ")}</DesContent>
              </DescriptionContainer>
            );
          } else if (
            set.title === "Industry Types:" ||
            set.title === "Industrias impactadas:"
          ) {
            return (
              <DescriptionContainer key={index}>
                <SubTitles>{set?.title}</SubTitles>
                <DesContent>{set?.data?.join(" , ")}</DesContent>
              </DescriptionContainer>
            );
          } else if (
            set.title === "Related Websites:" ||
            set.title === "Sitios Web relacionados:"
          ) {
            return (
              <DescriptionContainer key={index}>
                <SubTitles>{set?.title}</SubTitles>
                <DesContent>{set?.data?.join(" , ")}</DesContent>
              </DescriptionContainer>
            );
          } else if (set.title === "Tags:" || set.title === "Etiquetas:") {
            return (
              <DescriptionContainer key={index}>
                <SubTitles>{set?.title}</SubTitles>
                <DesContent>{set?.data?.join(" , ")}</DesContent>
              </DescriptionContainer>
            );
          } else {
            return (
              <DescriptionContainer key={index}>
                <SubTitles>{set?.title}</SubTitles>
                <DesContent>{set?.data}</DesContent>
              </DescriptionContainer>
            );
          }
        })}
      </ContentContainer>
      <DateContainer>
        <Dates>
          {t("createdat")}:&nbsp;&nbsp;
          {DateToStringForDashboardCards(currentData?.created_at)}
        </Dates>
        <Dates>
          {t("publishedat")}:&nbsp;&nbsp;
          {DateToStringForDashboardCards(currentData?.published_date)}
        </Dates>
      </DateContainer>
    </PageContainer>
  );
}

export default CybleFeedPage;
