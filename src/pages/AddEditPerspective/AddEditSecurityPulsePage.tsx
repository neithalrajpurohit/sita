import moment from "moment";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import AddEditSecurityPulse from "../../component/AddEdit/AddEditSecurityPulse";
import Loading from "../../component/Loading";
import { AppDispatch } from "../../index";
import { addSecurityPulseActionCreator } from "../../store/AddEdits/AddEditSecurityPulseSlice";
import { RootState } from "../../configureStore";
import { SecurityPulseDetailsActionCreator } from "../../store/SecurityPulse/SecurityPulseDetailsSlice";
import { SecurityPulseGridActionCreator } from "../../store/SecurityPulse/SecurityPulseGridSlice";
import { AddEditPrespectiveOptions } from "../../utils/AddAnalysisDropDowndata";
import { addEditActionCreator } from "../../store/AddEdits/AddEditSharedActions";
import { useTranslation } from "react-i18next";

type TAnalysisProps = ReturnType<typeof mapStateToProps>;

const AddEditSecurityPulsePage = (props: TAnalysisProps) => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState("");
  const [isErrorMsg, setIsErrorMsg] = useState(false);

  const eventHandler = (name: string, value: any) => {
    dispatch(
      addSecurityPulseActionCreator.formEventHandler({
        name: name,
        value: value,
      })
    );
  };
  const { FormData } = props;

  const errorHandler = (msg: string) => {
    setIsErrorMsg(true);
    setErrorMsg(msg);
    toast.error(msg, {
      position: "top-center",
      autoClose: 10000,
    });
  };
  const [isShowMsg, setIsShowMsg] = useState(false);

  useEffect(() => {
    if (isShowMsg) {
      if (
        props.SecurityPulseData.addSecurityPulseResp.status?.toLocaleLowerCase() ===
        "success"
      ) {
        toast.success(props.SecurityPulseData.addSecurityPulseResp.message, {
          position: "top-center",
          autoClose: 300,
        });
        setTimeout(() => {
          history.push("/SecurityPulseGrid");
        }, 100);
        dispatch(
          SecurityPulseGridActionCreator.getGridDataSecurityPulse({
            fromDate: moment(
              new Date(props.SecurityPulseGridData.startDate),
              "DD-MM-YYYY"
            ).format("YYYY-MM-DD"),
            toDate: moment(
              new Date(props.SecurityPulseGridData.endDate),
              "DD-MM-YYYY"
            ).format("YYYY-MM-DD"),
            // dropdownFilters: props.PerspectiveGridData.dropdownfilters,
          })
        );
        setIsShowMsg(false);
      } else if (
        props.SecurityPulseData.addSecurityPulseResp.status?.toLocaleLowerCase() ===
        "error"
      ) {
        errorHandler(props.SecurityPulseData.addSecurityPulseResp.message);
      }
    }
  }, [props.SecurityPulseData.addSecurityPulseResp]);

  useEffect(() => {
    if (props.SecurityPulseData.mode.toLocaleLowerCase() === "add") {
      document.title = "Add Security Pulse";
    } else if (props.SecurityPulseData.mode.toLocaleLowerCase() === "edit") {
      document.title = "Edit Security Pulse";
    } else {
      document.title = "Security Pulse";
    }
  }, [props.SecurityPulseData.mode]);

  const handleSaveAsDraft = () => {
    const tempFormData = { ...FormData };
    tempFormData.isPublished = false;
    tempFormData.userName =
      props.UserData.userDetails?.user?.first_name +
      props.UserData.userDetails?.user?.last_name;
    dispatch(
      addSecurityPulseActionCreator.addSecurityPulse({
        formData: tempFormData,
        mode: props.SecurityPulseData.mode,
      })
    );
    setIsShowMsg(true);
  };

  const SecurityOptions = AddEditPrespectiveOptions();

  const handleCancel = () => {
    if (props.SecurityPulseData.cancleMode?.toLocaleLowerCase() === "addgrid") {
      history.push("/SecurityPulseGrid");
    } else if (
      props.SecurityPulseData.cancleMode?.toLocaleLowerCase() === "editdetail"
    ) {
      history.push("/SecurityPulseDetail");
    } else if (
      props.SecurityPulseData.cancleMode?.toLocaleLowerCase() === "editgrid"
    ) {
      history.push("/SecurityPulseGrid");
    }
    history.push("/SecurityPulseGrid");
  };

  const limit = 200;

  //tags

  const getIncidentList = (inputValue: string) => {
    dispatch(addEditActionCreator.getIncidentList(inputValue));
  };

  const getAssetList = (inputValue: string) => {
    dispatch(addEditActionCreator.getAssetList(inputValue));
  };

  const getEntityList = (inputValue: string) => {
    dispatch(addEditActionCreator.getEntityList(inputValue));
  };
  const resetAddState = () => {
    dispatch(addSecurityPulseActionCreator.resetAddStates());
  };

  const handlePreview = () => {
    let footerData = {
      email: "info@etek.com",
      contacts: [
        {
          countryName: "Colombia",
          contactNo: "+57(1)2571520",
        },
        {
          countryName: "Peru'",
          contactNo: "+51(1)6124343",
        },
        {
          countryName: "India",
          contactNo: "+91-9873451221",
        },
      ],
    };
    let headerData;
    const userData = {
      user: props.UserData.userDetails?.user?.first_name,
      designation: "",
      createdDate: moment(new Date(), "DD-MM-YYYY").format("DD MMM YY"),
    };

    if (props.SecurityPulseData.mode.toLocaleLowerCase() === "add") {
      headerData = userData;
    } else if (props.SecurityPulseData.mode.toLocaleLowerCase() === "edit") {
      headerData =
        props.SecurityPulseDetailData.SecurityPulseDetailsData.headerData;
    }

    dispatch(
      SecurityPulseDetailsActionCreator.addEditSecurityPulseFormPreview({
        headerData: headerData,
        securityPulseFormData: FormData,
        footerData: footerData,
      })
    )
      .then(() =>
        dispatch(SecurityPulseDetailsActionCreator.updateIsPreview(true))
      )
      .then(() => history.push("/SecurityPulseDetail"));
  };

  if (props.SecurityPulseData.isEditSecurityPulseError) {
    return (
      <div className="error">
        {" "}
        Error while fetching the data. Please contact administrator.
      </div>
    );
  }

  if (!props.SecurityPulseData.isEditSecurityPulseLoaded) {
    if (props.SecurityPulseData.isEditSecurityPulseLoading) {
      return <Loading title={""} width={"1050px"} />;
    }
  }

  if (
    props.SecurityPulseData.isEditSecurityPulseLoaded ||
    props.SecurityPulseData.mode.toLocaleLowerCase() === "add"
  ) {
    return (
      <>
        {props.SecurityPulseData.isAddSecurityPulseLoading ||
        props.SecurityPulseData.isEditSecurityPulseLoading ? (
          <Loading title={""} width={"1050px"} />
        ) : (
          <>
            {/* Edit Nav */}
            <Row className="my-3  p-2">
              <Col
                lg={12}
                className="mb-3 d-flex align-items-center justify-content-between"
              >
                <h4 className=" mb-0 mr-3">
                  <Link
                    to="/SecurityPulseGrid"
                    className="cursor-pointer back-link"
                  >
                    {/* <img src={backArrow} alt="" className="mr-1 mb-1" /> */}
                    <span>
                      {props.SecurityPulseData.mode.toLocaleLowerCase() ===
                      "add" ? (
                        <span>
                          {t("add").toUpperCase()}{" "}
                          {t("securitypulse").toUpperCase()}
                        </span>
                      ) : props.SecurityPulseData.mode.toLocaleLowerCase() ===
                        "edit" ? (
                        <span>
                          {t("edit").toUpperCase()}{" "}
                          {t("securitypulse").toUpperCase()}
                        </span>
                      ) : (
                        <span> {t("securitypulse").toUpperCase()}</span>
                      )}
                    </span>
                    {/* {props.AnalysisDetailData.selectedIncidentId} */}
                  </Link>
                </h4>
              </Col>
            </Row>

            <AddEditSecurityPulse
              FormData={FormData}
              eventHandler={eventHandler}
              options={{
                limit: limit,
                incidentInputList: props.SecurityPulseData.incidentList,
                assetsInputList: props.SecurityPulseData.assetList,
                entityInputList: props.SecurityPulseData.entityList,
                criticalityList: SecurityOptions.SelectLevel,
              }}
              tagsEventHandler={{
                getIncidentList: getIncidentList,
                getAssetList: getAssetList,
                getEntityList: getEntityList,
              }}
              buttonEventHandler={{
                handleCancel: handleCancel,
                handleSaveAsDraft: handleSaveAsDraft,
                handlePreview: handlePreview,
              }}
              tagFetchStatus={{
                isTagLoading: props.SecurityPulseData.isTagLoading,
                isTagFetchError: props.SecurityPulseData.isTagFetchError,
              }}
              sectionsHandler={(payload: {
                name: string;
                value: string;
                key: number;
              }) =>
                dispatch(
                  addSecurityPulseActionCreator.sectionImageHandler(payload)
                )
              }
            />
          </>
        )}
      </>
    );
  }
  return <div></div>;
};

function mapStateToProps(state: RootState) {
  return {
    FormData: state.AddEditSecurityPulse.FormData,
    SecurityPulseData: state.AddEditSecurityPulse,
    UserData: state.UserAuthentication,
    SecurityPulseDetailData: state.SecurityPulseDetails,
    SecurityPulseGridData: state.SecurityPulseGrid,
  };
}

export default connect(mapStateToProps)(AddEditSecurityPulsePage);
