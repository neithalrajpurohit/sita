import qrcode from "qrcode";
import { ReactElement, useEffect, useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import netrumlogo from "../../assets/images/logo.png";
import BGImg from "../../assets/images/NewBG1.svg";
import poweredBy from "../../assets/images/powered.svg";
import SITALOGO from "../../assets/images/sita.png";
import { RoutePath } from "../../helpers/RoutePath";
import { AppDispatch } from "../../index";
import { RootState } from "../../configureStore";
import {
  Container,
  NetrumLogoContainer,
  RightsLogoContainer,
  CustomCardContainer,
  CustomCard,
  CustomHeading,
  NetrumStyledImg,
} from "../GlobalStyles";
import {
  StyledFormContainer,
  ButtonContainer,
  QRContainer,
  StyledMsgOTPPage,
} from "./VerificationStyles";

import { userAuthenticationActionCreator } from "../../store/UserAuthentication/UserAuthSlice";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { ThreatIntelStoreActionCreator } from "../../store/ThreatIntel/ThreatIntelSlice";

const OtpVerificationPage = () => {
  const { t } = useTranslation();
  const userDetails = useSelector(
    (state: RootState) => state.UserAuthentication
  );
  const [qrimg, setQrimg] = useState<ReactElement | null>(null);
  const [otpnumber, setOtpnumber] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const navigate = useHistory();
  const [otperror, setOtperror] = useState(false);
  useEffect(() => {
    document.title = "Verifyotp";
  }, []);

  useEffect(() => {
    if (userDetails.otpauth_url) {
      qrcode.toDataURL(userDetails.otpauth_url, (err, data) => {
        setQrimg(<img src={data} alt="qrcode" />);
      });
    }
  }, [userDetails.otpauth_url]);

  useEffect(() => {
    if (userDetails.isLoggedIn) {
      if (userDetails.first_time_login) {
        toast(t("pleaseresetyourpassword"), {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
          theme: "dark",
        });
        navigate.push(RoutePath.RESETPASSWORD);
      } else {
        dispatch(ThreatIntelStoreActionCreator.FetchCybleModuleSubsciption());
        navigate.push(RoutePath.DASHBOARD);
      }
    }
  }, [
    dispatch,
    navigate,
    userDetails.first_time_login,
    userDetails.isLoggedIn,
  ]);

  const onValidation = (e: any) => {
    e.preventDefault();
    let payload;

    if (userDetails.mfa_status) {
      payload = {
        action: "MFA_LOGIN",
        payload: {
          email: userDetails.email,
          password: userDetails.password,
          totp: otpnumber,
        },
      };
    } else {
      payload = {
        action: "MFA_LOGIN",
        payload: {
          email: userDetails.email,
          password: userDetails.password,
          totp: otpnumber,
        },
      };
    }

    dispatch(userAuthenticationActionCreator.getUserDetails(payload)).then(
      (res) => {
        if (res.type === "getUserDetails/fulfilled") {
          setOtperror(false);
        } else if (res.type === "getUserDetails/rejected") {
          setOtperror(true);
        }
      }
    );
  };

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
        <CustomCard>
          <NetrumStyledImg
            src={SITALOGO}
            alt=""
            imgheight="3em"
            imgwidth="7em"
            objectFit="contain"
          />
          <CustomHeading>{t("verification")}</CustomHeading>
          <Row xs={12} className="mx-4 flex-grow-1">
            {userDetails.mfa_status === false && (
              <StyledMsgOTPPage>
                {t("scanqr")} <b>{userDetails.email}</b>
              </StyledMsgOTPPage>
            )}
            {userDetails.mfa_status === true && (
              <StyledMsgOTPPage>
                {t("kindlypin")} &nbsp;
                <b>{userDetails.email}</b>
              </StyledMsgOTPPage>
            )}
            {userDetails.mfa_status === false && (
              <QRContainer>{qrimg}</QRContainer>
            )}
            <form onSubmit={onValidation}>
              <StyledFormContainer>
                <Form.Control
                  value={otpnumber}
                  onChange={(e) => {
                    setOtpnumber(e.target.value.replace(/[^0-9.]/g, ""));
                  }}
                  type="text"
                  placeholder={t("otpnumber")}
                  maxLength={6}
                  autoFocus={true}
                  pattern="[0-9]+"
                />
                <ButtonContainer>
                  {otperror ? (
                    <span className="text-danger"> {t("invalidotp")}</span>
                  ) : (
                    <span className="text-danger"></span>
                  )}
                  <Button variant="outline-primary" type="submit">
                    {t("verifyotp")}
                  </Button>
                </ButtonContainer>
              </StyledFormContainer>
            </form>
          </Row>
        </CustomCard>

        <RightsLogoContainer>
          <b>SITA &nbsp;&nbsp;v2.5</b>
          <h6> {t("allrights")} &#169; 2023</h6>
        </RightsLogoContainer>
      </CustomCardContainer>
    </Container>
  );
};

export default OtpVerificationPage;
