import { useEffect, useState, useRef } from "react";
import { Col, Row, Button } from "react-bootstrap";
import RosiChart from "./RosiChart";
import FunctionAndAssetChart from "./FunctionAndAssetChart";
import InvestmentOptimizationChart from "./InvestmentOptimizationChart";
import TotalInvestment from "./TotalInvestment";
import LocationChart from "./LocationChart";
import Select from "react-select";
import { LoadingContainer, Overlapstyles, theme } from "../GlobalStyles";
import {
  GetRosiStatus,
  RosiActionCreator,
} from "../../store/Rosi/RosiDashboardSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../index";
import { RootState } from "../../configureStore";
import CustomModal from "../../component/Modal";
import { useHistory } from "react-router-dom";
import RosiLightImg from "../../assets/images/RosiLightImg.png";
import RosiDarkImg from "../../assets/images/RosiDarkImg.png";
import { RiskJourneryButtonContainer } from "../../component/RiskUserDashboard/RiskUserDashboardStyles";
import { useTranslation } from "react-i18next";
import { isEqual, uniqBy } from "lodash";
import LazyLoading from "../../component/LazyLoading";
import { ButtonContainer } from "../Risk/RiskPageStyles";
import { ThreatIntelStyleColumn } from "../../component/ThreatIntel/ThreatIntelStyle";
import { RosiCardProps, DropDownItemProps } from "./RosiPageType";
import { MuuriComponent, muuriMap } from "muuri-react";
import DragItem from "./RosiDragItem";
import { Dropdown, Form } from "react-bootstrap";

export const chartIds: any = {
  ROSI: "rosiChart",
  INVESTMENT_OPTIMIZATION_CHART: "investmentOptimizationChart",
  FUNCTION_CHART: "functionChart",
  ASSET_CHART: "assetChart",
  LOCATION_CHART: "location_chart",
  TOTAL_INVESTMENT: "totalInvestment",
};
const RosiPage = () => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const RosiDashboard = useSelector((state: RootState) => state.RosiDashboard);
  const charts = useSelector((state: RootState) => state.RosiDashboard.chart);
  console.log(charts, "charts");
  const selectedFilters = useSelector(
    (state: RootState) => state.RosiDashboard.header_filters
  );
  const filterOptions = useSelector(
    (state: RootState) => state.RosiDashboard.all_filter_options
  );
  const [filters, setFilters] = useState<any>({
    headerFilters: {
      GeoLocation: selectedFilters.geo_location,
      Function: selectedFilters.function,
      Process: selectedFilters.process,
      Asset: selectedFilters.asset_category,
    },
  });
  let throttleTimeout = useRef<any>();
  const layout: any = useSelector(
    (state: RootState) => state.RosiDashboard.layoutInfo
  );
  const UserAuth = useSelector((state: RootState) => state.UserAuthentication);
  const userTheme = useSelector(
    (state: RootState) =>
      state.UserAuthentication.userDetails.user.theme_preference
  );
  const [rosiCards, setRosiCards] = useState<RosiCardProps[]>([
    {
      id: chartIds.ROSI,
      Element: RosiChart,
      title: `${t("rosi").toUpperCase()}`,
      dataKey: "rosiChart",
      hidden: false,
      position: 0,
    },
    {
      id: chartIds.FUNCTION_CHART,
      Element: FunctionAndAssetChart,
      title: `${t("securityinvestmentfunction").toUpperCase()}`,
      dataKey: "functionChart",
      hidden: false,
      position: 1,
    },
    {
      id: chartIds.LOCATION_CHART,
      Element: LocationChart,
      title: `${t("locationChart").toUpperCase()}`,
      dataKey: "geoLocationChart",
      hidden: false,
      position: 2,
    },
    {
      id: chartIds.INVESTMENT_OPTIMIZATION_CHART,
      Element: InvestmentOptimizationChart,
      title: `${t("investmentoptimization").toUpperCase()}`,
      dataKey: "investmentOptimizationChart",
      hidden: false,
      position: 3,
    },
    {
      id: chartIds.ASSET_CHART,
      Element: FunctionAndAssetChart,
      title: `${t("securityinvestmentassets").toUpperCase()}`,
      dataKey: "assetChart",
      hidden: false,
      position: 4,
    },
    {
      id: chartIds.TOTAL_INVESTMENT,
      Element: TotalInvestment,
      title: `${t("totalinvestment").toUpperCase()}`,
      dataKey: "totalInvestment",
      hidden: false,
      position: 5,
    },
  ]);
  const dropDownItems: DropDownItemProps[] = [
    {
      id: chartIds.ROSI,
      title: `${t("rosi").toUpperCase()}`,
    },
    {
      id: chartIds.INVESTMENT_OPTIMIZATION_CHART,
      title: `${t("investmentoptimizationchart").toUpperCase()}`,
    },
    {
      id: chartIds.FUNCTION_CHART,
      title: `${t("securityinvestmentfunction").toUpperCase()}`,
    },
    {
      id: chartIds.ASSET_CHART,
      title: `${t("securityinvestmentassets").toUpperCase()}`,
    },
    {
      id: chartIds.LOCATION_CHART,
      title: `${t("geographicallocations").toUpperCase()}`,
    },
    {
      id: chartIds.TOTAL_INVESTMENT,
      title: `${t("totalinvestment").toUpperCase()}`,
    },
  ];
  useEffect(() => {
    document.title = "RoSI";
  }, []);

  useEffect(() => {
    dispatch(RosiActionCreator.GetDropdownFilters());
    dispatch(GetRosiStatus());
  }, [dispatch]);

  useEffect(() => {
    dispatch(RosiActionCreator.FetchLayout({ page: "rosi" }));
  }, [dispatch]);

  const muuriRef = useRef<any>();

  const resetHandler = async () => {
    sessionStorage.removeItem("rosiLayout");
    await dispatch(RosiActionCreator.ResetLayout({ page: "rosi" })).unwrap();
    setRosiCards([]);
    setRosiCards([
      {
        id: chartIds.ROSI,
        Element: RosiChart,
        title: `${t("rosi").toUpperCase()}`,
        dataKey: "rosiChart",
        hidden: false,
        position: 0,
      },
      {
        id: chartIds.FUNCTION_CHART,
        Element: FunctionAndAssetChart,
        title: `${t("securityinvestmentfunction").toUpperCase()}`,
        dataKey: "functionChart",
        hidden: false,
        position: 1,
      },
      {
        id: chartIds.LOCATION_CHART,
        Element: LocationChart,
        title: `${t("locationChart").toUpperCase()}`,
        dataKey: "geoLocationChart",
        hidden: false,
        position: 2,
      },
      {
        id: chartIds.INVESTMENT_OPTIMIZATION_CHART,
        Element: InvestmentOptimizationChart,
        title: `${t("investmentoptimization").toUpperCase()}`,
        dataKey: "investmentOptimizationChart",
        hidden: false,
        position: 3,
      },
      {
        id: chartIds.ASSET_CHART,
        Element: FunctionAndAssetChart,
        title: `${t("securityinvestmentassets").toUpperCase()}`,
        dataKey: "assetChart",
        hidden: false,
        position: 4,
      },
      {
        id: chartIds.TOTAL_INVESTMENT,
        Element: TotalInvestment,
        title: `${t("totalinvestment").toUpperCase()}`,
        dataKey: "totalInvestment",
        hidden: false,
        position: 5,
      },
    ]);
  };

  interface LayoutProps {
    page: string;
    layoutInformation: [{ id: string; hidden: boolean; position: number }];
  }

  const restoreLayout = (savedLayoutInfo: LayoutProps) => {
    let updatedLayout: any = [];
    savedLayoutInfo.layoutInformation.map((item) => {
      const findCard = rosiCards.find((card) => card.id === item.id);
      if (item.hidden && findCard) {
        findCard.hidden = true;
      } else if (findCard) {
        findCard.hidden = false;
      }
      updatedLayout[item.position] = findCard;
    });

    setRosiCards(updatedLayout.filter(Boolean));
  };

  useEffect(() => {
    let layoutInfo: string | null | LayoutProps =
      sessionStorage.getItem("rosiLayout");

    if (layoutInfo) {
      layoutInfo = JSON.parse(layoutInfo) as LayoutProps;
      // restore layout from sessionStorage instead of making api call if layoutInfo is present
      restoreLayout(layoutInfo);
    } else {
      if (layout?.page) {
        // on inital login call the api to get the previous saved layout info and restore it
        restoreLayout(layout);
      }
    }
  }, [layout, filters]);

  const resetFilters = () => {
    setFilters({
      headerFilters: {
        GeoLocation: [],
        Function: [],
        Process: [],
        Asset: [],
      },
    });
  };

  const getFilters = (string: "GeoLocation" | "Function" | "Process") => {
    return filterOptions[string].filter((option) => {
      return filters.headerFilters[string]
        .map((j: any) => j.value)
        .includes(option.value);
    });
  };

  const handleFilters = (e: any, filterType: string) => {
    setFilters((prev: any) => {
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

  const getPinsForMap = () => {
    const uniqAllLocation = uniqBy(
      charts.geoLocationChart?.all_entity_location,
      "key"
    );
    const filteredLoc = uniqBy(
      charts.geoLocationChart?.filtered_location.map((e) => {
        return { key: e.key };
      }),
      "key"
    );
    return uniqAllLocation.map((e) => {
      if (filteredLoc.map((c) => c.key)?.includes(e.key)) {
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

  const onChartClicked = (
    val: any | { id: number; title: string },
    filter: "GeoLocation" | "Function" | "Process",
    filterType?: "Function" | "Asset"
  ) => {
    if (
      filterType === "Function" ||
      filter === "GeoLocation" ||
      filter === "Process"
    ) {
      const filterVal = filterOptions[filter].filter(
        (option) => option.label === val
      );
      setFilters((prev: any) => {
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
    } else {
      // handle asset chart click
      const filterVal = [
        {
          value: val.id,
          label: val.title,
        },
      ];

      setFilters((prev: any) => {
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
          [filterType!]: isEqual(prev.headerFilters[filterType!], filterVal)
            ? []
            : filterVal,
        };
        return newValue;
      });
    }
  };

  useEffect(() => {
    dispatch(RosiActionCreator.fetchRosiChartData(filters));
  }, [dispatch, filters]);
  useEffect(() => {
    dispatch(RosiActionCreator.FetchLayout({ page: "rosi" }));
  }, [dispatch]);

  const apiWithThrottle = () => {
    // fetch layout info from localstorage
    // it is guranteed that localstorage is populated with current layoutInfo
    let savedLayout = sessionStorage.getItem("rosiLayout");
    if (savedLayout) {
      savedLayout = JSON.parse(savedLayout);

      if (throttleTimeout.current) {
        clearTimeout(throttleTimeout.current);
      }

      // take only last api call
      throttleTimeout.current = setTimeout(() => {
        dispatch(RosiActionCreator.UpdateLayout(savedLayout));
      }, 2000);
    }
  };

  const toggleChartVisibility = (id: string, index: number) => {
    let findHidden = rosiCards.filter((card) => {
      return card.hidden ? false : true;
    });
    if (findHidden.length >= 6 && rosiCards[index].hidden === true) {
      alert("only 6 cards are allowed");
    } else {
      const updatedInsightCard = rosiCards.map((item) => {
        if (item.id === id) {
          if (item.hidden) {
            item.hidden = false;
          } else {
            item.hidden = true;
          }
        }
        return item;
      });

      setRosiCards(updatedInsightCard.filter(Boolean));
      let layoutInfo = updatedInsightCard.map((card: any) => {
        return { id: card.id, position: card.position, hidden: card.hidden };
      });
      const dataToSave = {
        page: "rosi",
        layoutInformation: layoutInfo,
      };

      sessionStorage.setItem("rosiLayout", JSON.stringify(dataToSave));
      apiWithThrottle();
    }
  };
  return (
    <div>
      {!RosiDashboard.rosiStatus && !RosiDashboard.isInitial ? (
        <>
          <>
            {userTheme === "dark" ? (
              <>
                <img src={RosiDarkImg} alt="riskDarkImg" width={"100%"} />
              </>
            ) : (
              <>
                <img src={RosiLightImg} alt="riskDarkImg" width={"100%"} />
              </>
            )}
          </>
        </>
      ) : (
        <Row>
          <Row className="m-2">
            <Col xs={6} lg={2}>
              <div className="font-size-one-25-rem  font-weight-700">RoSI</div>
            </Col>

            <ThreatIntelStyleColumn xs={6} lg={2} className="ml-auto">
              <Select
                isMulti
                placeholder={t("geo")}
                isDisabled={RosiDashboard.isLoading}
                styles={Overlapstyles}
                theme={theme}
                value={getFilters("GeoLocation")}
                noOptionsMessage={({ inputValue }) =>
                  inputValue && "noresultfound"
                }
                onChange={(e) => handleFilters(e, "GeoLocation")}
                options={filterOptions.GeoLocation}
                components={{
                  DropdownIndicator: () => null,
                  IndicatorSeparator: () => null,
                }}
              />
            </ThreatIntelStyleColumn>
            <ThreatIntelStyleColumn xs={6} lg={2}>
              <Select
                isMulti
                placeholder={t("function")}
                isDisabled={RosiDashboard.isLoading}
                styles={Overlapstyles}
                theme={theme}
                noOptionsMessage={({ inputValue }) =>
                  inputValue && "noresultfound"
                }
                onChange={(e) => handleFilters(e, "Function")}
                options={filterOptions.Function}
                value={getFilters("Function")}
                components={{
                  DropdownIndicator: () => null,
                  IndicatorSeparator: () => null,
                }}
              />
            </ThreatIntelStyleColumn>
            <ThreatIntelStyleColumn xs={6} lg={2}>
              <Select
                isMulti
                placeholder={t("process")}
                isDisabled={RosiDashboard.isLoading}
                styles={Overlapstyles}
                theme={theme}
                value={getFilters("Process")}
                noOptionsMessage={({ inputValue }) =>
                  inputValue && "noresultfound"
                }
                onChange={(e) => handleFilters(e, "Process")}
                options={filterOptions.Process}
                components={{
                  DropdownIndicator: () => null,
                  IndicatorSeparator: () => null,
                }}
              />
            </ThreatIntelStyleColumn>
            <ThreatIntelStyleColumn xs={6} lg={2}>
              <Dropdown data-bs-theme="dark" className="w-100">
                <Dropdown.Toggle
                  className="insight-oei-dropdown-toggle"
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

                    let findItem = rosiCards.find(
                      (card) => card.id === item.id
                    );
                    if (findItem) {
                      isHidden = findItem.hidden;
                    }
                    return (
                      <Dropdown.Item
                        href="#/action-1"
                        key={item.id}
                        onClick={(e) => e.stopPropagation()}
                        className="dropDown-items background-transparent"
                      >
                        <Form className="font-color">
                          <Form.Check // prettier-ignore
                            type="switch"
                            id={item.title}
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
            </ThreatIntelStyleColumn>
            <ThreatIntelStyleColumn xs={6} lg={1}>
              {/* <div> */}
              <button
                className="btn btn-outline hover-btn reset-layout-btn-style"
                id="dropdown-basic"
                onClick={() => resetHandler()}
              >
                {t("reset")}
              </button>
              {/* </div> */}
            </ThreatIntelStyleColumn>

            <Row lg={12} className="m-1">
              <ButtonContainer className="m-0">
                <p className="font-size-point-6-rem m-0">
                  * {t("singlefiltermsg")}
                </p>
                <button
                  disabled={RosiDashboard.isLoading}
                  className="resetFilterButton"
                  onClick={resetFilters}
                >
                  {t("resetfilters")}
                </button>
              </ButtonContainer>
            </Row>
          </Row>
          {RosiDashboard.isLoading ? (
            <LoadingContainer>
              <LazyLoading />
            </LoadingContainer>
          ) : (
            <Row lg={12} className="g-2 mt-0">
              <MuuriComponent
                layoutOnResize={true}
                ref={muuriRef}
                layoutOnInit={true}
                id="rosi"
                dragAxis={"xy"}
                dragEnabled
                forceSync
                containerClass={"rosiMuuri"}
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
                onMount={(grid) => {
                  grid.on("dragReleaseEnd", (item) => {
                    const grid = muuriMap.get("rosi");
                    let updatedState: any = [];
                    grid?.getItems().forEach((item: any, index) => {
                      updatedState = rosiCards.map((card: any) => {
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

                    setRosiCards(updatedState.filter(Boolean));

                    const dataToSave = {
                      page: "rosi",
                      layoutInformation: layoutInfo,
                    };
                    sessionStorage.setItem(
                      "rosiLayout",
                      JSON.stringify(dataToSave)
                    );
                    apiWithThrottle();
                  });
                }}
              >
                {/* code without DragItem */}

                {/* <Col lg={4}>
                <Row lg={12} className="g-2">
                  <Col lg={12}>
                    <ReusableCard height={18}>
                      <RosiChart data={charts.rosiChart} />
                    </ReusableCard>
                  </Col>
                  <Col lg={12}> 
                    <ReusableCard height={18}>
                      <InvestmentOptimizationChart
                        data={charts.investmentOptimizationChart}
                      />
                    </ReusableCard>
                  </Col>
                </Row>
              </Col>
              <Col lg={4}>
                <Row lg={12} className="g-2">
                  <Col lg={12}>
                    <ReusableCard height={18}>
                      <FunctionAndAssetChart
                        title={t("securityinvestmentfunction").toUpperCase()}
                        expense={t("functionexpense")}
                        value={100}
                        total={"3.3 M"}
                        data={charts.functionChart}
                        onChartClick={(val: any) =>
                          onChartClicked(val, "Function", "Function")
                        }
                      />
                    </ReusableCard>
                  </Col>
                  <Col lg={12}>
                    <ReusableCard height={18}>
                      <FunctionAndAssetChart
                        title={t("securityinvestmentassets").toUpperCase()}
                        expense={t("assetsexpense")}
                        value={100}
                        total={"3.3 M"}
                        data={charts.assetChart}
                        onChartClick={(val: any) =>
                          onChartClicked(val, "Function", "Asset")
                        }
                      />
                    </ReusableCard>
                  </Col>
                </Row>
              </Col>
              <Col lg={4}>
                <Row lg={12} className="g-2">
                  <Col lg={12}>
                    {" "}
                    <ReusableCard height={18}>
                      <PageMiddleTitle className="geolocation-map-risk-rosi">
                        {t("geographicallocations").toUpperCase()}
                      </PageMiddleTitle>
                      <StyledParentDiv height="15.75rem" paddingTop="5px">
                        <LocationChart
                          data={getPinsForMap()}
                          onChartClick={(val: any) =>
                            onChartClicked(val, "GeoLocation")
                          }
                        />
                      </StyledParentDiv>
                    </ReusableCard>
                  </Col>
                  <Col lg={12}>
                    {" "}
                    <ReusableCard height={18}>
                      <TotalInvestment data={charts.totalInvestment} />
                    </ReusableCard>
                  </Col>
                </Row>
              </Col> */}

                {rosiCards.map((item, i) => {
                  return (
                    <DragItem
                      key={item.id}
                      index={i}
                      {...item}
                      data={
                        item.id === chartIds.LOCATION_CHART
                          ? getPinsForMap()
                          : charts[item.dataKey]
                      }
                      expense={
                        item.id === chartIds.FUNCTION_CHART
                          ? t("functionexpense")
                          : t("assetsexpense")
                      }
                      value={100}
                      total={"3.3 M"}
                      onChartClick={(val: any) => {
                        if (item.id === chartIds.FUNCTION_CHART) {
                          onChartClicked(val, "Function", "Function");
                        } else if (item.id === chartIds.ASSET_CHART) {
                          onChartClicked(val, "Function", "Asset");
                        } else if (item.id === chartIds.LOCATION_CHART) {
                          onChartClicked(val, "GeoLocation");
                        }
                      }}
                    ></DragItem>
                  );
                })}
              </MuuriComponent>
            </Row>
          )}
        </Row>
      )}
      <CustomModal
        onHide={() => {
          if (
            UserAuth.userRoles &&
            UserAuth?.userRoles.name === "CLIENTUSER" &&
            RosiDashboard.rosiStatus === false
          ) {
            history.replace("/dashboard");
          }
        }}
        size={"md"}
        show={!RosiDashboard.rosiStatus && !RosiDashboard.isInitial}
        dialogClassName={""}
        modalBody={
          <div>
            <span>
              <p>{t("rguandcoscmappingmsg")}</p>
            </span>
            <RiskJourneryButtonContainer>
              {UserAuth.userRoles?.name === "CLIENTADMIN" && (
                <Button
                  variant="outline-secondary"
                  className="unfilled-btn-style"
                  onClick={() => {
                    if (UserAuth?.userRoles?.name === "CLIENTADMIN") {
                      history.replace("/admin");
                    } else {
                      history.replace("/dashboard");
                    }
                  }}
                >
                  {t("ok")}
                </Button>
              )}
            </RiskJourneryButtonContainer>
          </div>
        }
      />
    </div>
  );
};

export default RosiPage;
