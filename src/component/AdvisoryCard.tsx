import { Button } from "react-bootstrap";
import { pdfjs } from "react-pdf";

import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import {
  ButtonContainer,
  FunctionContainer,
  FunctionListContainer,
  StyledParentDiv,
} from "../component/GlobalComponentStyles";
import { DateToString } from "../utils/Common";
import { StyledTable } from "./GlobalComponentStyles";
import DashboardCard from "./DashboardCard";
import NoDataAvailable from "./reuseableComp/NoDataAvailable";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const AdvisoryCard = ({ onClick, data, id }: any) => {
  const { t } = useTranslation();

  const history = useHistory();

  function truncate(str: string) {
    return str.length > 10 ? str.substring(0, 25) + "..." : str;
  }

  const onEyeButtonClick = (advisoryid: string) => {
    onClick(advisoryid);
  };

  const pushToGrid = () => {
    history.push(`/Advisory`);
  };

  return (
    <DashboardCard id={id} cardTitle={t("advisory").toUpperCase()}>
      <StyledParentDiv height="85%" id={id}>
        <FunctionContainer
          id={id}
          className="dashboard-perspective-advisory-card"
        >
          {data.gridData.length > 0 ? (
            <FunctionListContainer id={id}>
              <StyledTable overflowY="auto">
                <thead>
                  <tr>
                    <th
                      className="text-capitalize font-weight-bold"
                      scope="col"
                    >
                      {t("title").toLocaleLowerCase()}
                    </th>
                    <th
                      className="text-capitalize font-weight-bold"
                      scope="col"
                    >
                      {t("published_date").toLocaleLowerCase()}
                    </th>
                    <th
                      className="text-capitalize font-weight-bold"
                      scope="col"
                    >
                      {t("severity").toLocaleLowerCase()}
                    </th>
                  </tr>
                </thead>
                <tbody bg-color="#656565">
                  {data.gridData.map((item: any, index: number) => (
                    <tr
                      key={index}
                      className="dashboardRowCursor"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEyeButtonClick(item.column1);
                      }}
                    >
                      <td>{truncate(item.column2)}</td>
                      <td>{DateToString(item.column3)}</td>
                      <td className="text-capitalize">{item.column4}</td>
                    </tr>
                  ))}
                </tbody>
              </StyledTable>
            </FunctionListContainer>
          ) : (
            <NoDataAvailable />
          )}
        </FunctionContainer>
        <ButtonContainer
          id={id}
          className="d-flex justify-content-end align-item-center mt-1"
        >
          <Button
            variant="outline-secondary"
            size="sm"
            className="unfilled-btn-style more-button"
            onClick={(e) => {
              e.stopPropagation();
              pushToGrid();
            }}
          >
            {t("more")}
          </Button>
        </ButtonContainer>
      </StyledParentDiv>
    </DashboardCard>
  );
};

export default AdvisoryCard;
