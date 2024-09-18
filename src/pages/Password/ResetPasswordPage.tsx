import { useState, useEffect, useRef } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { AppDispatch } from "../../index";
import { useHistory } from "react-router-dom";
import Loader from "../../component/Loader";
import { RootState } from "../../configureStore";
import { userAuthenticationActionCreator } from "../../store/UserAuthentication/UserAuthSlice";
import { useTranslation } from "react-i18next";
import { isStrongPassword } from "../../utils/PasswordValidationFunction";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
type ResetPasswordProps = ReturnType<typeof mapStateToProps>;

const ResetPasswordPage = (props: ResetPasswordProps) => {
  const dispatch: AppDispatch = useDispatch();
  const [hideMsg, setHideMsg] = useState(false);
  const [passworderror, setpassworderror] = useState<string>("");
  const { t } = useTranslation();
  const userDetails = useSelector(
    (state: RootState) => state.UserAuthentication.userDetails.user
  );

  const firstTimeLogin = useSelector(
    (state: RootState) => state.UserAuthentication.first_time_login
  );

  const history = useHistory();
  const [passwordShown, setPasswordShown] = useState({
    oldPasswordShown: false,
    newPasswordShown: false,
    confirmedPasswordShown: false,
  });

  const submitBtnRef = useRef<any>();

  useEffect(() => {
    document.title = "Reset Password";
  }, []);

  const handleLogout = () => {
    dispatch(userAuthenticationActionCreator.handleLogout());
    sessionStorage.clear();
    history.push("/login");
  };

  const togglePasswordVisiblity = (name: string, key: boolean) => {
    setPasswordShown({
      ...passwordShown,
      [name]: !key,
    });
  };

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [confirmPassword, setConfirmedPassword] = useState("");
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setHideMsg(false);
  };
  const hadleSubmit = () => {
    const passwordCheck = isStrongPassword(
      formData.newPassword,
      userDetails.first_name,
      userDetails.last_name
    );
    if (
      formData.oldPassword === "" ||
      formData.newPassword === "" ||
      formData.newPassword !== confirmPassword
    ) {
      setpassworderror(`${t("allrequired")}`);
      return;
    }
    if (passwordCheck === false) {
      setpassworderror(`${t("passvalid")}`);
    } else {
      if (firstTimeLogin) {
        dispatch(
          userAuthenticationActionCreator.resetPassword({
            ...formData,
            email: props.UserData.userDetails?.user?.email,
          })
        ).then((res) => {
          if (res.payload.status === "SUCCESS") {
            toast(t("relogin"), {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              progress: undefined,
              theme: "dark",
            });
            handleLogout();
            setHideMsg(true);
          } else {
            toast(res.payload.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              progress: undefined,
              theme: "dark",
            });
            setHideMsg(true);
          }
        });
      } else {
        dispatch(
          userAuthenticationActionCreator.resetPassword({
            ...formData,
            email: props.UserData.userDetails?.user?.email,
          })
        );
        setHideMsg(true);
      }
    }
  };

  return (
    <Row className="mt-5">
      <h1 className="EditProfileText ml-2">{t("resetpassword")}</h1>
      <Container className="ml-2 my-4 resetpassword-container">
        <Row>
          <Col lg={12}>
            <div className="flex-direction-row">
              <Form.Label>{t("oldpassword")}</Form.Label>
              <Form.Label className="text-danger">*</Form.Label>
            </div>
            <InputGroup>
              <Form.Control
                value={formData.oldPassword}
                name="oldPassword"
                onChange={(e) => handleChange(e)}
                type={passwordShown.oldPasswordShown ? "text" : "password"}
                placeholder={t("enteroldpassword")}
                className="risk-input-style"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    submitBtnRef.current.click();
                  }
                }}
              />
              <InputGroup.Text
                id="basic-addon1"
                onClick={() =>
                  togglePasswordVisiblity(
                    "oldPasswordShown",
                    passwordShown.oldPasswordShown
                  )
                }
              >
                {!passwordShown.oldPasswordShown ? (
                  <i className="fa-solid fa-eye"></i>
                ) : (
                  <i className="fa-solid fa-eye-slash "></i>
                )}
              </InputGroup.Text>
            </InputGroup>
          </Col>
        </Row>

        <Row className="my-4 mt-5">
          <Col lg={12}>
            <div className="flex-direction-row">
              <Form.Label>{t("newpassword")}</Form.Label>
              <Form.Label className="text-danger">*</Form.Label>
            </div>

            <InputGroup>
              <Form.Control
                name="newPassword"
                value={formData.newPassword}
                onChange={(e) => {
                  handleChange(e);
                  if (formData.newPassword !== "") {
                    setpassworderror("");
                  }
                }}
                type={passwordShown.newPasswordShown ? "text" : "password"}
                placeholder={t("enternewpassword")}
                className="risk-input-style"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    submitBtnRef.current.click();
                  }
                }}
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
            <div className="flex-direction-row">
              <Form.Label>{t("confirmpassword")}</Form.Label>
              <Form.Label className="text-danger">*</Form.Label>
            </div>

            <InputGroup>
              <Form.Control
                //   name="newPassword"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmedPassword(e.target.value);
                  setHideMsg(false);
                }}
                type={
                  passwordShown.confirmedPasswordShown ? "text" : "password"
                }
                placeholder={t("enternewpasswordagain")}
                className="risk-input-style"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    submitBtnRef.current.click();
                  }
                }}
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
            <p className="text-danger">{passworderror}</p>
          </Col>
        </Row>
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
        <Row className="width-32-point-8rem">
          {hideMsg && props.UserData.isResetPasswordSuccess ? (
            <Row className="">
              <Col lg={12}>
                <div
                  className={
                    props.UserData.resetPasswordMsg?.status === "SUCCESS"
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {props.UserData.resetPasswordMsg?.message
                    ? props.UserData.resetPasswordMsg?.message
                    : props.UserData.resetPasswordMsg?.details
                    ? props.UserData.resetPasswordMsg?.details
                    : ""}
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
          {!firstTimeLogin && (
            <Col>
              <Button
                variant="outline-danger"
                className="submit-btn-style"
                onClick={() => history.push("/")}
              >
                {t("cancel")}
              </Button>
            </Col>
          )}
          <Col>
            {props.UserData.isResetPasswordLoading ? (
              <Loader loaderType="BounceLoader" size={40} />
            ) : (
              <Button
                variant="outline-success"
                className="submit-btn-style"
                ref={submitBtnRef}
                onClick={() => hadleSubmit()}
                disabled={
                  formData.newPassword === "" ||
                  formData.oldPassword === "" ||
                  formData.newPassword !== confirmPassword
                }
              >
                {t("save")}
              </Button>
            )}
          </Col>
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

export default connect(mapStateToProps)(ResetPasswordPage);
