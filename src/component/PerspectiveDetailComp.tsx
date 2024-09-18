import { Button, Col, Row } from "react-bootstrap";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import { useSelector } from "react-redux";
import { RootState } from "../configureStore";

import { HiUser } from "react-icons/hi2";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import { HiOutlineClock } from "react-icons/hi2";
import pdfIcon from "../assets/icons/pdfIcon.svg";
import { PerspectiveDetailResp } from "../definition/PerspectiveDetail";
import { DFG } from "../utils/Common";
import { useTranslation } from "react-i18next";
import { StyledImgContainerDiv } from "./GlobalComponentStyles";

interface AnalysisDetailProps {
  data: PerspectiveDetailResp;
  option: {
    isPreview: boolean;
  };
  buttonEventHandler: {
    handleSubmit: any;
    handleCancel: any;
  };
}

const AnalysisDetailComp = (props: AnalysisDetailProps) => {
  const { t } = useTranslation();
  const { data } = props;
  const { isPreview } = props.option;
  const { handleSubmit, handleCancel } = props.buttonEventHandler;
  const selectedLang = useSelector(
    (state: RootState) => state.UserAuthentication.language
  );

  const formatBytes = (bytes: number, decimals = 0) => {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;

    return parseFloat((bytes / k).toFixed(dm)) + "kb";
  };

  return (
    <Row className="mx-2">
      <Row className="w-98 margin-left-10">
        <div className="perspective-title ">
          {data?.perspectiveFormData?.perspectiveTitle}
        </div>
      </Row>
      <Row className="my-3 w-98 margin-left-10">
        <Col
          lg={
            data?.perspectiveFormData?.selectedIds &&
            data?.perspectiveFormData?.selectedIds?.length < 4
              ? 4
              : data?.perspectiveFormData?.selectedIds &&
                data?.perspectiveFormData?.selectedIds?.length < 6
              ? 7
              : 12
          }
          sm={12}
        >
          <span className="form-control">
            <div className="d-flex">
              <div>ID :</div>
              {data?.perspectiveFormData?.selectedIds?.map(
                (x: string, key: number) => {
                  return (
                    <div className="d-flex px-2" key={key}>
                      {x},
                    </div>
                  );
                }
              )}
            </div>
          </span>
        </Col>
      </Row>
      <span>
        <Row className="d-flex justify-content-between g-3">
          {data?.perspectiveFormData?.imageData1 && (
            <Col lg={6} sm={11} md={6}>
              <StyledImgContainerDiv
                imgUrl={`url(${data?.perspectiveFormData?.imageData1})`}
                innerWidth={window.innerWidth}
              />

              {data?.perspectiveFormData?.imageData1?.includes(
                "data:application/pdf"
              ) && (
                <span className="perspective-details-comp-span">
                  <a
                    download={data?.perspectiveFormData?.imageData1Name}
                    href={data?.perspectiveFormData?.imageData1}
                    className="text-decoration-none font-color-black"
                  >
                    <img
                      className="perspective-details-comp-img"
                      src={pdfIcon}
                      alt=""
                    />
                    <div className="my-2">
                      <div>{data?.perspectiveFormData?.imageData1Name}</div>
                      <div>
                        {formatBytes(
                          atob(
                            data?.perspectiveFormData?.imageData1.split(
                              "base64,"
                            )[1]
                          ).length
                        )}
                      </div>
                    </div>
                  </a>
                </span>
              )}
            </Col>
          )}
          {data?.perspectiveFormData?.imageData2 && (
            <Col lg={6} sm={11} md={6}>
              <StyledImgContainerDiv
                imgUrl={`url(${data?.perspectiveFormData?.imageData2})`}
                innerWidth={window.innerWidth}
              />

              {data?.perspectiveFormData?.imageData2?.includes(
                "data:application/pdf"
              ) && (
                <span className="perspective-details-comp-span">
                  <a
                    download={data?.perspectiveFormData?.imageData2Name}
                    href={data?.perspectiveFormData?.imageData2}
                    className="text-decoration-none font-color-black"
                  >
                    <img
                      className="perspective-details-comp-img"
                      src={pdfIcon}
                      alt=""
                    />
                    <div className="my-2">
                      <div>{data?.perspectiveFormData?.imageData2Name}</div>
                      <div>
                        {formatBytes(
                          atob(
                            data?.perspectiveFormData?.imageData2.split(
                              "base64,"
                            )[1]
                          ).length
                        )}
                      </div>
                    </div>
                  </a>
                </span>
              )}
            </Col>
          )}
        </Row>
        {data?.perspectiveFormData?.barGraphTitle && (
          <Row>
            <div className="mt-4 detail-bargraph-title">
              {data?.perspectiveFormData?.barGraphTitle}
            </div>
          </Row>
        )}
        <Row className="gy-3">
          {data?.perspectiveFormData?.imageData3 && (
            <Col lg={6} sm={11} md={6}>
              <StyledImgContainerDiv
                className="my-3"
                imgUrl={`url(${data?.perspectiveFormData?.imageData3})`}
                innerWidth={window.innerWidth}
              />

              {data?.perspectiveFormData?.imageData3?.includes(
                "data:application/pdf"
              ) && (
                <span className="perspective-details-comp-span">
                  <a
                    download={data?.perspectiveFormData?.imageData3Name}
                    href={data?.perspectiveFormData?.imageData3}
                    className="text-decoration-none font-color-black"
                  >
                    <img
                      className="perspective-details-comp-img"
                      src={pdfIcon}
                      alt=""
                    />
                    <div className="my-2">
                      <div>{data?.perspectiveFormData?.imageData3Name}</div>
                      <div>
                        {formatBytes(
                          atob(
                            data?.perspectiveFormData?.imageData3.split(
                              "base64,"
                            )[1]
                          ).length
                        )}
                      </div>
                    </div>
                  </a>
                </span>
              )}
            </Col>
          )}
          {data?.perspectiveFormData?.imageData4 && (
            <Col lg={6} sm={11} md={6}>
              <StyledImgContainerDiv
                className="my-3"
                imgUrl={`url(${data?.perspectiveFormData?.imageData4})`}
                innerWidth={window.innerWidth}
              />

              {data?.perspectiveFormData?.imageData4?.includes(
                "data:application/pdf"
              ) && (
                <span className="perspective-details-comp-span">
                  <a
                    download={data?.perspectiveFormData?.imageData4Name}
                    href={data?.perspectiveFormData?.imageData4}
                    className="text-decoration-none font-color-black"
                  >
                    <img
                      className="perspective-details-comp-img"
                      src={pdfIcon}
                      alt=""
                    />
                    <div className="my-2">
                      <div>{data?.perspectiveFormData?.imageData4Name}</div>
                      <div>
                        {formatBytes(
                          atob(
                            data?.perspectiveFormData?.imageData4.split(
                              "base64,"
                            )[1]
                          ).length
                        )}
                      </div>
                    </div>
                  </a>
                </span>
              )}
            </Col>
          )}
        </Row>
        <Row className="d-flex flex-wrap d-print-m-t">
          <Col lg={6} className="p-4 text-start">
            <h5 className="text-uppercase detail-inputs-Title ">
              {t("perspective").toUpperCase()}
            </h5>
            <p className="detail-input-text">
              {data?.perspectiveFormData?.perspectiveInput}
            </p>
          </Col>
          <Col lg={6} className="p-4 text-start">
            <h5 className="text-uppercase detail-inputs-Title ">
              {t("recomendations").toUpperCase()}
            </h5>
            <p className="detail-input-text">
              {data?.perspectiveFormData?.recomendationsInput}
            </p>
          </Col>
        </Row>
        <hr></hr>
        <Row className="justify-content-between mb-5">
          <Col lg={4} sm={6}>
            <Row className="mb-3 justify-content-start px-4 detail-footer-title">
              {t("lastupdateinfo")}
            </Row>
            <div className="d-flex justify-content-start detail-footer-text">
              <div className="px-2">
                <HiUser
                  className="object-fit-fill mr-1"
                  size="1.2em"
                  aria-hidden="true"
                />
                {data?.footerData?.lastUpdateInformation?.user}
              </div>
              <div className="px-2">
                <HiOutlineCalendarDays
                  className="object-fit-fill mr-1"
                  size="1em"
                  aria-hidden="true"
                />

                {DFG(data?.footerData?.lastUpdateInformation?.date)}
              </div>
              <div className="px-2">
                <HiOutlineClock
                  className="object-fit-fill mr-1"
                  size="1em"
                  aria-hidden="true"
                />
                {data?.footerData?.lastUpdateInformation?.time}
              </div>
            </div>
          </Col>
          <Col
            lg={4}
            sm={6}
            className={window.innerWidth > 900 ? "" : "mt-3 mb-4"}
          >
            <Row
              className={
                window.innerWidth > 500
                  ? "mb-3 justify-content-end px-4 detail-footer-title"
                  : "mb-3 px-4 detail-footer-title"
              }
            >
              {t("ocb")}
            </Row>
            <div
              className={
                window.innerWidth > 900
                  ? "d-flex justify-content-end detail-footer-text"
                  : "d-flex detail-footer-text"
              }
            >
              <div className="px-2 pr-1">
                <HiUser
                  className="object-fit-fill mr-1"
                  size="1.2em"
                  aria-hidden="true"
                />
                {data?.footerData?.originallyCreatedBy?.user}
              </div>
              <div className="px-2">
                <HiOutlineCalendarDays
                  className="object-fit-fill mr-1"
                  size="1em"
                  aria-hidden="true"
                />
                {DFG(data?.footerData?.originallyCreatedBy?.date)}
              </div>
              <div className="px-2">
                <HiOutlineClock
                  className="object-fit-fill mr-1"
                  size="1em"
                  aria-hidden="true"
                />
                {data?.footerData?.originallyCreatedBy?.time}
              </div>
            </div>
          </Col>
        </Row>
        {isPreview && (
          <Row
            id="section-not-to-print"
            className="justify-content-end my-5 mx-1 gap-2 flex-column-reverse flex-md-column-reverse flex-lg-row text-nowrap"
          >
            <Col lg={2} id="section-not-to-print">
              <Button
                variant="outline-secondary width-sm-200 w-100 border-radius-10 "
                onClick={() => handleCancel()}
              >
                {t("back")}
              </Button>
            </Col>
            <Col lg={2} id="section-not-to-print">
              <Button
                variant="solid-success width-sm-200 w-100"
                className="filled-btn-style"
                onClick={() => handleSubmit()}
              >
                {t("publish")}
              </Button>
            </Col>
          </Row>
        )}
      </span>
    </Row>
  );
};

export default AnalysisDetailComp;
