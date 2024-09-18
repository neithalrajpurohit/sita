import { useEffect, useRef, useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Loader from "../../component/Loader";
import {
  NetrumLogoContainer,
  CustomCard,
  Container,
  CustomCardContainer,
  CustomHeading,
  RightsLogoContainer,
  NetrumStyledImg,
  StyledErrorTag,
} from "../GlobalStyles";
import { CustomForgetPass } from "./AuthenticationStyles";
import netrumlogo from "../../assets/images/logo.png";
import BGImg from "../../assets/images/NewBG1.svg";
import poweredBy from "../../assets/images/powered.svg";
import { RoutePath } from "../../helpers/RoutePath";
import { AppDispatch } from "../../index";
import { RootState } from "../../configureStore";
import { userAuthenticationActionCreator } from "../../store/UserAuthentication/UserAuthSlice";
import SITALOGO from "../../assets/images/sita.png";
import { axiosPublic } from "../../helpers/ApiClient";
import { ApiVersion, EndPoints } from "../../helpers/ApiEndPoints";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

const LoginPage = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailerror, setEmailerror] = useState<string>("");
  const [passworderror, setpassworderror] = useState<string>("");
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const [hideMsg, setHideMsg] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.UserAuthentication);

  const navigate = useHistory();

  useEffect(() => {
    if (userData.userAcessToken !== "") return;
    const fetchLang = async () => {
      try {
        const resp = await axiosPublic.post(
          `${ApiVersion}${EndPoints.TENANT_LANG}`,
          {}
        );
        sessionStorage.setItem("lang", resp.data.language);
        i18next.changeLanguage(resp.data.language);
        if (resp.data.is_active === false) {
          window.location.replace("https://netrum-tech.com/");
        }
      } catch (error: any) {
        if (error.request.status === 404) {
          window.location.replace("https://netrum-tech.com/");
        }
      }
    };
    fetchLang();
  }, [userData.userAcessToken]);

  useEffect(() => {
    document.title = "Login";
  }, []);
  const submitRef = useRef<any>();
  const passwordRef = useRef<any>();

  const SubmitForm = (e: any) => {
    e.preventDefault();
    let reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/;
    if (email === "") {
      setEmailerror(`${t("pleaseenteremail")}`);
    } else if (reg.test(email) === false) {
      setEmailerror(`${t("pleaseentervalidemail")}`);
    } else if (password === "") {
      setpassworderror(`${t("pleaseenterpassword")}`);
    } else {
      const body = {
        action: "EMAIL_LOGIN",
        payload: { email: email, password: password },
      };
      dispatch(userAuthenticationActionCreator.getUserDetailsNew(body)).then(
        (res) => {
          if (res.type === "getUserDetailsNew/fulfilled") {
            navigate.push("/Verifyotp");
          }
        }
      );
      setHideMsg(false);
    }
  };
  const ForgetEmail = (e: any) => {
    navigate.push("/Sent_Mail");
  };

  useEffect(() => {
    if (userData.isLoggedIn) {
      if (userData.first_time_login) {
        navigate.replace(RoutePath.RESETPASSWORD);
      } else {
        navigate.replace(RoutePath.DASHBOARD);
      }
    }
  }, [navigate, userData.first_time_login, userData.isLoggedIn]);

  useEffect(() => {
    if (userData.invalidAttempt >= 2) {
      setShowCaptcha(true);
      setDisableBtn(true);
    }
  }, [userData.invalidAttempt]);

  return (
    <Container>
      <img src={BGImg} alt="" loading="eager" className="bgImg" />
      <CustomCardContainer>
        <NetrumLogoContainer>
          <NetrumStyledImg
            src={poweredBy}
            imgheight="1em"
            imgwidth="5em"
            objectFit="cover"
            alt=""
          />
          <NetrumStyledImg
            src={netrumlogo}
            alt=""
            imgheight="3em"
            imgwidth="15em"
            objectFit="cover"
          />
        </NetrumLogoContainer>
        <form onSubmit={SubmitForm}>
          <CustomCard>
            <NetrumStyledImg
              src={SITALOGO}
              alt=""
              imgheight="3em"
              imgwidth="7em"
              objectFit="contain"
            />
            <CustomHeading>{t("login")}</CustomHeading>
            <Row xs={12} className="mx-4 flex-grow-1">
              <Col xs={12} className="my-2">
                <Form.Control
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setHideMsg(true);
                    if (email !== "") {
                      setEmailerror("");
                    }
                  }}
                  type="email"
                  placeholder={t("enteremail")}
                  maxLength={50}
                  className="risk-input-style"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      submitRef.current.click();
                      passwordRef.current.focus();
                    }
                  }}
                />
                <StyledErrorTag>{emailerror}</StyledErrorTag>
              </Col>
              <Col xs={12} className="my-2">
                <InputGroup>
                  <Form.Control
                    name="Password"
                    ref={passwordRef}
                    placeholder={t("enterpassword")}
                    className="risk-input-style"
                    maxLength={16}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        submitRef.current.click();
                      }
                    }}
                    type={passwordShown ? "text" : "password"}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setHideMsg(true);
                      if (password !== "") {
                        setpassworderror("");
                      }
                    }}
                  />
                  <InputGroup.Text
                    id="basic-addon1"
                    onClick={togglePasswordVisiblity}
                  >
                    {!passwordShown ? (
                      // <img src={eye}></img>
                      <HiEye />
                    ) : (
                      <HiEyeSlash />
                    )}
                  </InputGroup.Text>
                </InputGroup>
                <StyledErrorTag>{passworderror}</StyledErrorTag>
              </Col>
              <Col xs={12} className="my-2">
                {showCaptcha && (
                  <div className="captcha">
                    <ReCAPTCHA
                      sitekey="6Lf786IjAAAAAGkgdQcvUi8rztNzUXPokrrrqOkF"
                      onChange={(e) => {
                        if (e !== "") {
                          setDisableBtn(false);
                        }
                      }}
                    />
                  </div>
                )}
                <Row xs={12}>
                  <Col xs={6} onClick={ForgetEmail}>
                    <CustomForgetPass>{t("forgetpassword")} ?</CustomForgetPass>
                  </Col>
                  <Col
                    xs={6}
                    className="d-flex justify-content-end align-items-center"
                  >
                    {userData.isUserDetailLoading ? (
                      <Loader loaderType="BounceLoader" size={40} />
                    ) : (
                      <Button
                        disabled={disableBtn}
                        variant="outline-primary"
                        size="sm"
                        type="submit"
                        ref={submitRef}
                      >
                        {t("submit")}
                      </Button>
                    )}
                  </Col>
                </Row>
              </Col>
              <Row xs={12}>
                {userData.isUserDetailError && !hideMsg && (
                  <span className="text-danger">
                    {userData.userDetailError?.message && (
                      <>{userData.userDetailError.message}</>
                    )}
                  </span>
                )}
              </Row>
            </Row>
          </CustomCard>
        </form>
        <RightsLogoContainer>
          <b>SITA &nbsp;&nbsp;v2.5</b>
          <h6>{t("allrights")} &#169; 2023</h6>
        </RightsLogoContainer>
      </CustomCardContainer>
    </Container>
  );
};
export default LoginPage;
