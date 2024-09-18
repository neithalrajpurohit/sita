import moment from "moment";
import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { HiOutlineArrowDownTray, HiPencil } from "react-icons/hi2";
import Loading from "../../component/Loading";
import AnalysisDetailComp from "../../component/PerspectiveDetailComp";
import { AppDispatch } from "../../index";
import { addEditAnalysisActionCreator } from "../../store/AddEdits/AddEditPerspectiveSlice";
import { RootState } from "../../configureStore";
import { PerspectiveActionCreator } from "../../store/Perspective/PerspectiveGridSlice";
import { useThemeVal } from "../../hooks/useThemeVar";
import { useTranslation } from "react-i18next";

type TAnalysisDetailProps = ReturnType<typeof mapStateToProps>;

const PerspectiveDetailPage = (props: TAnalysisDetailProps) => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const [isShowMsg, setIsShowMsg] = useState(false);
  const themeHook = useThemeVal("variant");
  useEffect(() => {
    document.title = "Perspective Detail";
    // setIsError(false);
  }, []);

  const editAnalysis = () => {
    history.push("/AddEditPerspective");
    dispatch(
      addEditAnalysisActionCreator.getAnalysis(
        props.AnalysisDetailData.selectedIncidentId
      )
    )
      .then(() =>
        dispatch(addEditAnalysisActionCreator.updateAnalysisMode("edit"))
      )
      .then(() => dispatch(addEditAnalysisActionCreator.resetEditStates()))
      .then(() =>
        dispatch(addEditAnalysisActionCreator.setCancelMode("editDetail"))
      );
  };

  const handleSubmit = () => {
    const tempFormData = { ...props.AddEditPersPectiveData.FormData };
    tempFormData.isPublished = true;
    tempFormData.userName =
      props.UserData.userDetails?.user?.first_name +
      "" +
      props.UserData.userDetails?.user?.last_name;
    dispatch(
      addEditAnalysisActionCreator.addAnalysis({
        formData: tempFormData,
        mode: props.AddEditPersPectiveData.mode,
      })
    );
    setIsShowMsg(true);
  };

  useEffect(() => {
    if (isShowMsg) {
      if (
        props.AddEditPersPectiveData.addAnalysisResp.status?.toLowerCase() ===
        "success"
      ) {
        toast.success(props.AddEditPersPectiveData.addAnalysisResp.message, {
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
        props.AddEditPersPectiveData.addAnalysisResp.status?.toLowerCase() ===
        "error"
      ) {
        // setIsError(true);
        toast.error(props.AddEditPersPectiveData.addAnalysisResp.message, {
          position: "top-center",
          autoClose: 4000,
        });
        setIsShowMsg(false);
      }
    }
  }, [props.AddEditPersPectiveData.addAnalysisResp]);

  const handleCancel = () => {
    history.push("/AddEditPerspective");
  };

  const handleDownload = () => {
    window.print();
  };

  if (props.AnalysisDetailData.isError) {
    return (
      <div className="error">
        Error while fetching the data. Please contact administrator.
      </div>
    );
  }
  if (props.AnalysisDetailData.isLoading) {
    return <Loading title={""} width={"1050px"} />;
  }
  // }
  if (props.AnalysisDetailData.isLoaded) {
    if (props.AnalysisDetailData.analysisDetailsData) {
      var AnalysisDetailData = JSON.parse(
        JSON.stringify(props.AnalysisDetailData.analysisDetailsData)
      );
    }

    return (
      <div id="section-to-print">
        {props.AnalysisDetailData.isLoading ||
        props.AddEditPersPectiveData.isAddAnalysisLoading ? (
          <Loading title={""} width={"1050px"} />
        ) : (
          <span>
            <Row className="my-3 align-items-center justify-content-between p-2 margin-left-10 w-98">
              <Col lg={10} className="mb-3 d-flex flex-wrap">
                <h4 className=" mb-0 mr-3">
                  <Link to="/PerspectiveGrid" className="back-link">
                    <span>
                      {" "}
                      SITA <i className="fa-solid fa-greater-than"></i>{" "}
                      {t("perspective")}{" "}
                      <i className="fa-solid fa-greater-than"></i>{" "}
                      {
                        props?.AnalysisDetailData?.analysisDetailsData
                          ?.perspectiveFormData?.perspectiveTitle
                      }{" "}
                    </span>
                  </Link>
                </h4>
              </Col>
              {!props.AnalysisDetailData.isPreview && (
                <Col lg={2} xs={12} className="d-flex justify-content-end">
                  {props.UserData.userRoles?.claims?.includes(
                    "PerspectiveDetail_Edit"
                  ) && (
                    <Button
                      id="section-not-to-print"
                      variant={themeHook}
                      className="min-width-50px mr-2"
                      onClick={() => editAnalysis()}
                    >
                      {/* <img src={Icons.editDetailIcon} alt="Edit" /> */}
                      <HiPencil
                        className="object-fit-fill"
                        size="1.3em"
                        aria-hidden="true"
                      />
                    </Button>
                  )}
                  {props.UserData.userRoles?.claims?.includes(
                    "PerspectiveDetail_Download"
                  ) && (
                    <Button
                      id="section-not-to-print"
                      variant={themeHook}
                      className="min-width-50px"
                      onClick={() => {
                        handleDownload();
                      }}
                    >
                      <HiOutlineArrowDownTray
                        className="object-fit-fill"
                        size="1.4em"
                        aria-hidden="true"
                      />
                    </Button>
                  )}
                </Col>
              )}
            </Row>
            {/* {isError && (
              <Row className="text-center text-capitalize my-3">
                <div
                  className="alert alert-danger alert-dismissible fade show"
                  role="alert"
                >
                  <span>
                    {props.AddEditPersPectiveData.addAnalysisResp.message}
                  </span>
                </div>
              </Row>
            )} */}
            <span>
              <AnalysisDetailComp
                data={AnalysisDetailData}
                option={{
                  isPreview: props.AnalysisDetailData.isPreview,
                }}
                buttonEventHandler={{
                  handleSubmit: handleSubmit,
                  handleCancel: handleCancel,
                }}
              />
            </span>
            {/* )} */}
          </span>
        )}
      </div>
    );
  }

  return <div></div>;
};

function mapStateToProps(state: RootState) {
  return {
    AnalysisDetailData: state.PerspectiveDetails,
    AddEditPersPectiveData: state.AddEditPerspective,
    PerspectiveGridData: state.PerspectiveGrid,
    UserData: state.UserAuthentication,
  };
}

export default connect(mapStateToProps)(PerspectiveDetailPage);
