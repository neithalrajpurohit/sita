import { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import Select from "react-select";
import {
  DateRangeContainer,
  Overlapstyles,
  theme,
} from "../../pages/GlobalStyles";
import {
  HiClock,
  HiOutlineCalendarDays,
  HiOutlineChevronDown,
} from "react-icons/hi2";
import { DateRangePicker } from "react-date-range";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { utcToZonedTime } from "date-fns-tz";
import { isAfter } from "date-fns";
// @ts-ignore
import * as locales from "react-date-range/dist/locale";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../configureStore";
import { ThreatIntelStyleColumn } from "./ThreatIntelStyle";
import { AppDispatch } from "../../index";
import { ThreatIntelStoreActionCreator } from "../../store/ThreatIntel/ThreatIntelSlice";
import { DateToString } from "../../utils/Common";
import {
  ThreatIntelFilterOptions,
  ThreatIntelFilterOptionsProps,
} from "./ThreatIntelType";
import { EndPoints } from "../../helpers/ApiEndPoints";
import { axiosPrivate } from "../../helpers/ApiClient";
import {
  attackSurface,
  brandIntelligence,
  cyberCrime,
  darkWeb,
} from "./ThreatIntelContants";
import useTranslateCalendar from "../../hooks/useTranslateCalender";

const ThreatIntelHeader = () => {
  const { t } = useTranslation();
  const selectedLang = useSelector(
    (state: RootState) => state.UserAuthentication.language
  );
  const dispatch: AppDispatch = useDispatch();
  const threatIntelState = useSelector((state: RootState) => state.ThreatIntel);
  const [isShow, setIsShow] = useState(false);
  const [countClickOnDate, setCountClickOnDate] = useState(0);
  const [dateRange, setDateRange] = useState([
    {
      startDate: utcToZonedTime(
        new Date(new Date(threatIntelState.fromDate)),
        "UTC"
      ),
      endDate: utcToZonedTime(
        new Date(new Date(threatIntelState.toDate)),
        "UTC"
      ),
      key: "selection",
    },
  ]);

  const [filterOptions, setFilterOptions] =
    useState<ThreatIntelFilterOptionsProps>({
      services: [],
      severity: [],
      status: [],
    });

  const [filters, setFilters] = useState<ThreatIntelFilterOptions>({
    headerFilters: threatIntelState.headerFilters,
    fromDate: threatIntelState.fromDate,
    toDate: threatIntelState.toDate,
  });

  const { CYBLE_SERVICES_LIST } = EndPoints;

  useEffect(() => {
    const fetchRes = async () => {
      const respFeeds = await axiosPrivate.post(CYBLE_SERVICES_LIST, {});
      setFilterOptions(respFeeds.data.data);
    };
    fetchRes();
  }, [CYBLE_SERVICES_LIST]);

  useEffect(() => {
    const sendRequestForChartData = () => {
      setCountClickOnDate(0);
      setIsShow(false);
      const payload = {
        fromDate: threatIntelState.fromDate,
        toDate: threatIntelState.toDate,
        headerFilter: threatIntelState.headerFilters,
      };
      const allowedSubs = threatIntelState.subscribedModules;
      const currentActive = threatIntelState.currentActiveCharts;
      const actions: Record<string, () => void> = {
        attack_surface: () => {
          currentActive[attackSurface] === "pie"
            ? dispatch(
                ThreatIntelStoreActionCreator.FetchAttackSurfacePieChart(
                  payload
                )
              )
            : dispatch(
                ThreatIntelStoreActionCreator.FetchAttackSurfaceBarChart(
                  payload
                )
              );
        },
        brand_intelligence: () => {
          currentActive[brandIntelligence] === "pie"
            ? dispatch(
                ThreatIntelStoreActionCreator.FetchBrandIntelligencePieChart(
                  payload
                )
              )
            : dispatch(
                ThreatIntelStoreActionCreator.FetchBrandIntelligenceBarChart(
                  payload
                )
              );
        },
        dark_web: () => {
          currentActive[darkWeb] === "pie"
            ? dispatch(
                ThreatIntelStoreActionCreator.FetchDarkWebPieChart(payload)
              )
            : dispatch(
                ThreatIntelStoreActionCreator.FetchDarkWebBarChart(payload)
              );
        },
        cyber_crime: () => {
          currentActive[cyberCrime] === "pie"
            ? dispatch(
                ThreatIntelStoreActionCreator.FetchCyberCrimePieChart(payload)
              )
            : dispatch(
                ThreatIntelStoreActionCreator.FetchCyberCrimeBarChart(payload)
              );
        },
      };
      allowedSubs.forEach((item) => actions[item]?.());
      dispatch(ThreatIntelStoreActionCreator.FetchThreatIntelGridData(payload));
    };
    sendRequestForChartData();
  }, [
    threatIntelState.fromDate,
    threatIntelState.toDate,
    threatIntelState.headerFilters,
    dispatch,
    threatIntelState.subscribedModules,
    threatIntelState.currentActiveCharts,
  ]);

  useEffect(() => {
    dispatch(
      ThreatIntelStoreActionCreator.UpdateThreatIntelFilter(
        filters.headerFilters
      )
    );
  }, [dispatch, filters.headerFilters]);

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
        ThreatIntelStoreActionCreator.UpdateThreatIntelDates({
          startDate,
          endDate,
        })
      );
    } else if (countVal % 2 === 0) {
      dispatch(
        ThreatIntelStoreActionCreator.UpdateThreatIntelDates({
          startDate,
          endDate,
        })
      );
    }
  };

  const getFilters = (string: "services" | "status" | "severity") => {
    return filterOptions[string].filter((option) => {
      return filters.headerFilters[string]
        .map((j) => j.value)
        .includes(option.value);
    });
  };

  const resetFilters = () => {
    dispatch(
      ThreatIntelStoreActionCreator.UpdateCurrentActiveCharts({
        attack_surface: "pie",
        dark_web: "pie",
        cyber_crime: "pie",
        brand_intelligence: "pie",
      })
    );
    setFilters({
      headerFilters: {
        services: [],
        severity: [],
        status: [],
      },
      fromDate: "",
      toDate: "",
    });
  };
  useTranslateCalendar(isShow);
  return (
    <Row lg={12} className="mt-2">
      <Row lg={12} className="g-0">
        <ThreatIntelStyleColumn xs={12} lg={6}>
          <Row xs={12} className="g-0">
            <ThreatIntelStyleColumn xs={12} lg={4}>
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
                      />
                    )}
                  </div>
                </span>
              </div>
            </ThreatIntelStyleColumn>
          </Row>
        </ThreatIntelStyleColumn>
        <ThreatIntelStyleColumn xs={12} lg={6}>
          <Row xs={12} className="g-0">
            <ThreatIntelStyleColumn xs={12} lg={4}>
              <Select
                id="react-select-services"
                isMulti
                styles={Overlapstyles}
                theme={theme}
                placeholder={t("services").toUpperCase()}
                isDisabled={threatIntelState.isLoading}
                value={getFilters("services")}
                noOptionsMessage={({ inputValue }) =>
                  inputValue && `${t("noresultfound")}`
                }
                onChange={(e) => handleFilters(e, "services")}
                options={filterOptions.services}
                components={{
                  DropdownIndicator: () => null,
                  IndicatorSeparator: () => null,
                }}
              />
            </ThreatIntelStyleColumn>
            <ThreatIntelStyleColumn xs={12} lg={4}>
              <Select
                id="react-select-severity"
                isMulti
                styles={Overlapstyles}
                theme={theme}
                placeholder={t("severity").toUpperCase()}
                isDisabled={threatIntelState.isLoading}
                value={getFilters("severity")}
                noOptionsMessage={({ inputValue }) =>
                  inputValue && `${t("noresultfound")}`
                }
                onChange={(e) => handleFilters(e, "severity")}
                options={filterOptions.severity}
                components={{
                  DropdownIndicator: () => null,
                  IndicatorSeparator: () => null,
                }}
              />
            </ThreatIntelStyleColumn>
            <ThreatIntelStyleColumn xs={12} lg={4}>
              <Select
                id="react-select-status"
                isMulti
                styles={Overlapstyles}
                theme={theme}
                placeholder={t("status").toUpperCase()}
                isDisabled={threatIntelState.isLoading}
                value={getFilters("status")}
                noOptionsMessage={({ inputValue }) =>
                  inputValue && `${t("noresultfound")}`
                }
                onChange={(e) => handleFilters(e, "status")}
                options={filterOptions.status}
                components={{
                  DropdownIndicator: () => null,
                  IndicatorSeparator: () => null,
                }}
              />
            </ThreatIntelStyleColumn>
          </Row>
        </ThreatIntelStyleColumn>
      </Row>
      <Row lg={12} className="my-1">
        <DateRangeContainer>
          <span className="dateRangeInsightOEI">
            <HiClock fontSize="1.05rem" />
            {t("from")} :{" "}
            {DateToString(threatIntelState.fromDate, selectedLang)} {t("to")} :{" "}
            {DateToString(threatIntelState.toDate, selectedLang)} (UTC)
          </span>
          <button className="resetFilterButton" onClick={resetFilters}>
            {t("resetfilters")}
          </button>
        </DateRangeContainer>
      </Row>
    </Row>
  );
};

export default ThreatIntelHeader;
