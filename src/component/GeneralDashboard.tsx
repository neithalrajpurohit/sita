import React, { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Col, Container, Row, Dropdown, Form, Button } from "react-bootstrap";
import ReactGA from "react-ga4";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../index";
import moment from "moment";
import { DateRangePicker } from "react-date-range";
import { useSelector } from "react-redux";
import { axiosPrivate } from "../helpers/ApiClient";
import { EndPoints } from "../helpers/ApiEndPoints";
import { useThemeVal } from "../hooks/useThemeVar";
import { riskOnboardingActionCreator } from "../store/Risk/RiskOnboardingSlice";
import { RootState } from "../configureStore";
import { useMediaQuery } from "react-responsive";
import Loading from "./../component/Loading";
import {
  HiClock,
  HiOutlineArrowDownTray,
  HiOutlineCalendarDays,
  HiOutlineChevronDown,
} from "react-icons/hi2";
import { DateToString } from "../utils/Common";
import { getUserLang } from "../store/UserAuthentication/UserAuthSlice";
import {
  MuuriComponent,
  useRefresh,
  useDrag,
  getResponsiveStyle,
  muuriMap,
} from "muuri-react";
import { DashboardActionCreator } from "../store/Dashboard/DashboardSlice";
// @ts-ignore
import * as locales from "react-date-range/dist/locale";
import useTranslateCalender from "../hooks/useTranslateCalender";
import { useTranslation } from "react-i18next";
import AdvisoryCard from "./AdvisoryCard";
import { AdvisoryActionCreator } from "../store/Advisory/AdvisorySlice";
import CustomModal from "./Modal";
import { Page, Document } from "react-pdf";
import { GetRosi } from "../store/Rosi/RosiDashboardSlice";
import { isAfter } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import GeneralRosiChart from "./GeneralRosiChart";
import ReactTooltip from "react-tooltip";
import {
  OutputDataOfRingChart,
  transformDataForDualRingChart,
} from "../utils/TransformDataForDualRing";
import DualRingChart from "./highcharts/DualRingChart";
import {
  DashboardOEICard,
  DashboardOEICardContainer,
  DashboardOEICardDivider,
  DashboardOEICardSubtitle,
  DashboardOEICardTitle,
  DashboardOEICardTitleSub,
  GeneralDashboardRow,
  InsightShowShartContainer,
  RiskChartTitleContainer,
  RiskChartValueContainer,
  StyledColumn,
  StyledParentDiv,
} from "./GlobalComponentStyles";
import {
  DragComponent,
  DragMoveDiv,
  GeneralDashboardContainerMain,
  LoadingContainer,
} from "../pages/GlobalStyles";
import { formatLargeNumberForRiskImpact } from "./RiskUserDashboard/RUDUtils";

const LazyLoading = lazy(() => import("./LazyLoading"));
const DashboardBarChart = lazy(() => import("./highcharts/DashboardBarChart"));
const CustomFunelFD = lazy(() => import("./reuseableComp/CustomFunnelFD"));
const SecurityPulseDashboardComp = lazy(
  () => import("./SecurityPulseDashboardComp")
);

const AnalysisCard = lazy(() => import("./AnalysisCard"));
const DashboardCard = lazy(() => import("./DashboardCard"));
const GoogleMapCard = lazy(() => import("./GoogleMap/GoogleMapCard"));

const TrackingID = "G-93WRMTMJNM";

ReactGA.initialize(TrackingID, {
  gaOptions: {
    cookieFlags: "max-age=7200;secure;samesite=none;",
  },
});

const Risk = () => {
  const { t } = useTranslation();
  const tenantPackage = useSelector(
    (state: RootState) => state.UserAuthentication.package
  );
  const dispatch: AppDispatch = useDispatch();
  const isEnterpriseTenant = tenantPackage !== "Enterprise";
  const [overAllRiskGauge, setOverAllRiskGauge] = useState<{
    inherent_risk: {
      title: string;
      inner_value_1: string;
      inner_value_2: string;
      budget_value: string;
      colors: string[];
      data: {
        type: string;
        name: string;
        data: (number | null)[];
      }[];
    };
    residual_risk: {
      title: string;
      inner_value_1: string;
      inner_value_2: string;
      budget_value: string;
      colors: string[];
      data: {
        type: string;
        name: string;
        data: (number | null)[];
      }[];
    };
  }>({
    inherent_risk: {
      title: "",
      inner_value_1: "",
      inner_value_2: "",
      budget_value: "",
      colors: [],
      data: [],
    },
    residual_risk: {
      title: "",
      inner_value_1: "",
      inner_value_2: "",
      budget_value: "",
      colors: [],
      data: [],
    },
  });

  useEffect(() => {
    const fetchRisk = async () => {
      if (isEnterpriseTenant) {
        return;
      } else {
        const res = await axiosPrivate.post(EndPoints.GET_RISK_AGGREGATION, {
          header_filters: {
            geo_location: [],
            function: [],
            process: [],
            asset: [],
          },
        });
        if (res.data) {
          const { inherent_risk, residual_risk } = res.data;
          setOverAllRiskGauge({
            inherent_risk: inherent_risk,
            residual_risk: residual_risk,
          });
        }
      }
    };
    fetchRisk();
  }, [isEnterpriseTenant]);

  useEffect(() => {
    if (isEnterpriseTenant) {
      return;
    } else {
      dispatch(riskOnboardingActionCreator.fetchRiskFormStatus());
    }
  }, [dispatch, isEnterpriseTenant]);

  if (isEnterpriseTenant)
    return (
      <div className="risk-rosi-disabled-dashboard-container">
        <img
          src="./images/RiskImg.png"
          alt="rosiimg"
          className="risk-rosi-disabled-img"
        />
        <div className="risk-rosi-disabled-upgrade-plan-msg">
          {t("upgradeplanmsg")}
        </div>
      </div>
    );
  const outputData: OutputDataOfRingChart[] =
    transformDataForDualRingChart(overAllRiskGauge);

  return (
    <Container fluid>
      <GeneralDashboardRow lg={12} className="g-0">
        {outputData[0].name !== "" && (
          <StyledColumn xs={12}>
            <RiskChartTitleContainer>
              <RiskChartValueContainer
                color={overAllRiskGauge?.inherent_risk?.colors[1]}
              >
                {overAllRiskGauge.inherent_risk.title?.replace("%", "")}
              </RiskChartValueContainer>
              <RiskChartValueContainer
                color={overAllRiskGauge?.residual_risk?.colors[1]}
              >
                {overAllRiskGauge.residual_risk.title?.replace("%", "")}
              </RiskChartValueContainer>
            </RiskChartTitleContainer>
            <RiskChartTitleContainer>
              <RiskChartValueContainer
                color={overAllRiskGauge?.inherent_risk?.colors[1]}
              >
                {formatLargeNumberForRiskImpact(
                  overAllRiskGauge.inherent_risk.budget_value
                )}
              </RiskChartValueContainer>
              <RiskChartValueContainer
                color={overAllRiskGauge?.residual_risk?.colors[1]}
              >
                {formatLargeNumberForRiskImpact(
                  overAllRiskGauge.residual_risk.budget_value
                )}
              </RiskChartValueContainer>
            </RiskChartTitleContainer>
            <DualRingChart data={outputData} />
          </StyledColumn>
        )}
      </GeneralDashboardRow>
    </Container>
  );
};

const RosiChart = () => {
  const { t } = useTranslation();
  const RosiChartData = useSelector(
    (state: RootState) => state.RosiDashboard.rosiChartData
  );
  const tenantPackage = useSelector(
    (state: RootState) => state.UserAuthentication.package
  );
  const dispatch: AppDispatch = useDispatch();
  const isEnterpriseTenant = tenantPackage !== "Enterprise";
  useEffect(() => {
    if (isEnterpriseTenant) {
      return;
    } else {
      const payload = {
        header_filters: {
          function: [],
          process: [],
          geo_location: [],
          asset_category: [],
        },
      };
      dispatch(GetRosi(payload));
    }
  }, [dispatch, isEnterpriseTenant]);
  if (isEnterpriseTenant)
    return (
      <div className="risk-rosi-disabled-dashboard-container">
        <img
          src="./images/RosiImg.png"
          alt="rosiimg"
          className="risk-rosi-disabled-img"
        />

        <div className="risk-rosi-disabled-upgrade-plan-msg">
          {t("upgradeplanmsg")}
        </div>
      </div>
    );
  return <GeneralRosiChart data={RosiChartData} />;
};

const Item = ({
  title,
  index,
  Element,
  marker,
  hidden,
  id,
  data,
  handleShow,
  advisoryData,
  reset,
  rosiData,
}: any) => {
  const refresh = useRefresh();
  const isDragging = useDrag();

  useEffect(() => {
    setTimeout(() => {
      refresh();
    }, 900);
  }, [refresh]);

  useEffect(() => {
    refresh();
  }, [hidden, refresh]);

  const isMobile = useMediaQuery({
    query: "(max-width: 580px)",
  });

  const responsiveStyle = getResponsiveStyle({
    // We have configured Muuri component  to have virtually divided into 3 columns,
    // the width of the item will be 1 columns (minus the margin).
    columns: isMobile ? 1 / 1 : 1 / 3,
    // The margin of the item, it can be any CSS values
    // valid for the margin expressed in "px" or "%".
    // margin: "1%",
    margin: hidden ? "0" : "0.25em",
    // The width/height ratio. If you want to set a static
    // height just set the "height" option in px and remove the "ratio".
    // ratio: 1.9,
    height: isMobile ? "20rem" : "18rem",
  });
  let width: any;
  if (
    id === "alert_by_confidence" ||
    id === "rosi_chart" ||
    id === "oei" ||
    id === "dummydata1" ||
    id === "dummydata2"
  ) {
    width = "23.85%";
  } else if (id === "entity_risk" || id === "dummydata3") {
    width = "48.45%";
  } else if (id === "perspective" || id === "dummydata4") {
    width = "48.45%";
  } else if (id === "advisory" || id === "dummydata5") {
    width = "48.5%";
  } else if (
    id === "risk" ||
    id === "rosi" ||
    id === "dummydata5" ||
    id === "dummydata6"
  ) {
    width = "23.85%";
  }

  if (isMobile) {
    return (
      <DragComponent
        className={hidden ? "d-none" : "d-block"}
        position={"relative"}
        borderWidth={responsiveStyle.borderWidth}
        width={responsiveStyle.width}
        height={responsiveStyle.height}
        margin={responsiveStyle.margin}
        paddingTop={responsiveStyle.paddingTop}
      >
        <div className="item-content">
          <DragMoveDiv
            opacity={isDragging ? 1 : 1}
            transform={isDragging ? "scale(1.05)" : "scale(1)"}
            transition={"all .2s"}
          >
            {id === "advisory" || id === "dummydata5" ? (
              <StyledParentDiv height="18rem">
                <Element data={advisoryData} onClick={handleShow} />
              </StyledParentDiv>
            ) : (
              <>
                {id === "perspective" || id === "dummydata4" ? (
                  <StyledParentDiv height="18rem">
                    <Element />
                  </StyledParentDiv>
                ) : (
                  <DashboardCard
                    id={title}
                    children={
                      <StyledParentDiv height="15.5rem">
                        <Element
                          rosiData={rosiData}
                          id={title}
                          markerData={marker}
                          data={data}
                        />
                      </StyledParentDiv>
                    }
                    cardTitle={title}
                  />
                )}
              </>
            )}
          </DragMoveDiv>
        </div>
      </DragComponent>
    );
  } else {
    return (
      <DragComponent
        className={hidden ? "d-none" : "d-block"}
        position={"relative"}
        borderWidth={responsiveStyle.borderWidth}
        width={width}
        height={responsiveStyle.height}
        margin={responsiveStyle.margin}
        paddingTop={responsiveStyle.paddingTop}
      >
        <div className="item-content">
          <DragMoveDiv
            opacity={isDragging ? 1 : 1}
            transform={isDragging ? "scale(1.05)" : "scale(1)"}
            transition={"all .2s"}
          >
            {id === "advisory" || id === "dummydata5" ? (
              <StyledParentDiv height="17.75rem">
                <Element data={advisoryData} onClick={handleShow} />
              </StyledParentDiv>
            ) : (
              <>
                {id === "perspective" || id === "dummydata4" ? (
                  <StyledParentDiv height="17.75rem">
                    <Element />
                  </StyledParentDiv>
                ) : (
                  <StyledParentDiv height="17.75rem">
                    <DashboardCard
                      id={title}
                      children={
                        <Element
                          rosiData={rosiData}
                          id={title}
                          markerData={marker}
                          data={data}
                        />
                      }
                      cardTitle={title}
                    />
                  </StyledParentDiv>
                )}
              </>
            )}
          </DragMoveDiv>
        </div>
      </DragComponent>
    );
  }
};

const GeneralDashboard = () => {
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();
  const fromDate = useSelector((state: RootState) => state.Dashboard.fromDate);
  const toDate = useSelector((state: RootState) => state.Dashboard.toDate);
  const themeHook = useThemeVal("variant");
  const advisoryData = useSelector((state: RootState) => state.Advisory);
  const [showModal, setShowModal] = useState(false);

  const data = useSelector((state: RootState) => state.Dashboard.data);
  const layout: any = useSelector(
    (state: RootState) => state.Dashboard.layoutInfo
  );

  const isLoading = useSelector(
    (state: RootState) => state.Dashboard.isLoading
  );
  const selectedLang = useSelector(
    (state: RootState) => state.UserAuthentication.language
  );
  const [isShow, setIsShow] = useState(false);
  const [marker, setMaker] = useState<any>([]);
  const [dataFeed, setDataFeed] = useState<any>([]);
  const [numPages, setNumPages] = React.useState(null);

  const throttleTimeout = useRef<any>();

  const [dateRange, setDateRange] = useState([
    {
      startDate: utcToZonedTime(new Date(new Date(fromDate)), "UTC"),
      endDate: utcToZonedTime(new Date(new Date(toDate)), "UTC"),
      key: "selection",
    },
  ]);

  const [shareId, setShareId] = useState("");

  const [countClickOnDate, setCountClickOnDate] = useState(0);

  useEffect(() => {
    dispatch(DashboardActionCreator.FetchLayout({ page: "dashboard" })); // uncomment
  }, [dispatch]);

  useEffect(() => {
    const sendRequestForChartData = () => {
      setCountClickOnDate(0);
      setIsShow(false);
      dispatch(
        DashboardActionCreator.FetchDashboardPageData({
          fromDate: fromDate,
          toDate: toDate,
        })
      );
      dispatch(
        AdvisoryActionCreator.FetchAdvisoryData({
          start_date: fromDate,
          end_date: toDate,
        })
      );
    };
    sendRequestForChartData();
  }, [dispatch, fromDate, toDate]);

  useEffect(() => {
    dispatch(getUserLang());
  });
  useEffect(() => {
    ReactGA.send(window.location.pathname + window.location.search);
  });

  const { LOCATIONS, DASHBOARD_GRID_DATA } = EndPoints;

  useEffect(() => {
    const fetchRes = async () => {
      const respFeeds = await axiosPrivate.post(LOCATIONS, {});
      setMaker(respFeeds.data);
    };
    fetchRes();
  }, [LOCATIONS]);

  useEffect(() => {
    const fetchRes = async () => {
      const respFeeds = await axiosPrivate.post(DASHBOARD_GRID_DATA, {});
      setDataFeed(respFeeds.data);
    };
    fetchRes();
  }, [DASHBOARD_GRID_DATA]);

  const exampleMapStyles = [
    {
      // featureType: "geometry",
      elementType: "geometry",
      stylers: [{ color: useThemeVal("geometry") }],
    },
    {
      featureType: "water",
      // elementType: "water",

      stylers: [
        {
          color: useThemeVal("water"),
        },
      ],
    },
  ];

  interface LayoutProps {
    page: string;
    layoutInformation: [{ id: string; hidden: boolean; position: number }];
  }
  // Updated Code
  // Updated Code
  useEffect(() => {
    let layoutInfo: any = sessionStorage.getItem("dashboardlayout");

    if (layoutInfo) {
      let updatedLayout: any = [...dashbordCards];
      layoutInfo = JSON.parse(layoutInfo) as LayoutProps;
      layoutInfo.layoutInformation.map((item: any) => {
        const findCard = dashbordCards.find((card) => card.id === item.id);
        if (item.hidden && findCard) {
          findCard.hidden = true;
        } else if (findCard) {
          findCard.hidden = false;
        }
        updatedLayout[item.position] = findCard;
        return null;
      });
      setDashboardCards(updatedLayout);
    } else {
      let updatedLayout: any = [...dashbordCards];

      if (layout?.page) {
        updatedLayout.forEach((prevCard: any, index: number) => {
          let currentCard = layout.layoutInformation.find(
            (card: any) => card.id === prevCard.id
          );
          if (currentCard) {
            updatedLayout[index].hidden = currentCard.hidden;
            updatedLayout[index].position = currentCard.position;
          }
        });
        setDashboardCards(updatedLayout);
      }
    }
  }, [window.location, layout]);

  const handleBlur = (e: any) => {
    //if the element is not child element then it will call this function
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsShow(false);
      // props.handleBlurPage();
    }
  };

  const handleOnChange = (ranges: any) => {
    const countVal = countClickOnDate + 1;
    setCountClickOnDate(countVal);
    const { selection } = ranges;
    const currentDate = new Date();

    if (isAfter(selection.endDate, currentDate)) {
      // If the selected start date is in the future, replace it with today's date
      selection.endDate = currentDate;
    }
    setDateRange([selection]);
    const startDate = moment(selection.startDate).format("YYYY-MM-DD");
    const endDate = moment(selection.endDate).format("YYYY-MM-DD");

    if (
      new Date(new Date(startDate)).toDateString() !==
      new Date(new Date(endDate)).toDateString()
    ) {
      dispatch(
        DashboardActionCreator.UpdateDashboardDate({
          startDate,
          endDate,
        })
      );
    } else if (countVal % 2 === 0) {
      dispatch(
        DashboardActionCreator.UpdateDashboardDate({
          startDate,
          endDate,
        })
      );
    }
  };

  const CustomDataCard = ({ data }: any) => {
    const [showTooltip, setShowTooltip] = useState(false);
    return (
      <DashboardOEICardContainer>
        {data.oei.length > 0 &&
          data.oei.map((item: any, i: number) => (
            <React.Fragment key={i}>
              <DashboardOEICard>
                <DashboardOEICardTitle color={item.color}>
                  {item.value}
                </DashboardOEICardTitle>
                <DashboardOEICardTitleSub color={item.color}>
                  {item.units}
                </DashboardOEICardTitleSub>
                <DashboardOEICardSubtitle
                  data-tip={item.hover}
                  data-for="oei-tooltip"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  {item.name}
                </DashboardOEICardSubtitle>
              </DashboardOEICard>
              {i !== data.oei.length - 1 && <DashboardOEICardDivider />}
              {showTooltip && (
                <ReactTooltip
                  id="oei-tooltip"
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
            </React.Fragment>
          ))}
      </DashboardOEICardContainer>
    );
  };
  const [reset, setReset] = useState(false);
  const AlertByConfidence = ({ data }: any) => {
    return <DashboardBarChart data={data.insight as any} />;
  };
  const EntityRiskCard = ({ markerData }: any) => {
    return <GoogleMapCard mapstyle={exampleMapStyles} data={markerData} />;
  };

  const [dashbordCards, setDashboardCards] = useState([
    {
      title: `${t("alertbyconfidence").toUpperCase()}`,
      Element: AlertByConfidence,
      id: "alert_by_confidence",
      position: 0,
      hidden: false,
    },
    {
      title: `${t("operationalefficiencyindex").toUpperCase()}`,
      Element: CustomDataCard,
      id: "oei",
      position: 1,
      hidden: false,
    },
    {
      title: `${t("geographicallocations").toUpperCase()}`,
      Element: EntityRiskCard,
      id: "entity_risk",
      hidden: false,
      position: 2,
    },
    {
      title: `${t("perspective").toUpperCase()}`,
      Element: AnalysisCard,
      id: "perspective",
      position: 3,
      hidden: false,
    },
    {
      title: `${t("risk").toUpperCase()}`,
      Element: Risk,
      id: "risk",
      position: 4,
      hidden: false,
    },
    {
      title: `${t("rosi").toUpperCase()}`,
      Element: RosiChart,
      id: "rosi",
      position: 5,
      hidden: false,
    },
    {
      title: `${t("advisory").toUpperCase()}`,
      Element: AdvisoryCard,
      id: "advisory",
      position: 6,
      hidden: true,
    },
  ]);

  let dropDownItems = [
    {
      title: `${t("alertbyconfidence").toUpperCase()}`,
      id: "alert_by_confidence",
    },
    {
      title: `${t("operationalefficiencyindex").toUpperCase()}`,
      id: "oei",
    },
    {
      title: `${t("geographicallocations").toUpperCase()}`,
      id: "entity_risk",
    },
    {
      title: `${t("perspective").toUpperCase()}`,
      id: "perspective",
    },
    {
      title: `${t("risk").toUpperCase()}`,
      id: "risk",
    },
    {
      title: `${t("rosi").toUpperCase()}`,
      id: "rosi",
    },
    {
      title: `${t("advisory").toUpperCase()}`,
      id: "advisory",
    },
  ];

  const apiWithThrottle = () => {
    // fetch layout info from localstorage
    // it is guranteed that localstorage is populated with current layoutInfo
    let savedLayout = sessionStorage.getItem("dashboardlayout");
    if (savedLayout) {
      savedLayout = JSON.parse(savedLayout);

      if (throttleTimeout.current) {
        clearTimeout(throttleTimeout.current);
      }

      // take only last api call
      throttleTimeout.current = setTimeout(() => {
        dispatch(DashboardActionCreator.UpdateLayout(savedLayout));
      }, 2000);
    }
  };

  const toggleChartVisibility = (id: string, index: number) => {
    const updatedLayout: any = [...dashbordCards];

    const cardToToggle = updatedLayout.find((card: any) => card.id === id);
    const cardToToggleIndex = updatedLayout.findIndex(
      (card: any) => card.id === id
    );

    const visibleCards = updatedLayout.filter((card: any) => !card.hidden);
    if (visibleCards.length >= 6 && cardToToggle.hidden === true) {
      return alert(t("only6chartsshouldbevisible"));
    }

    if (cardToToggle) {
      updatedLayout[cardToToggleIndex].hidden = !cardToToggle.hidden;
    }

    setDashboardCards(updatedLayout);

    const layoutInfo = updatedLayout.map((cardItem: any) => {
      return {
        id: cardItem.id,
        hidden: cardItem.hidden,
        position: cardItem.position,
      };
    });
    const dataToSave = {
      page: "dashboard",
      layoutInformation: layoutInfo,
    };
    sessionStorage.setItem("dashboardlayout", JSON.stringify(dataToSave));
    apiWithThrottle();
  };
  const downloadPDF = () => {
    const linkSource = `data:application/pdf;base64,${advisoryData?.pdfData}`;
    const downloadLink = document.createElement("a");
    const fileName = "downloaded_pdf.pdf";

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  };

  const handleClose = () => {
    setShowModal(false);
  };
  const handleShow = (advisoryId: string) => {
    dispatch(AdvisoryActionCreator.GeAdvisoryPdf({ id: advisoryId }))
      .unwrap()
      .then(() => {
        setShowModal(true);
      });
  };

  const onDocumentLoadSuccess = ({ numPages }: any) => {
    setNumPages(numPages);
  };
  const children = dashbordCards.map((item, i) => (
    <Item
      key={item.id}
      index={i}
      {...item}
      marker={marker}
      data={data}
      reset={reset}
      advisoryData={advisoryData}
      handleShow={handleShow}
    />
  ));

  useTranslateCalender(isShow);

  const resetHandler = () => {
    sessionStorage.setItem(
      "dashboardlayout",
      JSON.stringify({
        page: "dashboard",
        layoutInformation: [
          {
            id: "alert_by_confidence",
            hidden: false,
            position: 0,
          },
          {
            id: "oei",
            hidden: false,
            position: 1,
          },
          {
            id: "entity_risk",
            hidden: false,
            position: 2,
          },
          {
            id: "perspective",
            hidden: false,
            position: 3,
          },
          {
            id: "risk",
            hidden: false,
            position: 4,
          },
          {
            id: "rosi",
            hidden: false,
            position: 5,
          },
        ],
      })
    );
    setReset(!reset);
    dispatch(DashboardActionCreator.ResetLayout({ page: "dashboard" }))
      .unwrap()
      .then((res) => {
        setDashboardCards([]);
        setDashboardCards([
          {
            title: `${t("alertbyconfidence").toUpperCase()}`,
            Element: AlertByConfidence,
            id: "alert_by_confidence",
            position: 0,
            hidden: false,
          },
          {
            title: `${t("operationalefficiencyindex").toUpperCase()}`,
            Element: CustomDataCard,
            id: "oei",
            position: 1,

            hidden: false,
          },
          {
            title: `${t("geographicallocations").toUpperCase()}`,
            Element: EntityRiskCard,
            id: "entity_risk",
            hidden: false,
            position: 2,
          },
          {
            title: `${t("perspective").toUpperCase()}`,
            Element: AnalysisCard,
            id: "perspective",
            position: 3,
            hidden: false,
          },
          {
            title: `${t("risk").toUpperCase()}`,
            Element: Risk,
            id: "risk",
            position: 4,
            hidden: false,
          },
          {
            title: `${t("rosi").toUpperCase()}`,
            Element: RosiChart,
            id: "rosi",
            position: 5,
            hidden: false,
          },
          {
            title: `${t("advisory").toUpperCase()}`,
            Element: AdvisoryCard,
            id: "advisory",
            position: 6,
            hidden: true,
          },
        ]);
      });
  };

  return (
    <Container fluid className="p-0">
      {!advisoryData.isLoading ? (
        <>
          <CustomModal
            onHide={handleClose}
            show={showModal}
            modalTitle={` ${t("advisory")}  ${shareId}`}
            modalBody={
              <div className="w-100">
                <div className="d-flex justify-content-end align-items-center w-100 ">
                  <Button
                    variant={themeHook}
                    className="m-1"
                    size="sm"
                    onClick={() => downloadPDF()}
                  >
                    <HiOutlineArrowDownTray
                      className="object-fit-fill"
                      size="1.3em"
                      aria-hidden="true"
                    />
                  </Button>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  <div className="dashboard-advisory-modal">
                    <div className="d-flex justify-content-center align-items-center margin-15">
                      <Document
                        file={`data:application/pdf;base64,${advisoryData?.pdfData}`}
                        onLoadSuccess={onDocumentLoadSuccess}
                        onLoadError={(e) => console.log(e)}
                      >
                        {Array.from(new Array(numPages), (el, index) => (
                          <Page
                            key={`page_${index + 1}`}
                            pageNumber={index + 1}
                          />
                        ))}
                      </Document>
                    </div>
                  </div>
                </div>
              </div>
            }
          />
          <Suspense fallback={<div>Loading...</div>}>
            {isLoading ? (
              <LoadingContainer>
                <LazyLoading />
              </LoadingContainer>
            ) : (
              <GeneralDashboardContainerMain className="mt-2">
                <Row lg={12}>
                  <Col lg={3} className="d-flex flex-column px-10">
                    <div className="d-flex flex-column flex-wrap">
                      <span
                        onBlur={(e) => handleBlur(e)}
                        className="text-align-initial"
                      >
                        <button
                          className="btn btn-outline dateSelectorButton"
                          onClick={() => setIsShow(!isShow)}
                        >
                          <HiOutlineCalendarDays />
                          &nbsp; {t("daterange")} &nbsp;
                          <HiOutlineChevronDown />
                        </button>
                        <div className="shadow-lg date-range-chartHeader-oei">
                          {isShow && (
                            <DateRangePicker
                              ranges={dateRange}
                              onChange={handleOnChange}
                              maxDate={moment().toDate()}
                              locale={locales[selectedLang]}

                              // open={bothDatesSelected ? false : true}
                            />
                          )}
                        </div>
                      </span>
                    </div>
                    <span className="my-2 dateRangeInsightOEI">
                      <HiClock fontSize="1.05rem" />
                      {t("from")} : {DateToString(fromDate, selectedLang)}{" "}
                      {t("to")} : {DateToString(toDate, selectedLang)} (UTC)
                    </span>
                    <StyledParentDiv paddingBottom="5rem" paddingTop="5rem">
                      <CustomFunelFD data={data.funnel} />
                    </StyledParentDiv>
                  </Col>

                  <Col lg={9}>
                    <>
                      <InsightShowShartContainer className="mb-2">
                        <Dropdown data-bs-theme="dark">
                          <Dropdown.Toggle
                            className="btn btn-outline insight-oei-dropdown-toggle"
                            id="dropdown-basic"
                          >
                            {t("showcharts")}
                          </Dropdown.Toggle>

                          <Dropdown.Menu
                            className="insight-oei-dropdown-menu"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {dropDownItems.map((item, index) => {
                              let isHidden;

                              let findItem = dashbordCards.find(
                                (card) => card.id === item.id
                              );
                              if (findItem) {
                                isHidden = findItem.hidden;
                              }

                              return (
                                <Dropdown.Item
                                  href={"#" + item.id}
                                  key={item.title}
                                  className="dropDown-items background-transparent"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Form className="font-color">
                                    <Form.Check // prettier-ignore
                                      type="switch"
                                      id={"custom-switch-" + index}
                                      label={item.title}
                                      checked={!isHidden}
                                      onChange={() =>
                                        toggleChartVisibility(item.id, index)
                                      }
                                    />
                                  </Form>
                                </Dropdown.Item>
                              );
                            })}
                          </Dropdown.Menu>
                        </Dropdown>

                        <div>
                          <button
                            className="btn btn-outline hover-btn reset-layout-btn-style"
                            id="dropdown-basic"
                            onClick={() => resetHandler()}
                          >
                            {t("reset")}
                          </button>
                        </div>
                      </InsightShowShartContainer>
                      {/* <MuuriComponent */}

                      <MuuriComponent
                        dragAxis={"xy"}
                        dragEnabled
                        dragFixed
                        layoutEasing="ease-out"
                        dragSortPredicate={{
                          threshold: 50,
                          action: "swap",
                          migrateAction: "swap",
                        }}
                        layout={{
                          fillGaps: true,
                          horizontal: false,
                          alignRight: false,
                          alignBottom: false,
                          rounding: true,
                        }}
                        dragHandle={".drag_handler"}
                        dragSortHeuristics={{
                          sortInterval: 0,
                        }}
                        id={"General_Dashboard"}
                        onMount={(grid) => {
                          grid.on("dragReleaseEnd", (item) => {
                            const grid = muuriMap.get("General_Dashboard");
                            let updatedState: any = [];
                            grid?.getItems().forEach((item: any, index) => {
                              updatedState = dashbordCards.map((card) => {
                                if (card.id === item?.getProps()?.id) {
                                  card.position = index;
                                  card.hidden = item?.getProps()?.hidden;
                                }
                                return card;
                              });
                            });
                            const layoutInfo = updatedState.map(
                              (cardItem: any) => {
                                return {
                                  id: cardItem.id,
                                  hidden: cardItem.hidden,
                                  position: cardItem.position,
                                };
                              }
                            );
                            const dataToSave = {
                              page: "dashboard",
                              layoutInformation: layoutInfo,
                            };
                            setDashboardCards(updatedState);
                            sessionStorage.setItem(
                              "dashboardlayout",
                              JSON.stringify(dataToSave)
                            );
                            apiWithThrottle();
                          });
                        }}
                      >
                        {children}
                      </MuuriComponent>
                    </>
                  </Col>
                </Row>
                <Row className="border-top border-dark">
                  <SecurityPulseDashboardComp data={dataFeed} />
                </Row>
              </GeneralDashboardContainerMain>
            )}
          </Suspense>
        </>
      ) : (
        <LoadingContainer height="90vh">
          <Loading title="" width="" />
        </LoadingContainer>
      )}
    </Container>
  );
};

export default GeneralDashboard;
