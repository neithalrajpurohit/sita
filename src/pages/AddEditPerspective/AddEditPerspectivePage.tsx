import moment from "moment";
import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import AddEditAnalysisComp from "../../component/AddEdit/AddEditPerspectiveComp";
import Loading from "../../component/Loading";
import { AppDispatch } from "../../index";
import { addEditAnalysisActionCreator } from "../../store/AddEdits/AddEditPerspectiveSlice";
import { RootState } from "../../configureStore";
import { AnalysisDetailsActionCreator } from "../../store/Perspective/PerspectiveDetailSlice";
import { PerspectiveActionCreator } from "../../store/Perspective/PerspectiveGridSlice";
import { AddEditPrespectiveOptions } from "../../utils/AddAnalysisDropDowndata";
import { addEditActionCreator } from "../../store/AddEdits/AddEditSharedActions";
import { useTranslation } from "react-i18next";

type TAddEditAnalysisProps = ReturnType<typeof mapStateToProps>;

const AddEditPerspectivePage = (props: TAddEditAnalysisProps) => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState("");
  const [isErrorMsg, setIsErrorMsg] = useState(false);
  const { FormData } = props;

  const eventHandler = (key: string, value: any) => {
    dispatch(addEditAnalysisActionCreator.formEventHandler({ key, value }));
    //clear error
    setIsErrorMsg(false);
    setErrorMsg("");
  };

  const errorHandler = (msg: string) => {
    setIsErrorMsg(true);
    setErrorMsg(msg);
  };

  const handlePreview = () => {
    let footerData;

    const userData = {
      user: props.UserData.userDetails?.user?.first_name,
      date: moment(new Date(), "DD-MM-YYYY").format("DD MMM YY"),
      time: moment(new Date(), "DD-MM-YYYY").format("hh:mm a"),
    };

    if (props.AddEditAnalysisData.mode.toLocaleLowerCase() === "add") {
      footerData = {
        lastUpdateInformation: userData,
        originallyCreatedBy: userData,
      };
    } else if (props.AddEditAnalysisData.mode.toLocaleLowerCase() === "edit") {
      footerData = {
        lastUpdateInformation: userData,
        originallyCreatedBy:
          props.PerspectiveDetailData?.analysisDetailsData?.footerData
            ?.originallyCreatedBy,
      };
    }
    dispatch(
      AnalysisDetailsActionCreator.addEditPerspectiveFormPreview({
        perspectiveFormData: FormData,
        footerData: footerData,
      })
    )
      .then(() => dispatch(AnalysisDetailsActionCreator.updateIsPreview(true)))
      .then(() => history.push("/PerspectiveDetail"));
  };

  const [isShowMsg, setIsShowMsg] = useState(false);

  useEffect(() => {
    document.title = "Perspective";
  }, []);

  useEffect(() => {}, [FormData]);
  const limit = 2000;

  useEffect(() => {
    if (isShowMsg) {
      if (
        props.AddEditAnalysisData.addAnalysisResp.status?.toLocaleLowerCase() ===
        "success"
      ) {
        toast.success(props.AddEditAnalysisData.addAnalysisResp.message, {
          position: "top-center",
          autoClose: 300,
        });
        dispatch(
          PerspectiveActionCreator.getPerspectiveGridData({
            fromDate: moment(
              new Date(props.PerspectiveGridData.startDate),
              "DD-MM-YYYY"
            ).format("YYYY-MM-DD"),
            toDate: moment(
              new Date(props.PerspectiveGridData.endDate),
              "DD-MM-YYYY"
            ).format("YYYY-MM-DD"),
            dropdownFilters: props.PerspectiveGridData.dropdownfilters,
          })
        );
        setTimeout(() => {
          history.push("/PerspectiveGrid");
        }, 100);
        setIsShowMsg(false);
      } else if (
        props.AddEditAnalysisData.addAnalysisResp.status?.toLocaleLowerCase() ===
        "error"
      ) {
        errorHandler(props.AddEditAnalysisData.addAnalysisResp.message);
      }
    }
  }, [props.AddEditAnalysisData.addAnalysisResp]);

  useEffect(() => {
    if (props.AddEditAnalysisData.mode.toLocaleLowerCase() === "add") {
      document.title = "Add Perspective ";
    } else if (props.AddEditAnalysisData.mode.toLocaleLowerCase() === "edit") {
      document.title = "Edit Perspective";
    } else {
      document.title = "Perspective";
    }
  }, [props.AddEditAnalysisData.mode]);

  const AllOptions = AddEditPrespectiveOptions();

  const handleSaveAsDraft = () => {
    const tempFormData = { ...FormData };
    tempFormData.isPublished = false;
    tempFormData.userName =
      props.UserData.userDetails?.user?.first_name +
      "" +
      props.UserData.userDetails?.user?.last_name;
    dispatch(
      addEditAnalysisActionCreator.addAnalysis({
        formData: tempFormData,
        mode: props.AddEditAnalysisData.mode,
      })
    );
    setIsShowMsg(true);
  };

  const handleCancel = () => {
    if (
      props.AddEditAnalysisData.cancleMode?.toLocaleLowerCase() === "addgrid"
    ) {
      history.push("/PerspectiveGrid");
    } else if (
      props.AddEditAnalysisData.cancleMode?.toLocaleLowerCase() === "editdetail"
    ) {
      history.push("/PerspectiveDetail");
    } else if (
      props.AddEditAnalysisData.cancleMode?.toLocaleLowerCase() === "editgrid"
    ) {
      history.push("/PerspectiveGrid");
    }
  };

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

  if (props.AddEditAnalysisData.isEditAnalysisError) {
    return (
      <div className="error">
        {" "}
        Error while fetching the data. Please contact administrator.
      </div>
    );
  }

  if (!props.AddEditAnalysisData.isEditAnalysisLoaded) {
    if (props.AddEditAnalysisData.isEditAnalysisLoading) {
      return <Loading title={""} width={"1050px"} />;
    }
  }

  if (
    props.AddEditAnalysisData.isEditAnalysisLoaded ||
    props.AddEditAnalysisData.mode.toLocaleLowerCase() === "add"
  ) {
    return (
      <>
        {props.AddEditAnalysisData.isAddAnalysisLoading ||
        props.AddEditAnalysisData.isEditAnalysisLoading ? (
          <Loading title={""} width={"1050px"} />
        ) : (
          <>
            <div className="my-4 rml">
              <span
                // to="/PerspectiveGrid"
                className="cursor-pointer back-link blue_hoverLink"
                onClick={() => handleCancel()}
              >
                <a>
                  {/* <img src={backArrow} alt="" className="mr-2 mb-1" /> */}
                  {props.AddEditAnalysisData.mode.toLocaleLowerCase() ===
                  "add" ? (
                    <span>
                      {t("add").toUpperCase()} {t("perspective").toUpperCase()}{" "}
                    </span>
                  ) : props.AddEditAnalysisData.mode.toLocaleLowerCase() ===
                    "edit" ? (
                    <span>
                      {t("edit").toUpperCase()} {t("perspective").toUpperCase()}{" "}
                    </span>
                  ) : (
                    <span>{t("perspective").toUpperCase()} </span>
                  )}
                </a>
              </span>
            </div>
            <div>
              <AddEditAnalysisComp
                FormData={FormData}
                eventHandler={eventHandler}
                errorHandler={errorHandler}
                options={{
                  limit: limit,
                  SelectLevel: AllOptions.SelectLevel,
                  ActionTaken: AllOptions.ActionTaken,
                  errorMsg: errorMsg,
                  isErrorMsg: isErrorMsg,
                  AnalysisTypeOption: AllOptions.AnalysisTypeOption,
                  incidentList: props.AddEditAnalysisData.incidentList,
                  assetList: props.AddEditAnalysisData.assetList,
                  entityList: props.AddEditAnalysisData.entityList,
                  ActedUponOption: AllOptions.ActedUponOption,
                }}
                buttonEventHandler={{
                  handlePreview: handlePreview,
                  handleCancel: handleCancel,
                  handleSaveAsDraft: handleSaveAsDraft,
                }}
                tagsEventHandler={{
                  getIncidentList: getIncidentList,
                  getAssetList: getAssetList,
                  getEntityList: getEntityList,
                }}
                tagFetchStatus={{
                  isTagLoading: props.AddEditAnalysisData.isTagLoading,
                  isTagFetchError: props.AddEditAnalysisData.isTagFetchError,
                }}
                deletePropertiesOfFormData={(payload: {
                  name: "startDateTime" | "endDateTime" | "selectedLevelFilter";
                }) =>
                  dispatch(
                    addEditAnalysisActionCreator.deletePropertiesOfFormData(
                      payload
                    )
                  )
                }
              />
            </div>
          </>
        )}
      </>
    );
  }
  return <div></div>;
};

function mapStateToProps(state: RootState) {
  return {
    // FormData: state.NewsLetter.FormData,
    FormData: state.AddEditPerspective.FormData,
    AddEditAnalysisData: state.AddEditPerspective,
    UserData: state.UserAuthentication,
    PerspectiveDetailData: state.PerspectiveDetails,
    PerspectiveGridData: state.PerspectiveGrid,
  };
}

export default connect(mapStateToProps)(AddEditPerspectivePage);
