import { useEffect, useMemo, useState } from "react";
import {
  HiOutlineMagnifyingGlass,
  HiOutlineXMark,
  HiOutlineCog8Tooth,
  HiOutlineInformationCircle,
  HiMinusCircle,
  HiOutlineEnvelope,
} from "react-icons/hi2";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { RoutePath } from "../../helpers/RoutePath";
import { useSelector } from "react-redux";
import { RootState } from "../../configureStore";
import CustomModal from "../../component/Modal";
import { AdminActionCreator } from "../../store/Admin/AdminSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../..";
import { toast } from "react-toastify";
import AdminInfoCard from "../../component/sitaAdmin/AdminInfoCard";
import Pagination from "../../component/sitaAdmin/Pagination";
import Select from "react-select";
import useWindowSize from "../../hooks/useWindowSize";
import { axiosPrivate } from "../../helpers/ApiClient";
import { EndPoints } from "../../helpers/ApiEndPoints";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import ReactTooltip from "react-tooltip";
import {
  ProcessListContainer,
  StyledTable,
  StyledSearchInput,
  StyledSearchContainer,
  EmailItemContainer,
  EmailDiv,
} from "./SitaAdminStyles";
import { useTranslation } from "react-i18next";
// @ts-ignore
import * as locales from "react-date-range/dist/locale";
import { userAuthenticationActionCreator } from "../../store/UserAuthentication/UserAuthSlice";
import storageSession from "redux-persist/lib/storage/session";
import CustomTabs from "../../component/reuseableComp/CustomTabs";
import { validateEmails } from "../../utils/EmailsValidation";

interface addEmailType {
  wrapper_emails: {
    id: null | number;
    email: string;
  }[];
  usecase_and_assets_emails: {
    id: null | number;
    email: string;
  }[];
}
interface allEmailList {
  wrapper_emails: {
    id: number;
    email_address: string;
  }[];
  usecase_and_assets_emails: {
    id: number;
    email_address: string;
  }[];
  deleted_emails: {
    wrapper_emails: {
      id: number;
      email_address: string;
    }[];
    usecase_and_assets_emails: {
      id: number;
      email_address: string;
    }[];
  };
}
interface deleteEmail {
  wrapper_emails: {
    id: number;
  }[];
  usecase_and_assets_emails: {
    id: number;
  }[];
}

const ManageUsers = () => {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const [companynameError, setCompanynameError] = useState<string>("");
  const [schemaError, setSchemaError] = useState<string>("");
  const [domainError, setDomainError] = useState<string>("");
  const [packageError, setPackageError] = useState<string>("");
  const [validError, setValidError] = useState<string>("");
  // const [resData, setResData] = useState();
  const [tenantSchema, setTenantSchema] = useState("");

  const [openActiveModal, setOpenActiveModal] = useState(false);
  const [otpNumber, setOtpNumber] = useState("");

  const fetchPackageData = useSelector(
    (state: RootState) => state.Admin.fetchPackageData
  );

  const userState = useSelector((state: RootState) => state.UserAuthentication);
  const selectedLang = useSelector(
    (state: RootState) => state.UserAuthentication.language
  );

  const {
    ADD_SOURCE_DETAILS,
    ADD_TENANT,
    DELETE_TENANT,
    CREATE_UPDATE_EMAIL_DATA,
    DELETE_EMAIL_DATA,
    VIEW_EMAIL_DATA,
    REACTIVATE_EMAIL_DATA,
  } = EndPoints;

  const { width } = useWindowSize();

  const data = useSelector((state: RootState) => state.Admin.tenantData || []);

  const userData = useSelector((state: RootState) => state.UserAuthentication);
  const matrixData = useSelector(
    (state: RootState) => state.Admin.tenantMatrixData || []
  );
  //pagination
  let PageSize = window.innerWidth > 1600 ? 6 : 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [openMfaModal, setOpenMfaModal] = useState(false);
  const [deleteTenant, setDeleteTenant] = useState("");
  const [openEmailModal, setOpenEmailModal] = useState(false);
  const [emailActiveTab, setEmailActiveTab] = useState("addEmai");
  const [emailsData, setEmailsData] = useState<addEmailType>({
    wrapper_emails: [
      {
        id: null,
        email: "",
      },
    ],
    usecase_and_assets_emails: [
      {
        id: null,
        email: "",
      },
    ],
  });

  const [allEmailList, setAllEmailList] = useState<allEmailList>({
    wrapper_emails: [],
    usecase_and_assets_emails: [],
    deleted_emails: {
      wrapper_emails: [],
      usecase_and_assets_emails: [],
    },
  });
  const [emailsToDelete, setEmailsToDelete] = useState<deleteEmail>({
    wrapper_emails: [],
    usecase_and_assets_emails: [],
  });

  const [emailsToRestore, setEmailsToRestore] = useState<deleteEmail>({
    wrapper_emails: [],
    usecase_and_assets_emails: [],
  });
  const [openDeleteEmailModal, setOpenDeleteEmailModal] = useState(false);
  const [openRestoreEmailModal, setOpenRestoreEmailModal] = useState(false);

  const [showSourceDetails, setShowSourceDetails] = useState(false);
  const [sources, setSources] = useState<any>([]);

  const [tenantDetails, setTenantDetails] = useState<{
    name: string;
    schema_name: string;
    domain: string;
    package: string;
  }>({
    name: "",
    schema_name: "",
    domain: "",
    package: "",
  });

  const [sourceDetails, setSourceDetails] = useState<{
    [key: string]: string;
    name: string;
    sourceIp: string;
    sourceApiKey: string;
    sourceType: string;
    environment: string;
    teachnicianKey: string;
    authorization: string;
    tokenId: string;
    tenantId: string;
    resourceName: string;
    workSpaceName: string;
    url: string;
  }>({
    name: "",
    sourceIp: "",
    sourceApiKey: "",
    sourceType: "",
    environment: "",
    teachnicianKey: "",
    authorization: "",
    tokenId: "",
    tenantId: "",
    resourceName: "",
    workSpaceName: "",
    url: "",
  });

  const firstPageIndex = (currentPage - 1) * PageSize;
  const lastPageIndex = firstPageIndex + PageSize;

  const filterData = data.filter((item: any) => {
    return item.tenantName.toLowerCase().includes(query.toLowerCase());
  });
  const currentTableData = useMemo(() => {
    const lastPageIndex = firstPageIndex + PageSize;
    return filterData.slice(firstPageIndex, lastPageIndex);
  }, [PageSize, firstPageIndex, filterData]);
  const [unsavedDataPopup, setUnsavedDataPopup] = useState({
    show: false,
  });
  const [sourceDataPopup, setSourceDataPopup] = useState(false);
  useEffect(() => {
    dispatch(AdminActionCreator.fetchTenantData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(AdminActionCreator.tenantMatrix());
  }, [dispatch]);

  useEffect(() => {
    document.title = "Manage Users";
  }, []);

  useEffect(() => {
    if (userData.userDetails.user.role !== "SitaAdmin") {
      history.replace(RoutePath.DASHBOARD);
    }
  }, [history, userData.userDetails.user.role]);

  useEffect(() => {
    dispatch(AdminActionCreator.fetchPackage());
  }, [dispatch]);

  const onHide = () => {
    setSourceDataPopup(false);
    setTenantSchema("");
    clearSourceData();
  };

  function onTenantClick(tenantId: string) {
    dispatch(AdminActionCreator.getUserDetailsData({ schema: tenantId })).then(
      (res) => {
        dispatch(AdminActionCreator.fetchUserMatrix({ schemaName: tenantId }));
        dispatch(AdminActionCreator.fetchRoles({ schemaName: tenantId }));
        if (res.meta.requestStatus === "fulfilled")
          history.push(`/UserManagement`);
      }
    );
  }

  const translatedTabs = () => {
    return [
      { id: "addEmai", label: `${t("add")} / ${t("update")} ${t("email")}` },
      { id: "deleteEmail", label: `${t("delete")} ${t("email")}` },
      { id: "alreadyDeletedEmail", label: `${t("restore")} ${t("email")}` },
    ];
  };

  const tabsForEmailModal = translatedTabs();

  const handleEmailTabChange = (tabId: string) => {
    setEmailActiveTab(tabId);
  };

  const handleLogout = () => {
    dispatch(userAuthenticationActionCreator.handleLogout());
    storageSession.removeItem("persist:root");
    storageSession.removeItem("userTokens");
    history.push("/login");
  };

  const clearSourceData = () => {
    setSourceDetails({
      name: "",
      sourceIp: "",
      sourceApiKey: "",
      sourceType: "",
      environment: "",
      teachnicianKey: "",
      authorization: "",
      tokenId: "",
      tenantId: "",
      resourceName: "",
      workSpaceName: "",
      url: "",
    });
    setStartDate("");
  };

  const clearTenantData = () => {
    setTenantDetails({
      name: "",
      schema_name: "",
      domain: "",
      package: "",
    });
  };

  const handlePayload = () => {
    if (
      sourceDetails.name === "CYBLE" &&
      sourceDetails.sourceType === "cyble"
    ) {
      return `${t("token")},CompanyUuid,tokenId,tenantId,token,tenant_id`;
    } else if (
      sourceDetails.name === "SIEM" &&
      sourceDetails.sourceType === "sentinel"
    ) {
      return `${t("resourcename")},${t(
        "workspacename"
      )},resourceName,workSpaceName,resource_name,workspace_name`;
    } else if (
      sourceDetails.name === "SIEM" &&
      sourceDetails.sourceType === "qradar"
    ) {
      return `${t("techniciankey")},${t(
        "environment"
      )},teachnicianKey,environment,technicianKey,environment,${t(
        "authorization"
      )},authorization`;
    } else if (
      sourceDetails.name === "SIEM" &&
      sourceDetails.sourceType === "seceon"
    ) {
      return `${t("token")},${t("tenantid")},tokenId,tenantId,token,tenant_id`;
    } else if (
      sourceDetails.name === "ITSM" &&
      sourceDetails.sourceType === "ServiceDesk"
    ) {
      return `${t("techniciankey")},${t(
        "environment"
      )},teachnicianKey,environment,technicianKey,environment`;
    } else if (
      sourceDetails.name === "SOAR" &&
      sourceDetails.sourceType === "siemplify"
    ) {
      return `${t("techniciankey")},${t(
        "environment"
      )},teachnicianKey,environment,technicianKey,environment`;
    } else {
      return "";
    }
  };
  const payloadStr = handlePayload();
  const fetchName = payloadStr.split(",");

  const handleChange = (e: any) => {
    setTenantDetails({
      ...tenantDetails,
      [e.target.name]:
        e.target.name === "domain"
          ? e.target.value.replace(/[^a-zA-Z0-9-.]/gi, "").trim()
          : e.target.value.replace(/[^a-zA-Z0-9 ]/gi, "").trimStart(),
    });
  };

  const hadleSubmit = () => {
    setIsLoading(true);
    if (tenantDetails.name === "") {
      setCompanynameError("Company Name Required!");
    } else if (tenantDetails.schema_name === "") {
      setSchemaError("Company Schema Required!");
    } else if (tenantDetails.domain === "") {
      setDomainError("Domain Required!");
    } else if (tenantDetails.domain === ".netrum-tech.com") {
      setDomainError("Domain Required!");
    } else if (tenantDetails.package === "") {
      setPackageError("Package Required!");
    } else {
      const payload = {
        schema_name: tenantDetails.schema_name,
        name: tenantDetails.name,
        domain: tenantDetails.domain + ".netrum-tech.com",
        package: tenantDetails.package,
      };
      const addTenantData = async () => {
        await axiosPrivate.post(ADD_TENANT, payload).then((res) => {
          if (res.data.status === 200) {
            toast(res.data.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              progress: undefined,
              theme: "dark",
            });
            dispatch(AdminActionCreator.tenantMatrix());
            setUnsavedDataPopup({ show: false });
            dispatch(AdminActionCreator.fetchTenantData());
            setTenantSchema(payload.schema_name);
            setSourceDataPopup(true);
            clearTenantData();
          } else {
            toast(res.data.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              progress: undefined,
              theme: "dark",
            });
          }
        });
        setIsLoading(false);
      };
      addTenantData();
    }
  };

  const handleSource = () => {
    if (!sourceDetails.name) {
      setValidError(`${t("mandatoryfeild")}`);
    } else if (!sourceDetails.sourceType) {
      setValidError(`${t("mandatoryfeild")}`);
    } else if (!sourceDetails.url) {
      setValidError(`${t("mandatoryfeild")}`);
    } else if (!sourceDetails.sourceIp) {
      setValidError(`${t("mandatoryfeild")}`);
    } else if (!sourceDetails.sourceApiKey) {
      setValidError(`${t("mandatoryfeild")}`);
    } else if (!startDate) {
      setValidError(`${t("mandatoryfeild")}`);
    } else if (
      handlePayload() !== ""
        ? !sourceDetails[fetchName[2]] || !sourceDetails[fetchName[3]]
        : ""
    ) {
      setValidError(`${t("mandatoryfeild")}`);
    } else {
      addSourceDetails();
    }
  };

  const addSourceDetails = async () => {
    await axiosPrivate
      .post(ADD_SOURCE_DETAILS, {
        schema_name: tenantSchema.trimEnd(),
        name: sourceDetails.name.trimEnd(),
        credentials: [
          {
            source_IP: sourceDetails.sourceIp.trimEnd(),
            source_API_KEY: sourceDetails.sourceApiKey.trimEnd(),
          },
        ],
        source_type: sourceDetails.sourceType,
        payload:
          fetchName.length === 8
            ? [
                {
                  key: fetchName[4],
                  value: sourceDetails[fetchName[2]].trimEnd(),
                },
                {
                  key: fetchName[5],
                  value: sourceDetails[fetchName[3]].trimEnd(),
                },
                {
                  key: fetchName[7],
                  value: sourceDetails[fetchName[7]].trimEnd(),
                },
              ]
            : [
                {
                  key: fetchName[4],
                  value: sourceDetails[fetchName[2]].trimEnd(),
                },
                {
                  key: fetchName[5],
                  value: sourceDetails[fetchName[3]].trimEnd(),
                },
              ],

        url: sourceDetails.url.trimEnd(),
        first_sync_time: moment(moment.utc(startDate).toDate()).format(
          "YYYY-MM-DD hh:mm:ss"
        ),
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch(AdminActionCreator.tenantMatrix());
          dispatch(AdminActionCreator.fetchTenantData());
          toast(res.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            progress: undefined,
            theme: "dark",
          });
          clearSourceData();
          setTenantSchema("");
          setSourceDataPopup(false);
        } else {
          toast("Failed !!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            progress: undefined,
            theme: "dark",
          });
        }
      });
  };

  const onEmailIconClicked = async (schema: string) => {
    const res = await axiosPrivate.post(VIEW_EMAIL_DATA, {
      schema_key: schema,
    });
    setOpenEmailModal(true);
    setAllEmailList(res.data);
  };

  const addEmailsData = async () => {
    await axiosPrivate
      .post(CREATE_UPDATE_EMAIL_DATA, {
        wrapper_emails: emailsData.wrapper_emails.filter((c) => c.email !== ""),
        usecase_and_assets_emails: emailsData.usecase_and_assets_emails.filter(
          (c) => c.email !== ""
        ),
        schema_key: tenantSchema,
      })
      .then((res) => {
        toast(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
          theme: "dark",
        });
        setAllEmailList({
          wrapper_emails: res.data.wrapper_emails,
          usecase_and_assets_emails: res.data.usecase_and_assets_emails,
          deleted_emails: res.data.deleted_emails,
        });
        setEmailsData({
          wrapper_emails: [
            {
              id: null,
              email: "",
            },
          ],
          usecase_and_assets_emails: [
            {
              id: null,
              email: "",
            },
          ],
        });
      });
  };

  const onEmailsDelete = async () => {
    await axiosPrivate
      .post(DELETE_EMAIL_DATA, { ...emailsToDelete, schema_key: tenantSchema })
      .then((res) => {
        toast(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
          theme: "dark",
        });
        setAllEmailList({
          wrapper_emails: res.data.wrapper_emails,
          usecase_and_assets_emails: res.data.usecase_and_assets_emails,
          deleted_emails: res.data.deleted_emails,
        });
        setEmailsToDelete({
          wrapper_emails: [],
          usecase_and_assets_emails: [],
        });
        setOpenDeleteEmailModal(false);
      });
  };

  const onEmailsRestored = async () => {
    await axiosPrivate
      .post(REACTIVATE_EMAIL_DATA, {
        ...emailsToRestore,
        schema_key: tenantSchema,
      })
      .then((res) => {
        toast(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
          theme: "dark",
        });
        setAllEmailList({
          wrapper_emails: res.data.wrapper_emails,
          usecase_and_assets_emails: res.data.usecase_and_assets_emails,
          deleted_emails: res.data.deleted_emails,
        });
        setEmailsToRestore({
          wrapper_emails: [],
          usecase_and_assets_emails: [],
        });
        setOpenRestoreEmailModal(false);
      });
  };

  const deActivateTenant = async () => {
    await axiosPrivate
      .post(DELETE_TENANT, {
        schemaName: tenantSchema,
        totp: otpNumber,
      })
      .then((res) => {
        toast(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
          theme: "dark",
        });
        // check if its not invalid attempt
        if (res.data.remaining_attempts === undefined) {
          // if not invalid then refetch tenant list and empty
          dispatch(AdminActionCreator.fetchTenantData()).then(() => {
            dispatch(AdminActionCreator.tenantMatrix());
            setTenantSchema("");
            setOpenActiveModal(false);
            setOtpNumber("");
            setDeleteTenant("");
            setOpenMfaModal(false);
          });
        } else {
          if (res.data.remaining_attempts !== 0) {
            // if invalid and limit not exceeded empty inputs
            setOtpNumber("");
            setDeleteTenant("");
          } else {
            // limit is exceeded and then force logout
            handleLogout();
          }
        }
      });
  };

  const customStyles = {
    control: (styles: any) => ({
      ...styles,
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
      borderBottom: "1px dotted pink",
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
        fontSize: "16px",
        lineHeight: "18px",
        /* identical to box height */
        textAlign: "left",
        /* PRIMARY_COLOR */
        color: "var(--font-color)",
      };
    },
  };

  const beautifiedJson = JSON.stringify(
    sources.length > 0 ? sources : `${t("nodata")}`,
    null,
    2
  );
  const jsonLines = beautifiedJson.split("\n");
  const sourceBody = (
    <ProcessListContainer>
      {jsonLines.map((line, index) => (
        <p key={index}>{line}</p>
      ))}
    </ProcessListContainer>
  );

  const addTenantBody = (
    <>
      <Row className="my-4 mt-4">
        <Col lg={12}>
          <div className="flex-direction-row">
            <Form.Label>{t("companyname")}</Form.Label>
            <Form.Label className="text-danger">*</Form.Label>
          </div>

          <InputGroup>
            <Form.Control
              name="name"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  hadleSubmit();
                }
              }}
              onChange={(e) => {
                handleChange(e);
                setCompanynameError("");
              }}
              value={tenantDetails.name}
              type="text"
              placeholder={t("companyname")}
              className="risk-input-style"
              maxLength={30}
            />
          </InputGroup>
        </Col>
      </Row>

      <Row className="my-4 mt-4">
        <Col lg={12}>
          <div className="flex-direction-row">
            <Form.Label>{t("companyschema")}</Form.Label>
            <Form.Label className="text-danger">*</Form.Label>
          </div>

          <InputGroup>
            <Form.Control
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  hadleSubmit();
                }
              }}
              name="schema_name"
              onChange={(e) => {
                handleChange(e);
                setSchemaError("");
              }}
              value={tenantDetails.schema_name}
              type="text"
              placeholder={t("companyschema")}
              maxLength={30}
              className="risk-input-style"
            />
          </InputGroup>
        </Col>
      </Row>

      <Row className="my-4 mt-4">
        <Col lg={12}>
          <div className="flex-direction-row">
            <Form.Label>{t("domain")}</Form.Label>
            <Form.Label className="text-danger">*</Form.Label>
          </div>

          <InputGroup>
            <Form.Control
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  hadleSubmit();
                }
              }}
              name="domain"
              onChange={(e) => {
                handleChange(e);
                setDomainError("");
              }}
              value={tenantDetails.domain}
              type="text"
              placeholder={t("domain")}
              className="risk-input-style"
              maxLength={50}
            />
          </InputGroup>
        </Col>
      </Row>

      <Row className="my-4 mt-4">
        <Col lg={12}>
          <div className="flex-direction-row">
            <Form.Label>{t("package")}</Form.Label>
            <Form.Label className="text-danger">*</Form.Label>
          </div>
          <Select
            className="bg-blue"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                hadleSubmit();
              }
            }}
            classNamePrefix="rs"
            placeholder={t("package")}
            isSearchable={false}
            id={"react-select-package"}
            name={"package"}
            options={fetchPackageData.map((item) => {
              return { value: item.packageName, label: item.packageName };
            })}
            styles={customStyles}
            onChange={(item: any) =>
              setTenantDetails((prev) => {
                setPackageError("");
                return {
                  ...prev,
                  package: item.value,
                };
              })
            }
          />
        </Col>
      </Row>

      <Row className="float-right">
        <Col>
          <Button
            disabled={isLoading}
            variant="outline-success"
            onClick={() => hadleSubmit()}
            className="submit-btn-style"
          >
            {t("add")}
          </Button>
        </Col>
      </Row>
      <p className="text-danger">{companynameError}</p>
      <p className="text-danger">{schemaError}</p>
      <p className="text-danger">{domainError}</p>
      <p className="text-danger">{packageError}</p>
    </>
  );

  const addSourceBody = (
    <Container fluid className="addsource-modal-manage-users">
      <Row lg={12}>
        <Col lg={6}>
          <div className="flex-direction-row">
            <Form.Label>
              {t("sourcename")}
              <Form.Label className="text-danger">*</Form.Label>
            </Form.Label>
          </div>
          <Select
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSource();
              }
            }}
            placeholder={t("sourcename")}
            className="bg-blue"
            classNamePrefix="rs"
            isSearchable={false}
            id={"react-select-name"}
            name={"Name"}
            options={sourceNameOptions}
            styles={customStyles}
            onChange={(item: any) => {
              const ifExisting = currentTableData
                .find((f) => f.tenantSchema === tenantSchema)
                ?.sources.find((d) => d.Name === item.value);

              if (ifExisting !== undefined) {
                setValidError("");
                setSourceDetails((prev) => {
                  return {
                    ...prev,
                    name: ifExisting["Name"],
                    sourceType: ifExisting["Source Type"],
                    sourceIp: ifExisting["Credentials"]?.[0]["source_IP"],
                    sourceApiKey:
                      ifExisting["Credentials"]?.[0]["source_API_KEY"],
                    environment:
                      ifExisting["Payload"]?.[0]["environment"] || "",
                    teachnicianKey:
                      ifExisting["Payload"]?.[0]["technicianKey"] || "",
                    authorization:
                      ifExisting["Payload"]?.[0]["authorization"] || "",
                    tokenId: ifExisting["Payload"]?.[0]["token"] || "",
                    tenantId: ifExisting["Payload"]?.[0]["tenant_id"] || "",
                    resourceName:
                      ifExisting["Payload"]?.[0]["resource_name"] || "",
                    workSpaceName:
                      ifExisting["Payload"]?.[0]["workspace_name"] || "",
                    url: ifExisting["URL"],
                  };
                });
                setStartDate(ifExisting["First Sync Time"]);
              } else {
                setValidError("");
                setStartDate("");
                setSourceDetails((prev) => {
                  return {
                    ...prev,
                    name: item.value,
                    sourceType: "",
                    sourceIp: "",
                    sourceApiKey: "",
                    environment: "",
                    teachnicianKey: "",
                    authorization: "",
                    tokenId: "",
                    tenantId: "",
                    resourceName: "",
                    workSpaceName: "",
                    url: "",
                  };
                });
              }
            }}
          />
        </Col>
        <Col lg={6}>
          <div className="flex-direction-row">
            <Form.Label>
              {t("sourcetype")}{" "}
              <Form.Label className="text-danger">*</Form.Label>
            </Form.Label>
          </div>
          <Select
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSource();
              }
            }}
            placeholder={t("sourcetype")}
            className="bg-blue"
            classNamePrefix="rs"
            isSearchable={false}
            id={"react-select-type"}
            name={"Type"}
            options={
              sourceDetails.name === "CYBLE"
                ? cybleOptions
                : sourceDetails.name === "SIEM"
                ? siemOptions
                : sourceDetails.name === "ITSM"
                ? itsmOptions
                : sourceDetails.name === "SOAR"
                ? soarOptions
                : emptyOptions
            }
            value={
              sourceDetails.sourceType !== "" && {
                value: sourceDetails.sourceType,
                label: sourceDetails.sourceType,
              }
            }
            styles={customStyles}
            onChange={(item: any) => {
              setValidError("");
              setSourceDetails((prev) => {
                return {
                  ...prev,
                  sourceType: item.value,
                  sourceIp: "",
                  sourceApiKey: "",
                  environment: "",
                  teachnicianKey: "",
                  authorization: "",
                  tokenId: "",
                  tenantId: "",
                  resourceName: "",
                  workSpaceName: "",
                  url: "",
                };
              });
            }}
          />
        </Col>
      </Row>

      {/* ----------------Depend on Source Name--------------- */}
      {handlePayload() !== "" &&
        sourceDetails.name !== "" &&
        sourceDetails.sourceType !== "" && (
          <>
            <Row className="my-4 mt-4">
              <Col lg={6}>
                <div className="flex-direction-row">
                  <Form.Label>
                    {fetchName[0]}{" "}
                    <Form.Label className="text-danger">*</Form.Label>
                  </Form.Label>
                </div>

                <InputGroup>
                  <Form.Control
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSource();
                      }
                    }}
                    name={fetchName[2]}
                    onChange={(e: any) => {
                      setValidError("");
                      setSourceDetails((prev) => {
                        return {
                          ...prev,
                          [e.target.name]: e.target.value.trimStart(),
                        };
                      });
                    }}
                    value={sourceDetails[fetchName[2]]}
                    type="text"
                    placeholder={`${fetchName[0]}`}
                    className="risk-input-style"
                  />
                </InputGroup>
              </Col>
              <Col lg={6}>
                <div className="flex-direction-row">
                  <Form.Label>
                    {fetchName[1]}{" "}
                    <Form.Label className="text-danger">*</Form.Label>
                  </Form.Label>
                </div>
                <InputGroup>
                  <Form.Control
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSource();
                      }
                    }}
                    name={fetchName[3]}
                    onChange={(e: any) => {
                      setValidError("");
                      setSourceDetails((prev) => {
                        return {
                          ...prev,
                          [e.target.name]: e.target.value.trimStart(),
                        };
                      });
                    }}
                    value={sourceDetails[fetchName[3]]}
                    type="text"
                    placeholder={`${fetchName[1]}`}
                    className="risk-input-style"
                  />
                </InputGroup>
              </Col>
              {fetchName.length === 8 && (
                <Col lg={12}>
                  <div className="flex-direction-row">
                    <Form.Label>
                      {fetchName[6]}
                      <Form.Label className="text-danger">*</Form.Label>
                    </Form.Label>
                  </div>

                  <InputGroup>
                    <Form.Control
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSource();
                        }
                      }}
                      name={fetchName[7]}
                      onChange={(e: any) => {
                        setValidError("");
                        setSourceDetails((prev) => {
                          return {
                            ...prev,
                            [e.target.name]: e.target.value.trimStart(),
                          };
                        });
                      }}
                      value={sourceDetails[fetchName[7]]}
                      type="text"
                      placeholder={`${fetchName[6]}`}
                      className="risk-input-style"
                    />
                  </InputGroup>
                </Col>
              )}
            </Row>
          </>
        )}
      <Row className="my-4">
        <Col lg={6}>
          <div className="flex-direction-row">
            <Form.Label>
              {t("url")} <Form.Label className="text-danger">*</Form.Label>
            </Form.Label>
          </div>

          <InputGroup>
            <Form.Control
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSource();
                }
              }}
              name="URL"
              onChange={(e: any) => {
                setValidError("");
                setSourceDetails((prev) => {
                  return {
                    ...prev,
                    url: e.target.value.trim(),
                  };
                });
              }}
              value={sourceDetails.url}
              type="text"
              placeholder={t("url")}
              className="risk-input-style"
              maxLength={50}
            />
          </InputGroup>
        </Col>
        <Col lg={6} className="DatePicker ">
          <div className="flex-direction-row">
            <Form.Label>
              {t("firstsynctime")}{" "}
              <Form.Label className="text-danger">*</Form.Label>
            </Form.Label>
          </div>

          <DatePicker
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSource();
              }
            }}
            className="form-control Date-input noBgValidationIcon"
            placeholderText={t("daterange")}
            dateFormat="yyyy/MM/dd"
            selected={startDate ? new Date(startDate) : null}
            onChange={(e: any) => setStartDate(e)}
            maxDate={moment().toDate()}
            locale={locales[selectedLang]}
          />
        </Col>
      </Row>

      <Row className="my-4">
        <Col lg={6}>
          <div className="flex-direction-row">
            <Form.Label>
              {t("sourceip")} <Form.Label className="text-danger">*</Form.Label>
            </Form.Label>
          </div>

          <InputGroup>
            <Form.Control
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSource();
                }
              }}
              name="sourceIp"
              onChange={(e: any) => {
                setValidError("");
                setSourceDetails((prev) => {
                  return {
                    ...prev,
                    [e.target.name]: e.target.value.trimStart(),
                  };
                });
              }}
              value={sourceDetails.sourceIp}
              type="text"
              placeholder={t("sourceip")}
              className="risk-input-style"
              maxLength={50}
            />
          </InputGroup>
        </Col>
        <Col lg={6}>
          <div className="flex-direction-row">
            <Form.Label>
              {t("sourceapikey")}
              <Form.Label className="text-danger">*</Form.Label>
            </Form.Label>
          </div>

          <InputGroup>
            <Form.Control
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSource();
                }
              }}
              name="sourceApiKey"
              onChange={(e: any) => {
                setValidError("");
                setSourceDetails((prev) => {
                  return {
                    ...prev,
                    [e.target.name]: e.target.value.trimStart(),
                  };
                });
              }}
              value={sourceDetails.sourceApiKey}
              type="text"
              placeholder={t("sourceapikey")}
              className="risk-input-style"
              maxLength={50}
            />
          </InputGroup>
        </Col>
      </Row>

      <Row className="float-right">
        <Col>
          <Button
            variant="outline-success"
            onClick={() => handleSource()}
            className="submit-btn-style"
          >
            {t("add")}
          </Button>
        </Col>
      </Row>
      <p className="text-danger">{validError}</p>
    </Container>
  );

  const activateDeactiveModel = (
    <>
      <Row className="my-4 mt-6">
        <Col lg={12}>
          <div className="imapct-all-tenant-msg">
            <p>{t("areyousuredeactive")}</p>
          </div>
        </Col>
      </Row>

      <Row className="float-right">
        <Col>
          <Button
            variant="outline-danger"
            onClick={() => {
              setOpenMfaModal(true);
            }}
            className="submit-btn-style"
          >
            {t("yes")}
          </Button>
        </Col>
        <Col>
          <Button
            variant="outline-success"
            onClick={() => {
              setOpenActiveModal(false);
              setTenantSchema("");
              setOpenMfaModal(false);
            }}
            className="submit-btn-style"
          >
            {t("no")}
          </Button>
        </Col>
      </Row>
    </>
  );

  const validateMFAModel = (
    <>
      <Row className="my-1">
        <Col lg={12}>
          <p className="manage-user-p-tag">
            {t("typedeletetenent")} &nbsp;&nbsp;
            <br />
            <b>"{tenantSchema}"</b>
          </p>
        </Col>
      </Row>
      <Row className="my-1">
        <Col lg={12}>
          <Form.Control
            value={deleteTenant}
            onChange={(e) => {
              setDeleteTenant(e.target.value);
            }}
            type="text"
            placeholder={t("typedeletetenent") + tenantSchema}
            autoFocus={true}
            maxLength={30}
          />
        </Col>
      </Row>
      <Row className="my-1">
        <Col lg={12}>
          <p className="manage-user-p-tag">
            {t("kindlypin")} &nbsp;
            <b>{userState.email}</b>
          </p>
        </Col>
      </Row>
      <Row className="my-1">
        <Col lg={12}>
          <Form.Control
            disabled={deleteTenant.toLowerCase() !== tenantSchema.toLowerCase()}
            value={otpNumber}
            onChange={(e) => {
              setOtpNumber(e.target.value.replace(/[^0-9.]/g, ""));
            }}
            type="text"
            placeholder={t("otpnumber")}
            maxLength={6}
            pattern="[0-9]+"
          />
        </Col>
      </Row>

      <Row className="float-right mt-4">
        <Col>
          <Button
            disabled={deleteTenant.toLowerCase() !== tenantSchema.toLowerCase()}
            variant="outline-danger"
            onClick={deActivateTenant}
            className="submit-btn-style"
          >
            {t("submit")}
          </Button>
        </Col>
      </Row>
    </>
  );

  const isEmailValid = validateEmails(
    emailsData.wrapper_emails[0].email,
    emailsData.usecase_and_assets_emails[0].email
  );

  const emailsModal = (
    <>
      <Row className="my-1">
        <CustomTabs
          tabs={tabsForEmailModal}
          activeTab={emailActiveTab}
          onChangeTab={handleEmailTabChange}
        />
      </Row>
      {emailActiveTab === "addEmai" && (
        <>
          <Row className="my-1">
            <p className="manage-user-p-tag">{t("sendwrapperemail")}</p>
          </Row>
          <Row className="my-1">
            <Col className="col-xs-6">
              <Form.Control
                value={emailsData.wrapper_emails[0].email}
                onChange={(e) => {
                  setEmailsData((prev) => {
                    const newObj = { ...prev };
                    newObj.wrapper_emails = [
                      {
                        id: newObj.wrapper_emails[0].id,
                        email: e.target.value,
                      },
                    ];
                    return newObj;
                  });
                }}
                type="email"
                placeholder={t("enteremail")}
                maxLength={50}
                autoFocus={true}
              />
            </Col>
          </Row>
          <Row className="my-1">
            <EmailItemContainer className="px-3">
              {allEmailList.wrapper_emails.map((e) => (
                <EmailDiv
                  className="my-1"
                  key={e.id}
                  background={
                    emailsData.wrapper_emails.map((e) => e.id).includes(e.id)
                      ? "#B2B2B2"
                      : "var(--bg-color)"
                  }
                  color={
                    emailsData.wrapper_emails.map((e) => e.id).includes(e.id)
                      ? "#000"
                      : "var(--font-color)"
                  }
                  onClick={() => {
                    setEmailsData((prev) => {
                      const newObj = { ...prev };
                      if (
                        emailsData.wrapper_emails
                          .map((e) => e.id)
                          .includes(e.id)
                      ) {
                        newObj.wrapper_emails = [
                          {
                            id: null,
                            email: "",
                          },
                        ];
                      } else {
                        newObj.wrapper_emails = [
                          {
                            id: e.id,
                            email: e.email_address,
                          },
                        ];
                      }
                      return newObj;
                    });
                  }}
                >
                  {e.email_address}
                </EmailDiv>
              ))}
            </EmailItemContainer>
          </Row>
          <Row className="my-1">
            <p className="manage-user-p-tag">
              {t("sendusecaseandassetsemail")}
            </p>
          </Row>
          <Row className="my-1">
            <Col className="col-xs-6">
              <Form.Control
                value={emailsData.usecase_and_assets_emails[0].email}
                onChange={(e) => {
                  setEmailsData((prev) => {
                    const newObj = { ...prev };
                    newObj.usecase_and_assets_emails = [
                      {
                        id: newObj.usecase_and_assets_emails[0].id,
                        email: e.target.value,
                      },
                    ];
                    return newObj;
                  });
                }}
                type="email"
                placeholder={t("enteremail")}
                maxLength={50}
              />
            </Col>
          </Row>
          <Row className="my-1">
            <EmailItemContainer className="px-3">
              {allEmailList.usecase_and_assets_emails.map((e) => (
                <EmailDiv
                  className="my-1"
                  key={e.id}
                  background={
                    emailsData.usecase_and_assets_emails
                      .map((e) => e.id)
                      .includes(e.id)
                      ? "#B2B2B2"
                      : "var(--bg-color)"
                  }
                  color={
                    emailsData.usecase_and_assets_emails
                      .map((e) => e.id)
                      .includes(e.id)
                      ? "#000"
                      : "var(--font-color)"
                  }
                  onClick={() => {
                    setEmailsData((prev) => {
                      const newObj = { ...prev };
                      if (
                        emailsData.usecase_and_assets_emails
                          .map((e) => e.id)
                          .includes(e.id)
                      ) {
                        newObj.usecase_and_assets_emails = [
                          {
                            id: null,
                            email: "",
                          },
                        ];
                      } else {
                        newObj.usecase_and_assets_emails = [
                          {
                            id: e.id,
                            email: e.email_address,
                          },
                        ];
                      }
                      return newObj;
                    });
                  }}
                >
                  {e.email_address}
                </EmailDiv>
              ))}
            </EmailItemContainer>
          </Row>

          <Row className="float-right mt-4">
            <Col>
              <Button
                disabled={!isEmailValid}
                variant="outline-danger"
                onClick={addEmailsData}
                className="submit-btn-style"
              >
                {t("add")} / {t("update")}
              </Button>
            </Col>
          </Row>
        </>
      )}
      {emailActiveTab === "deleteEmail" && (
        <>
          <Row className="my-1 ">
            <Col lg={12}>
              <h4 className="manage-user-p-tag">Wrapper Email</h4>
            </Col>
          </Row>
          <Row className="my-1">
            <EmailItemContainer className="px-3">
              {allEmailList.wrapper_emails.map((e) => (
                <EmailDiv
                  className="my-1"
                  key={e.id}
                  background={
                    emailsToDelete.wrapper_emails
                      .map((e) => e.id)
                      .includes(e.id)
                      ? "#B2B2B2"
                      : "var(--bg-color)"
                  }
                  color={
                    emailsToDelete.wrapper_emails
                      .map((e) => e.id)
                      .includes(e.id)
                      ? "#000"
                      : "var(--font-color)"
                  }
                  onClick={() => {
                    setEmailsToDelete((prev) => {
                      const newObj = { ...prev };
                      if (
                        emailsToDelete.wrapper_emails
                          .map((e) => e.id)
                          .includes(e.id)
                      ) {
                        newObj.wrapper_emails = newObj.wrapper_emails.filter(
                          (f) => f.id !== e.id
                        );
                      } else {
                        newObj.wrapper_emails = [
                          ...newObj.wrapper_emails,
                          {
                            id: e.id,
                          },
                        ];
                      }
                      return newObj;
                    });
                  }}
                >
                  {e.email_address}
                </EmailDiv>
              ))}
            </EmailItemContainer>
          </Row>
          <Row className="my-1 ">
            <Col lg={12}>
              <h4 className="manage-user-p-tag">Usecase And Assets Email</h4>
            </Col>
          </Row>
          <Row className="my-1">
            <EmailItemContainer className="px-3">
              {allEmailList.usecase_and_assets_emails.map((e) => (
                <EmailDiv
                  className="my-1"
                  key={e.id}
                  background={
                    emailsToDelete.usecase_and_assets_emails
                      .map((e) => e.id)
                      .includes(e.id)
                      ? "#B2B2B2"
                      : "var(--bg-color)"
                  }
                  color={
                    emailsToDelete.usecase_and_assets_emails
                      .map((e) => e.id)
                      .includes(e.id)
                      ? "#000"
                      : "var(--font-color)"
                  }
                  onClick={() => {
                    setEmailsToDelete((prev) => {
                      const newObj = { ...prev };
                      if (
                        emailsToDelete.usecase_and_assets_emails
                          .map((e) => e.id)
                          .includes(e.id)
                      ) {
                        newObj.usecase_and_assets_emails =
                          newObj.usecase_and_assets_emails.filter(
                            (f) => f.id !== e.id
                          );
                      } else {
                        newObj.usecase_and_assets_emails = [
                          ...newObj.usecase_and_assets_emails,
                          {
                            id: e.id,
                          },
                        ];
                      }
                      return newObj;
                    });
                  }}
                >
                  {e.email_address}
                </EmailDiv>
              ))}
            </EmailItemContainer>
          </Row>
          <Row className="float-right mt-4">
            <Col>
              <Button
                disabled={
                  emailsToDelete.usecase_and_assets_emails.filter(Boolean)
                    .length === 0 &&
                  emailsToDelete.wrapper_emails.filter(Boolean).length === 0
                }
                variant="outline-danger"
                onClick={() => {
                  setOpenDeleteEmailModal(true);
                }}
                className="submit-btn-style"
              >
                {t("delete")}
              </Button>
            </Col>
          </Row>
        </>
      )}
      {emailActiveTab === "alreadyDeletedEmail" && (
        <>
          <Row className="my-1 ">
            <Col lg={12}>
              <h4 className="manage-user-p-tag">Wrapper Email</h4>
            </Col>
          </Row>
          <Row className="my-1">
            <EmailItemContainer className="px-3">
              {allEmailList.deleted_emails.wrapper_emails.map((e) => (
                <EmailDiv
                  className="my-1"
                  key={e.id}
                  background={
                    emailsToRestore.wrapper_emails
                      .map((e) => e.id)
                      .includes(e.id)
                      ? "#B2B2B2"
                      : "var(--bg-color)"
                  }
                  color={
                    emailsToRestore.wrapper_emails
                      .map((e) => e.id)
                      .includes(e.id)
                      ? "#000"
                      : "var(--font-color)"
                  }
                  onClick={() => {
                    setEmailsToRestore((prev) => {
                      const newObj = { ...prev };
                      if (
                        emailsToRestore.wrapper_emails
                          .map((e) => e.id)
                          .includes(e.id)
                      ) {
                        newObj.wrapper_emails = newObj.wrapper_emails.filter(
                          (f) => f.id !== e.id
                        );
                      } else {
                        newObj.wrapper_emails = [
                          ...newObj.wrapper_emails,
                          {
                            id: e.id,
                          },
                        ];
                      }
                      return newObj;
                    });
                  }}
                >
                  {e.email_address}
                </EmailDiv>
              ))}
            </EmailItemContainer>
          </Row>
          <Row className="my-1 ">
            <Col lg={12}>
              <h4 className="manage-user-p-tag">Usecase And Assets Email</h4>
            </Col>
          </Row>
          <Row className="my-1">
            <EmailItemContainer className="px-3">
              {allEmailList.deleted_emails.usecase_and_assets_emails.map(
                (e) => (
                  <EmailDiv
                    className="my-1"
                    key={e.id}
                    background={
                      emailsToRestore.usecase_and_assets_emails
                        .map((e) => e.id)
                        .includes(e.id)
                        ? "#B2B2B2"
                        : "var(--bg-color)"
                    }
                    color={
                      emailsToRestore.usecase_and_assets_emails
                        .map((e) => e.id)
                        .includes(e.id)
                        ? "#000"
                        : "var(--font-color)"
                    }
                    onClick={() => {
                      setEmailsToRestore((prev) => {
                        const newObj = { ...prev };
                        if (
                          emailsToRestore.usecase_and_assets_emails
                            .map((e) => e.id)
                            .includes(e.id)
                        ) {
                          newObj.usecase_and_assets_emails =
                            newObj.usecase_and_assets_emails.filter(
                              (f) => f.id !== e.id
                            );
                        } else {
                          newObj.usecase_and_assets_emails = [
                            ...newObj.usecase_and_assets_emails,
                            {
                              id: e.id,
                            },
                          ];
                        }
                        return newObj;
                      });
                    }}
                  >
                    {e.email_address}
                  </EmailDiv>
                )
              )}
            </EmailItemContainer>
          </Row>
          <Row className="float-right mt-4">
            <Col>
              <Button
                disabled={
                  emailsToRestore.usecase_and_assets_emails.filter(Boolean)
                    .length === 0 &&
                  emailsToRestore.wrapper_emails.filter(Boolean).length === 0
                }
                variant="outline-danger"
                onClick={() => {
                  setOpenRestoreEmailModal(true);
                }}
                className="submit-btn-style"
              >
                {t("restore")}
              </Button>
            </Col>
          </Row>
        </>
      )}
    </>
  );

  const areYouSureModalForDelete = (
    <>
      <Row className="my-4 mt-6">
        <Col lg={12}>
          <div className="imapct-all-tenant-msg">
            <p>{t("areyousuredeactive")}</p>
          </div>
        </Col>
      </Row>

      <Row className="float-right">
        <Col>
          <Button
            variant="outline-danger"
            onClick={onEmailsDelete}
            className="submit-btn-style"
          >
            {t("yes")}
          </Button>
        </Col>
        <Col>
          <Button
            variant="outline-success"
            onClick={() => {
              setEmailsToDelete({
                wrapper_emails: [],
                usecase_and_assets_emails: [],
              });
              setOpenDeleteEmailModal(false);
            }}
            className="submit-btn-style"
          >
            {t("no")}
          </Button>
        </Col>
      </Row>
    </>
  );
  const areYouSureModalForRestore = (
    <>
      <Row className="my-4 mt-6">
        <Col lg={12}>
          <div className="imapct-all-tenant-msg">
            <p>{t("areyousuredeactive")}</p>
          </div>
        </Col>
      </Row>

      <Row className="float-right">
        <Col>
          <Button
            variant="outline-danger"
            onClick={onEmailsRestored}
            className="submit-btn-style"
          >
            {t("yes")}
          </Button>
        </Col>
        <Col>
          <Button
            variant="outline-success"
            onClick={() => {
              setEmailsToRestore({
                wrapper_emails: [],
                usecase_and_assets_emails: [],
              });
              setOpenRestoreEmailModal(false);
            }}
            className="submit-btn-style"
          >
            {t("no")}
          </Button>
        </Col>
      </Row>
    </>
  );

  return (
    <>
      <AdminInfoCard data={matrixData} />
      <div className="my-25px d-flex justify-content-between align-items-baseline">
        <StyledSearchContainer>
          <StyledSearchInput
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setQuery(e.target.value)
            }
            type="text"
            value={query}
            placeholder={t("searchintable")}
          />
          {query === "" ? (
            <HiOutlineMagnifyingGlass
              fontSize="1.125rem"
              className="my-0 mx-2"
            />
          ) : (
            <HiOutlineXMark
              fontSize="1.125rem"
              className="my-0 mx-2"
              onClick={() => setQuery("")}
            />
          )}
        </StyledSearchContainer>
        <Button
          variant="outline-success"
          onClick={() => {
            setUnsavedDataPopup({ show: true });
          }}
        >
          {t("addtenant")}
        </Button>
      </div>

      {width > 932 ? (
        <>
          <StyledTable>
            <thead>
              <tr>
                {/* <th>Company Logo</th> */}
                <th>#</th>
                <th>{t("companyname")}</th>
                <th>{t("companyschema")}</th>
                <th>{t("package")}</th>
                <th>{t("validupto")}</th>
                <th className="text-center">{t("actions")}</th>
              </tr>
            </thead>
            <tbody>
              {currentTableData.map((e, index: number) => (
                <tr key={e.tenantSchema}>
                  <td>{firstPageIndex + index + 1}</td>
                  <td onClick={() => onTenantClick(`${e.tenantSchema}`)}>
                    {e.tenantName}
                  </td>
                  <td onClick={() => onTenantClick(`${e.tenantSchema}`)}>
                    {e.tenantSchema}
                  </td>
                  <td
                    onClick={() =>
                      history.push(`/TenantPackages?id=${e.tenantSchema}`)
                    }
                  >
                    <h1 className="font-size-1-rem text-left">
                      {e.packageName}
                    </h1>
                    <h2 className="upgrade-h1-style">Upgrade plan</h2>
                  </td>
                  <td>{e.packageValidity}</td>
                  <td className="text-center">
                    <HiOutlineCog8Tooth
                      data-tip
                      data-for="source"
                      fontSize="1.7rem"
                      className="margin-right-10"
                      cursor={"pointer"}
                      onClick={() => {
                        setSourceDataPopup(true);
                        setTenantSchema(e.tenantSchema);
                      }}
                    />
                    <HiOutlineInformationCircle
                      data-tip
                      data-for="sourceInfo"
                      fontSize="1.7rem"
                      className="margin-right-10"
                      cursor={"pointer"}
                      onClick={() => {
                        setShowSourceDetails(true);
                        setSources(e.sources);
                      }}
                    />
                    <HiOutlineEnvelope
                      data-tip
                      data-for="emails"
                      fontSize="1.7rem"
                      className="margin-right-10"
                      cursor={"pointer"}
                      onClick={() => {
                        onEmailIconClicked(e.tenantSchema);
                        setTenantSchema(e.tenantSchema);
                      }}
                    />
                    {e.isActive ? (
                      <HiMinusCircle
                        data-for="deactivate"
                        className="activate-tenant-circle"
                        cursor={"pointer"}
                        onClick={() => {
                          setTenantSchema(e.tenantSchema);
                          setOpenActiveModal(true);
                        }}
                      />
                    ) : (
                      <HiMinusCircle
                        data-tip
                        data-for="deactivate"
                        className="deactivate-tenant-circle"
                        cursor={"pointer"}
                        onClick={() => {
                          setTenantSchema(e.tenantSchema);
                          setOpenActiveModal(true);
                        }}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
          <ReactTooltip id="source" place="top" effect="solid">
            {t("addupdatesource")}
          </ReactTooltip>
          <ReactTooltip id="sourceInfo" place="top" effect="solid">
            {t("sourceinfo")}
          </ReactTooltip>
          <ReactTooltip id="emails" place="top" effect="solid">
            {t("manageemails")}
          </ReactTooltip>
          <ReactTooltip id="deactivate" place="top" effect="solid">
            {t("deactivate")} / {t("activate")}
          </ReactTooltip>
        </>
      ) : (
        currentTableData.map((e: any, index: number) => (
          <Card
            className="d-flex shadow text-left my-3 p-3 usermanagement-card"
            key={index}
          >
            <Row className="d-flex mt-2">
              <Col xs={6} onClick={() => onTenantClick(`${e.tenantSchema}`)}>
                <span className="font-weight-bold">{t("companyname")}</span>{" "}
                <br />
                {e.tenantName}
              </Col>
              <Col xs={6} onClick={() => onTenantClick(`${e.tenantSchema}`)}>
                <span className="font-weight-bold">{t("companyschema")}</span>{" "}
                <br />
                {e.tenantSchema}
              </Col>
            </Row>
            <br />
            <Row className="d-flex">
              <Col xs={6}>
                <span className="font-weight-bold">{t("package")}</span> <br />
                {e.packageName}
                <h2
                  className="upgrade-btn-style"
                  onClick={() =>
                    history.push(`/TenantPackages?id=${e.tenantSchema}`)
                  }
                >
                  Upgrade plan
                </h2>
              </Col>
              <Col xs={6}>
                <span className="font-weight-bold">{t("validupto")}</span>{" "}
                <br />
                {e.packageValidity}
              </Col>
            </Row>
            <br />
            <Row className="d-flex">
              <Col xs={6}>
                <span className="font-weight-bold">{t("action")}</span> <br />
                <HiOutlineCog8Tooth
                  fontSize="1.7rem"
                  className="margin-right-10"
                  cursor={"pointer"}
                  onClick={() => {
                    setSourceDataPopup(true);
                    setTenantSchema(e.tenantSchema);
                  }}
                />
                <HiOutlineInformationCircle
                  fontSize="1.7rem"
                  className="margin-right-10"
                  cursor={"pointer"}
                  onClick={() => {
                    setSourceDataPopup(true);
                    setTenantSchema(e.tenantSchema);
                  }}
                />
                <HiOutlineEnvelope
                  data-tip
                  data-for="emails"
                  fontSize="1.7rem"
                  className="margin-right-10"
                  cursor={"pointer"}
                  onClick={() => {
                    onEmailIconClicked(e.tenantSchema);
                    setTenantSchema(e.tenantSchema);
                  }}
                />
                {e.isActive ? (
                  <HiMinusCircle
                    data-for="deactivate"
                    className="activate-tenant-circle"
                    cursor={"pointer"}
                    onClick={() => {
                      setTenantSchema(e.tenantSchema);
                      setOpenActiveModal(true);
                    }}
                  />
                ) : (
                  <HiMinusCircle
                    data-tip
                    data-for="deactivate"
                    className="deactivate-tenant-circle"
                    cursor={"pointer"}
                    onClick={() => {
                      setTenantSchema(e.tenantSchema);
                      setOpenActiveModal(true);
                    }}
                  />
                )}
              </Col>
            </Row>
          </Card>
        ))
      )}

      <div className="d-flex justify-content-end my-25px">
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={data.length}
          pageSize={PageSize}
          onPageChange={(page: any) => setCurrentPage(page)}
          firstPageIndex={firstPageIndex}
          lastPageIndex={lastPageIndex}
        />
      </div>
      <CustomModal
        onHide={() => {
          setUnsavedDataPopup({ show: false });
          clearTenantData();
        }}
        show={unsavedDataPopup.show}
        modalTitle={t("addtenant")}
        modalBody={addTenantBody}
      />
      <CustomModal
        onHide={onHide}
        show={sourceDataPopup}
        modalTitle={`${t("sourcedetails")} - "${tenantSchema}"`}
        modalBody={addSourceBody}
      />
      <CustomModal
        onHide={() => {
          setShowSourceDetails(false);
          setSources([]);
        }}
        show={showSourceDetails}
        modalTitle={`${t("sourcedetails")}`}
        modalBody={sourceBody}
      />
      <CustomModal
        onHide={() => {
          setOpenActiveModal(false);
          setTenantSchema("");
          setOpenMfaModal(false);
        }}
        show={openActiveModal}
        modalTitle={`${t("activedeactivetenant")}`}
        modalBody={activateDeactiveModel}
      />
      <CustomModal
        onHide={() => {
          setTenantSchema("");
          setOpenActiveModal(false);
          setOtpNumber("");
          setDeleteTenant("");
          setOpenMfaModal(false);
        }}
        show={openMfaModal}
        modalTitle={`${t("activedeactivetenant")}`}
        modalBody={validateMFAModel}
      />
      <CustomModal
        onHide={() => {
          setTenantSchema("");
          setOpenEmailModal(false);
          setEmailActiveTab("addEmai");
          setEmailsData({
            wrapper_emails: [
              {
                id: null,
                email: "",
              },
            ],
            usecase_and_assets_emails: [
              {
                id: null,
                email: "",
              },
            ],
          });
          setEmailsToDelete({
            wrapper_emails: [],
            usecase_and_assets_emails: [],
          });
          setEmailsToRestore({
            wrapper_emails: [],
            usecase_and_assets_emails: [],
          });
        }}
        show={openEmailModal}
        modalTitle={t("manageemails")}
        modalBody={emailsModal}
      />
      <CustomModal
        onHide={() => {
          setOpenDeleteEmailModal(false);
        }}
        show={openDeleteEmailModal}
        modalTitle={t("manageemails")}
        modalBody={areYouSureModalForDelete}
      />
      <CustomModal
        onHide={() => {
          setOpenRestoreEmailModal(false);
        }}
        show={openRestoreEmailModal}
        modalTitle={t("manageemails")}
        modalBody={areYouSureModalForRestore}
      />
    </>
  );
};

export default ManageUsers;

const sourceNameOptions = [
  { value: "CYBLE", label: "CYBLE" },
  { value: "SIEM", label: "SIEM" },
  { value: "ITSM", label: "ITSM" },
  { value: "SOAR", label: "SOAR" },
];

const siemOptions = [
  { value: "sentinel", label: "Sentinel" },
  { value: "qradar", label: "Qradar" },
  { value: "seceon", label: "Seceon" },
];
const cybleOptions = [{ value: "cyble", label: "cyble" }];
const itsmOptions = [{ value: "ServiceDesk", label: "ServiceDesk" }];
const soarOptions = [{ value: "siemplify", label: "Siemplify" }];
const emptyOptions = [{ value: "", label: "" }];
