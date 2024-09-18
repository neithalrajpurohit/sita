import moment from "moment";
import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppDispatch } from "..";
import { addEditAnalysisActionCreator } from "../store/AddEdits/AddEditPerspectiveSlice";
import { AnalysisDetailsActionCreator } from "../store/Perspective/PerspectiveDetailSlice";
import { PerspectiveActionCreator } from "../store/Perspective/PerspectiveGridSlice";
import { RootState } from "../configureStore";
import {
  ButtonContainer,
  FunctionContainer,
  FunctionListContainer,
  StyledParentDiv,
  StyledTable,
} from "./GlobalComponentStyles";
import { useTranslation } from "react-i18next";
import DashboardCard from "./DashboardCard";
import { DFG } from "../utils/Common";
import NoDataAvailable from "./reuseableComp/NoDataAvailable";

interface Props {
  id?: string;
}
const AnalysisCard = ({ id }: Props) => {
  const { t } = useTranslation();
  const fromDate = useSelector((state: RootState) => state.Dashboard.fromDate);
  const toDate = useSelector((state: RootState) => state.Dashboard.toDate);

  const data = useSelector(
    (state: RootState) => state.Dashboard.data.perspective.gridData
  );
  const history = useHistory();
  const dispatch: AppDispatch = useDispatch();

  function truncate(str: string) {
    return str.length > 10 ? str.substring(0, 25) + "..." : str;
  }

  const onEyeButtonClick = (incidentId: string) => {
    dispatch(AnalysisDetailsActionCreator.getAnalysisDetailsData(incidentId))
      .then(() => dispatch(AnalysisDetailsActionCreator.updateIsPreview(false)))
      .then(() => dispatch(addEditAnalysisActionCreator.resetEditStates()))
      .then(() => history.push("/PerspectiveDetail"));
  };

  const pushToGrid = () => {
    const startDate: Date = new Date(fromDate);
    const endDate: Date = new Date(toDate);
    dispatch(PerspectiveActionCreator.getAnalysiMasterDropDownData()).then(() =>
      dispatch(
        PerspectiveActionCreator.getPerspectiveGridData({
          fromDate: moment(startDate, "DD-MM-YYYY").format("YYYY-MM-DD"),
          toDate: moment(endDate, "DD-MM-YYYY").format("YYYY-MM-DD"),
          dropdownFilters: [],
        })
      )
    );
    dispatch(
      PerspectiveActionCreator.updateSelectedDate({
        startDate: startDate,
        endDate: endDate,
      })
    ).then(() => {
      history.push(`/PerspectiveGrid`);
    });
  };

  return (
    <DashboardCard id={id} cardTitle={t("perspective").toUpperCase()}>
      <StyledParentDiv height="85%" id={id}>
        <FunctionContainer
          id={id}
          className="dashboard-perspective-advisory-card"
        >
          {data.length > 0 ? (
            <FunctionListContainer id={id}>
              <StyledTable id={id} overflowY="auto">
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
                      {t("status").toLocaleLowerCase()}
                    </th>
                    <th
                      className="text-capitalize font-weight-bold"
                      scope="col"
                    >
                      {t("date").toLocaleLowerCase()}
                    </th>
                  </tr>
                </thead>
                <tbody bg-color="#656565">
                  {data.map((item: any, index: number) => (
                    <tr
                      key={index}
                      className="dashboardRowCursor"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEyeButtonClick(item.column1);
                      }}
                    >
                      <td>{truncate(item.column5)}</td>
                      <td>{item.column6}</td>
                      <td>{DFG(item.column3)}</td>
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
            id={id}
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

export default AnalysisCard;
