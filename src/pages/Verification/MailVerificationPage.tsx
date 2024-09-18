import { useEffect, useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import {
  Container,
  NetrumLogoContainer,
  RightsLogoContainer,
  CustomCardContainer,
  CustomCard,
  CustomHeading,
  NetrumStyledImg,
} from "../GlobalStyles";
import netrumlogo from "../../assets/images/logo.png";
import BGImg from "../../assets/images/NewBG1.svg";
import poweredBy from "../../assets/images/powered.svg";
import SITALOGO from "../../assets/images/sita.png";
import {
  StyledFormContainer,
  ButtonContainer2,
  StyledMsgOTPPage,
} from "./VerificationStyles";
import { useTranslation } from "react-i18next";
import { axiosPublic } from "../../helpers/ApiClient";
import { EndPoints } from "../../helpers/ApiEndPoints";

const MailVerificationPage = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<any>();
  const [msg, setMsg] = useState<any>();

  const [hideMsg, setHideMsg] = useState(false);

  useEffect(() => {
    document.title = "Forget Password";
  }, []);

  const SubmitForm = async (e: any) => {
    e.preventDefault();
    const response = await axiosPublic.post(EndPoints.FORGET_PASSWORD, {
      email: email,
    });
    setHideMsg(true);
    setStatus(response.data.Data["Status"]);
    setMsg(response.data.Data["Message"]);
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
        <form onSubmit={SubmitForm}>
          <CustomCard>
            <NetrumStyledImg
              src={SITALOGO}
              alt=""
              imgheight="3em"
              imgwidth="7em"
              objectFit="contain"
            />
            <CustomHeading>{t("forgetpassword")}</CustomHeading>
            <Row xs={12} className="mx-4 flex-grow-1">
              <StyledMsgOTPPage>{t("kindlyemail")}</StyledMsgOTPPage>
              <StyledFormContainer>
                <Form.Control
                  required
                  placeholder={t("enteremail")}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setHideMsg(true);
                  }}
                />

                <ButtonContainer2>
                  <Button variant="outline-primary" size="sm" type="submit">
                    {t("submit")}
                  </Button>
                </ButtonContainer2>

                {hideMsg && status && (
                  <div
                    className={
                      status === "SUCCESS" || status === 200
                        ? "text-success text-align-start w-100"
                        : "text-danger text-align-start w-100"
                    }
                    role="alert"
                  >
                    {msg}
                  </div>
                )}
              </StyledFormContainer>
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
export default MailVerificationPage;
