import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import GetLangForMap from "../../utils/GetLangForMap";

const center = {
  lat: 21.78,
  lng: 3.684,
};

interface MapStylesArry {
  mapstyle: any;
  marker: any[];
}

const GoogleMapCard2 = (props: MapStylesArry) => {
  const { mapstyle, marker } = props;
  const [showInfoWindow, setShowInfoWindow] = useState<Record<string, boolean>>(
    {}
  );

  const [zoom, setZoom] = useState(2);
  const lang = GetLangForMap();

  useEffect(() => {
    if (window.innerWidth >= 1920) {
      setZoom(window.innerWidth / 1000);
    } else {
      setZoom(2);
    }
  }, []);

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  return (
    <>
      <LoadScript
        googleMapsApiKey="AIzaSyAxmAMQxzq9rG52lulvRexqkDxZlqN52GE"
        language={lang}
      >
        <GoogleMap
          options={{
            minZoom: zoom,
            maxZoom: 15,
            styles: mapstyle,
            draggable: true,
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
          {/* Child components, such as markers, info windows, etc. */}

          {marker &&
            marker.map((e: any, index: number) => (
              <Marker
                key={index}
                position={e}
                onClick={() => console.log(e)}
                onMouseOver={() =>
                  setShowInfoWindow({ ...showInfoWindow, [e.info]: true })
                }
                onMouseOut={() =>
                  setShowInfoWindow({ ...showInfoWindow, [e.info]: false })
                }
              >
                {showInfoWindow[e.info] === true && (
                  <InfoWindow>
                    <h4 className="font-size-point-75-rem  font-color-black">
                      {e.info}
                    </h4>
                  </InfoWindow>
                )}
              </Marker>
            ))}
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default GoogleMapCard2;
