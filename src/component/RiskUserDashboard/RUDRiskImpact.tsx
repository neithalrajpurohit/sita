import { useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../configureStore";
import { GeneralDashboardRow, RiskBugdetValue } from "../GlobalComponentStyles";
import ReusableCard from "../reuseableComp/ReusableCard";
import RUDBarChart from "./RUDCharts/RUDBarChart";
import RUDPieChart from "./RUDCharts/RUDPieChart";
import RUDCustomMenu from "./RUDCustomMenu";
import {
  CaptureAndDownloadProps,
  captureAndDownload,
  formatLargeNumberForRiskImpact,
} from "./RUDUtils";
import {
  RUDRiskImpactColumn,
  RiskAggrTitleWithBtnContainer,
  RiskImpactChartTitle,
  StyledRiskAggrContainer,
} from "./RiskUserDashboardStyles";

function RUDRiskImpact() {
  const { t } = useTranslation();
  const chart = useSelector((state: RootState) => state.RUD.chart);
  const targetRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<any>();
  const handleDownload = (format: CaptureAndDownloadProps["format"]) => {
    captureAndDownload({ format, targetRef });
  };

  const downloadAsFile = (filetype: "csv" | "xls") => {
    switch (filetype) {
      case "csv":
        chartRef.current.chart.downloadCSV();
        break;
      case "xls":
        chartRef.current.chart.downloadXLS();
        break;
      default:
        console.log("Invalid File Type");
        break;
    }
  };

  return (
    <ReusableCard height={36.5}>
      <StyledRiskAggrContainer ref={targetRef}>
        <RiskAggrTitleWithBtnContainer>
          <RiskImpactChartTitle>
            {t("riskaggregation").toUpperCase()}
          </RiskImpactChartTitle>
          <RUDCustomMenu
            downloadAsFile={downloadAsFile}
            handleDownload={handleDownload}
          />
        </RiskAggrTitleWithBtnContainer>
        <Container fluid>
          <Row lg={12} className="g-2">
            <Col lg={12}>
              <GeneralDashboardRow lg={12} className="g-2">
                <Col
                  className="d-flex justify-content-center align-items-center flex-column"
                  xs={6}
                >
                  <RUDPieChart
                    exporting={true}
                    dynamicFont="1.25rem"
                    data={chart.inherent_risk}
                    containerMaxHeight="13rem"
                    isSmall={false}
                  />
                  <RiskBugdetValue>
                    {formatLargeNumberForRiskImpact(
                      chart.inherent_risk.budget_value
                    )}
                  </RiskBugdetValue>
                </Col>
                <Col
                  xs={6}
                  className="d-flex justify-content-center align-items-center flex-column"
                >
                  <RUDPieChart
                    exporting={true}
                    dynamicFont="1.25rem"
                    data={chart.residual_risk}
                    containerMaxHeight="13rem"
                    isSmall={false}
                  />
                  <RiskBugdetValue>
                    {formatLargeNumberForRiskImpact(
                      chart.residual_risk.budget_value
                    )}
                  </RiskBugdetValue>
                </Col>
              </GeneralDashboardRow>
            </Col>
            <RUDRiskImpactColumn lg={12} className="mt-4">
              <RUDBarChart
                ref={chartRef}
                data={{
                  ...chart.risk_aggr_bar_chart,
                  datalabels: true,
                }}
              />
            </RUDRiskImpactColumn>
          </Row>
        </Container>
      </StyledRiskAggrContainer>
    </ReusableCard>
  );
}

export default RUDRiskImpact;
