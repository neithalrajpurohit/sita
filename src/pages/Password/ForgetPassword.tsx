import { useEffect, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Loader from "../../component/Loader";
import { RootState } from "../../configureStore";
import { useTranslation } from "react-i18next";
import { isStrongPassword } from "../../utils/PasswordValidationFunction";
import { axiosPublic } from "../../helpers/ApiClient";
import { EndPoints } from "../../helpers/ApiEndPoints";

type ResetPasswordProps = ReturnType<typeof mapStateToProps>;

const ForgetPasswordPage = (props: ResetPasswordProps) => {
  const { t } = useTranslation();
  const [hideMsg, setHideMsg] = useState(false);
  const [resetpasswordstatus, setResetPasswordStatus] = useState("");
  const [resetpasswordmessage, setResetPasswordMessage] = useState("");
  const [sessionvalid, setSessionValid] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [passMsg, setPassMsg] = useState("");
  let { token } = useParams<any>();
  const [userName, setUserName] = useState({
    firstName: "",
    lastName: "",
  });

  const history = useHistory();

  const [passwordShown, setPasswordShown] = useState({
    newPasswordShown: false,
    confirmedPasswordShown: false,
  });

  const togglePasswordVisiblity = (name: string, key: boolean) => {
    setPasswordShown({
      ...passwordShown,
      [name]: !key,
    });
  };

  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
  });
  useEffect(() => {
    const getAuthentication = async () => {
      const sessiondetails = await axiosPublic.post(EndPoints.SESSION_CHECK, {
        token: token,
      });
      setSessionValid(sessiondetails.data.Data["Status"]);
      setUserEmail(sessiondetails.data.Data["userEmail"]);
      setUserName({
        firstName: sessiondetails.data.Data["firstName"],
        lastName: sessiondetails.data.Data["lastName"],
      });
    };
    getAuthentication();
  }, [token]);
  const [confirmPassword, setConfirmedPassword] = useState("");
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setHideMsg(false);
  };
  async function hadleSubmit() {
    if (
      isStrongPassword(
        formData.newPassword,
        userName.firstName,
        userName.lastName
      ) === false
    ) {
      setPassMsg(`${t("passvalid")}`);
    } else {
      try {
        const response = await axiosPublic.post(EndPoints.RESET_PASSWORD, {
          email: userEmail,
          newPassword: formData.newPassword,
        });
        setResetPasswordStatus(response.data.Status);
        setResetPasswordMessage(response.data.Message);
        setHideMsg(true);
        if (response.data.Status === "SUCCESS") {
          setTimeout(() => {
            setResetPasswordStatus("");
            setResetPasswordMessage("");
            setHideMsg(false);
            history.push("/login");
          }, 3000);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  function hadleLogin() {
    history.push("/login");
  }

  return sessionvalid === "SUCCESS" ? (
    <Row className="mt-5">
      <h1 className="EditProfileText ml-2">CHANGE PASSWORD</h1>
      <Container className="ml-2 my-4 edit-profile-width-500">
        <Row>
          <Col lg={12}>
            <h4>{userEmail}</h4>
          </Col>
        </Row>

        <Row className="my-4 mt-5">
          <Col lg={12}>
            <InputGroup>
              <Form.Control
                name="newPassword"
                value={formData.newPassword}
                onChange={(e) => handleChange(e)}
                type={passwordShown.newPasswordShown ? "text" : "password"}
                placeholder={t("enternewpassword")}
              />
              <InputGroup.Text
                id="basic-addon1"
                onClick={() =>
                  togglePasswordVisiblity(
                    "newPasswordShown",
                    passwordShown.newPasswordShown
                  )
                }
              >
                {!passwordShown.newPasswordShown ? (
                  <i className="fa-solid fa-eye"></i>
                ) : (
                  <i className="fa-solid fa-eye-slash "></i>
                )}
              </InputGroup.Text>
            </InputGroup>
          </Col>
        </Row>
        <Row className="my-4">
          <Col lg={12}>
            <InputGroup>
              <Form.Control
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmedPassword(e.target.value);
                  setHideMsg(false);
                }}
                type={
                  passwordShown.confirmedPasswordShown ? "text" : "password"
                }
                placeholder={t("confirmpassword")}
              />
              <InputGroup.Text
                id="basic-addon1"
                onClick={() =>
                  togglePasswordVisiblity(
                    "confirmedPasswordShown",
                    passwordShown.confirmedPasswordShown
                  )
                }
              >
                {!passwordShown.confirmedPasswordShown ? (
                  <i className="fa-solid fa-eye"></i>
                ) : (
                  <i className="fa-solid fa-eye-slash "></i>
                )}
              </InputGroup.Text>
            </InputGroup>
          </Col>
        </Row>
        <p className="text-danger">{passMsg}</p>
        {formData.newPassword !== "" && confirmPassword !== "" && (
          <>
            {formData.newPassword === confirmPassword ? (
              <p className="text-success pl-3 alert alert-success">
                {t("passmatch")}
                <i className="px-2 fa fa-check-circle"></i>
              </p>
            ) : (
              <p className="text-danger pl-3 alert alert-danger">
                {t("passdmatch")}
                <i className="px-2 fa fa-times"></i>
              </p>
            )}
          </>
        )}
        <Row className="width-525">
          {hideMsg && resetpasswordstatus ? (
            <Row className="">
              <Col lg={12}>
                <div
                  className={
                    resetpasswordstatus === "SUCCESS"
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {resetpasswordmessage ? resetpasswordmessage : ""}
                </div>
              </Col>
            </Row>
          ) : (
            hideMsg &&
            props.UserData.isResetPasswordError && (
              <Row className="">
                <Col lg={12}>
                  <div className="alert alert-danger  " role="alert">
                    {props.UserData.resetPasswordMsg?.message
                      ? props.UserData.resetPasswordMsg?.message
                      : props.UserData.resetPasswordMsg?.detail
                      ? props.UserData.resetPasswordMsg?.detail
                      : `${t("erroroccuredwhilefetchingthedata")}`}
                  </div>
                </Col>
              </Row>
            )
          )}
        </Row>

        <Row className="float-right">
          <Col>
            {props.UserData.isResetPasswordLoading ? (
              <Loader loaderType="BounceLoader" size={40} />
            ) : (
              <Button
                variant="outline-success"
                className="submit-btn-style"
                onClick={() => hadleSubmit()}
                disabled={
                  formData.newPassword === "" ||
                  formData.newPassword !== confirmPassword
                }
              >
                {t("submit")}
              </Button>
            )}
          </Col>
        </Row>
      </Container>
    </Row>
  ) : (
    <Row className="mt-5">
      <h1 className="EditProfileText ml-5">Session Expired!!</h1>
      <Container className="ml-2 my-4 edit-profile-width-500">
        <Row>
          <Button
            variant="outline-secondary"
            className="login-btn-style"
            onClick={() => hadleLogin()}
          >
            Go to Login
          </Button>
        </Row>
      </Container>
    </Row>
  );
};

// export default ResetPassword;
function mapStateToProps(state: RootState) {
  return {
    UserData: state.UserAuthentication,
  };
}

export default connect(mapStateToProps)(ForgetPasswordPage);
