import { useEffect, useRef, useState } from "react";
import { useThemeVal } from "../hooks/useThemeVar";
import { theme } from "../pages/GlobalStyles";
import {
  PageMiddleTitle,
  PageTagline,
  MapContainer,
  LocationContainer,
  LocationListEntry,
  ButtonContainer,
  LocationListContainer,
  PageTitle,
  ImageContainer,
  ImageTagline,
  CustomSelectStyles,
  CompanyLogoContainer,
  CompanyLogoCard,
  CompanyLogoInput,
  CompanyLogoCardBody,
  CompanyLogoCardHiPlusIcon,
  EnitityAddUpdateButton,
} from "./GlobalComponentStyles";
import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { HiPencil, HiTrash } from "react-icons/hi2";
import Select from "react-select";
import ReactTooltip from "react-tooltip";

import GoogleMapCard2 from "./GoogleMap/GoogleMapCard2";

import axios from "axios";
import { useTranslation } from "react-i18next";

interface FormData {
  data: any;
  onChange: any;
}

const APIENDPOINT = "https://api.countrystatecity.in/v1/countries";
const APIKEY = "RTRpMjhpbjRSQkFTUzY4WlpCdW5nODhaZXhkUnd2cmM5d3BiWExPaw==";

const AddEntityForm = (props: FormData) => {
  function truncate(str: string) {
    return str.length > 50 ? str.substring(0, 50) + "..." : str;
  }
  const { t } = useTranslation();
  const imageUpload = useRef<HTMLInputElement>(null);
  const { data, onChange } = props;
  const [tooltip, showTooltip] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [imageError, setImageError] = useState("");

  const [locationArr, setLocationArr] = useState({
    countryobj: {} as any,
    stateobj: {} as any,
    cityobj: {} as any,
    country: "",
    state: "",
    city: "",
    office: "",
  });

  const [selectedLocID, setSelectedLocID] = useState("");
  const [toeditLocID, setToEditLocID] = useState("");
  const [countryList, setCountryList] = useState<
    {
      id: number;
      iso2: string;
      name: string;
    }[]
  >([]);
  const [stateList, setStateList] = useState<
    {
      id: number;
      iso2: string;
      name: string;
    }[]
  >([]);
  const [cityList, setCityList] = useState<
    {
      id: number;
      name: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchRes = async () => {
      const respFeeds = await axios.get(APIENDPOINT, {
        headers: {
          "X-CSCAPI-KEY": APIKEY,
        },
      });
      setCountryList(respFeeds.data);
    };
    fetchRes();
  }, []);

  const pushIntoLocationArr = () => {
    if (toeditLocID) {
      const arr = [...data.companyLocations];
      const objIndexToUpdate = arr.findIndex(
        (f: any) => f.locationId === toeditLocID
      );
      arr[objIndexToUpdate] = {
        ...arr[objIndexToUpdate],
        ...locationArr,
      };
      onChange({
        ...data,
        companyLocations: [...arr],
      });

      setLocationArr({
        countryobj: {},
        stateobj: {},
        cityobj: {},
        country: "",
        state: "",
        city: "",
        office: "",
      });
      setToEditLocID("");
      setIsEditing(false);
    } else {
      const locaID = String(
        data.companyLocations
          .map((e: any) => Number(e.locationId))
          .reduce((a: number, b: number) => Math.max(a, b), -Infinity) +
          1 ===
          -Infinity
          ? "1"
          : data.companyLocations
              .map((e: any) => Number(e.locationId))
              .reduce((a: number, b: number) => Math.max(a, b), -Infinity) + 1
      );
      let objtoPush = {};
      if (Object.keys(locationArr.stateobj).length !== 0) {
        if (Object.keys(locationArr.cityobj).length !== 0) {
          objtoPush = {
            ...locationArr,
            locationId: locaID,
            position: {
              lat: Number(locationArr.cityobj.latitude),
              lng: Number(locationArr.cityobj.longitude),
            },
          };
        } else {
          objtoPush = {
            ...locationArr,
            locationId: locaID,
            city: locationArr.stateobj.name,
            position: {
              lat: Number(locationArr.stateobj.latitude),
              lng: Number(locationArr.stateobj.longitude),
            },
          };
        }
      } else {
        objtoPush = {
          ...locationArr,
          locationId: locaID,
          city: locationArr.countryobj.name,
          state: locationArr.countryobj.name,
          position: {
            lat: Number(locationArr.countryobj.latitude),
            lng: Number(locationArr.countryobj.longitude),
          },
        };
      }

      onChange({
        ...data,
        companyLocations: [...data.companyLocations, objtoPush],
      });

      setLocationArr({
        countryobj: {},
        stateobj: {},
        cityobj: {},
        country: "",
        state: "",
        city: "",
        office: "",
      });
    }
  };

  const ToDeleteLoc = () => {
    if (selectedLocID) {
      onChange({
        ...data,
        companyLocations: data.companyLocations.filter(
          (e: any) => e.locationId !== selectedLocID
        ),
      });

      if (selectedLocID === toeditLocID) setToEditLocID("");
      setSelectedLocID("");
    } else return;
  };

  const exampleMapStyles = [
    {
      // featureType: "geometry",
      elementType: "geometry",
      stylers: [{ color: useThemeVal("geometry") }],
    },
    {
      featureType: "water",
      // elementType: "water",

      stylers: [
        {
          color: useThemeVal("water"),
        },
      ],
    },
  ];

  const fileToBase64 = (file: any, cb: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(null, reader.result);
    };
    reader.onerror = function (error) {
      cb(error, null);
    };
  };

  const handleImageUpload = (event: any) => {
    const toAllow = ".png,.jpg,.jpeg,.gif,.webp,.tiff,.heif,.heic";
    if (toAllow.includes("." + event.target.files[0].name.split(".")[1])) {
      let selectedFile = event.target.files[0];
      if (Math.round(selectedFile.size / 1048576) <= 1) {
        fileToBase64(selectedFile, (err: any, result: any) => {
          if (result) {
            onChange({ ...data, companyLogo: result });
          } else {
            onChange({ ...data, companyLogo: "" });
          }
        });
        setImageError("");
      } else {
        setImageError("Image Size Too Large Max Limit is 1MB");
      }
    } else {
      setImageError(
        "Invalid File Type Only png, jpg, jpeg, gif, webp, tiff, heif, heic Allowed "
      );
    }
  };

  return (
    <Container fluid>
      <Row xl={12}>
        <Col xl={5} className="my-2">
          <Row md={12}>
            <Col xs={6} md={8} className="mb-2">
              <PageTitle>{t("entityandlocations")}</PageTitle>
              <PageTagline>{t("releventinfo")}</PageTagline>
              <Form>
                <Form.Group>
                  <PageMiddleTitle>{t("companyname")}</PageMiddleTitle>
                  <Form.Control
                    type="text"
                    placeholder={t("companyname")}
                    maxLength={45}
                    value={data.companyName}
                    className="risk-input-style"
                    onChange={(e) => {
                      let value = e.target.value;
                      value = value.replace(/[^A-Z a-z]/gi, "");
                      onChange({
                        ...data,
                        companyName: value.trim(),
                      });
                    }}
                  />
                </Form.Group>
                <Form.Group>
                  <PageMiddleTitle>{t("noofemployees")}</PageMiddleTitle>
                  <Form.Control
                    type="text"
                    placeholder={t("noofemployees")}
                    maxLength={5}
                    value={data.no_of_employee}
                    className="risk-input-style"
                    onKeyDown={(e) => {
                      const allowedKeys = [
                        "Backspace",
                        "Delete",
                        "Tab",
                        "ArrowLeft",
                        "ArrowRight",
                      ];
                      if (
                        !(
                          (e.key >= "0" && e.key <= "9") ||
                          allowedKeys.includes(e.key)
                        )
                      ) {
                        e.preventDefault();
                      }
                    }}
                    onChange={(e) => {
                      let value = e.target.value;
                      onChange({
                        ...data,
                        no_of_employee: Number(value),
                      });
                    }}
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col xs={6} md={4}>
              <CompanyLogoContainer>
                <CompanyLogoCard onClick={() => imageUpload?.current?.click()}>
                  <CompanyLogoInput
                    ref={imageUpload}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  {data.companyLogo ? (
                    <>
                      <ImageContainer>
                        <img src={data.companyLogo} alt="" />
                      </ImageContainer>
                    </>
                  ) : (
                    <>
                      <CompanyLogoCardHiPlusIcon />
                      <CompanyLogoCardBody>{t("addlogo")}</CompanyLogoCardBody>
                    </>
                  )}
                </CompanyLogoCard>
              </CompanyLogoContainer>
              {imageError !== "" && (
                <ImageTagline className="text-danger">
                  {imageError}
                </ImageTagline>
              )}
              <ImageTagline>{t("maxsize")}</ImageTagline>
            </Col>
          </Row>
          <Form>
            <PageMiddleTitle>{t("operationingeo")}</PageMiddleTitle>
            <Row>
              <Col xs={6}>
                <Form.Group>
                  <PageMiddleTitle>{t("country")}</PageMiddleTitle>
                  <Select
                    id="react-select-country"
                    styles={CustomSelectStyles}
                    theme={theme}
                    noOptionsMessage={({ inputValue }) =>
                      `${t("noresultfound")}`
                    }
                    options={countryList}
                    getOptionLabel={(options: any) => {
                      return options["name"];
                    }}
                    getOptionValue={(options: any) => {
                      return options["name"];
                    }}
                    value={locationArr.countryobj}
                    placeholder={t("country")}
                    onChange={async (item: any) => {
                      const fetchStatelist = await axios.get(
                        APIENDPOINT + "/" + item.iso2 + "/states",
                        {
                          headers: {
                            "X-CSCAPI-KEY": APIKEY,
                          },
                        }
                      );
                      setStateList(fetchStatelist.data);
                      setLocationArr((prev) => {
                        return {
                          ...prev,
                          countryobj: item,
                          country: item.name,
                        };
                      });
                    }}
                  />
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group>
                  <PageMiddleTitle>{t("state")}</PageMiddleTitle>
                  <Select
                    id="react-select-state"
                    styles={CustomSelectStyles}
                    theme={theme}
                    noOptionsMessage={({ inputValue }) =>
                      `${t("noresultfound")}`
                    }
                    options={stateList}
                    getOptionLabel={(options: any) => {
                      return options["name"];
                    }}
                    getOptionValue={(options: any) => {
                      return options["name"];
                    }}
                    placeholder={t("state")}
                    value={locationArr.stateobj}
                    onChange={async (item: any) => {
                      const fetchCityList = await axios.get(
                        APIENDPOINT +
                          "/" +
                          locationArr.countryobj.iso2 +
                          "/states/" +
                          item.iso2 +
                          "/cities",
                        {
                          headers: {
                            "X-CSCAPI-KEY": APIKEY,
                          },
                        }
                      );
                      setCityList(fetchCityList.data);
                      setLocationArr((prev) => {
                        return {
                          ...prev,
                          stateobj: item,
                          state: item.name,
                        };
                      });
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <Form.Group>
                  <PageMiddleTitle>{t("city")}</PageMiddleTitle>
                  <Select
                    id="react-select-city"
                    styles={CustomSelectStyles}
                    theme={theme}
                    noOptionsMessage={({ inputValue }) =>
                      `${t("noresultfound")}`
                    }
                    options={cityList}
                    getOptionLabel={(options) => {
                      return options["name"];
                    }}
                    getOptionValue={(options) => {
                      return options["name"];
                    }}
                    placeholder={t("city")}
                    value={locationArr.cityobj}
                    onChange={(item: any) =>
                      setLocationArr((prev) => {
                        return {
                          ...prev,
                          cityobj: item,
                          city: item.name,
                        };
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col xs={6}>
                <PageMiddleTitle>{t("location")}</PageMiddleTitle>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder={t("location")}
                    maxLength={100}
                    className="risk-input-style"
                    value={locationArr.office}
                    onChange={(e) =>
                      setLocationArr((prev) => {
                        return {
                          ...prev,
                          office: e.target.value,
                        };
                      })
                    }
                  />

                  <EnitityAddUpdateButton
                    variant="outline-success"
                    size="sm"
                    disabled={
                      locationArr.country === "" ||
                      locationArr.office.trim() === ""
                    }
                    onClick={() => {
                      pushIntoLocationArr();
                    }}
                  >
                    {isEditing ? `${t("update")}` : `${t("add")}`}
                  </EnitityAddUpdateButton>
                </InputGroup>
              </Col>
            </Row>
            <Form.Group>
              <PageMiddleTitle>
                {/* {data.companyName} */}
                {t("location")}
              </PageMiddleTitle>
              <LocationContainer>
                <LocationListContainer>
                  <Row xs={12}>
                    {data.companyLocations.map((e: any, index: number) => (
                      <Col xs={11} key={index}>
                        <LocationListEntry
                          data-tip={
                            e.office +
                            ", " +
                            e.city +
                            ", " +
                            e.state +
                            ", " +
                            e.country
                          }
                          data-for="React-tooltip"
                          onMouseEnter={() => {
                            showTooltip(true);
                          }}
                          onMouseLeave={() => showTooltip(false)}
                          key={index}
                          onClick={() => {
                            if (selectedLocID !== e.locationId) {
                              setSelectedLocID(e.locationId);
                            } else {
                              setSelectedLocID("");
                            }
                          }}
                          backgroundColor={
                            e.locationId === selectedLocID ? "#B2B2B2" : ""
                          }
                          color={e.locationId === selectedLocID ? "black" : ""}
                        >
                          {truncate(
                            e.office +
                              ", " +
                              e.city +
                              ", " +
                              e.state +
                              ", " +
                              e.country
                          )}
                        </LocationListEntry>
                        {tooltip && (
                          <ReactTooltip
                            id="React-tooltip"
                            place="top"
                            type="light"
                            effect="float"
                            border
                            textColor="var(--entityonboarding-text-color)"
                            backgroundColor="var(--admin-card-bg-color)"
                            borderColor="var(--entityonboarding-text-color)"
                            getContent={(dataTip) => dataTip}
                          />
                        )}
                      </Col>
                    ))}
                  </Row>
                </LocationListContainer>
                <ButtonContainer>
                  <HiPencil
                    cursor="pointer"
                    onClick={() => {
                      setIsEditing(true);
                      setToEditLocID(selectedLocID);
                      const obj = data.companyLocations.find(
                        (i: any) => i.locationId === selectedLocID
                      );
                      setLocationArr({
                        countryobj: obj.countryobj,
                        stateobj: obj.stateobj,
                        cityobj: obj.cityobj,
                        country: obj.country,
                        state: obj.state,
                        city: obj.city,
                        office: obj.office,
                      });
                    }}
                  />
                  <HiTrash
                    onClick={() => {
                      ToDeleteLoc();
                    }}
                    cursor="pointer"
                  />
                </ButtonContainer>
              </LocationContainer>
            </Form.Group>
          </Form>
        </Col>
        <Col xl={7} className="my-2">
          <MapContainer>
            <GoogleMapCard2
              mapstyle={exampleMapStyles}
              marker={data.companyLocations.map((e: any) => {
                return {
                  ...e.position,
                  info: `${e.office}, ${e.city}, ${e.state},${e.country}`,
                };
              })}
            />
          </MapContainer>
        </Col>
      </Row>
    </Container>
  );
};

export default AddEntityForm;
