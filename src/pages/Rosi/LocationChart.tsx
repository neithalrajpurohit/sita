import GoogleMapCard from "../../component/GoogleMap/GoogleMapCard";
import { useThemeVal } from "../../hooks/useThemeVar";
import { fontStyle } from "../../component/highcharts/ChartStyles";
import {
  PageMiddleTitle,
  GoogleMapStyle,
  GoogleMapPageTitle,
} from "../../component/GlobalComponentStyles";
import { useTranslation } from "react-i18next";

interface LocationData {
  onChartClick: (val: string) => void;
  data: any[];
}

const LocationChart = (props: LocationData) => {
  const { onChartClick } = props;
  const { t } = useTranslation();

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

  return (
    <>
      <GoogleMapPageTitle>
        {t("geographicallocations").toUpperCase()}
      </GoogleMapPageTitle>
      <GoogleMapStyle>
        <GoogleMapCard
          handleClick={(e: any) => onChartClick(e.key)}
          mapstyle={exampleMapStyles}
          dynamicIcon={true}
          data={props.data}
        />
      </GoogleMapStyle>
    </>
  );
};

export default LocationChart;
