import moment from "moment";
import { MuuriComponent, muuriMap } from "muuri-react";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Col, Container, Dropdown, Form, Row } from "react-bootstrap";
import { DateRangePicker } from "react-date-range";
import { useTranslation } from "react-i18next";
import {
  HiClock,
  HiOutlineCalendarDays,
  HiOutlineChevronDown,
} from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import styled from "styled-components";
import { RootState } from "../../configureStore";
import { axiosPrivate } from "../../helpers/ApiClient";
import { EndPoints } from "../../helpers/ApiEndPoints";
import { AppDispatch } from "../../index";
import { OEIStoreNewActionCreator } from "../../store/Oei/UpdatedOeiSlice";
import { DateToString } from "../../utils/Common";
import {
  LoadingContainer,
  OEIPageRow,
  Overlapstyles,
  StyledColumn,
  theme,
} from "../GlobalStyles";
import OeiDragItems from "./OeiDragItems";
import OeiHorizontalItem from "./OeiHorizontaItem";
import { FilterOptions, FilterOptionsProps } from "./OeiType";
import { isAfter } from "date-fns";
// @ts-ignore
import * as locales from "react-date-range/dist/locale";
import useTranslateCalender from "../../hooks/useTranslateCalender";
import { utcToZonedTime } from "date-fns-tz";

const LazyLoading = lazy(() => import("../../component/LazyLoading"));

const LineChartComp = lazy(
  () => import("../../component/highcharts/LineChartComp")
);
const CustomFunelFD = lazy(
  () => import("../../component/reuseableComp/CustomFunnelFD")
);

const OeiPage = () => {
  useEffect(() => {
    document.title = "OEI";
  }, []);
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const filterState = useSelector((state: RootState) => state.Oei);
  const dataSet = useSelector((state: RootState) => state.Oei.data);
  const Loading = useSelector((state: RootState) => state.Oei.isLoading);
  const layout: any = useSelector((state: RootState) => state.Oei); //TODO:

  const selectedLang = useSelector(
    (state: RootState) => state.UserAuthentication.language
  );
  const [isShow, setIsShow] = useState(false);
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

  const throttleTimeout = useRef<any>();

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
      dispatch(OEIStoreNewActionCreator.UpdateOEIDate({ startDate, endDate }));
    } else if (countVal % 2 === 0) {
      dispatch(OEIStoreNewActionCreator.UpdateOEIDate({ startDate, endDate }));
    }
  };

  const { MASTER_FILTERS } = EndPoints;

  useEffect(() => {
    dispatch(OEIStoreNewActionCreator.FetchLayout({ page: "oei" }));
  }, [dispatch]);

  useEffect(() => {
    const fetchRes = async () => {
      const respFeeds = await axiosPrivate.post(MASTER_FILTERS, {});
      setFilterOptions(respFeeds.data.data.headerFilters);
    };
    fetchRes();
  }, [MASTER_FILTERS]);

  useEffect(() => {
    const sendRequestForChartData = () => {
      setCountClickOnDate(0);
      setIsShow(false);
      dispatch(
        OEIStoreNewActionCreator.FetchOEIPageData({
          headerFilters: filterState.headerFilters,
          fromDate: filterState.fromDate,
          toDate: filterState.toDate,
        })
      );
    };
    sendRequestForChartData();
  }, [
    filterState.fromDate,
    filterState.toDate,
    filterState.headerFilters,
    dispatch,
  ]);

  const muuriRef = useRef<any>();

  useEffect(() => {
    dispatch(OEIStoreNewActionCreator.UpdateOEIFilter(filters.headerFilters));
  }, [dispatch, filters.headerFilters]);

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

  interface LayoutProps {
    page: string;
    layoutInformation: [{ id: string; hidden: boolean; position: number }];
  }
  // security cards
  useEffect(() => {
    let layoutInfo: string | null | LayoutProps =
      sessionStorage.getItem("oeiLayout");
    let updatedSecurityItem: any = [];
    let updatedOeiItem: any = [];

    if (layoutInfo) {
      layoutInfo = JSON.parse(layoutInfo) as LayoutProps;
      layoutInfo.layoutInformation.map((card: any) => {
        if (card.id.startsWith("sop")) {
          let findLayout = securityItems.find((item) => {
            return item.id === card.id;
          });
          if (card.hidden) {
            findLayout!.hidden = true;
          } else {
            findLayout!.hidden = false;
          }
          updatedSecurityItem[card.position] = findLayout;
          setSecurityItems(updatedSecurityItem);
        } else {
          let findLayout = OeiCards.find((item) => {
            return item.id === card.id;
          });
          if (card.hidden) {
            findLayout!.hidden = true;
          } else {
            findLayout!.hidden = false;
          }
          updatedOeiItem[card.position] = findLayout;
          setOeiCards(updatedOeiItem);
        }
      });
    } else if (layout?.page) {
      layout.layoutInformation.map((card: any) => {
        if (card.id.startsWith("sop")) {
          let findLayout = securityItems.find((item) => {
            return item.id === card.id;
          });
          if (card.hidden) {
            findLayout!.hidden = true;
          } else {
            findLayout!.hidden = false;
          }
          updatedSecurityItem[card.position] = findLayout;
          setSecurityItems(updatedSecurityItem);
        } else {
          let findLayout = OeiCards.find((item) => {
            return item.id === card.id;
          });
          if (card.hidden) {
            findLayout!.hidden = true;
          } else {
            findLayout!.hidden = false;
          }
          updatedOeiItem[card.position] = findLayout;
          setOeiCards(updatedOeiItem);
        }
      });
    }
  }, [window.location, layout]);

  const [securityItems, setSecurityItems] = useState([
    {
      id: "sop_mean_time_to_detect",
      itemData: "LineChart1",
      Element: LineChartComp as any,
      title: `${t("meantimetodetect").toUpperCase()}`,
      position: 0,
      hidden: false,
    },
    {
      id: "sop_mean_time_to_notify",
      itemData: "LineChart2",
      Element: LineChartComp as any,
      title: `${t("meantimetonotify").toUpperCase()}`,
      position: 1,
      hidden: false,
    },
    {
      id: "sop_mean_time_to_remediate",
      itemData: "LineChart3",
      Element: LineChartComp as any,
      title: `${t("meantimetoremediate").toUpperCase()}`,
      position: 2,
      hidden: false,
    },
  ]);

  // const resetSecurity;
  // resolution cards
  const [resolutionCard, setResolutionCard] = useState([
    {
      id: "Item-4",
      itemData: "BarChart1",
    },
    {
      id: "Item-5",
      itemData: "BarChart2",
    },
  ]);
  const verticalMove1 = ({ dragCard, dataSet }: any) => {
    return (
      <>
        <span className="drag_handler oei-page-span ml-2">
          <div className="drag_inner_handler oei-page-drag-div"></div>
          {t("sop").toUpperCase()}
        </span>
        <StyledChartContainer>
          <MuuriComponent
            id="innermuri"
            containerClass={".muuriSoc"}
            groupIds={["innermuri"]}
            dragAxis={"x"}
            dragEnabled
            dragFixed
            layoutEasing="ease-out"
            dragSortPredicate={{
              threshold: 50,
              action: "swap",
              migrateAction: "swap",
            }}
            ref={muuriRef}
            layout={{
              fillGaps: true,
              horizontal: false,
              alignRight: false,
              alignBottom: false,
              rounding: true,
            }}
            dragHandle={".drag_inner_handler"}
            dragSortHeuristics={{
              sortInterval: 0,
            }}
            onMount={onMount}
          >
            {dragCard.map((card: any, index: number) => {
              return (
                <OeiHorizontalItem
                  key={index}
                  dataSet={dataSet}
                  dragCard={dragCard}
                  card={card}
                />
              );
            })}
          </MuuriComponent>
        </StyledChartContainer>
      </>
    );
  };
  const ResolutionRate = (prop: any) => {
    return <LineChartComp data={prop.data} />;
  };

  const [OeiCards, setOeiCards] = useState([
    {
      id: "security_operations",
      itemData: "",
      Element: verticalMove1,
      title: `${t("securityoperations").toUpperCase()}`,
      hidden: false,
      position: 0,
    },
    {
      id: "false_positive_rate",
      itemData: "BarChart1",
      Element: ResolutionRate,
      title: `${t("falsepositiverate").toUpperCase()}`,
      hidden: false,
      position: 1,
    },
    {
      id: "incident_resolution_rate",
      itemData: "BarChart2",
      Element: ResolutionRate,
      title: `${t("incidentresolutionrate").toUpperCase()}`,
      hidden: false,
      position: 2,
    },
  ]);

  interface DropDownProps {
    id: string;
    title: string;
    index: number;
  }
  const dropDownItems: DropDownProps[] = [
    {
      id: "security_operations",
      title: `${t("securityoperations").toUpperCase()}`,
      index: 0,
    },
    {
      id: "false_positive_rate",
      title: `${t("falsepositiverate").toUpperCase()}`,
      index: 1,
    },
    {
      id: "incident_resolution_rate",
      title: `${t("incidentresolutionrate").toUpperCase()}`,
      index: 2,
    },
    {
      id: "sop_mean_time_to_detect",
      title: `${t("meantimetodetect").toUpperCase()}`,
      index: 0,
    },
    {
      id: "sop_mean_time_to_notify",
      title: `${t("meantimetonotify").toUpperCase()}`,
      index: 1,
    },
    {
      id: "sop_mean_time_to_remediate",
      title: `${t("meantimetoremediate").toUpperCase()}`,
      index: 2,
    },
  ];

  const apiWithThrottle = () => {
    // fetch layout info from localstorage
    // it is guranteed that localstorage is populated with current layoutInfo
    let savedLayout = sessionStorage.getItem("oeiLayout");
    if (savedLayout) {
      savedLayout = JSON.parse(savedLayout);

      if (throttleTimeout.current) {
        clearTimeout(throttleTimeout.current);
      }

      // take only last api call
      throttleTimeout.current = setTimeout(() => {
        dispatch(OEIStoreNewActionCreator.UpdateLayout(savedLayout));
      }, 2000);
    }
  };
  // Items to components
  const toggleChartVisibility = (id: string, index: number) => {
    let updatedSecurityCard: any = [];
    let updatedOeiCard: any = [];
    if (
      id === "sop_mean_time_to_detect" ||
      id === "sop_mean_time_to_notify" ||
      id === "sop_mean_time_to_remediate"
    ) {
      const findHidden = securityItems.filter((card) => !card.hidden);

      if (findHidden.length >= 3 && securityItems[index].hidden === true) {
        alert("Not allowed");
      } else {
        updatedSecurityCard = securityItems.map((item) => {
          if (item.id === id) {
            if (item.hidden) {
              item.hidden = false;
            } else {
              item.hidden = true;
            }
          }
          return item;
        });
        let updatedOeiCard: any = [...OeiCards];
        let find = updatedOeiCard.find((item: any) => {
          return item.id === "security_operations";
        });
        if (find) {
          find.hidden = false;
        }
        let isAllCardsDisabled = securityItems.filter((card) => {
          if (card.hidden) {
            return false;
          } else {
            return true;
          }
        });
        let oeiIndex: number = updatedOeiCard.findIndex((item: any) => {
          return item.id === "security_operations";
        });
        if (isAllCardsDisabled.length === 0) {
          find.hidden = true;
        }
        updatedOeiCard.slice(oeiIndex, 1);
        updatedOeiCard[oeiIndex] = find;
        setOeiCards(updatedOeiCard);
        setSecurityItems(updatedSecurityCard);
      }
    } else {
      const findHidden = OeiCards.filter((card) => !card.hidden);
      if (findHidden.length >= 3 && OeiCards[index].hidden === true) {
        alert("Not allowed");
      } else {
        updatedOeiCard = OeiCards.map((item) => {
          if (item.id === id) {
            if (item.hidden) {
              item.hidden = false;
            } else {
              item.hidden = true;
            }
          }
          return item;
        });
        setOeiCards(updatedOeiCard);
      }

      // disable all security cards if security operations is disabled
      if (id === "security_operations") {
        const isHidden = OeiCards.find((item) => item.id === id)?.hidden;
        let updatedSecurityCard = securityItems.map((item) => {
          item.hidden = isHidden ? true : false;
          return item;
        });
        setSecurityItems(updatedSecurityCard);
      }
    }

    let oeiDataToSave = updatedOeiCard.map((item: any) => {
      return {
        id: item.id,
        hidden: item.hidden,
        position: item.position,
      };
    });
    let securityDataToSave = updatedSecurityCard.map((item: any) => {
      return {
        id: item.id,
        hidden: item.hidden,
        position: item.position,
      };
    });
    if (oeiDataToSave.length === 0) {
      oeiDataToSave = OeiCards.map((card) => {
        return { id: card.id, position: card.position, hidden: card.hidden };
      });
    }
    if (securityDataToSave.length === 0) {
      securityDataToSave = securityItems.map((card) => {
        return { id: card.id, position: card.position, hidden: card.hidden };
      });
    }
    const layoutInfo = [...oeiDataToSave, ...securityDataToSave];

    const dataToSave = {
      page: "oei",
      layoutInformation: layoutInfo,
    };

    sessionStorage.setItem("oeiLayout", JSON.stringify(dataToSave));
    apiWithThrottle();
    muuriRef.current.refreshItems().layout();
  };

  // handeling saving layout information
  const onMount = (grid: any) => {
    grid.on("dragReleaseEnd", (item: any) => {
      const outerGrid = muuriMap.get("outerMuri");
      const innerGrid = muuriMap.get("innermuri");
      let updatedOeiState: any = [];
      let updatedSecurityState: any = [];

      outerGrid?.getItems()?.forEach((item: any, index) => {
        updatedOeiState = OeiCards.map((state) => {
          if (state.id === item?.getProps()?.id) {
            state.position = index;
            // state.hidden = item?.getProps()?.hidden;
          }
          return state;
        });
      });
      innerGrid?.getItems()?.forEach((item: any, index) => {
        updatedSecurityState = securityItems.map((state) => {
          if (state.id === item?.getProps()?.card?.id) {
            state.position = index;
            // state.hidden = item?.getProps()?.hidden;
          }
          return state;
        });
      });

      const oeiDataToSave = updatedOeiState.map((item: any) => {
        return {
          id: item.id,
          hidden: item.hidden,
          position: item.position,
        };
      });
      const securityDataToSave = updatedSecurityState.map((item: any) => {
        return {
          id: item.id,
          hidden: item.hidden,
          position: item.position,
        };
      });

      const layoutInfo = [...oeiDataToSave, ...securityDataToSave];
      const dataToSave = {
        page: "oei",
        layoutInformation: layoutInfo,
      };

      sessionStorage.setItem("oeiLayout", JSON.stringify(dataToSave));
      apiWithThrottle();
    });
  };
  const children = OeiCards.map((items: any) => {
    return (
      <OeiDragItems
        cards={securityItems}
        resolutionCard={resolutionCard}
        key={items.id}
        {...items}
        data={dataSet}
      />
    );
  });

  useTranslateCalender(isShow); //Custom Hook To Translate Calender Properly

  const resetHandler = () => {
    sessionStorage.removeItem("oeiLayout");
    dispatch(OEIStoreNewActionCreator.ResetLayout({ page: "oei" }))
      .unwrap()
      .then((res) => {
        setOeiCards([]);
        setSecurityItems([]);
        setOeiCards([
          {
            id: "security_operations",
            itemData: "",
            Element: verticalMove1,
            title: `${t("securityoperations")}`,
            hidden: false,
            position: 0,
          },
          {
            id: "false_positive_rate",
            itemData: "BarChart1",
            Element: ResolutionRate,
            title: `${t("falsepositiverate")}`,
            hidden: false,
            position: 1,
          },
          {
            id: "incident_resolution_rate",
            itemData: "BarChart2",
            Element: ResolutionRate,
            title: `${t("incidentresolutionrate")}`,
            hidden: false,
            position: 2,
          },
        ]);
        setSecurityItems([
          {
            id: "sop_mean_time_to_detect",
            itemData: "LineChart1",
            Element: LineChartComp as any,
            title: `${t("meantimetodetect")}`,
            position: 0,
            hidden: false,
          },
          {
            id: "sop_mean_time_to_notify",
            itemData: "LineChart2",
            Element: LineChartComp as any,
            title: `${t("meantimetonotify")}`,
            position: 1,
            hidden: false,
          },
          {
            id: "sop_mean_time_to_remediate",
            itemData: "LineChart3",
            Element: LineChartComp as any,
            title: `${t("meantimetoremediate")}`,
            position: 2,
            hidden: false,
          },
        ]);
      });
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
  };

  return (
    <Container fluid className="flex-grow-1 h-100">
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
                      onClick={() => {
                        setIsShow(!isShow);
                      }}
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
                  placeholder={t("geo").toUpperCase()}
                  value={geoLocationFilters()}
                  styles={
                    Overlapstyles
                    // Fixes the overlapping problem of the component
                  }
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
                  placeholder={t("function").toUpperCase()}
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
                  placeholder={t("process").toUpperCase()}
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
                  placeholder={t("asset").toUpperCase()}
                  styles={Overlapstyles}
                  theme={theme}
                  noOptionsMessage={({ inputValue }) =>
                    !inputValue && `${t("noresultfound")}`
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
                      {dropDownItems.map((item: any, index: number) => {
                        let isHidden;

                        let findItem = OeiCards.find(
                          (card) => card.id === item.id
                        );
                        if (findItem) {
                          isHidden = findItem.hidden;
                        }
                        if (!findItem) {
                          findItem = securityItems.find(
                            (card) => card?.id === item?.id
                          );
                          if (findItem) {
                            isHidden = findItem.hidden;
                          }
                        }
                        return (
                          <Dropdown.Item
                            href="#/action-1"
                            key={item.title}
                            className="dropDown-items background-transparent"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Form className="font-color">
                              <Form.Check // prettier-ignore
                                type="switch"
                                id={item.title}
                                label={item.title}
                                checked={!isHidden}
                                onClick={() => {
                                  toggleChartVisibility(item.id, item.index);
                                }}
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
            <Row className="my-1 py-0  pl-0 pr-3" lg={12}>
              <div className="d-flex justify-content-between align-items-center w-100">
                <span className="dateRangeInsightOEI">
                  <HiClock fontSize="1.05rem" />
                  {t("from")} :{" "}
                  {DateToString(filterState.fromDate, selectedLang)} {t("to")} :{" "}
                  {DateToString(filterState.toDate, selectedLang)} (UTC)
                </span>
                <button className="resetFilterButton" onClick={onResetFilter}>
                  {t("resetfilters")}
                </button>
              </div>
            </Row>
          </Col>
        </Row>
        <Suspense fallback={<div>Loading...</div>}>
          {Loading ? (
            <LoadingContainer>
              <LazyLoading />
            </LoadingContainer>
          ) : (
            <>
              <OEIPageRow lg={12}>
                <Col lg={3} className="d-flex">
                  <CustomFunelFD data={dataSet.FunnelData} />
                </Col>
                <Col lg={9}>
                  <Col lg={12} className="p-0 m-0">
                    <MuuriComponent
                      id="outerMuri"
                      groupIds={["outerMuri"]}
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
                      onMount={onMount}
                    >
                      {children}
                    </MuuriComponent>
                  </Col>
                </Col>
              </OEIPageRow>
            </>
          )}
        </Suspense>
      </Row>
    </Container>
  );
};

export default OeiPage;

const StyledChartContainer = styled.div`
  // display: flex;
  height: 90%;
  justify-content: space-around;
  @media screen and (min-width: 300px) and (max-width: 1023px) {
    flex-direction: column;
    gap: 1em;
    height: auto;
    width: 100%;
  }
`;
