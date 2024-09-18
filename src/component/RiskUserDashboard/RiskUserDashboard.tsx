import { isEqual, orderBy, sortBy, uniqBy } from "lodash";
import { useEffect, useState, useRef } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "../../configureStore";
import { RoutePath } from "../../helpers/RoutePath";
import { useThemeVal } from "../../hooks/useThemeVar";
import { AppDispatch } from "../../index";
import { riskOnboardingActionCreator } from "../../store/Risk/RiskOnboardingSlice";
import LazyLoading from "../LazyLoading";
import CustomModal from "../Modal";
import ReusableCard from "../reuseableComp/ReusableCard";
import RUDBarChart from "./RUDCharts/RUDBarChart";
import RUDGoogleMap from "./RUDCharts/RUDGoogleMap";
import RUDHeatMap from "./RUDCharts/RUDHeatMap";
import RUDHeader from "./RUDHeader";
import RUDRiskImpact from "./RUDRiskImpact";
import {
  HeatMapModalBody,
  HeatMapModalBodyEntry,
  HeatMapModalBodyListHeader,
  HeatMapModalBodyListHeaderContainer,
  HeatMapModalBodyListRow,
  HeatMapModalImpact,
  HeatmapHeaderContainer,
  HeatmapHeaderHeading,
  HeatmapHeaderHeadingNumber,
  MiniHeatMapContainer,
  RiskJourneryButtonContainer,
  RiskUserDashboardMainContainer,
  HeatMapModalBodyRow,
  MiniMapGrid,
  MiniBox,
  HeatMapModalImpactContainer,
  HeatMapModalDownloadDataIcon,
} from "./RiskUserDashboardStyles";
import { RUDActionCreator } from "../../store/RiskUserDashboard/RUDSlice";
import { RUDFilterOptions } from "./RUDTypes";
import {
  ButtonContainer,
  GoogleMapPageTitle,
  GoogleMapStyle,
} from "../GlobalComponentStyles";
import RiskLightImg from "../../assets/images/RiskLightMode.png";
import RiskDarkImg from "../../assets/images/RiskDarkMode.png";
import { useTranslation } from "react-i18next";
import { LoadingContainer } from "../../pages/GlobalStyles";
import NoDataAvailable from "../reuseableComp/NoDataAvailable";
import { MiniRiskMapColorArr } from "./RUDUtils";
import { HiDocumentArrowDown } from "react-icons/hi2";
import { downloadRiskMatrixXLSX } from "../../utils/ExportRiskMatrix";
import { IRUDChartId, IRiskCardProps, DropDownItemProps } from "./RUDTypes";
import DragItem from "./RUDCharts/RUD_DragItem";
import { MuuriComponent, muuriMap } from "muuri-react";
import { customRiskDragSortPredicate } from "../../utils/InsightCustomSort"; //TODO:

export const chartIds: IRUDChartId = {
  RUD_RISK_IMPACT: "RUDRiskImpact",
  RUD_FUNCTIONCHART: "RUDFunctionChart",
  RUD_PROCESSCHART: "RUDProcessChart",
  RUD_GEOCHART: "RUDGeoChart",
  RUD_HEATMAPCHART: "RUDHeatMapChart",
};

function RiskUserDashboard() {
  const { t } = useTranslation();
  const isLoading = useSelector((state: RootState) => state.RUD.isLoading);
  const charts = useSelector((state: RootState) => state.RUD.chart);

  const heatMapDataPoint = useSelector(
    (state: RootState) => state.RUD.heatmap_data_point
  );
  const theme = useSelector(
    (state: RootState) =>
      state.UserAuthentication.userDetails.user.theme_preference
  );
  const role = useSelector(
    (state: RootState) => state.UserAuthentication.userDetails.user.role
  );
  const selectedFilters = useSelector(
    (state: RootState) => state.RUD.header_filters
  );
  const filterOptions = useSelector(
    (state: RootState) => state.RUD.all_filter_options
  );
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const layout: any = useSelector(
    (state: RootState) => state.RiskOnBoarding.layoutInfo
  );

  const muuriRef = useRef<any>();
  const screenStatus = useSelector((state: RootState) => {
    return state.RiskOnBoarding.filled;
  });
  const [isShowModal, setIsShowModal] = useState(false);
  const [openRiskMatrixModal, setOpenRiskMatrixModal] = useState(false);

  const [filters, setFilters] = useState<RUDFilterOptions>({
    headerFilters: {
      GeoLocation: selectedFilters.geo_location,
      Function: selectedFilters.function,
      Process: selectedFilters.process,
      Asset: selectedFilters.asset,
    },
    fromDate: "",
    toDate: "",
  });
  const dropDownItems: DropDownItemProps[] = [
    {
      id: chartIds.RUD_RISK_IMPACT,
      title: `${t("riskaggregation").toUpperCase()}`,
    },
    {
      id: chartIds.RUD_FUNCTIONCHART,
      title: charts.function_chart.title,
    },
    {
      id: chartIds.RUD_PROCESSCHART,
      title: charts.process_chart.title,
    },
    {
      id: chartIds.RUD_GEOCHART,
      title: `${t("geographicallocations").toUpperCase()}`,
    },
    {
      id: chartIds.RUD_HEATMAPCHART,
      title: charts.heat_map_data.title,
    },
  ];
  let throttleTimeout = useRef<any>();

  useEffect(() => {
    dispatch(RUDActionCreator.fetchChartData(filters));
    setOpenRiskMatrixModal(false);
  }, [dispatch, filters]);

  let previousPositionX = useRef(0);

  useEffect(() => {
    dispatch(riskOnboardingActionCreator.FetchLayout({ page: "risk" }));
  }, [dispatch]);

  interface LayoutProps {
    page: string;
    layoutInformation: [{ id: string; hidden: boolean; position: number }];
  }
  const restoreLayout = (savedLayoutInfo: LayoutProps) => {
    let updatedLayout: any = [];
    savedLayoutInfo.layoutInformation.map((item) => {
      const findCard = riskCards.find((card) => card.id === item.id);
      if (item.hidden && findCard) {
        findCard.hidden = true;
      } else if (findCard) {
        findCard.hidden = false;
      }
      updatedLayout[item.position] = findCard;
    });
    setRiskCards(updatedLayout.filter(Boolean));
  };

  useEffect(() => {
    let layoutInfo: string | null | LayoutProps =
      sessionStorage.getItem("riskLayout");
    // restore layout from sessionStorage instead of making api call if layoutInfo is present
    if (layoutInfo) {
      layoutInfo = JSON.parse(layoutInfo) as LayoutProps;
      restoreLayout(layoutInfo);
    } else {
      // on inital login call the api to get the previous saved layout info and restore it
      if (layout?.page) {
        restoreLayout(layout);
      }
    }
  }, [layout, filters]);

  const getFilters = (string: "GeoLocation" | "Function" | "Process") => {
    return filterOptions[string].filter((option) => {
      return filters.headerFilters[string]
        .map((j) => j.value)
        .includes(option.value);
    });
  };

  const handleFilters = (e: any, filterType: string) => {
    setFilters((prev) => {
      const newValue = { ...prev };
      const otherFilters = Object.keys(newValue.headerFilters).reduce(
        (acc: any, key) => {
          if (key !== filterType) {
            acc[key] = [];
          }
          return acc;
        },
        {}
      );
      newValue.headerFilters = {
        ...otherFilters,
        [filterType]: [
          ...e.map((i: any) => {
            return {
              value: i.value,
              label: i.label,
            };
          }),
        ],
      };
      return newValue;
    });
  };

  const exampleMapStyles = [
    {
      elementType: "geometry",
      stylers: [{ color: useThemeVal("geometry") }],
    },
    {
      featureType: "water",
      stylers: [
        {
          color: useThemeVal("water"),
        },
      ],
    },
  ];

  const getPinsForMap = () => {
    const uniqAllLocation = uniqBy(
      charts.geo_locations.all_entity_location,
      "key"
    );
    const filteredLoc = uniqBy(
      charts.geo_locations.filtered_location.map((e) => {
        return { key: e.key };
      }),
      "key"
    );
    return uniqAllLocation.map((e) => {
      if (filteredLoc.map((c) => c.key).includes(e.key)) {
        return {
          ...e,
          filtered: true,
        };
      }
      return {
        ...e,
        filtered: false,
      };
    });
  };

  const onHide = () => {
    setIsShowModal(false);
    if (role === "ClientAdmin") {
      history.push(RoutePath.RISKONBOARDING);
    } else {
      history.push(RoutePath.DASHBOARD);
    }
  };

  const resetFilters = () => {
    setFilters({
      headerFilters: {
        GeoLocation: [],
        Function: [],
        Process: [],
        Asset: [],
      },
      fromDate: "",
      toDate: "",
    });
  };

  const modalBody = (
    <div>
      <span>
        <p>{t("riskjourneymsg")}</p>
      </span>
      <RiskJourneryButtonContainer>
        <Button
          variant="outline-secondary"
          size="sm"
          className="unfilled-btn-style"
          onClick={onHide}
        >
          {t("ok")}
        </Button>
      </RiskJourneryButtonContainer>
    </div>
  );

  const onChartClicked = (
    val: string,
    filter: "GeoLocation" | "Function" | "Process" | "Asset"
  ) => {
    const filterVal = filterOptions[filter].filter(
      (option) => option.label === val
    );

    setFilters((prev) => {
      const newValue = { ...prev };
      const otherFilters = Object.keys(newValue.headerFilters).reduce(
        (acc: any, key) => {
          if (key !== filter) {
            acc[key] = [];
          }
          return acc;
        },
        {}
      );
      newValue.headerFilters = {
        ...otherFilters,
        [filter]: isEqual(prev.headerFilters[filter], filterVal)
          ? []
          : filterVal,
      };
      return newValue;
    });
  };

  const onHeatMapClick = (data: any) => {
    dispatch(RUDActionCreator.UpdateHeatMapDataPoint({ ...data })).then(() => {
      setOpenRiskMatrixModal(true);
    });
  };

  const onHeatMapModalHide = () => {
    dispatch(RUDActionCreator.UpdateHeatMapDataPoint({})).then(() => {
      setOpenRiskMatrixModal(false);
    });
  };

  useEffect(() => {
    dispatch(riskOnboardingActionCreator.fetchRiskFormStatus()).then(() => {
      dispatch(RUDActionCreator.fetchMaterFilters());
    });
  }, [dispatch]);

  useEffect(() => {
    if (typeof screenStatus === "undefined") return;
    if (screenStatus.onboarding_completed) {
      setIsShowModal(false);
    } else {
      setIsShowModal(true);
    }
  }, [screenStatus]);

  const strArr = [
    { value: t("asset").toUpperCase() },
    { value: t("inherentrisk").toUpperCase() },
    { value: t("residualrisk").toUpperCase() },
    { value: t("cost").toUpperCase() },
    { value: t("impact").toUpperCase() },
    { value: t("probability").toUpperCase() },
  ];

  const heatMapAssetModalBody = (
    <>
      <HeatmapHeaderContainer>
        <HeatMapModalBodyListHeaderContainer>
          <HeatmapHeaderHeading>List Of Total Assets : </HeatmapHeaderHeading>
          <HeatmapHeaderHeadingNumber bgColor={heatMapDataPoint?.color}>
            {heatMapDataPoint?.count}
          </HeatmapHeaderHeadingNumber>{" "}
        </HeatMapModalBodyListHeaderContainer>

        <MiniHeatMapContainer>
          <MiniMapGrid>
            {sortBy(charts.heat_map_data?.data[0]?.data, ["y", "x"]).map(
              (record) => (
                <MiniBox
                  opacity={
                    heatMapDataPoint?.x === record.x &&
                    heatMapDataPoint?.y === record.y
                      ? 1
                      : 0.5
                  }
                  bgColor={MiniRiskMapColorArr[record.value]}
                  key={`${record.x}-${record.y}-${record.count}`}
                >
                  {record.count}
                </MiniBox>
              )
            )}
          </MiniMapGrid>
        </MiniHeatMapContainer>
      </HeatmapHeaderContainer>
      <HeatMapModalImpactContainer>
        <div>
          <HeatMapModalImpact color={heatMapDataPoint?.color}>
            {heatMapDataPoint?.xCategory?.[heatMapDataPoint?.x]} -
            {heatMapDataPoint?.yCategory?.[heatMapDataPoint?.y]} :
          </HeatMapModalImpact>
          <br />
          <sub>
            ({t("impact")} - {t("probability")})
          </sub>
        </div>
        <div>
          <HeatMapModalDownloadDataIcon>
            <button
              disabled={heatMapDataPoint?.asset_data?.length === 0}
              onClick={() =>
                downloadRiskMatrixXLSX(
                  [{ data: [{ ...heatMapDataPoint }] }],
                  heatMapDataPoint?.xCategory,
                  heatMapDataPoint?.yCategory,
                  strArr
                )
              }
              className="m-0 px-2"
            >
              <HiDocumentArrowDown fontSize="1rem" color="inherent" />
            </button>
          </HeatMapModalDownloadDataIcon>
        </div>
      </HeatMapModalImpactContainer>
      {heatMapDataPoint?.asset_data?.length > 0 ? (
        <>
          <HeatMapModalBodyListRow xs={12} className="px-2 mt-2 g-0 ">
            <Col xs={3}>
              <HeatMapModalBodyListHeader textAlign="start">
                {t("asset").toUpperCase()}
              </HeatMapModalBodyListHeader>
            </Col>
            <Col xs={3}>
              <HeatMapModalBodyListHeader textAlign="center">
                {t("inherentrisk").toUpperCase()}
              </HeatMapModalBodyListHeader>
            </Col>
            <Col xs={3}>
              <HeatMapModalBodyListHeader textAlign="center">
                {t("residualrisk").toUpperCase()}
              </HeatMapModalBodyListHeader>
            </Col>
            <Col xs={3}>
              <HeatMapModalBodyListHeader textAlign="end">
                {t("cost").toUpperCase()}
              </HeatMapModalBodyListHeader>
            </Col>
          </HeatMapModalBodyListRow>
          <HeatMapModalBody>
            {orderBy(
              heatMapDataPoint?.asset_data,
              ["residual_risk"],
              ["desc"]
            )?.map((asset: any, index: number) => (
              <HeatMapModalBodyRow
                key={asset + index}
                xs={12}
                className="px-2 py-0 g-0"
              >
                <Col xs={3}>
                  <HeatMapModalBodyEntry textAlign="start">
                    {asset.asset_name}
                  </HeatMapModalBodyEntry>
                </Col>
                <Col xs={3}>
                  <HeatMapModalBodyEntry textAlign="center">
                    {asset.inherent_risk}
                  </HeatMapModalBodyEntry>
                </Col>
                <Col xs={3}>
                  <HeatMapModalBodyEntry textAlign="center">
                    {asset.residual_risk}
                  </HeatMapModalBodyEntry>
                </Col>
                <Col xs={3}>
                  <HeatMapModalBodyEntry textAlign="end">
                    {asset.cost}
                  </HeatMapModalBodyEntry>
                </Col>
              </HeatMapModalBodyRow>
            ))}
          </HeatMapModalBody>
        </>
      ) : (
        <NoDataAvailable />
      )}
    </>
  );
  const resetHandler = async () => {
    sessionStorage.removeItem("riskLayout");
    await dispatch(
      riskOnboardingActionCreator.ResetLayout({ page: "risk" })
    ).unwrap();
    setRiskCards([]);
    setRiskCards([
      {
        id: chartIds.RUD_RISK_IMPACT,
        Element: RudRiskImpactChart,
        title: `${t("riskaggregation").toUpperCase()}`,
        hidden: false,
        position: 0,
      },
      {
        id: chartIds.RUD_FUNCTIONCHART,
        Element: RudFunctionChart,
        title: "",
        hidden: false,
        position: 1,
      },
      {
        id: chartIds.RUD_GEOCHART,
        Element: RudGeoChart,
        title: "",
        hidden: false,
        position: 2,
      },
      {
        id: chartIds.RUD_PROCESSCHART,
        Element: RudProcessChart,
        title: "",
        hidden: false,
        position: 3,
      },

      {
        id: chartIds.RUD_HEATMAPCHART,
        Element: RudHeatMapChart,
        title: "",
        hidden: false,
        position: 4,
      },
    ]);
  };
  const RudRiskImpactChart = () => {
    return <RUDRiskImpact />;
  };
  const RudFunctionChart = ({ data }: any) => {
    return (
      <ReusableCard height={18}>
        <RUDBarChart
          onChartClick={(val) => onChartClicked(val, "Function")}
          data={{ ...data, datalabels: false }}
        />
      </ReusableCard>
    );
  };
  const RudProcessChart = ({ data }: any) => {
    return (
      <ReusableCard height={18}>
        <RUDBarChart
          onChartClick={(val) => onChartClicked(val, "Process")}
          data={{ ...data, datalabels: false }}
        />
      </ReusableCard>
    );
  };

  const RudGeoChart = (data: any) => {
    return (
      <ReusableCard height={18}>
        <GoogleMapPageTitle>
          {t("geographicallocations").toUpperCase()}
        </GoogleMapPageTitle>
        <GoogleMapStyle>
          <RUDGoogleMap
            onChartClick={(val) => onChartClicked(val, "GeoLocation")}
            data={data.getPinsForMap()}
            mapstyle={exampleMapStyles}
          />
        </GoogleMapStyle>
      </ReusableCard>
    );
  };

  const RudHeatMapChart = ({ data }: any) => {
    return (
      <ReusableCard height={18}>
        <RUDHeatMap
          data={data}
          isSizeMini={false}
          onHeatMapClick={onHeatMapClick}
        />
      </ReusableCard>
    );
  };

  //state creation for risk cards
  const [riskCards, setRiskCards] = useState<IRiskCardProps[]>([
    {
      id: chartIds.RUD_RISK_IMPACT,
      Element: RudRiskImpactChart,
      title: `${t("riskaggregation").toUpperCase()}`,
      hidden: false,
      position: 0,
    },
    {
      id: chartIds.RUD_FUNCTIONCHART,
      Element: RudFunctionChart,
      title: "",
      hidden: false,
      position: 1,
    },

    {
      id: chartIds.RUD_GEOCHART,
      Element: RudGeoChart,
      title: "",
      hidden: false,
      position: 2,
    },
    {
      id: chartIds.RUD_PROCESSCHART,
      Element: RudProcessChart,
      title: "",
      hidden: false,
      position: 3,
    },
    {
      id: chartIds.RUD_HEATMAPCHART,
      Element: RudHeatMapChart,
      title: "",
      hidden: false,
      position: 4,
    },
  ]);

  const apiWithThrottle = () => {
    // fetch layout info from localstorage
    // it is guranteed that localstorage is populated with current layoutInfo
    let savedLayout = sessionStorage.getItem("riskLayout");
    if (savedLayout) {
      savedLayout = JSON.parse(savedLayout);

      if (throttleTimeout.current) {
        clearTimeout(throttleTimeout.current);
      }

      // take only last api call
      throttleTimeout.current = setTimeout(() => {
        dispatch(riskOnboardingActionCreator.UpdateLayout(savedLayout));
      }, 2000);
    }
  };

  const toggleChartVisibility = (id: string, index: number) => {
    let findHidden = riskCards.filter((card) => {
      return card.hidden ? false : true;
    });
    if (findHidden.length >= 5 && riskCards[index].hidden === true) {
      alert("only 5 cards are allowed");
    } else {
      const updatedInsightCard = riskCards.map((item) => {
        if (item.id === id) {
          if (item.hidden) {
            item.hidden = false;
          } else {
            item.hidden = true;
          }
        }
        return item;
      });

      setRiskCards(updatedInsightCard.filter(Boolean));
      let layoutInfo = updatedInsightCard.map((card: any) => {
        return { id: card.id, position: card.position, hidden: card.hidden };
      });
      const dataToSave = {
        page: "risk",
        layoutInformation: layoutInfo,
      };
      sessionStorage.setItem("riskLayout", JSON.stringify(dataToSave));
      apiWithThrottle();
    }
  };

  return (
    <RiskUserDashboardMainContainer fluid>
      <CustomModal modalBody={modalBody} show={isShowModal} onHide={onHide} />
      <CustomModal
        showCloseBtn={true}
        // modalTitle={"List Of Total Assets"}
        modalBody={heatMapAssetModalBody}
        show={openRiskMatrixModal}
        onHide={onHeatMapModalHide}
      />
      {isShowModal ? (
        <>
          {theme === "dark" ? (
            <>
              <img src={RiskDarkImg} alt="riskDarkImg" width={"100%"} />
            </>
          ) : (
            <>
              <img src={RiskLightImg} alt="riskDarkImg" width={"100%"} />
            </>
          )}
        </>
      ) : (
        <>
          <Row lg={12} className="m-2">
            <RUDHeader
              dropDownItems={dropDownItems}
              toggleChartVisibility={toggleChartVisibility}
              apiWithThrottle={apiWithThrottle}
              riskCards={riskCards}
              getFilters={getFilters}
              handleFilters={handleFilters}
              resetHandler={resetHandler}
            />
          </Row>
          <Row lg={12} className="m-1">
            <ButtonContainer className="m-0">
              <p className="font-size-point-6-rem m-0">
                * {t("singlefiltermsg")}
              </p>
              <button
                disabled={isLoading}
                className="resetFilterButton"
                onClick={resetFilters}
              >
                {t("resetfilters")}
              </button>
            </ButtonContainer>
          </Row>

          {isLoading ? (
            <LoadingContainer>
              <LazyLoading />
            </LoadingContainer>
          ) : (
            <Row lg={12} className="g-2">
              {/* <Col lg={4}> */}
              <MuuriComponent
                propsToData={(data) => {
                  return data;
                }}
                ref={muuriRef}
                forceSync
                groupIds={["RiskGrid"]}
                layoutOnResize={true}
                layoutOnInit={true}
                id="risk"
                dragAxis={"xy"}
                dragEnabled
                dragFixed
                layoutEasing="ease-out"
                dragSortPredicate={(item: any, event: DragEvent) => {
                  return customRiskDragSortPredicate(
                    item,
                    event,
                    previousPositionX,
                    chartIds
                  );
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
                onMount={(grid) => {
                  grid.on("dragReleaseEnd", (item) => {
                    const grid = muuriMap.get("risk");
                    let updatedState: any = [];
                    grid?.getItems().forEach((item: any, index) => {
                      updatedState = riskCards.map((card: any) => {
                        // TODO:
                        if (card.id === item?.getProps()?.id) {
                          card.position = index;
                          card.hidden = item?.getProps()?.hidden;
                        }
                        return card;
                      });
                    });
                    const layoutInfo = updatedState.map((cardItem: any) => {
                      return {
                        id: cardItem.id,
                        hidden: cardItem.hidden,
                        position: cardItem.position,
                      };
                    });

                    setRiskCards(updatedState.filter(Boolean));

                    const dataToSave = {
                      page: "risk",
                      layoutInformation: layoutInfo,
                    };
                    sessionStorage.setItem(
                      "riskLayout",
                      JSON.stringify(dataToSave)
                    );
                    apiWithThrottle();
                  });
                }}
              >
                {riskCards.map((item, i) => {
                  return (
                    <DragItem
                      {...item}
                      key={item.id}
                      index={i}
                      value={100}
                      total={"3.3 M"}
                      data={charts}
                      getPinsForMap={getPinsForMap}
                    />
                  );
                })}
              </MuuriComponent>
              {/* <Row lg={12} className="g-2">
                  <Col lg={12}>
                    <RUDRiskImpact />
                  </Col>
                </Row>
              </Col>
              <Col lg={4}>
                <Row lg={12} className="g-2">
                  <Col lg={12}>
                    <ReusableCard height={18}>
                      <RUDBarChart
                        onChartClick={(val) => onChartClicked(val, "Function")}
                        data={{ ...charts.function_chart, datalabels: false }}
                      />
                    </ReusableCard>
                  </Col>
                  <Col lg={12}>
                    <ReusableCard height={18}>
                      <RUDBarChart
                        onChartClick={(val) => onChartClicked(val, "Process")}
                        data={{ ...charts.process_chart, datalabels: false }}
                      />
                    </ReusableCard>
                  </Col>
                </Row>
              </Col>
              <Col lg={4}>
                <Row lg={12} className="g-2">
                  <Col lg={12}>
                    <ReusableCard height={18}>
                      <PageMiddleTitle className="geolocation-map-risk-rosi">
                        {t("geographicallocations").toUpperCase()}
                      </PageMiddleTitle>
                      <StyledParentDiv height="15.75rem" paddingTop="5px">

                        <RUDGoogleMap
                          onChartClick={(val) =>
                            onChartClicked(val, "GeoLocation")
                          }
                          data={getPinsForMap()}
                          mapstyle={exampleMapStyles}
                        />
                      </StyledParentDiv>
                    </ReusableCard>
                  </Col>
                  <Col lg={12}>
                    <ReusableCard height={18}>
                      <RUDHeatMap
                        isSizeMini={false}
                        onHeatMapClick={onHeatMapClick}
                        data={charts.heat_map_data}
                      />
                    </ReusableCard>
                  </Col>
                </Row>
              </Col> */}
              {role === "ClientAdmin" && (
                <ButtonContainer className="mt-2">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    className="unfilled-btn-style"
                    onClick={() => history.push(RoutePath.RISKONBOARDING)}
                  >
                    {t("riskcontrols")}
                  </Button>
                </ButtonContainer>
              )}
            </Row>
          )}
        </>
      )}
    </RiskUserDashboardMainContainer>
  );
}

export default RiskUserDashboard;
