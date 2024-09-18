import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Col, Container, Row, Dropdown, Form } from "react-bootstrap";
import { DateRangePicker } from "react-date-range";
import {
  HiClock,
  HiOutlineCalendarDays,
  HiOutlineChevronDown,
} from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { InsightStoreNewActionCreator } from "../../store/Insights/InsightSlice";
import { AppDispatch } from "../../index";
import { DateToString } from "../../utils/Common";
import { RootState } from "../../configureStore";
import { axiosPrivate } from "../../helpers/ApiClient";
import { EndPoints } from "../../helpers/ApiEndPoints";
import moment from "moment";
import { MuuriComponent, muuriMap } from "muuri-react";
// @ts-ignore
import * as locales from "react-date-range/dist/locale";
import useTranslateCalender from "../../hooks/useTranslateCalender";
import { getMasterData } from "../../utils/InsightDataCal";
import {
  FilterOptions,
  FilterOptionsProps,
  InsightCardProps,
  TFilterData,
} from "./InsightPageType";
import {
  InsightPageGridCol,
  LoadingContainer,
  Overlapstyles,
  StyledColumn,
  theme,
} from "../GlobalStyles";
import { customDragSortPredicate } from "../../utils/InsightCustomSort"; //TODO:
import DragItem from "./InsightDragItem"; //TODO:
import { useTranslation } from "react-i18next";
import { isAfter } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

const InsightGridTable = lazy(
  () => import("../../component/InsightGridTable/InsightGridTable")
);
const ClickAblePieChart = lazy(
  () => import("../../component/highcharts/ClickAblePieChart")
);
const ClickAbleBarChart = lazy(
  () => import("../../component/highcharts/ClickAbleBarChart")
);
const FillIndicatorChart = lazy(
  () => import("../../component/reuseableComp/FillIndicatorChart")
);
const ReusableCard = lazy(
  () => import("../../component/reuseableComp/ReusableCard")
);
const LazyLoading = lazy(() => import("../../component/LazyLoading"));

export const chartIds = {
  ALERT_CONFIDENCE: "alert_by_confidence",
  ALERT_TYPE: "alert_type",
  TOP10_ASSETS: "top_10_assets_by_alert_count",
  REQUEST_TYPE: "request_types",
  REQUEST_STATUS: "request_status",
};

const InsightPage = () => {
  useEffect(() => {
    document.title = "Insights";
  }, []);

  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const filterState = useSelector((state: RootState) => state.Insight);
  const dataSet = useSelector((state: RootState) => state.Insight.data);
  const Loading = useSelector((state: RootState) => state.Insight.isLoading);
  const layout: any = useSelector(
    (state: RootState) => state.Insight.layoutInfo
  );
  const prevfilter = useSelector(
    (state: RootState) => state.Insight.internalFilters
  );
  const selectedLang = useSelector(
    (state: RootState) => state.UserAuthentication.language
  );
  const [reset, setReset] = useState(false);
  const [insightsCard, setInsightsCard] = useState<InsightCardProps[]>([
    {
      id: chartIds.ALERT_CONFIDENCE,
      Element: ClickAbleBarChart,
      title: `${t("alertbyconfidence").toUpperCase()}`,
      dataKey: "BarChartData",
      categoryKey: "BarChartXCategory",
      hidden: false,
      position: 0,
    },
    {
      id: chartIds.ALERT_TYPE,
      Element: FillIndicatorChart,
      title: `${t("alerttype").toUpperCase()}`,
      dataKey: "AlertType",
      hidden: false,
      position: 1,
    },
    {
      id: chartIds.TOP10_ASSETS,
      Element: FillIndicatorChart,
      title: `${t("toptenassest").toUpperCase()}`,
      dataKey: "Top5Alert",
      hidden: false,
      position: 2,
    },
    {
      id: chartIds.REQUEST_TYPE,
      Element: ClickAblePieChart,
      title: `${t("requesttype").toUpperCase()}`,
      dataKey: "PieChart1",
      hidden: false,
      position: 3,
    },
    {
      id: chartIds.REQUEST_STATUS,
      Element: ClickAblePieChart,
      title: `${t("requeststatus").toUpperCase()}`,
      dataKey: "PieChart2",
      hidden: false,
      position: 4,
    },
  ]);

  const [isShow, setIsShow] = useState(false);
  const [filterData, setFilterData] = useState<TFilterData>({
    Top5Alert: [],
    PieChart1: [],
    PieChart2: [],
    AlertType: [],
    BarChartData: [],
    BarChartXCategory: [],
    GridData: [],
  });

  const [dateRange, setDateRange] = useState([
    {
      startDate: utcToZonedTime(
        new Date(new Date(filterState.fromDate)),
        "UTC"
      ),
      endDate: utcToZonedTime(new Date(new Date(filterState.toDate)), "UTC"),
      key: "selection",
    },
  ]);
  let throttleTimeout = useRef<any>();
  const muuriRef = useRef<any>();
  const [countClickOnDate, setCountClickOnDate] = useState(0);
  const [filterOptions, setFilterOptions] = useState<FilterOptionsProps>({
    GeoLocation: [],
    Function: [],
    Process: [],
    Asset: [],
  });

  const [filters, setFilters] = useState<FilterOptions>({
    headerFilters: filterState.headerFilters,
    fromDate: filterState.fromDate,
    toDate: filterState.toDate,
  });

  const { MASTER_FILTERS } = EndPoints;

  useEffect(() => {
    const fetchRes = async () => {
      const respFeeds = await axiosPrivate.post(MASTER_FILTERS, {});
      setFilterOptions(respFeeds.data.data.headerFilters);
    };
    fetchRes();
  }, [MASTER_FILTERS]);

  useEffect(() => {
    dispatch(InsightStoreNewActionCreator.FetchLayout({ page: "Insights" }));
  }, [dispatch]);

  useEffect(() => {
    const sendRequestForChartData = () => {
      setCountClickOnDate(0);
      setIsShow(false);
      dispatch(
        InsightStoreNewActionCreator.FetchInsightPageData({
          headerFilters: filterState.headerFilters,
          fromDate: filterState.fromDate,
          toDate: filterState.toDate,
        })
      );
    };
    sendRequestForChartData();
  }, [
    dispatch,
    filterState.fromDate,
    filterState.headerFilters,
    filterState.toDate,
  ]);

  useEffect(() => {
    dispatch(
      InsightStoreNewActionCreator.UpdateInsightFilters(filters.headerFilters)
    );
  }, [dispatch, filters.headerFilters]);

  useEffect(() => {
    const data = getMasterData(dataSet, prevfilter);
    setFilterData(data);
  }, [dataSet, prevfilter]);

  const handleFilters = (e: any, filterType: string) => {
    setFilters((prev) => {
      const newValue = { ...prev };
      newValue.headerFilters = {
        ...prev.headerFilters,
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

  interface LayoutProps {
    page: string;
    layoutInformation: [{ id: string; hidden: boolean; position: number }];
  }
  useEffect(() => {
    let layoutInfo: string | null | LayoutProps =
      sessionStorage.getItem("insightLayout");
    let updatedLayout: any = [];

    if (layoutInfo) {
      layoutInfo = JSON.parse(layoutInfo) as LayoutProps;
      layoutInfo.layoutInformation.map((item) => {
        const findCard = insightsCard.find((card) => card.id === item.id);
        if (item.hidden && findCard) {
          findCard.hidden = true;
        } else if (findCard) {
          findCard.hidden = false;
        }
        updatedLayout[item.position] = findCard;
      });
      setInsightsCard(updatedLayout.filter(Boolean));
    } else {
      if (layout?.page) {
        layout.layoutInformation.map((item: any) => {
          const findCard = insightsCard.find((card) => card.id === item.id);
          if (item.hidden && findCard) {
            findCard.hidden = true;
          } else if (findCard) {
            findCard.hidden = false;
          }
          updatedLayout[item.position] = findCard;
        });
        setInsightsCard(updatedLayout.filter(Boolean));
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
        InsightStoreNewActionCreator.UpdateInsightDate({
          startDate,
          endDate,
        })
      );
    } else if (countVal % 2 === 0) {
      dispatch(
        InsightStoreNewActionCreator.UpdateInsightDate({
          startDate,
          endDate,
        })
      );
    }
  };

  const chartKeys = {
    ALERT: "alert_severity",
    TYPE: "type_name",
    STATUS: "status_name",
  };
  const onChartClicks = (chart: string, value: any) => {
    const sendFilter = [{ key: chart, value: value }];
    dispatch(InsightStoreNewActionCreator.UpdatedInternalFilters(sendFilter));
  };
  const onResetFilter = () => {
    setFilters((prev) => {
      const newValue = { ...prev };
      newValue.headerFilters = {
        GeoLocation: [],
        Function: [],
        Process: [],
        Asset: [],
      };
      return newValue;
    });
    dispatch(InsightStoreNewActionCreator.UpdatedInternalFilters([]));
  };
  const geoLocationFilters = () => {
    return filterOptions.GeoLocation.filter((option) => {
      return filters.headerFilters.GeoLocation.map((j) => j.value).includes(
        option.value
      );
    });
  };
  const functionFilters = () => {
    return filterOptions.Function.filter((option) => {
      return filters.headerFilters.Function.map((j) => j.value).includes(
        option.value
      );
    });
  };
  const processFilters = () => {
    return filterOptions.Process.filter((option) => {
      return filters.headerFilters.Process.map((j) => j.value).includes(
        option.value
      );
    });
  };
  const assetFilters = () => {
    return filterOptions.Asset.filter((option) => {
      return filters.headerFilters.Asset.map((j) => j.value).includes(
        option.value
      );
    });
  };
  let previousPositionX = useRef(0);

  interface DropDownItemProps {
    id: string;
    title: string;
  }
  const dropDownItems: DropDownItemProps[] = [
    {
      id: chartIds.ALERT_CONFIDENCE,
      title: `${t("alertbyconfidence").toUpperCase()}`,
    },
    {
      id: chartIds.ALERT_TYPE,
      title: `${t("alerttype").toUpperCase()}`,
    },
    {
      id: chartIds.TOP10_ASSETS,
      title: `${t("toptenassest").toUpperCase()}`,
    },
    {
      id: chartIds.REQUEST_TYPE,
      title: `${t("requesttype").toUpperCase()}`,
    },
    {
      id: chartIds.REQUEST_STATUS,
      title: `${t("requeststatus").toUpperCase()}`,
    },
  ];
  const resetHandler = () => {
    sessionStorage.setItem(
      "insightLayout",
      JSON.stringify({
        page: "Insights",
        layoutInformation: [
          {
            id: "alert_by_confidence",
            hidden: false,
            position: 1,
          },
          {
            id: "alert_type",
            hidden: false,
            position: 2,
          },
          {
            id: "top_10_assets_by_alert_count",
            hidden: false,
            position: 3,
          },
          {
            id: "request_types",
            hidden: false,
            position: 4,
          },
          {
            id: "request_status",
            hidden: false,
            position: 5,
          },
        ],
      })
    );
    setReset(!reset);
    dispatch(InsightStoreNewActionCreator.ResetLayout({ page: "Insights" }))
      .unwrap()
      .then((res) => {
        setInsightsCard([]);
        setInsightsCard([
          {
            id: chartIds.ALERT_CONFIDENCE,
            Element: ClickAbleBarChart,
            title: `${t("alertbyconfidence").toUpperCase()}`,
            dataKey: "BarChartData",
            categoryKey: "BarChartXCategory",
            hidden: false,
            position: 0,
          },
          {
            id: chartIds.ALERT_TYPE,
            Element: FillIndicatorChart,
            title: `${t("alerttype").toUpperCase()}`,
            dataKey: "AlertType",
            hidden: false,
            position: 1,
          },
          {
            id: chartIds.TOP10_ASSETS,
            Element: FillIndicatorChart,
            title: `${t("toptenassest").toUpperCase()}`,
            dataKey: "Top5Alert",
            hidden: false,
            position: 2,
          },
          {
            id: chartIds.REQUEST_TYPE,
            Element: ClickAblePieChart,
            title: `${t("requesttype").toUpperCase()}`,
            dataKey: "PieChart1",
            hidden: false,
            position: 3,
          },
          {
            id: chartIds.REQUEST_STATUS,
            Element: ClickAblePieChart,
            title: `${t("requeststatus").toUpperCase()}`,
            dataKey: "PieChart2",
            hidden: false,
            position: 4,
          },
        ]);
      });
  };

  const apiWithThrottle = () => {
    // fetch layout info from localstorage
    // it is guranteed that localstorage is populated with current layoutInfo
    let savedLayout = sessionStorage.getItem("insightLayout");
    if (savedLayout) {
      savedLayout = JSON.parse(savedLayout);

      if (throttleTimeout.current) {
        clearTimeout(throttleTimeout.current);
      }

      // take only last api call
      throttleTimeout.current = setTimeout(() => {
        dispatch(InsightStoreNewActionCreator.UpdateLayout(savedLayout));
      }, 2000);
    }
  };

  const toggleChartVisibility = (id: string, index: number) => {
    let findHidden = insightsCard.filter((card) => {
      return card.hidden ? false : true;
    });
    if (findHidden.length >= 5 && insightsCard[index].hidden === true) {
      alert("only 5 cards are allowed");
    } else {
      const updatedInsightCard = insightsCard.map((item) => {
        if (item.id === id) {
          if (item.hidden) {
            item.hidden = false;
          } else {
            item.hidden = true;
          }
        }
        return item;
      });

      setInsightsCard(updatedInsightCard.filter(Boolean));
      let layoutInfo = updatedInsightCard.map((card: any) => {
        return { id: card.id, position: card.position, hidden: card.hidden };
      });
      const dataToSave = {
        page: "Insights",
        layoutInformation: layoutInfo,
      };

      sessionStorage.setItem("insightLayout", JSON.stringify(dataToSave));
      apiWithThrottle();
    }
  };
  //TODO:
  useTranslateCalender(isShow); //Custom Hook To Translate Calender Properly

  return (
    <Container fluid className="h-100 flex-grow-1">
      <Row lg={12}>
        <Row lg={12} className="mt-2">
          <Col lg={12}>
            <Row lg={12}>
              <StyledColumn xs={6} lg={2}>
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
                          locale={locales[selectedLang]} //TODO:
                          // open={bothDatesSelected ? false : true}
                        />
                      )}
                    </div>
                  </span>
                </div>
              </StyledColumn>
              <StyledColumn xs={6} lg={2}>
                <Select
                  id="react-select-geo"
                  isMulti
                  placeholder={t("geo")}
                  value={geoLocationFilters()}
                  styles={Overlapstyles}
                  theme={theme}
                  noOptionsMessage={({ inputValue }) =>
                    inputValue && `${t("noresultfound")}`
                  }
                  onChange={(e) => handleFilters(e, "GeoLocation")}
                  options={filterOptions.GeoLocation}
                  components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                  }}
                />
              </StyledColumn>
              <StyledColumn xs={6} lg={2}>
                <Select
                  id="react-select-function"
                  placeholder={t("function")}
                  styles={Overlapstyles}
                  theme={theme}
                  noOptionsMessage={({ inputValue }) =>
                    inputValue && `${t("noresultfound")}`
                  }
                  isMulti
                  value={functionFilters()}
                  onChange={(e) => handleFilters(e, "Function")}
                  options={filterOptions.Function}
                  components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                  }}
                />
              </StyledColumn>
              <StyledColumn xs={6} lg={2}>
                <Select
                  id="react-select-process"
                  placeholder={t("process")}
                  styles={Overlapstyles}
                  theme={theme}
                  noOptionsMessage={({ inputValue }) =>
                    inputValue && `${t("noresultfound")}`
                  }
                  isMulti
                  value={processFilters()}
                  onChange={(e) => handleFilters(e, "Process")}
                  options={filterOptions.Process}
                  components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                  }}
                />
              </StyledColumn>
              <StyledColumn xs={6} lg={2}>
                <Select
                  id="react-select-asset"
                  placeholder={t("asset")}
                  styles={Overlapstyles}
                  theme={theme}
                  noOptionsMessage={({ inputValue }) =>
                    inputValue && `${t("noresultfound")}`
                  }
                  isMulti
                  value={assetFilters()}
                  onChange={(e) => handleFilters(e, "Asset")}
                  options={filterOptions.Asset}
                  components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                  }}
                />
              </StyledColumn>
              <Col xs={6} lg={2} className="oei-page-drag-column">
                <div className="d-flex justify-content-between">
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

                        let findItem = insightsCard.find(
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
                  <div>
                    <button
                      className="btn btn-outline hover-btn reset-layout-btn-style ml-2"
                      id="dropdown-basic"
                      onClick={() => resetHandler()}
                    >
                      {t("reset")}
                    </button>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row lg={12} className="my-1">
          <div className="d-flex justify-content-between align-items-center w-100">
            <span className="dateRangeInsightOEI">
              <HiClock fontSize="1.05rem" />
              {t("from")} : {DateToString(filterState.fromDate, selectedLang)}{" "}
              {t("to")} : {DateToString(filterState.toDate, selectedLang)} (UTC)
            </span>
            <button className="resetFilterButton" onClick={onResetFilter}>
              {t("resetfilters")}
            </button>
          </div>
        </Row>

        <Suspense fallback={<div>Loading...</div>}>
          {Loading ? (
            <LoadingContainer>
              <LazyLoading />
            </LoadingContainer>
          ) : (
            <>
              <MuuriComponent
                ref={muuriRef}
                dragAxis={"xy"}
                dragEnabled
                dragFixed
                forceSync
                groupIds={["InsightGrid"]}
                layoutEasing="ease-out"
                dragSortPredicate={(item: any, event: DragEvent) => {
                  return customDragSortPredicate(
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
                id={"Insights"}
                onMount={(grid) => {
                  grid.on("dragReleaseEnd", (item) => {
                    const grid = muuriMap.get("Insights");
                    let updatedState: any = [];
                    grid?.getItems().forEach((item: any, index) => {
                      updatedState = insightsCard.map((card: any) => {
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

                    setInsightsCard(updatedState.filter(Boolean));

                    const dataToSave = {
                      page: "Insights",
                      layoutInformation: layoutInfo,
                    };
                    sessionStorage.setItem(
                      "insightLayout",
                      JSON.stringify(dataToSave)
                    );
                    apiWithThrottle();
                  });
                }}
              >
                {insightsCard.map((item, i) => (
                  <DragItem
                    key={item.id}
                    index={i}
                    reset={reset}
                    {...item}
                    onBarCliked={(e: string) =>
                      onChartClicks(chartKeys.ALERT, e)
                    }
                    data={filterData}
                    onSliceCliked={(e: string) => {
                      if (item.id === "request_types") {
                        onChartClicks(chartKeys.TYPE, e);
                      } else if (item.id === "request_status") {
                        onChartClicks(chartKeys.STATUS, e);
                      }
                    }}
                  />
                ))}
              </MuuriComponent>
            </>
          )}
          <InsightPageGridCol lg={12}>
            <ReusableCard height={42}>
              <InsightGridTable data={filterData.GridData} />
            </ReusableCard>
          </InsightPageGridCol>
        </Suspense>
      </Row>
    </Container>
  );
};

export default InsightPage;
