import React, { useEffect, useState } from "react";
import { Button, Col, Form, Image, Row } from "react-bootstrap";

import { toast } from "react-toastify";
import ReactTooltip from "react-tooltip";
import { IncidentDetails } from "../definition/InsightDetails";
import Loader from "./Loader";
import { useTranslation } from "react-i18next";
import {
  IncidentDetailsButton,
  IncidentDetailsCard,
  IncidentDetailsCardImg,
  IncidentDetailsCardTitle,
  IncidentDetailsDescp,
} from "./GlobalComponentStyles";

interface TDetailProps {
  detailResponse: IncidentDetails;
  handleResolutionDetailsChange: () => any;
  handleResolutionOwnerChange: () => any;
  handleOtherDetailsUpdate: () => any;
  handleUpdateDetails: (value: string) => any;
  addUpdate?: {
    isLoading: boolean;
    resp: { message: string; status: number };
    isError: boolean;
  };
}

const Detail = (props: TDetailProps) => {
  const {
    detailResponse,
    handleOtherDetailsUpdate,
    handleUpdateDetails,
    addUpdate,
  } = props;
  const [searchInput, setSearchInput] = useState("");
  const [updateInputDetails, setUpdateInputDetails] = useState("");
  const { t } = useTranslation();

  const [hideAddUpdataMsg, setHideAddUpdateMsg] = useState(true);

  const renderStatusType = (status: string) => {
    if (status.toLowerCase() === "mobile") {
      return "fa-solid fa-mobile-screen";
    }
    if (status.toLowerCase() === "desktop") {
      return "fa-solid fa-display";
    }
    if (status.toLowerCase() === "laptop") {
      return "fa-solid fa-laptop";
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value.toLowerCase());
  };

  var detailResp = detailResponse;
  const [tooltip, showTooltip] = useState(true);

  useEffect(() => {
    if (!addUpdate?.isLoading) {
      if (
        !hideAddUpdataMsg &&
        addUpdate?.resp &&
        !addUpdate?.isError &&
        addUpdate.resp.status === 201
      ) {
        toast.success(addUpdate.resp.message, {
          position: "top-center",
          autoClose: 4000,
        });
      } else if (!hideAddUpdataMsg && addUpdate?.isError) {
        toast.error("Server Error", {
          position: "top-center",
          autoClose: 4000,
        });
      }
    }
  }, [addUpdate, hideAddUpdataMsg]);

  return (
    <>
      <span>
        <Row className="insight-box rounded-lg mt-2 p-3">
          <Col lg={8}>
            <Row className="">
              {detailResp?.cards?.map((data: any, key: number) => {
                return (
                  <IncidentDetailsCard
                    key={key}
                    color={data.textColor}
                    className="my-3 py-2  d-flex flex-row align-items-center mx-2"
                  >
                    <IncidentDetailsCardImg
                      className="ml-1"
                      src={`/images/${data.cardIcon}.svg`}
                    />
                    <div className="ml-3">
                      <IncidentDetailsCardTitle
                        color={data.textColor}
                        className="m-0"
                      >
                        {data.cardTitle}
                      </IncidentDetailsCardTitle>
                      <p className="mb-0">{data.cardSubTitle}</p>
                    </div>
                  </IncidentDetailsCard>
                );
              })}
            </Row>

            <div className="insight-details mt-3">
              <h6 className="font-weight-bold  wordBreak">
                {detailResp.incidentDetails.title}
              </h6>
              <p className=" wordBreak">
                {detailResp.incidentDetails.description}
              </p>
            </div>
            <Row className="mt-5">
              <Col lg={6}>
                <h6 className="font-weight-bold mt-2">
                  {detailResp.resolutionStatus.title}
                </h6>
                <div className="d-flex justify-content-between mt-3 ">
                  <p className="wordBreak text-left">
                    {detailResp.resolutionStatus.resolutionDetails.title}
                  </p>
                  {/* {detailResp.resolutionStatus.resolutionDetails.isEditable && (
                    <a href="#" onClick={handleResolutionDetailsChange}>
                      Change
                    </a>
                  )} */}
                </div>
                <p className="wordBreak text-left">
                  {detailResp.resolutionStatus.resolutionDetails.description}
                </p>

                <div className="d-flex justify-content-between">
                  <p>{detailResp.resolutionStatus.resolutionOwner.title}</p>
                  {/* {detailResp.resolutionStatus.resolutionOwner.isEditable && (
                    <a href="#" onClick={handleResolutionOwnerChange}>
                      Change
                    </a>
                  )} */}
                </div>
                <p className="text-left">
                  {detailResp.resolutionStatus.resolutionOwner.description}
                </p>
              </Col>
              <Col lg={6}>
                <div className="d-flex justify-content-between align-items-center">
                  <h6 className="font-weight-bold m-0">
                    {detailResp.otherDetails.title}
                  </h6>
                  <IncidentDetailsButton
                    variant="outline-info"
                    size="sm"
                    onClick={handleOtherDetailsUpdate}
                    disabled
                  >
                    {t("updatedetails")}
                  </IncidentDetailsButton>
                </div>
                {detailResp?.otherDetails?.details?.map(
                  (detail: any, key: number) => {
                    const splitDetailValue = detail.value?.split("*");
                    const iconClass = splitDetailValue?.map((x: any) =>
                      x.split("~")
                    );
                    const lengthT = iconClass?.length;
                    const toolTip = detail.value?.split(":");

                    return (
                      <div
                        className="d-flex justify-content-between my-2 other-box"
                        key={key}
                      >
                        <p>{detail.subTitle}</p>
                        <p className="font-color">
                          {detail?.value?.includes("*") ? (
                            <span>
                              {iconClass?.map((x: any, key: number) => {
                                return (
                                  <span key={key} className="ml-1">
                                    <i
                                      className={`${renderStatusType(x[0])}`}
                                    ></i>
                                    <span className="ml-1">:</span> {x[1]}
                                    {lengthT > key + 1 && (
                                      <span className="mx-1">|</span>
                                    )}
                                  </span>
                                );
                              })}
                            </span>
                          ) : detail?.value?.includes(":") ? (
                            <span>
                              <span
                                className="cursor-pointer"
                                data-tip
                                data-for="registerTip"
                                onMouseEnter={() => showTooltip(true)}
                                onMouseLeave={() => {
                                  showTooltip(false);
                                }}
                              >
                                {toolTip[0]}...
                              </span>

                              {tooltip && (
                                <ReactTooltip id="registerTip" place="top">
                                  {toolTip[1]}
                                </ReactTooltip>
                              )}
                            </span>
                          ) : (
                            <span className="wordBreak">{detail.value}</span>
                          )}
                        </p>
                      </div>
                    );
                  }
                )}
              </Col>
            </Row>
          </Col>
          <Col lg={4} className="px-4">
            <div className="mt-3 d-flex justify-content-between align-items-center">
              <h6 className="font-weight-bold m-0">
                {detailResp.updates.title}
              </h6>
              <Form.Control
                placeholder={t("searchupdates")}
                className="risk-input-style w-50"
                value={searchInput}
                onChange={handleSearch}
                maxLength={50}
              />
            </div>
            <div className="mt-3">
              {detailResp?.updates?.data
                ?.filter(
                  (data: any) =>
                    data?.description?.toLowerCase().includes(searchInput) ||
                    data.updateDateTime?.toLowerCase().includes(searchInput)
                )
                ?.map((data: any, key: number) => {
                  return (
                    <Row className="mt-3" key={key}>
                      <Col lg={2}>
                        <Image
                          rounded
                          roundedCircle
                          thumbnail
                          className="incident-details-round-img"
                        />
                      </Col>
                      <Col lg={10}>
                        <p className="m-0">{data.updateDateTime} </p>
                        <IncidentDetailsDescp className="m-0 font-weight-bold wrap-text">
                          {data.description}
                        </IncidentDetailsDescp>
                      </Col>
                    </Row>
                  );
                })}

              <Form.Control
                value={updateInputDetails}
                placeholder={t("typeupdatehere")}
                as="textarea"
                rows={2}
                className="mt-3 risk-input-style"
                onChange={(e) => {
                  setUpdateInputDetails(e.target.value);
                  setHideAddUpdateMsg(true);
                }}
                maxLength={200}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (updateInputDetails.trim() === "") return;
                    handleUpdateDetails(updateInputDetails);
                    setUpdateInputDetails("");
                    setHideAddUpdateMsg(false);
                  }
                }}
              />
              {updateInputDetails?.length === 200 && (
                <div className=" text-center alert alert-danger textarea-footer">
                  {t("inputlimit")}
                </div>
              )}
              {addUpdate?.isLoading ? (
                <span className="float-start mt-2">
                  <Loader loaderType="BounceLoader" size={40} />
                </span>
              ) : (
                <Button
                  variant="outline-primary mt-2"
                  size="sm"
                  className="filled-btn-style"
                  disabled={!updateInputDetails}
                  onClick={() => {
                    if (updateInputDetails.trim() === "") return;
                    handleUpdateDetails(updateInputDetails);
                    setUpdateInputDetails("");
                    setHideAddUpdateMsg(false);
                  }}
                >
                  {t("update")}
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </span>
    </>
  );
};

export default Detail;
