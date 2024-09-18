import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { connect, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Loader from "../../component/Loader";
import { AppDispatch } from "../../index";
import { RootState } from "../../configureStore";
import { userAuthenticationActionCreator } from "../../store/UserAuthentication/UserAuthSlice";
import {
  CheckBox,
  CheckBoxLabel,
  CheckBoxWrapper,
  darkTheme,
  lightTheme,
} from "./EditProfile";
import { ThemeProvider } from "styled-components";
import { theme } from "../GlobalStyles";
import Select from "react-select";
import i18next from "i18next";
import { languageOption } from "./SupportedLanguage";
import { useTranslation } from "react-i18next";
import { CustomSelectStyles } from "../../component/GlobalComponentStyles";
import { toast } from "react-toastify";

type EditProfileProps = ReturnType<typeof mapStateToProps>;

const EditProfile = (props: EditProfileProps) => {
  const dispatch: AppDispatch = useDispatch();
  const [hideMsg, setHideMsg] = useState(false);
  const [firstnameerror, setfirstnameerror] = useState<string>("");
  const [lastnameerror, setlastnameerror] = useState<string>("");
  const [imageSizeError, setImageSizeError] = useState<string>("");
  const selectedLang = useSelector(
    (state: RootState) => state.UserAuthentication.language
  );

  const { t } = useTranslation();
  const history = useHistory();

  useEffect(() => {
    document.title = "Edit Profile";
  }, []);

  const submitBtnRef = useRef<any>();

  const [userDetails, setUserDetails] = useState<{
    firstName: string;
    lastName: string;
    profile_photo: string;
    profile_photo_name: string;
    phone_number: string;
  }>({
    firstName: props.UserData.userDetails?.user?.first_name,
    lastName: props.UserData.userDetails?.user?.last_name,
    profile_photo: props.UserData.userDetails?.user?.profile_photo || "",
    profile_photo_name:
      props.UserData.userDetails?.user?.profile_photo_name || "",
    phone_number: props.UserData.userDetails?.user?.phone_number || "",
  });
  const preferedTheme = useSelector(
    (state: RootState) =>
      state.UserAuthentication?.userDetails?.user?.theme_preference
  );
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

  useEffect(() => {
    if (window) {
      window.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
          submitBtnRef.current.click();
        }
      });
    }
  }, []);

  const changeHandler = (event: any) => {
    const toAllow = ".png,.jpg,.jpeg,.gif,.webp,.tiff,.heif,.heic";
    if (toAllow.includes("." + event.target.files[0].name.split(".")[1])) {
      let selectedFile = event.target.files[0];
      let fileName = selectedFile.name;
      if (Math.round(selectedFile.size / 1048576) <= 1) {
        fileToBase64(selectedFile, (err: any, result: any) => {
          if (result) {
            setUserDetails({
              ...userDetails,
              profile_photo: result,
              profile_photo_name: fileName,
            });
          }
        });
        setImageSizeError("");
      } else {
        setImageSizeError(`${t("imagesize")}`);
      }
    } else {
      setImageSizeError(`${t("imageformat")}`);
    }
  };

  const handleChange = (e: any) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
    setHideMsg(false);
  };
  const handleChangePhone = (e: any) => {
    setUserDetails({
      ...userDetails,
      phone_number: e,
    });
    setHideMsg(false);
  };
  const hadleSubmit = () => {
    var reg = /^[a-zA-Z]+('[a-zA-Z])*$/;

    if (imageSizeError !== "") return;
    // console.log(userDetails);
    if (userDetails.firstName === "") {
      setfirstnameerror(`${t("mandatoryfeild")}`);
    } else if (reg.test(userDetails.firstName) === false) {
      setfirstnameerror(`${t("fnalphachart")}`);
    } else if (userDetails.lastName === "") {
      setlastnameerror(`${t("mandatoryfeild")}`);
    } else if (reg.test(userDetails.lastName) === false) {
      setlastnameerror(`${t("lnalphachart")}`);
    } else {
      dispatch(
        userAuthenticationActionCreator.editProfile({
          ...userDetails,
          email: props.UserData.userDetails?.user?.email,
        })
      );
      setHideMsg(true);
    }
  };

  const onLanguageChange = (e: any) => {
    dispatch(userAuthenticationActionCreator.changeLanguage(e.value)).then(
      (res) => {
        toast(res.payload.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
          theme: "dark",
        });
        sessionStorage.setItem("lang", res.payload.data.language);
        i18next.changeLanguage(res.payload.data.language);
      }
    );
  };

  return (
    <Container fluid>
      <Row className="mt-5">
        <Col md={7} className="mb-5">
          <h2 className="EditProfileText ml-2">{t("editprofile")}</h2>
          <Container fluid>
            <Row className="my-4" md={12}>
              <Col lg={12}>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalEmail"
                >
                  <Form.Label column sm={4}>
                    {t("email")}
                  </Form.Label>
                  <Col sm={8}>
                    <h5>{props.UserData.userDetails?.user?.email}</h5>
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            <Row className="my-4" md={12}>
              <Col lg={12}>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalRole"
                >
                  <Form.Label column sm={4}>
                    {t("role")}&nbsp;
                  </Form.Label>
                  <Col sm={8}>
                    <h5>{props.UserData.userDetails?.user?.role}</h5>
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            <Row className="my-4" md={12}>
              <Col lg={12}>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalFirstName"
                >
                  <Form.Label column sm={4}>
                    {t("firstname")}
                    <Form.Label className="text-danger">*</Form.Label>
                  </Form.Label>

                  <Col sm={8}>
                    <Form.Control
                      value={userDetails.firstName}
                      name="firstName"
                      onChange={(e) => {
                        handleChange(e);
                        if (
                          props.UserData.userDetails?.user?.first_name !== ""
                        ) {
                          setfirstnameerror("");
                        }
                      }}
                      type="text"
                      placeholder={t("firstname")}
                      maxLength={15}
                      className="risk-input-style"
                    />
                    <span className="invalidInput">{firstnameerror}</span>
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            <Row className="my-4" md={12}>
              <Col lg={12}>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalLastName"
                >
                  <Form.Label column sm={4}>
                    {t("lastname")}
                    <Form.Label className="text-danger">*</Form.Label>
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      name="lastName"
                      value={userDetails.lastName}
                      onChange={(e) => {
                        handleChange(e);
                        if (
                          props.UserData.userDetails?.user?.last_name !== ""
                        ) {
                          setlastnameerror("");
                        }
                      }}
                      type="text"
                      placeholder={t("lastname")}
                      maxLength={15}
                      className="risk-input-style"
                    />
                    <span className="invalidInput">{lastnameerror}</span>
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            <Row className="my-4" md={12}>
              <Col lg={12}>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalLastName"
                >
                  <Form.Label column sm={4}>
                    {t("profilephoto")}
                  </Form.Label>
                  <Col sm={7}>
                    <div className="d-flex">
                      <Form.Label
                        className="edit-profile-profile-photo"
                        htmlFor="profile_photo"
                      >
                        {t("choosefile")}
                      </Form.Label>
                      <Form.Label className="edit-profile-profile-photo-label">
                        {userDetails.profile_photo_name
                          ? userDetails.profile_photo_name
                          : t("nofilechosen")}
                      </Form.Label>
                    </div>
                    <Form.Control
                      id="profile_photo"
                      name="profile_photo"
                      onChange={changeHandler}
                      type="file"
                      accept="image/*"
                      className="risk-input-style"
                      hidden={true}
                    />
                    <span className="invalidInput">{imageSizeError}</span>
                  </Col>
                  <Col sm={1}>
                    <img
                      src={userDetails?.profile_photo}
                      height="30px"
                      width="30px"
                      alt="user Logo"
                      loading="lazy"
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            <Row className="my-4" md={12}>
              <Col lg={12}>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalLastName"
                >
                  <Form.Label column sm={4}>
                    {t("phonenumber")}
                  </Form.Label>
                  <Col sm={8}>
                    <PhoneInput
                      inputStyle={{
                        width: "100%",
                        backgroundColor: "var(--input-box-color)",
                        color: "var(--riskonboarding-input-font-color)",
                      }}
                      dropdownClass="scrollbar"
                      value={userDetails.phone_number}
                      onChange={(e) => {
                        handleChangePhone(e);
                      }}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            {hideMsg && props.UserData.isEdiProfileSuccess ? (
              <Row className="edit-profile-width-500">
                <Col lg={12}>
                  <div className="alert alert-success  " role="alert">
                    {props.UserData.editProfileMsg
                      ? props.UserData.editProfileMsg
                      : "Profile Edited Successfully"}
                  </div>
                </Col>
              </Row>
            ) : (
              props.UserData.isEditProfileError &&
              hideMsg && (
                <Row className="edit-profile-width-500">
                  <Col lg={12}>
                    <div className="alert alert-danger  " role="alert">
                      {t("erroroccuredwhilefetchingthedata")}
                    </div>
                  </Col>
                </Row>
              )
            )}
            <Row className="float-right">
              <Col>
                <Button
                  variant="outline-danger"
                  className="submit-btn-style"
                  onClick={() => history.goBack()}
                >
                  {t("cancel")}
                </Button>
              </Col>
              <Col>
                {props.UserData.isEditProfileLoading ? (
                  <Loader loaderType="BounceLoader" size={40} />
                ) : (
                  <Button
                    ref={submitBtnRef}
                    variant="outline-success"
                    className="submit-btn-style"
                    onClick={() => hadleSubmit()}
                  >
                    {t("save")}
                  </Button>
                )}
              </Col>
            </Row>
          </Container>
        </Col>
        <Col md={5}>
          <h2 className="EditProfileText ml-2"> {t("themepreference")}</h2>
          <ThemeProvider
            theme={preferedTheme === "dark" ? darkTheme : lightTheme}
          >
            <CheckBoxWrapper className="ml-2">
              <CheckBox
                id="checkbox"
                type="checkbox"
                checked={preferedTheme === "dark"}
                onChange={() => {
                  const themeVar = preferedTheme === "light" ? "dark" : "light";
                  dispatch(
                    userAuthenticationActionCreator.updateTheme({
                      theme_preference: themeVar,
                    })
                  );
                }}
              />
              <CheckBoxLabel htmlFor="checkbox" />
            </CheckBoxWrapper>
          </ThemeProvider>
          <div className="m-4 ">
            <Select
              id="react-select-language"
              placeholder={t("language")}
              styles={CustomSelectStyles}
              theme={theme}
              value={languageOption.find((f) => f.value === selectedLang)}
              onChange={onLanguageChange}
              options={languageOption}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

// export default EditProfile;

function mapStateToProps(state: RootState) {
  return {
    UserData: state.UserAuthentication,
  };
}

export default connect(mapStateToProps)(EditProfile);
