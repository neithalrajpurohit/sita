import {
  PageContainer1,
  MainContent1,
  ButtonContainer,
  DisableContent,
} from "./RiskPageStyles";
import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppDispatch } from "../..";
import ActiveDirectory from "../../component/ActiveDirectory";
import LazyLoading from "../../component/LazyLoading";
import CustomModal from "../../component/Modal";
import RiskOnboardingFormBar from "../../component/Risk/RiskOnboardingFormBar";
import SecurityManagement from "../../component/Security/SecurityManagement";
import { useScreenWidthFontSize } from "../../hooks/useScreenWidthFontSize";
import {
  FetchPageResponse,
  SecurityManagementFetchPageResponse,
} from "../../store/Risk/RiskType";
import { riskOnboardingActionCreator } from "../../store/Risk/RiskOnboardingSlice";
import { RootState } from "../../configureStore";
import { useTranslation } from "react-i18next";
import { LoadingContainer } from "../GlobalStyles";

const RiskOnboardingPage = () => {
  const { t } = useTranslation();
  const baseFontSize = useScreenWidthFontSize();
  const role = useSelector(
    (state: RootState) => state.UserAuthentication?.userDetails?.user?.role
  );
  const riskState = useSelector(
    (state: RootState) => state.RiskOnBoarding.response
  );
  const riskOnBoardingState = useSelector(
    (state: RootState) => state.RiskOnBoarding
  );
  const history = useHistory();
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [currentPageStatus, setCurrentPageStatus] = useState<
    "saved" | "unsaved"
  >("saved");
  const [unsavedDataPopup, setUnsavedDataPopup] = useState({
    show: false,
    page: 1,
  });
  const [page, setPage] = useState(1);

  const subHeading = [
    `${t("ageneraloverviewaboutsecuritymanagement")}`,
    "There is an Active Directory implementation. In general, all endpoints are part of the AD implementation",
    "User Security policies",
    "Endpoint Security Controls",
    "TData Security Controls",
    "Operational Security Controls",
    "Network Security Controls",
    "Application/Software Security Controls",
  ];
  const [currentSubHeading, setCurrentSubHeading] = useState(subHeading[0]);
  const dispatch = useDispatch<AppDispatch>();

  const Arr = [
    `${t("securitymanagement")}`,
    `${t("activedirectory")}`,
    `${t("usersecurity")}`,
    `${t("endpointsecurity")}`,
    `${t("datasecurity")}`,
    `${t("operationalsecurity")}`,
    `${t("networksecurity")}`,
    `${t("softwaresecurity")}`,
  ];

  const pageStatus = useSelector((state: RootState) => {
    return state.RiskOnBoarding.pageStatus[page];
  });

  const onboardingStatus = useSelector((state: RootState) => {
    return state.RiskOnBoarding.filled;
  });

  const [selectedPageData, setSelectedPageData] = useState<
    FetchPageResponse | SecurityManagementFetchPageResponse
  >({
    page: page,
    entity_id: 1,
    screen_type: "",
    screen_id: 0,
    screen_name: "",
    page_data: [],
  });

  useEffect(() => {
    document.title = "Risk Controls";
  }, []);
  useEffect(() => {
    dispatch(riskOnboardingActionCreator.fetchRiskFormStatus()); //risk onboarding status api
  }, [page, dispatch]);

  useEffect(() => {
    if (!onboardingStatus) return;
    const currentScreenDetail =
      onboardingStatus.screen_details.all_screens.find(
        (detail) => detail.page === page
      );
    if (!currentScreenDetail) return;
    dispatch(
      riskOnboardingActionCreator.fetchPageData(currentScreenDetail.screen_id) //risk-
    )
      .unwrap()
      .then((res) => {
        setSelectedPageData(res);
      });
  }, [dispatch, page, onboardingStatus]);

  const disableNext =
    riskOnBoardingState.filled?.screen_details.screen_id === 8
      ? riskState.status === "failed" || riskState.status === ""
      : false;
  console.log(disableNext);
  const PageDisplay = () => {
    if (!onboardingStatus) return;
    if (page === 1 && !Array.isArray(selectedPageData.page_data)) {
      return (
        <SecurityManagement
          pageData={selectedPageData.page_data}
          onPageDataChange={(updatedPageData) => {
            setCurrentPageStatus("unsaved");
            setSelectedPageData({
              page: page,
              entity_id: selectedPageData.entity_id,
              page_data: updatedPageData,
              screen_type: selectedPageData.screen_type,
              screen_id: selectedPageData.screen_id,
              screen_name: selectedPageData.screen_name,
            });
          }}
        />
      );
    } else {
      return (
        <ActiveDirectory
          key={page}
          pageData={
            (Array.isArray(selectedPageData.page_data)
              ? selectedPageData.page_data
              : []) as FetchPageResponse["page_data"]
          }
          onPageDataChange={(updatedPageData) => {
            setCurrentPageStatus("unsaved");
            setSelectedPageData({
              page: page,
              entity_id: selectedPageData.entity_id,
              // @ts-ignore
              page_data: updatedPageData,
              screen_type: selectedPageData.screen_type,
              screen_id: selectedPageData.screen_id,
              screen_name: selectedPageData.screen_name,
            });
          }}
        />
      );
    }
  };

  return (
    <>
      <PageContainer1 fontSize={`${baseFontSize}px`}>
        <Row
          md={12}
          className="d-flex justify-content-center align-items-center"
        >
          <Col md={12} className={"d-none d-lg-block"}>
            {typeof onboardingStatus !== "undefined" && (
              <RiskOnboardingFormBar
                Arr={onboardingStatus.screen_details.all_screens.map(
                  (detail: any) => detail.screen_name
                )}
                currentActive={
                  onboardingStatus.screen_details.all_screens.find(
                    (detail) => detail.page === page
                  )!.screen_name
                }
                filled={disableNext ? -1 : onboardingStatus.screen_details.page}
                onClick={(clickedBar) => {
                  if (disableNext) return;

                  const clickedScreenDetail =
                    onboardingStatus.screen_details.all_screens.find(
                      (detail) => detail.screen_name === clickedBar
                    );
                  if (!clickedScreenDetail) return;
                  const clickedPageNumber = clickedScreenDetail.page;
                  if (
                    clickedPageNumber <=
                    onboardingStatus.screen_details.page + 1
                  ) {
                    if (
                      role === "ClientAdmin" &&
                      currentPageStatus === "unsaved"
                    ) {
                      setUnsavedDataPopup({
                        show: true,
                        page: clickedPageNumber,
                      });
                    } else {
                      setPage(clickedPageNumber);
                    }
                  }
                }}
              />
            )}
          </Col>
        </Row>
        <Row md={12}>
          <h5 className="col-md-12 risk-onboarding-page-riskcontrols">
            {t("riskcontrols")} ({page}) - {Arr[page - 1]}
          </h5>
        </Row>
        <Row md={12}>
          <Col md={12}>
            <h5 className="font-color font-size-point-75-rem">
              {currentSubHeading}
            </h5>
          </Col>
        </Row>
        <div className="mb-3 cop_scrollbar pe-2 w-100 risk-onboarding-main-content">
          {pageStatus?.status === "loading" ? (
            <LoadingContainer>
              <LazyLoading />
            </LoadingContainer>
          ) : (
            <>
              {role === "ClientAdmin" && (
                <MainContent1>
                  <div className="body overflow-hidden">{PageDisplay()}</div>
                </MainContent1>
              )}

              {role === "ClientUser" && (
                <DisableContent>
                  <div className="body overflow-hidden">{PageDisplay()}</div>
                </DisableContent>
              )}
            </>
          )}
        </div>
        {pageStatus?.status !== "loading" && (
          <ButtonContainer>
            {/* clientUser and not last page show close button */}
            {role === "ClientUser" && page !== Arr.length && (
              <Button
                variant="danger"
                className="btn-sm unfilled-btn-style"
                onClick={() => {
                  history.push("/RiskDashboard");
                }}
              >
                {t("close")}
              </Button>
            )}
            <Button
              variant="outline-secondary"
              className="btn-sm unfilled-btn-style"
              disabled={pageStatus?.status === "saving"}
              onClick={() => {
                if (page === 1) {
                  history.goBack();
                } else {
                  const nextPage = page - 1;
                  if (
                    role === "ClientAdmin" &&
                    currentPageStatus === "unsaved"
                  ) {
                    setUnsavedDataPopup({
                      show: true,
                      page: nextPage,
                    });
                  } else {
                    setPage(nextPage);
                  }
                }
              }}
            >
              {t("previous")}
            </Button>
            {role === "ClientAdmin" && (
              <Button
                variant="success"
                className="btn-sm unfilled-btn-style"
                disabled={pageStatus?.status === "saving"}
                onClick={() => {
                  setCurrentPageStatus("saved");
                  dispatch(
                    riskOnboardingActionCreator.updatePageData(selectedPageData)
                  );
                }}
              >
                {pageStatus?.status === "saving"
                  ? `${t("saving")}`
                  : `${t("save")}`}
              </Button>
            )}
            {role === "ClientAdmin" ? (
              // {/* clientAdmin Next and submit button */}
              <Button
                variant="outline-secondary"
                className="btn-sm unfilled-btn-style"
                disabled={pageStatus?.status === "saving" || disableNext}
                onClick={() => {
                  const nextPage = page + 1;
                  if (
                    role === "ClientAdmin" &&
                    currentPageStatus === "unsaved"
                  ) {
                    if (page === Arr.length) {
                      setUnsavedDataPopup({
                        show: true,
                        page: page,
                      });
                      setShowSubmitModal(true);
                    } else {
                      setUnsavedDataPopup({
                        show: true,
                        page: nextPage,
                      });
                    }
                  } else {
                    page === Arr.length
                      ? setShowSubmitModal(true)
                      : setPage(nextPage);
                  }
                }}
              >
                {page === Arr.length ? `${t("submit")}` : `${t("next")}`}
              </Button>
            ) : page === Arr.length ? (
              <Button
                variant="danger"
                className="btn-sm unfilled-btn-style"
                onClick={() => {
                  history.push("/RiskDashboard");
                }}
              >
                {t("close")}
              </Button>
            ) : (
              <Button
                variant="outline-secondary"
                className="btn-sm unfilled-btn-style"
                onClick={() => {
                  setPage((currPage) => currPage + 1);
                }}
              >
                {t("next")}
              </Button>
            )}
          </ButtonContainer>
        )}
        <CustomModal
          show={showSubmitModal}
          onHide={() => setShowSubmitModal(false)}
          // modalTitle="Risk controls successfully completed"
          modalBody={
            <div>
              <p>{t("riskjourneysaved")}</p>
              <div className="d-flex justify-content-end">
                <Button
                  variant="outline-secondary"
                  className="unfilled-btn-style"
                  onClick={() => {
                    history.push("/admin");
                    setShowSubmitModal(false);
                  }}
                >
                  {t("ok")}
                </Button>
              </div>
            </div>
          }
        />
        <CustomModal
          show={unsavedDataPopup.show}
          onHide={() => {
            setUnsavedDataPopup({ show: false, page: 0 });
          }}
          modalTitle={t("unsaveddata")}
          modalBody={
            <div>
              <p>{t("unsaveddatamsg")}</p>
              <div className="d-flex justify-content-end gap-1rem">
                <Button
                  variant="outline-danger"
                  className="unfilled-btn-style"
                  onClick={() => {
                    setPage(unsavedDataPopup.page);
                    setUnsavedDataPopup({
                      show: false,
                      page: 0,
                    });
                    setCurrentPageStatus("saved");
                  }}
                >
                  {t("no")}
                </Button>
                <Button
                  variant="outline-success"
                  className="unfilled-btn-style"
                  onClick={() => {
                    setUnsavedDataPopup({
                      show: false,
                      page: 0,
                    });
                    dispatch(
                      riskOnboardingActionCreator.updatePageData(
                        selectedPageData
                      )
                    ).then(() => {
                      setPage(unsavedDataPopup.page);
                    });
                    setCurrentPageStatus("saved");
                  }}
                >
                  {t("yes")}
                </Button>
              </div>
            </div>
          }
        />
      </PageContainer1>
    </>
  );
};

export default RiskOnboardingPage;

// const Container = styled.div`
//   background-color: var(--entityonboarding-bg-color);
//   color: var(--entityonboarding-text-color);
//   width: 100%;
// `;
