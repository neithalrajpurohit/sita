import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Select from "react-select";
import { RootState } from "../../configureStore";
import { Overlapstyles, StyledColumn, theme } from "../../pages/GlobalStyles";
import { PageTitle } from "../Entity/EntityStyles";
import { Dropdown, Form } from "react-bootstrap";
interface THeaderProps {
  getFilters: (string: "GeoLocation" | "Function" | "Process") => {
    value: number;
    label: string;
  }[];
  handleFilters: (e: any, filterType: string) => void;
  dropDownItems: any[];
  apiWithThrottle: any;
  toggleChartVisibility: any;
  riskCards: any[];
  resetHandler: () => void;
}
function RUDHeader({
  getFilters,
  handleFilters,
  riskCards,
  toggleChartVisibility,
  dropDownItems,
  resetHandler,
}: THeaderProps) {
  const { t } = useTranslation();
  const isLoading = useSelector((state: RootState) => state.RUD.isLoading);
  const filterOptions = useSelector(
    (state: RootState) => state.RUD.all_filter_options
  );

  return (
    <>
      <StyledColumn xs={6} lg={2}>
        <PageTitle>{t("riskimpact")}</PageTitle>
      </StyledColumn>
      <StyledColumn
        xs={6}
        lg={2}
        pointerEvents={isLoading ? "none" : "all"}
        className="ml-auto"
      >
        <Select
          id="react-select-geo"
          isMulti
          isDisabled={isLoading}
          placeholder={t("geo")}
          value={getFilters("GeoLocation")}
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

      <StyledColumn xs={6} lg={2} pointerEvents={isLoading ? "none" : "all"}>
        <Select
          id="react-select-function"
          isMulti
          isDisabled={isLoading}
          placeholder={t("function")}
          value={getFilters("Function")}
          styles={Overlapstyles}
          theme={theme}
          noOptionsMessage={({ inputValue }) =>
            inputValue && `${t("noresultfound")}`
          }
          onChange={(e) => handleFilters(e, "Function")}
          options={filterOptions.Function}
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
        />
      </StyledColumn>
      <StyledColumn xs={6} lg={2} pointerEvents={isLoading ? "none" : "all"}>
        <Select
          id="react-select-process"
          isMulti
          isDisabled={isLoading}
          placeholder={t("process")}
          value={getFilters("Process")}
          styles={Overlapstyles}
          theme={theme}
          noOptionsMessage={({ inputValue }) =>
            inputValue && `${t("noresultfound")}`
          }
          onChange={(e) => handleFilters(e, "Process")}
          options={filterOptions.Process}
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
        />
      </StyledColumn>
      <StyledColumn xs={6} lg={2}>
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

              let findItem = riskCards.find((card) => card.id === item.id);
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
                      onChange={() => toggleChartVisibility(item.id, index)}
                    />
                  </Form>
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      </StyledColumn>
      <StyledColumn xs={6} lg={1}>
        <button
          className="btn btn-outline hover-btn reset-layout-btn-style"
          id="dropdown-basic"
          onClick={() => resetHandler()}
        >
          {t("reset")}
        </button>
      </StyledColumn>
    </>
  );
}

export default RUDHeader;
