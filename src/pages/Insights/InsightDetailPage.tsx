import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import Loader from "../../component/Loader";
import Loading from "../../component/Loading";
import { RootState } from "../../configureStore";
import { InsightDetailsActionCreator } from "../../store/Insights/InsightDetailSlice";
import { useHistory } from "react-router-dom";
import Detail from "../../component/Detail";
import Modal from "../../component/Modal";
import { AppDispatch } from "../../index";
import { useTranslation } from "react-i18next";
import { IncidentDetailsStyledIcon } from "../GlobalStyles";

type TInsightDetailProps = ReturnType<typeof mapStateToProps>;

const InsightDetailPage = (props: TInsightDetailProps) => {
  const dispatch: AppDispatch = useDispatch();
  const [isShowModal, setIsShowModal] = useState(false);
  const [isClose, setIsClose] = useState(false);
  const history = useHistory();
  const { t } = useTranslation();
  useEffect(() => {
    document.title = "Insight Detail";
  }, []);

  const handleCloseIncident = () => {
    setIsClose(true);
    setIsShowModal(true);
    dispatch(InsightDetailsActionCreator.closeIncident());
  };

  const handleResolutionDetailsChange = () => {
    alert("Resolution Details Change Function");
  };
  const handleResolutionOwnerChange = () => {
    alert("Resolution Owner Change Function");
  };
  const handleOtherDetailsUpdate = () => {
    alert("Resolution Other Details Update Function");
  };
  const handleUpdateDetails = (value: string) => {
    dispatch(
      InsightDetailsActionCreator.addUpdate({
        incident: props.InsightDetailData.selectedIncidentId,
        update: value,
        update_by: props.UserData.userDetails.user.email,
      })
    );
  };

  useEffect(() => {
    if (
      props.InsightDetailData.isAddUpdateResp &&
      props.InsightDetailData.isAddUpdateResp.status === 201
    ) {
      const incidentId = props.InsightDetailData.selectedIncidentId;
      const Id = props.InsightDetailData.id;
      dispatch(
        InsightDetailsActionCreator.getInsightDetailsData({
          incidentId,
          Id,
        })
      );
    }
  }, [props.InsightDetailData.isAddUpdateResp]);

  const handleSubmit = () => {
    setIsShowModal(false);
    if (isClose) {
      if (props.InsightDetailData.isCloseIncident) {
        history.goBack();
      }
    }
  };

  const onHide = () => {
    setIsShowModal(false);
    if (isClose) {
      if (props.InsightDetailData.isCloseIncident) {
        history.goBack();
      }
    }
  };

  const modalBody = (
    <>
      {props.InsightDetailData.isCloseIncidentLoading ? (
        <Loader loaderType="GridLoader" size={40} />
      ) : props.InsightDetailData.isCloseIncident ? (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          <strong>{t("incidentclosedsuccessfully")}</strong>
          <Button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </Button>
        </div>
      ) : (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          <strong>{t("erroroccuredwhilefetchingthedata")}</strong>
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}
    </>
  );
  const modalFooter = (
    <>
      <Button
        variant="outline-primary"
        className="margin-left-60"
        onClick={() => {
          handleSubmit();
        }}
      >
        {t("ok")}
      </Button>
    </>
  );

  if (props.InsightDetailData.isError) {
    return (
      <div className="error">
        Error while fetching the data. Please contact administrator.
      </div>
    );
  }
  if (!props.InsightDetailData.isLoaded) {
    if (props.InsightDetailData.isLoading) {
      return <Loading title={""} width={"1050px"} />;
    }
  }

  if (props.InsightDetailData.isLoaded) {
    var detailResp = props.InsightDetailData.insightDetailsData;

    return (
      <span className="rml">
        {props.InsightDetailData.isLoading ? (
          <Loading title={""} width={"1050px"} />
        ) : (
          <span>
            <Row className="my-2  align-items-center ">
              <Col lg={9} className="mb-3 d-flex flex-wrap">
                <h4 className=" mb-0 mr-3">
                  <button
                    onClick={() => history.goBack()}
                    className="back-link back-link-insight-details "
                  >
                    SITA <i className="fa-solid fa-greater-than"></i>{" "}
                    {t("insights")} <i className="fa-solid fa-greater-than"></i>{" "}
                    {t("incident")} {props.InsightDetailData.selectedIncidentId}
                  </button>
                </h4>

                <span className="d-flex r-mLeft d-none">
                  <IncidentDetailsStyledIcon
                    className="fa-solid fa-circle mt-2"
                    color={detailResp?.incidentStatus?.color}
                  />
                  <h4 className=" mb-0 mx-2">
                    {detailResp?.incidentStatus?.text}
                  </h4>
                </span>
              </Col>
              <Col lg={3}>
                {!props.InsightDetailData.isCloseIncident ? (
                  <Button
                    variant="outline-danger width-sm-100 float-right bg-color font-color"
                    onClick={handleCloseIncident}
                    disabled={detailResp?.incidentStatus?.text === "Closed"}
                  >
                    {t("closeincident")}
                  </Button>
                ) : (
                  <div></div>
                )}
              </Col>
            </Row>

            <Detail
              detailResponse={props.InsightDetailData.insightDetailsData}
              handleResolutionDetailsChange={handleResolutionDetailsChange}
              handleResolutionOwnerChange={handleResolutionOwnerChange}
              handleOtherDetailsUpdate={handleOtherDetailsUpdate}
              handleUpdateDetails={handleUpdateDetails}
              addUpdate={{
                isLoading: props.InsightDetailData.isAddUpdateLoading,
                resp: props.InsightDetailData.isAddUpdateResp,
                isError: props.InsightDetailData.isAddUpdateError,
              }}
            />

            <Modal
              modalBody={modalBody}
              modalTitle={t("close") + " " + t("incident") + " " + t("status")}
              show={isShowModal}
              onHide={onHide}
              modalFooter={modalFooter}
            />
          </span>
        )}
      </span>
    );
  }
  return <div></div>;
};

function mapStateToProps(state: RootState) {
  return {
    InsightDetailData: state.InsightDetails,
    // InsightsData: state.Insights,
    UserData: state.UserAuthentication,
  };
}

export default connect(mapStateToProps)(InsightDetailPage);
