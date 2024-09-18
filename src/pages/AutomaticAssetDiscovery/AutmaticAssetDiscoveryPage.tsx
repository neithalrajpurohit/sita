import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import AADGrid, {
  GridDataItem,
} from "../../component/AutomaticAssetDiscovery/AADGrid";
import LazyLoading from "../../component/LazyLoading";
import { RootState } from "../../configureStore";
import { axiosPrivate } from "../../helpers/ApiClient";
import { EndPoints } from "../../helpers/ApiEndPoints";
import { AppDispatch } from "../../index";
import { AADPageActionCreator } from "../../store/AutomaticAssetDiscovery/AADSlice";
import {
  MainContent,
  PageContainer,
  PageTitle,
} from "../EntityOnboarding/EntityStyles";
import { LoadingContainer, Overlapstyles, theme } from "../GlobalStyles";
import NoDataAvailable from "../../component/reuseableComp/NoDataAvailable";
import ReusableCard from "../../component/reuseableComp/ReusableCard";

const AutmaticAssetDiscoveryPage = () => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const isLoading = useSelector(
    (state: RootState) => state.AutomaticAssetDiscovery.isLoading
  );
  const gridHeader = useSelector(
    (state: RootState) => state.AutomaticAssetDiscovery.gridHeader
  );
  const gridData = useSelector(
    (state: RootState) => state.AutomaticAssetDiscovery.gridData
  );
  const [filterOptions, setFilterOptions] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);

  const selectedService = useSelector(
    (state: RootState) => state.AutomaticAssetDiscovery.selectedService
  );

  const { SECEON_SERVICES } = EndPoints;
  useEffect(() => {
    document.title = t("automaticassetdiscovery");
  }, [t]);

  useEffect(() => {
    const fetchRes = async () => {
      const response = await axiosPrivate.post(SECEON_SERVICES, {});
      setFilterOptions(response.data.data);
    };
    fetchRes();
  }, [SECEON_SERVICES]);

  const handelFilterChange = (e: any) => {
    dispatch(AADPageActionCreator.fetchAADGridData(e));
  };

  // Function to handle the click on column1 or ID column1 will Always Be ID
  const handleColumn1Click = (row: GridDataItem) => {
    // Add your custom logic here for column1 click
    // const payload = {
    //   label: selectedService.label,
    //   value: selectedService.value,
    //   mitre_technique_id: row.column1,
    // };
    // dispatch(AADPageActionCreator.fetchAADEventDetails(payload)).then(() => {
    //   history.push(RoutePath.AUTOMATICASSETDISCOVERYEVENTDETAIL);
    // });
  };

  return (
    <PageContainer>
      <Row lg={12} className="mt-2">
        <PageTitle>{t("automaticassetdiscovery")}</PageTitle>
      </Row>
      <Row lg={12} className="mt-4 mb-1">
        <Col xs={2}>
          <Select
            id="react-select-service"
            isDisabled={isLoading}
            placeholder={t("selectservice")}
            value={selectedService.value === "" ? [] : selectedService}
            styles={Overlapstyles}
            theme={theme}
            noOptionsMessage={({ inputValue }) =>
              inputValue && `${t("noresultfound")}`
            }
            onChange={(e) => handelFilterChange(e)}
            options={filterOptions}
            components={{
              DropdownIndicator: () => null,
              IndicatorSeparator: () => null,
            }}
          />
        </Col>
      </Row>

      <MainContent paddingBottom="0.85rem">
        {isLoading ? (
          <LoadingContainer height="72vh">
            <LazyLoading />
          </LoadingContainer>
        ) : (
          <>
            {selectedService.value === "" ? (
              <LoadingContainer height="72vh">
                {t("pleaseselectaservice")}
              </LoadingContainer>
            ) : (
              <ReusableCard height={35} borderLess={true}>
                {gridData.length > 0 ? (
                  <AADGrid
                    showPrevBtn={true}
                    itemsPerPage={12}
                    gridHeader={gridHeader}
                    gridData={gridData}
                    handleColumn1Click={handleColumn1Click}
                  />
                ) : (
                  <NoDataAvailable />
                )}
              </ReusableCard>
            )}
          </>
        )}
      </MainContent>
    </PageContainer>
  );
};

export default AutmaticAssetDiscoveryPage;
