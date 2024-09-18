import { Fragment, useEffect, useMemo, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { RoutePath } from "../../helpers/RoutePath";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../configureStore";
import Pagination from "../../component/sitaAdmin/Pagination";
import {
  HiOutlineMagnifyingGlass,
  HiOutlineXMark,
  HiPencil,
  HiFingerPrint,
  HiEye,
  HiEyeSlash,
  HiOutlineKey,
} from "react-icons/hi2";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import { AppDispatch } from "../..";
import { AdminActionCreator } from "../../store/Admin/AdminSlice";
import Modal from "../../component/Modal";
import Select from "react-select";
import { toast } from "react-toastify";
import AdminInfoCard from "../../component/sitaAdmin/AdminInfoCard";
import useWindowSize from "../../hooks/useWindowSize";
import ReactTooltip from "react-tooltip";
import {
  StyledTable,
  StyledSearchInput,
  StyledSearchContainer,
} from "./SitaAdminStyles";
import { useTranslation } from "react-i18next";
import { isStrongPassword } from "../../utils/PasswordValidationFunction";

const UserManagement = () => {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [isShowUpdateModal, setIsShowUpdateModal] = useState(false);
  const [isShowDisableModal, setIsShowDisableModal] = useState(false);
  const [isShowAuthModal, setIsShowAuthModal] = useState(false);
  const [isShowPasswordModal, setIsShowPasswordModal] = useState(false);
  const [validationError, setValidationError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const toggleConfirmpasswordVisiblity = () => {
    setConfirmPasswordShown(confirmPasswordShown ? false : true);
  };
  const dispatch: AppDispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.UserAuthentication);
  const usersDetails = useSelector((state: RootState) => state.Admin.Users);
  const { width } = useWindowSize();
  const tenantName = useSelector((state: RootState) => state.Admin.tenantId);
  const tenantData = useSelector(
    (state: RootState) => state.Admin.tenantData || []
  );
  const tentName = tenantData.filter(
    (t: any) => t.tenantSchema === tenantName
  )[0].tenantName;
  const userMatrix = useSelector(
    (state: RootState) => state.Admin.userMatrixData || []
  );
  const fetchRoles = useSelector((state: RootState) => state.Admin.Roles || []);

  //pagination

  const filterData = usersDetails.filter((item: any) => {
    return item.email.toLowerCase().includes(query.toLowerCase());
  });

  let PageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const firstPageIndex = (currentPage - 1) * PageSize;
  const lastPageIndex = firstPageIndex + PageSize;

  const currentTableData = useMemo(() => {
    const lastPageIndex = firstPageIndex + PageSize;
    return filterData.slice(firstPageIndex, lastPageIndex);
  }, [PageSize, firstPageIndex, filterData]);

  const onDisableHide = () => {
    setIsShowDisableModal(false);
  };
  const onPasswordChangeHide = () => {
    setIsShowPasswordModal(false);
    setPasswordError("");
  };
  const onAuthHide = () => {
    setIsShowAuthModal(false);
  };

  const history = useHistory();

  useEffect(() => {
    document.title = "Manage Users";
  }, []);

  useEffect(() => {
    if (userData.userDetails.user.role !== "SitaAdmin") {
      history.replace(RoutePath.DASHBOARD);
    }
  }, [history, userData.userDetails.user.role]);

  const [fetchUserDetails, setFetchUserDetails] = useState<{
    userId: string;
    company: string;
    email: string;
    firstName: string;
    lastName: string;
    roleName: string;
    password: string;
    confirmpassword: string;
    // isAdmin: boolean;
    [key: string]: string;
  }>({
    userId: "",
    company: tenantName,
    firstName: "",
    lastName: "",
    email: "",
    roleName: "",
    password: "",
    confirmpassword: "",
    // isAdmin:true
  });

  const [userPasswordDetails, setUserPasswordDetails] = useState({
    password: "".trim(),
    confirmpassword: "".trim(),
  });

  const userModalArr = () => {
    return [
      {
        name: "firstName",
        lable: `${t("firstname")}`,
      },
      {
        name: "lastName",
        lable: `${t("lastname")}`,
      },
      {
        name: "email",
        lable: `${t("email")}`,
      },
      {
        name: "password",
        lable: `${t("password")}`,
      },
      {
        name: "confirmpassword",
        lable: `${t("confirmpassword")}`,
      },
    ];
  };

  const userDummy = userModalArr();

  const handleChange = (e: any) => {
    setValidationError("");
    if (e.target.name === "password" || e.target.name === "confirmpassword") {
      setFetchUserDetails({
        ...fetchUserDetails,
        [e.target.name]: e.target.value.trim(),
      });
    } else if (e.target.name === "firstName" || e.target.name === "lastName") {
      setFetchUserDetails({
        ...fetchUserDetails,
        [e.target.name]: e.target.value.replace(/[^a-zA-Z ]/gi, "").trimStart(),
      });
    } else {
      setFetchUserDetails({
        ...fetchUserDetails,
        [e.target.name]: e.target.value.trimStart(),
      });
    }
  };

  const hadleSubmit = () => {
    const payload = {
      userId: fetchUserDetails.userId === "" ? null : fetchUserDetails.userId,
      schemaName: tenantName,
      firstName: fetchUserDetails.firstName.trimEnd(),
      lastName: fetchUserDetails.lastName.trimEnd(),
      email: fetchUserDetails.email.trimEnd(),
      role: fetchUserDetails.roleName,
      password: fetchUserDetails.password,
    };
    if (
      !payload.schemaName ||
      !payload.firstName ||
      !payload.lastName ||
      !payload.email ||
      !payload.role ||
      (fetchUserDetails.userId === "" ? !payload.password : "")
    ) {
      setValidationError(`${t("mandatoryfeild")}`);
    } else if (
      fetchUserDetails.userId === ""
        ? fetchUserDetails.password !== fetchUserDetails.confirmpassword
        : false
    ) {
      setValidationError(`${t("passdmatch")}`);
    } else if (
      !payload.email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      setValidationError(`${t("pleaseentervalidemail")}`);
    } else if (
      !(payload.firstName || payload.lastName)
        .toLowerCase()
        .match(/^[a-zA-Z ]*$/)
    ) {
      setValidationError(`${t("validname")}`);
    } else if (
      fetchUserDetails.userId === "" &&
      isStrongPassword(
        payload.password,
        payload.firstName,
        payload.lastName
      ) === false
    ) {
      setValidationError(`${t("passvalid")}`);
    } else {
      dispatch(AdminActionCreator.addUsersData(payload)).then((res) => {
        if (res.meta.requestStatus === "fulfilled")
          setUnsavedDataPopup({ show: false });
        setIsShowUpdateModal(false);
        dispatch(
          AdminActionCreator.getUserDetailsData({
            schema: tenantName,
          })
        );
        dispatch(
          AdminActionCreator.fetchUserMatrix({
            schemaName: tenantName,
          })
        );
        toast(res.payload.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
          theme: "dark",
        });
      });
      setFetchUserDetails({
        userId: "",
        company: tenantName,
        firstName: "",
        lastName: "",
        email: "",
        roleName: "",
        password: "",
        confirmpassword: "",
      });
    }
  };

  const hadleUpdate = () => {
    const payload = {
      schemaName: tenantName,
      email: fetchUserDetails.email,
      password: userPasswordDetails.password,
    };
    if (
      isStrongPassword(
        userPasswordDetails.password,
        fetchUserDetails.firstName,
        fetchUserDetails.lastName
      ) === false
    ) {
      setPasswordError(`${t("passvalid")}`);
    } else if (
      !payload.schemaName ||
      !payload.email ||
      !payload.password ||
      !userPasswordDetails.confirmpassword ||
      userPasswordDetails.password !== userPasswordDetails.confirmpassword
    ) {
      setPasswordError(`${t("passdmatch")}`);
    } else {
      dispatch(AdminActionCreator.resetUserPassword(payload)).then((res) => {
        if (res.meta.requestStatus === "fulfilled")
          toast(res.payload.response, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            progress: undefined,
            theme: "dark",
          });
        setIsShowPasswordModal(false);
      });
      setUserPasswordDetails({
        password: "",
        confirmpassword: "",
      });
    }
  };

  const customStyles = {
    control: (styles: any) => ({
      ...styles,
      // backgroundColor: "#13b4e5",
      // border: "1px solid #51A7C2",
      borderRadius: "10px",
      alignItems: "left",
      gap: "10px",
      backgroundColor: "var(--card-bg-color)",
      cursor: "pointer",
      marginTop: window.innerWidth < 930 && "7px",
      marginBottom: window.innerWidth < 930 && "7px",
      width: "100%",
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      borderBottom: "1px dotted var(--font-color)",
      color: state.isSelected ? "#ffffff" : "var(--font-color)",
      backgroundColor:
        state.isSelected && "var(--gridheader-select-bg-color  )",
      padding: 20,
      cursor: "pointer",
    }),
    menu: (styles: any) => ({
      ...styles,
      width: "100%",
      fontSize: "0.75rem",
      minWidth: "100%", //for minimum width
      backgroundColor: "var(--card-bg-color)",
    }),
    singleValue: (provided: any, state: any) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return {
        ...provided,
        opacity,
        transition,
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: " 400",
        fontSize: "1rem",
        lineHeight: "18px",
        /* identical to box height */
        textAlign: "left",
        /* PRIMARY_COLOR */
        color: "var(--font-color)",
      };
    },
  };

  const [unsavedDataPopup, setUnsavedDataPopup] = useState({
    show: false,
  });

  const modalBody = (
    <>
      {userDummy.map((e, index: number) =>
        fetchUserDetails.userId !== "" &&
        (e.name === "password" || e.name === "confirmpassword") ? (
          <Fragment key={index}></Fragment>
        ) : (
          <Row className="my-4 mt-4" key={index}>
            <Col lg={12}>
              <div className="flex-direction-row">
                <Form.Label>{e.lable}</Form.Label>
                <Form.Label className="text-danger">*</Form.Label>
              </div>

              <InputGroup>
                <Form.Control
                  name={e.name}
                  value={fetchUserDetails[e.name]}
                  type={
                    e.name === "password"
                      ? passwordShown
                        ? "text"
                        : "password"
                      : e.name === "confirmpassword"
                      ? confirmPasswordShown
                        ? "text"
                        : "password"
                      : e.name === "email"
                      ? "email"
                      : "text"
                  }
                  maxLength={
                    e.name === "firstName" || e.name === "lastName" ? 12 : 50
                  }
                  placeholder={e.lable}
                  className="risk-input-style"
                  onChange={handleChange}
                  autoComplete="new-password"
                  disabled={
                    e.name === "email"
                      ? fetchUserDetails.userId !== ""
                        ? true
                        : false
                      : false
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      hadleSubmit();
                    }
                  }}
                />

                {e.name === "password" ? (
                  <InputGroup.Text
                    id="basic-addon1"
                    onClick={togglePasswordVisiblity}
                  >
                    {!passwordShown ? <HiEye /> : <HiEyeSlash />}
                  </InputGroup.Text>
                ) : e.name === "confirmpassword" ? (
                  <InputGroup.Text
                    id="basic-addon1"
                    onClick={toggleConfirmpasswordVisiblity}
                  >
                    {!confirmPasswordShown ? <HiEye /> : <HiEyeSlash />}
                  </InputGroup.Text>
                ) : (
                  ""
                )}
              </InputGroup>
            </Col>
          </Row>
        )
      )}

      <Row className="my-4 mt-4">
        <Col lg={12}>
          <div className="flex-direction-row">
            <Form.Label>{t("roles")}</Form.Label>
            <Form.Label className="text-danger">*</Form.Label>
          </div>
          <Select
            className="bg-blue"
            classNamePrefix="rs"
            isSearchable={false}
            id={"react-select-rolename"}
            name={"roleName"}
            options={fetchRoles}
            styles={customStyles}
            value={fetchRoles.filter(function (option: any) {
              return option.value === fetchUserDetails.roleName;
            })}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                hadleSubmit();
              }
            }}
            onChange={(item: any) =>
              setFetchUserDetails((prev) => {
                return {
                  ...prev,
                  roleName: item.value,
                };
              })
            }
          />
        </Col>
      </Row>

      <Row className="float-right">
        <Col>
          <Button
            variant="outline-success"
            // className="border"
            onClick={() => hadleSubmit()}
            className="submit-btn-style"
          >
            {t("submit")}
          </Button>
        </Col>
      </Row>
      <p className="text-danger">{validationError}</p>
    </>
  );

  const passwordModalBody = (
    <>
      <Row className="text-center margin-to-minus-20px">
        &nbsp;&nbsp;&nbsp;"{fetchUserDetails.email}"
      </Row>
      <Row className="my-4 mt-4">
        <Col lg={12}>
          <div className="flex-direction-row">
            <Form.Label>{t("newpassword")}</Form.Label>
            <Form.Label className="text-danger">*</Form.Label>
          </div>

          <InputGroup>
            <Form.Control
              name="newpassword"
              value={userPasswordDetails.password}
              type={passwordShown ? "text" : "password"}
              maxLength={50}
              placeholder={t("newpassword")}
              className="risk-input-style"
              autoComplete="new-password"
              onChange={(e) => {
                setUserPasswordDetails({
                  ...userPasswordDetails,
                  password: e.target.value.replace(/\s/g, "").trim(),
                });
                setPasswordError("");
              }}
            />

            <InputGroup.Text
              id="basic-addon1"
              onClick={togglePasswordVisiblity}
            >
              {!passwordShown ? <HiEye /> : <HiEyeSlash />}
            </InputGroup.Text>
          </InputGroup>
        </Col>
      </Row>

      <Row className="my-4 mt-4">
        <Col lg={12}>
          <div className="flex-direction-row">
            <Form.Label>{t("confirmpassword")}</Form.Label>
            <Form.Label className="text-danger">*</Form.Label>
          </div>

          <InputGroup>
            <Form.Control
              name="cpassword"
              value={userPasswordDetails.confirmpassword}
              type={confirmPasswordShown ? "text" : "password"}
              maxLength={50}
              placeholder={t("confirmpassword")}
              className="risk-input-style"
              autoComplete="new-password"
              onChange={(e) => {
                setUserPasswordDetails({
                  ...userPasswordDetails,
                  confirmpassword: e.target.value.replace(/\s/g, "").trim(),
                });
                setPasswordError("");
              }}
            />

            <InputGroup.Text
              id="basic-addon1"
              onClick={toggleConfirmpasswordVisiblity}
            >
              {!confirmPasswordShown ? <HiEye /> : <HiEyeSlash />}
            </InputGroup.Text>
          </InputGroup>
        </Col>
      </Row>
      <p className="text-danger">{passwordError}</p>
      <Row className="float-right">
        <Col lg={12}>
          <Button
            variant="outline-success"
            // className="border"
            onClick={() => hadleUpdate()}
            className="submit-btn-style"
          >
            {t("update")}
          </Button>
        </Col>
      </Row>
      <br />
      <br />
      <hr className="hr" />
      <Row className="my-4 mt-4 text-center">
        <Col lg={12}>
          {t("sendlinkon")} "{fetchUserDetails.email}"
        </Col>
      </Row>
      <Row className="my-4 mt-4 text-center">
        <Col lg={12}>
          <Button
            variant="outline-success"
            // className="border"
            onClick={() =>
              dispatch(
                AdminActionCreator.userPasswordReset({
                  schemaName: tenantName,
                  email: fetchUserDetails.email,
                })
              ).then((res) => {
                if (res.meta.requestStatus === "fulfilled")
                  setIsShowPasswordModal(false);
                toast(res.payload.Data.Message, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  progress: undefined,
                  theme: "dark",
                });
              })
            }
            className="action-btn-style"
          >
            {t("sendmail")}
          </Button>
        </Col>
      </Row>
    </>
  );

  const isSuspendBody = (
    <>
      <Row className="my-4 mt-6">
        <Col lg={12}>
          <div className="sita-admin-sure-msg">
            <p>
              {t("changestatusof")}"
              {" " +
                fetchUserDetails.firstName +
                " " +
                fetchUserDetails.lastName}
              " ?
            </p>
          </div>
        </Col>
      </Row>

      <Row className="float-right">
        <Col>
          <Button
            variant="outline-success"
            // className="border"
            onClick={() => {
              dispatch(
                AdminActionCreator.updateUserStatus({
                  schemaName: tenantName,
                  email: fetchUserDetails.email,
                })
              ).then((res) => {
                dispatch(
                  AdminActionCreator.fetchUserMatrix({
                    schemaName: tenantName,
                  })
                );
                if (res.meta.requestStatus === "fulfilled")
                  toast(res.payload.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    progress: undefined,
                    theme: "dark",
                  });
                onDisableHide();
                dispatch(
                  AdminActionCreator.getUserDetailsData({
                    schema: tenantName,
                  })
                );
              });
            }}
            className="submit-btn-style"
          >
            {t("yes")}
          </Button>
        </Col>
        <Col>
          <Button
            variant="outline-success"
            onClick={onDisableHide}
            className="submit-btn-style"
          >
            {t("no")}
          </Button>
        </Col>
      </Row>
    </>
  );
  const mfaModalBody = (
    <>
      <Row className="my-4 mt-6">
        <Col lg={12}>
          <div className="sita-admin-sure-msg">
            <p>{t("resetmfasure")}</p>
          </div>
        </Col>
      </Row>

      <Row className="float-right">
        <Col>
          <Button
            variant="outline-success"
            // className="border"
            onClick={() => {
              dispatch(
                AdminActionCreator.resetMfaStatus({
                  schemaName: tenantName,
                  email: fetchUserDetails.email,
                })
              ).then((res) => {
                dispatch(
                  AdminActionCreator.fetchUserMatrix({
                    schemaName: tenantName,
                  })
                );
                if (res.meta.requestStatus === "fulfilled")
                  setIsShowAuthModal(false);
                toast(res.payload.response, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  progress: undefined,
                  theme: "dark",
                });
                dispatch(
                  AdminActionCreator.getUserDetailsData({
                    schema: tenantName,
                  })
                );
              });
            }}
            className="inline-btn-style"
          >
            {t("yes")}
          </Button>
        </Col>
        <Col>
          <Button
            variant="outline-success"
            onClick={onAuthHide}
            className="inline-btn-style"
          >
            {t("no")}
          </Button>
        </Col>
      </Row>
    </>
  );

  return (
    <>
      <AdminInfoCard data={userMatrix} />
      <div className="d-flex justify-content-end m-14px-24px">
        <Button
          variant="outline-success"
          onClick={() => {
            setFetchUserDetails({
              userId: "",
              company: tenantName,
              firstName: "",
              lastName: "",
              email: "",
              roleName: "",
              password: "",
              confirmpassword: "",
            });
            setUnsavedDataPopup({ show: true });
          }}
        >
          {t("adduser")}
        </Button>
      </div>
      <div className="d-flex justify-content-between margin-bottom-10">
        <h5 className="usermanagement-h5">
          <Link to="/ManageUsers" className="back-link">
            <i></i>
            {tentName.toUpperCase()}
          </Link>
          {" > User"}
        </h5>
        <StyledSearchContainer>
          <StyledSearchInput
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setQuery(e.target.value.trim())
            }
            type="text"
            value={query}
            placeholder={t("searchintable")}
          />
          {query === "" ? (
            <HiOutlineMagnifyingGlass fontSize="1rem" className="mx-2" />
          ) : (
            <HiOutlineXMark
              fontSize="1rem"
              className="mx-2"
              onClick={() => setQuery("")}
            />
          )}
        </StyledSearchContainer>
      </div>
      {width > 932 ? (
        <>
          <StyledTable>
            <thead>
              <tr>
                {/* <th>ID</th> */}
                <th>#</th>
                <th>{t("firstname")}</th>
                <th>{t("lastname")}</th>
                <th>{t("email")}</th>
                {/* <th>ROLE ID</th> */}
                <th>{t("role")}</th>
                <th>{t("lastlogin")}</th>
                <th>{t("active")}</th>
                <th colSpan={3} className="text-center">
                  {" "}
                  {t("actions")}
                </th>
              </tr>
            </thead>
            <tbody>
              {currentTableData.map((e: any, index: number) => (
                <tr key={index}>
                  <td>{firstPageIndex + index + 1}</td>
                  <td>
                    {e.firstName.charAt(0).toUpperCase() +
                      e.firstName.substr(1)}
                  </td>
                  <td>
                    {e.lastName.charAt(0).toUpperCase() + e.lastName.substr(1)}
                  </td>
                  <td>{e.email}</td>
                  <td>{e.roleName}</td>
                  <td>{e.lastLogin}</td>
                  <td>
                    <Form className="margin-to-minus-12px">
                      <Form.Check
                        disabled={e.email === userData.userDetails.user.email}
                        type="switch"
                        id="custom-switch"
                        checked={e.isActive === true}
                        onChange={() => {
                          setFetchUserDetails({
                            ...e,
                            password: "",
                            confirmpassword: "",
                          });
                          setIsShowDisableModal(true);
                        }}
                      />
                    </Form>
                  </td>

                  <td>
                    <HiPencil
                      className="object-fit-fill"
                      size="1.3em"
                      aria-hidden="true"
                      cursor="pointer"
                      data-tip
                      data-for="updateTip"
                      onClick={() => {
                        setFetchUserDetails({
                          ...e,
                          password: "",
                          confirmpassword: "",
                        });
                        setIsShowUpdateModal(true);
                      }}
                    />
                  </td>
                  <td>
                    <HiFingerPrint
                      className="object-fit-fill"
                      size="1.3em"
                      aria-hidden="true"
                      data-tip
                      data-for="mfaTip"
                      cursor="pointer"
                      onClick={() => {
                        setFetchUserDetails(e);
                        setIsShowAuthModal(true);
                      }}
                    />
                  </td>
                  <td>
                    <HiOutlineKey
                      className="object-fit-fill"
                      size="1.3em"
                      aria-hidden="true"
                      data-tip
                      data-for="passwordTip"
                      cursor="pointer"
                      onClick={() => {
                        setFetchUserDetails({
                          ...e,
                          password: "",
                          confirmpassword: "",
                        });
                        setIsShowPasswordModal(true);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
          <ReactTooltip id="updateTip" place="top" effect="solid">
            {t("update")}
          </ReactTooltip>
          <ReactTooltip id="mfaTip" place="top" effect="solid">
            {t("mfareset")}
          </ReactTooltip>
          <ReactTooltip id="passwordTip" place="left" effect="solid">
            {t("passwordreset")}
          </ReactTooltip>
        </>
      ) : (
        currentTableData.map((e: any, index: number) => (
          <Card
            className="d-flex shadow text-left my-3 p-3 usermanagement-card"
            key={index}
          >
            <Row className="d-flex mt-2">
              <Col xs={6}>
                <span className="font-weight-bold">{t("firstname")}</span>{" "}
                <br />
                {e.firstName.charAt(0).toUpperCase() + e.firstName.substr(1)}
              </Col>
              <Col xs={6}>
                <span className="font-weight-bold">{t("lastname")}</span> <br />
                {e.lastName.charAt(0).toUpperCase() + e.lastName.substr(1)}
              </Col>
            </Row>
            <br />
            <Row className="d-flex">
              <Col xs={6}>
                <span className="font-weight-bold">{t("email")}</span> <br />
                {e.email}
              </Col>
              <Col xs={6}>
                <span className="font-weight-bold">{t("role")}</span> <br />
                {e.roleName}
              </Col>
            </Row>
            <br />
            <Row className="d-flex mt">
              <Col xs={6}>
                <span className="font-weight-bold">{t("lastlogin")}</span>{" "}
                <br />
                {e.lastLogin}
                <br />
              </Col>
              <Col xs={6}>
                {/* <span className="font-weight-bold">MFA STATUS</span>
                <br />
                {e.mfaStatus === true ? "Enabled" : "Not Verified"} */}

                <div>
                  <span className="font-weight-bold">{t("active")}</span> <br />
                  <Form>
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      checked={e.isActive === true}
                      onChange={() => {
                        setFetchUserDetails({
                          ...e,
                          password: "",
                          confirmpassword: "",
                        });
                        setIsShowDisableModal(true);
                      }}
                    />
                  </Form>
                </div>
              </Col>
            </Row>
            <Row className="d-flex mt-4">
              <Col xs={6}>
                <span className="font-weight-bold">{t("actions")}</span>
                <br />
                <div className="d-flex">
                  <div>
                    <HiPencil
                      className="object-fit-fill"
                      size="1.3em"
                      aria-hidden="true"
                      cursor="pointer"
                      onClick={() => {
                        setFetchUserDetails({
                          ...e,
                          password: "",
                          confirmpassword: "",
                        });
                        setIsShowUpdateModal(true);
                      }}
                    />
                  </div>
                  <div className="ml-4">
                    <HiFingerPrint
                      className="object-fit-fill"
                      size="1.3em"
                      aria-hidden="true"
                      cursor="pointer"
                      onClick={() => {
                        setFetchUserDetails(e);
                        setIsShowAuthModal(true);
                      }}
                    />
                  </div>
                  <div className="ml-4">
                    <HiOutlineKey
                      className="object-fit-fill"
                      size="1.3em"
                      aria-hidden="true"
                      cursor="pointer"
                      onClick={() => {
                        setFetchUserDetails({
                          ...e,
                          password: "",
                          confirmpassword: "",
                        });
                        setIsShowPasswordModal(true);
                      }}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        ))
      )}
      <div className="d-flex justify-content-end my-25px">
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={usersDetails.length}
          pageSize={PageSize}
          onPageChange={(page: any) => setCurrentPage(page)}
          firstPageIndex={firstPageIndex}
          lastPageIndex={lastPageIndex}
        />
      </div>

      <Modal
        onHide={() => {
          setUnsavedDataPopup({ show: false });
          setValidationError("");
        }}
        show={unsavedDataPopup.show}
        modalTitle={t("adduser")}
        modalBody={modalBody}
      />

      <Modal
        modalBody={modalBody}
        modalTitle={t("updatedetails")}
        show={isShowUpdateModal}
        onHide={() => {
          setIsShowUpdateModal(false);
          setValidationError("");
        }}
      />
      <Modal
        modalBody={mfaModalBody}
        modalTitle={t("mfareset")}
        show={isShowAuthModal}
        onHide={onAuthHide}
      />
      <Modal
        modalBody={isSuspendBody}
        modalTitle={t("suspenduser")}
        show={isShowDisableModal}
        onHide={onDisableHide}
      />

      <Modal
        modalBody={passwordModalBody}
        modalTitle={t("changepassword")}
        show={isShowPasswordModal}
        onHide={onPasswordChangeHide}
      />
    </>
  );
};

export default UserManagement;
