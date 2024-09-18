import { useEffect, useState } from "react";
import { DateRangePicker } from "react-date-range";
import Select from "react-select";
import { dropdownfilter } from "../../definition/InsightGridStoreProps";
import { Button } from "react-bootstrap";
import { TDropdownData } from "../../definition/InsightGridHeaderData";
import { DateToStringGrid } from "../../utils/Common";
import moment from "moment";
import { InsightGridHeaderProps } from "./GridTypes";
import { useTranslation } from "react-i18next";
// @ts-ignore
import * as locales from "react-date-range/dist/locale";
import useTranslateCalendar from "../../hooks/useTranslateCalender";
import { useSelector } from "react-redux";
import { RootState } from "../../configureStore";
import {
  HiClock,
  HiOutlineCalendarDays,
  HiOutlineChevronDown,
} from "react-icons/hi2";

const GridHeader = (props: InsightGridHeaderProps) => {
  const { t } = useTranslation();
  const {
    handleSelect,
    selectionRange,
    gridSelectedFilter,
    gridHeaderDropdownData,
    handleGridFilterChange,
    handleClickOnAddBtn,
    showAddBtn,
  } = props;
  const selectedLang = useSelector(
    (state: RootState) => state.UserAuthentication.language
  );
  const [isShow, isSetShow] = useState(false);

  const getDefaultDropdownFilters = () => {
    var selectedFilters: dropdownfilter[] = [];
    if (gridSelectedFilter.length === 0) {
      gridHeaderDropdownData?.map((element: TDropdownData) => {
        selectedFilters.push({
          id: element.id,
          // value:'',
          value: element.dropdownoption[0].value,
        });
      });
      return selectedFilters;
    } else {
      return gridSelectedFilter;
    }
  };

  const [dropdownFilters, setDropdownFilters] = useState<dropdownfilter[]>(
    // gridSelectedFilter
    getDefaultDropdownFilters()
  );

  const [isDropdownValueChanged, setisDropdownValueChanged] = useState(false);

  const customStyles = {
    control: (styles: any) => ({
      ...styles,
      border: "1px solid var(--font-color)",
      borderRadius: "10px",
      alignItems: "center",
      gap: "0.625rem",
      backgroundColor: "var(--card-bg-color)",
      cursor: "pointer",
      marginTop: window.innerWidth < 930 && "7px",
      marginBottom: window.innerWidth < 930 && "7px",
      width:
        gridHeaderDropdownData.length >= 6 &&
        window.innerWidth > 930 &&
        "10rem",
    }),
    menuList: (provided: any) => ({
      ...provided,
      borderRadius: "10px",
      "&::-webkit-scrollbar": {
        width: "0.5rem",
        height: "0.5rem",
        zIndex: 2,
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "var(--entityonboarding-text-color)",
        borderRadius: "0.25rem",
      },
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      color: state.isSelected ? "var(--bg-color)" : "var(--font-color)",
      backgroundColor: state.isSelected && "var(--font-color)",
      padding: gridHeaderDropdownData.length >= 6 ? 10 : 20,
      cursor: "pointer",
      width: "98%",
    }),
    menu: (styles: any) => ({
      ...styles,
      width: "min-content",
      fontSize: "0.625rem",
      minWidth: "100%", //for minimum width
      backgroundColor: "var(--card-bg-color)",
      border: "1px solid var(--font-color)",
      borderRadius: "10px !important",
    }),
    singleValue: (provided: any, state: any) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return {
        ...provided,
        opacity,
        transition,
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: "0.833rem",
        lineHeight: "1.125rem",
        /* identical to box height */
        textAlign: "center",
        /* PRIMARY_COLOR */
        color: "var(--font-color)",
      };
    },
  };

  const handleDropdownChange = (
    selectedItem: { label: string; value: string },
    id: string
  ) => {
    setDropdownFilters((dropdownFilters) =>
      dropdownFilters.map((dropdownFilter) => {
        if (dropdownFilter.id === id) {
          return { ...dropdownFilter, id: id, value: selectedItem.value };
        }
        return dropdownFilter;
      })
    );
    setisDropdownValueChanged(true);
  };

  useEffect(() => {
    if (isDropdownValueChanged) {
      handleGridFilterChange(dropdownFilters);
      setisDropdownValueChanged(false);
    }
  }, [dropdownFilters]);

  const handleBlur = (e: any) => {
    //if the element is not child element then it will call this function
    if (!e.currentTarget.contains(e.relatedTarget)) {
      isSetShow(false);
      props.handleBlurPage();
    }
  };
  useTranslateCalendar(isShow);
  return (
    <>
      <div className={"row "}>
        <div className="col-lg-2 d-flex flex-column">
          <div className="" onBlur={(e) => handleBlur(e)}>
            <button
              className="btn btn-outline  mt-1 dateSelectorButton "
              onClick={() => isSetShow(!isShow)}
            >
              <HiOutlineCalendarDays />
              &nbsp; {t("daterange")} &nbsp;
              <HiOutlineChevronDown />
            </button>
            <div className="shadow date-range-chartHeader-grid">
              {isShow && (
                <DateRangePicker
                  ranges={[selectionRange]}
                  onChange={handleSelect}
                  maxDate={moment().toDate()}
                  locale={locales[selectedLang]}
                />
              )}
            </div>
          </div>
        </div>
        <div className="col-lg-10">
          <div className="d-flex justify-content-end  flex-wrap flex-row ">
            {gridHeaderDropdownData?.map((element: any, index: number) => {
              return (
                <div key={index} className="mx-1 grid-header-select z-index-2">
                  <Select
                    className="bg-blue"
                    classNamePrefix="rs"
                    isSearchable={false}
                    id={`react-select-${element.id}`}
                    defaultValue={element?.dropdownoption?.find(
                      (x: any) =>
                        x?.value ===
                        dropdownFilters?.find((y) => y.id === element.id)?.value
                    )}
                    options={element?.dropdownoption}
                    styles={customStyles}
                    onChange={(item) => handleDropdownChange(item, element.id)}
                  />
                </div>
              );
            })}
            {showAddBtn && (
              <Button
                variant="outline-secondary "
                size="sm"
                onClick={handleClickOnAddBtn}
                className={
                  window.innerWidth > 930
                    ? "grid-header-add-btn"
                    : "my-2 grid-header-add-btn"
                }
              >
                {t("add")}
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="w-100">
          <span className="dateRangeInsightOEI">
            <HiClock fontSize="1.05rem" />
            {t("from")} :{" "}
            {DateToStringGrid(selectionRange?.startDate, selectedLang)}{" "}
            {t("to")} :{" "}
            {DateToStringGrid(selectionRange?.endDate, selectedLang)} (UTC)
          </span>
        </div>
      </div>
    </>
  );
};

export default GridHeader;
