import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import GetLangForMap from "../../../utils/GetLangForMap";

interface MapStylesArry {
  onChartClick: (val: string) => void;
  mapstyle: any;
  data: any[];
}

const RUDGoogleMap = (props: MapStylesArry) => {
  const { mapstyle, data, onChartClick } = props;
  const [zoom, setZoom] = useState(2);
  const [loader, setLoader] = useState(false);
  const containerStyle = {
    width: "100%",
    height: "100%",
    borderRadius: "15px",
  };

  const [lang, setLang] = useState(GetLangForMap());

  const center =
    data.length > 0
      ? data.find((e) => e.filtered === true) !== undefined
        ? data.find((e) => e.filtered === true).position
        : data.map((loc) => loc)[0].position
      : {
          lat: 21.78,
          lng: 3.684,
        };

  useEffect(() => {
    setLoader(true);
    return () => {
      setLoader(false);
    };
  }, [lang]);

  useEffect(() => {
    if (window.innerWidth >= 1920) {
      setZoom(window.innerWidth / 1000);
    } else {
      setZoom(2);
    }
  }, []);

  return (
    <>
      {loader && (
        <LoadScript
          googleMapsApiKey="AIzaSyAxmAMQxzq9rG52lulvRexqkDxZlqN52GE"
          language={lang}
        >
          <GoogleMap
            options={{
              minZoom: zoom,
              maxZoom: 15,
              styles: mapstyle,
              disableDefaultUI: false,
              gestureHandling: "greedy",
              zoomControlOptions: { position: 9 },
              streetViewControl: false,
              fullscreenControl: false,
            }}
            mapContainerStyle={containerStyle}
            center={center}
            zoom={zoom}
          >
            {data &&
              data.map((e: any) => (
                <Marker
                  key={e.key}
                  icon={
                    e.filtered
                      ? require("../../../assets/cardIcons/greenpin.png")
                      : require("../../../assets/cardIcons/redpin.png")
                  }
                  position={e.position}
                  onClick={() => onChartClick(e.key)}
                />
              ))}
          </GoogleMap>
        </LoadScript>
      )}
    </>
  );
};

export default RUDGoogleMap;
