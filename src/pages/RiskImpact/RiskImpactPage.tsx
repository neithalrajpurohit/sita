import { useState, useEffect } from "react";
import {
  ButtonContainer,
  MainContent,
  PageContainer,
  PageTitle,
} from "../EntityOnboarding/EntityStyles";
import { Button, Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { PageMiddleTitle } from "../../component/Entity/EntityStyles";
import RiskImpact from "../../component/RiskImpact/RiskImpact";
import RiskImpactReview from "../../component/RiskImpact/RiskImpactReview";
import { AppDispatch } from "../../index";
import { useDispatch } from "react-redux";
import { RguPageActionCreator } from "../../store/Rgu/RguSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../configureStore";
import LazyLoading from "../../component/LazyLoading";
import { RGUData } from "../../component/RiskImpact/RiskImpactUtils";
import { RoutePath } from "../../helpers/RoutePath";
import { toast } from "react-toastify";
import CustomToggle from "../../component/reuseableComp/CustomToggle";
import {
  RiskAllCostLabel,
  RiskCustomToggleContainer,
  RiskCustomToggleLabel,
} from "./RiskImpactPageStyle";

function RiskImpactPage() {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch: AppDispatch = useDispatch();
  const [isRquestLoading, setIsRequestLoading] = useState(false);
  const [currentActive, setCurrentActive] = useState<"impact" | "review">(
    "impact"
  );

  const [showList, setShowList] = useState<"function" | "process">("function");
  const [checked, setChecked] = useState(false);

  const rguDataListArray = useSelector(
    (state: RootState) => state.Rgu.rguListData
  );
  const [rguDataList, setRguDataList] = useState<RGUData[]>(rguDataListArray);

  const isLoading = useSelector((state: RootState) => state.Rgu.isLoading);

  useEffect(() => {
    document.title = "Risk Impact";
  }, []);
  useEffect(() => {
    dispatch(RguPageActionCreator.fetchSavedRgu()).then(() => {
      dispatch(RguPageActionCreator.fetchFunctionProcessforRgu());
    });
  }, [dispatch]);

  const onChangeRguData = (data: RGUData[]) => {
    setRguDataList(data);
  };

  const saveRguData = () => {
    setIsRequestLoading(true);
    dispatch(RguPageActionCreator.addUpdateRgu(rguDataList)).then((res) => {
      toast(res.payload.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        theme: "dark",
      });
      setIsRequestLoading(false);
    });
  };
  const onReviewClick = () => {
    setIsRequestLoading(true);
    dispatch(RguPageActionCreator.addUpdateRgu(rguDataList)).then(() => {
      setIsRequestLoading(false);
      setCurrentActive("review");
    });
  };

  const handleToggle = () => {
    setChecked(!checked);
    setShowList(() => {
      if (checked) {
        return "function";
      } else {
        return "process";
      }
    });
  };

  if (isLoading) return <LazyLoading />;

  return (
    <PageContainer>
      <Row lg={12} className="mt-2">
        <PageTitle>{t("rguonboarding")}</PageTitle>
      </Row>

      {currentActive === "impact" && (
        <>
          <Row lg={12} className="mt-3 mb-1">
            <Col lg={6}>
              <PageMiddleTitle>{t("rgudefannualrevenue")}</PageMiddleTitle>
            </Col>
            <Col lg={6}>
              <RiskCustomToggleContainer>
                <RiskCustomToggleLabel
                  bold={showList === "function" ? 700 : 500}
                >
                  {t("functions").toUpperCase()}
                </RiskCustomToggleLabel>
                <CustomToggle checked={checked} onChange={handleToggle} />
                <RiskCustomToggleLabel
                  bold={showList === "process" ? 700 : 500}
                >
                  {t("processes").toUpperCase()}
                </RiskCustomToggleLabel>
              </RiskCustomToggleContainer>
            </Col>
          </Row>
          <RiskAllCostLabel className="mb-1 px-4">
            *{t("allcostsareinusd")}
          </RiskAllCostLabel>
          <MainContent>
            <RiskImpact onSave={onChangeRguData} listType={showList} />
          </MainContent>
        </>
      )}
      {currentActive === "review" && (
        <>
          <Row lg={12} className="mt-4 mb-2">
            <PageMiddleTitle>{t("review")}</PageMiddleTitle>
          </Row>
          <MainContent>
            <RiskImpactReview data={rguDataListArray} />
          </MainContent>
        </>
      )}

      <ButtonContainer>
        <Button
          variant="outline-secondary"
          size="sm"
          className="unfilled-btn-style"
          onClick={() => {
            if (currentActive === "impact") {
              history.goBack();
            } else {
              setCurrentActive("impact");
            }
          }}
        >
          {t("previous")}
        </Button>
        {currentActive === "impact" && (
          <>
            <Button
              variant="outline-secondary"
              size="sm"
              className="unfilled-btn-style"
              onClick={onReviewClick}
              disabled={isRquestLoading}
            >
              {t("review")}
            </Button>
            <Button
              variant="outline-secondary"
              size="sm"
              className="unfilled-btn-style"
              onClick={saveRguData}
              disabled={isRquestLoading}
            >
              {t("save")}
            </Button>
          </>
        )}
        {currentActive === "review" && (
          <>
            <Button
              variant="outline-secondary"
              size="sm"
              className="unfilled-btn-style"
              onClick={() => history.push(RoutePath.ADMIN)}
            >
              {t("close")}
            </Button>
          </>
        )}
      </ButtonContainer>
    </PageContainer>
  );
}

export default RiskImpactPage;
