import { Button, Col, Row } from "react-bootstrap";
import { HiOutlineArrowDownTray, HiPencil } from "react-icons/hi2";
import { Link, NavLink } from "react-router-dom";
import pdfIcon from "../assets/icons/pdfIcon.svg";
import logo from "../assets/images/logo.png";
import { DFG } from "../utils/Common";
import { useThemeVal } from "../hooks/useThemeVar";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../configureStore";

interface SecurityPulseDetail {
  securityPulseFormData: any;
  handleEdit: any;
  handleDownload: any;
  footerData: any;
  isPreview: any;
  backTOForm: any;
  publishSecurityPulse: any;
  UserData: any;
  headerData: any;
}

const SecurityPulseDetailComp = (props: SecurityPulseDetail) => {
  const { t } = useTranslation();
  const {
    securityPulseFormData,
    handleEdit,
    handleDownload,
    footerData,
    isPreview,
    backTOForm,
    publishSecurityPulse,
    headerData,
  } = props;
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

  const themeHook = useThemeVal("variant");

  return (
    <>
      <div id="section-to-print">
        <div className="navbar-securitypulse dynamic-security-pulse-nav">
          <NavLink
            className="font-italic dynamic-security-pulse-nav-link"
            to="/"
          >
            <img
              className="acme macme dynamic-security-pulse-nav-img"
              src={logo}
              alt=""
              loading="eager"
            />
          </NavLink>

          <div className="mx-4 mx-lg-5 my-2 font-color">
            <div className="securityPulse_headerText font-color">
              {headerData?.user},<span className="mx-1"></span>
              {headerData?.designation}
            </div>

            <div className="securityPulse_headerDate font-color">
              {DFG(headerData?.createdDate)}
            </div>
          </div>
        </div>

        {/* Page Title */}
        <Row className="my-4 mx-2 justify-content-between align-items-center securitypulse-grid-row">
          <Col lg={10} md={10}>
            <p>
              <Link to="/SecurityPulseGrid" className="back-link">
                <span>
                  {/* <img src={backArrow} alt="" className="mr-1 mb-1" />  */}
                  SITA <i className="fa-solid fa-greater-than"></i>{" "}
                  {t("securitypulse").toUpperCase()}{" "}
                  <i className="fa-solid fa-greater-than"></i>{" "}
                  {securityPulseFormData?.securityPulseTitle}
                </span>
              </Link>
            </p>
          </Col>

          {!isPreview && (
            <Col
              lg={2}
              md={2}
              className="d-flex justify-content-center my-2 justify-content-lg-end gap-2"
            >
              {props.UserData.userRoles?.claims?.includes(
                "SecurityPulseDetail_Edit"
              ) && (
                <Button
                  id="section-not-to-print"
                  variant={themeHook}
                  className="cursor-pointer"
                  onClick={handleEdit}
                >
                  <HiPencil
                    className="object-fit-fill"
                    size="1.3em"
                    aria-hidden="true"
                  />
                </Button>
              )}
              {props.UserData.userRoles?.claims?.includes(
                "SecurityPulseDetail_Download"
              ) && (
                <Button
                  id="section-not-to-print"
                  className="min-width-50px"
                  variant={themeHook}
                  onClick={handleDownload}
                >
                  <HiOutlineArrowDownTray
                    id="section-not-to-print"
                    className="object-fit-fill"
                    size="1.4em"
                    aria-hidden="true"
                  />
                </Button>
              )}
            </Col>
          )}
        </Row>

        {/* Main Title */}
        <Row className="mt-5 mx-2">
          <Col>
            <p className="mainTitle">{securityPulseFormData?.mainTitle}</p>
          </Col>
        </Row>

        {/* Sections */}
        <Row className="margin-left-10 w-98">
          {securityPulseFormData?.sections?.map((curElm: any, key: number) => {
            return (
              <Col lg={12} key={key} className="py-my-10">
                <div className="my-4 security-pulse-details-form-data">
                  {curElm?.imageData?.includes("data:application/pdf") ? (
                    <span className="perspective-details-comp-span">
                      <a
                        download={curElm?.imageDataName}
                        href={curElm?.imageData}
                        className="text-decoration-none font-color-black"
                      >
                        <img
                          className="security-pulse-img h-80"
                          src={pdfIcon}
                          alt=""
                        />
                        <div className="my-2 text-center">
                          <div>{curElm?.imageDataName}</div>
                          <div>
                            {formatBytes(
                              atob(curElm?.imageData?.split("base64,")[1])
                                .length
                            )}
                          </div>
                        </div>
                      </a>
                    </span>
                  ) : (
                    <img
                      src={curElm.imageData}
                      alt=""
                      className="security-pulse-img h-100"
                    />
                  )}
                </div>

                <p className="sectionsInfo">{curElm.info}</p>
              </Col>
            );
          })}
        </Row>

        {/* Recommendations */}
        <Row
          className="my-5 mx-2 flex-column"
          // id="section-not-to-print"
        >
          <Col>
            <p className="recommendations">{t("recomendations")}</p>
          </Col>
          <Col className="my-2">
            <ul>
              {securityPulseFormData?.recommendations?.map(
                (el: any, key: number) => {
                  return (
                    <li key={key} className="my-2 recommendations_li">
                      {el}
                    </li>
                  );
                }
              )}
            </ul>
          </Col>
        </Row>

        {/* Links */}
        <Row className="my-5 mx-2 flex-column">
          <Col>
            <p className="links">FUENTES</p>
          </Col>
          <Col className="my-2">
            <ul>
              {securityPulseFormData?.links?.map(
                (el: { linkText: string; linkUrl: string }, key: number) => {
                  return (
                    <li key={key} className="my-2 links_li">
                      <a href={el?.linkUrl} className="text-decoration-none">
                        {el.linkText}
                      </a>
                    </li>
                  );
                }
              )}
            </ul>
          </Col>
        </Row>

        {/* Tags */}

        {/* Assests */}
        {securityPulseFormData?.selectedAssets?.length > 0 && (
          <Col>
            <p className="links">{t("assets")}</p>
          </Col>
        )}
        <Row className="margin-top-20 margin-bottom-20 mx-0">
          {securityPulseFormData?.selectedAssets?.map(
            (el: any, key: number) => {
              return (
                <Col
                  lg={4}
                  key={key}
                  className="tags dynamic-security-pulse-selected-assets"
                >
                  {el}
                </Col>
              );
            }
          )}
        </Row>

        {/* Entity */}

        {securityPulseFormData?.selectedEntities?.length > 0 && (
          <Col className="mt-5">
            <p className="links">{t("entity")}</p>
          </Col>
        )}
        <Row className="margin-top-20 margin-bottom-20 mx-0">
          {securityPulseFormData?.selectedEntities?.map(
            (el: any, key: number) => {
              return (
                <Col
                  lg={4}
                  key={key}
                  className="tags dynamic-security-pulse-selected-assets"
                >
                  {el}
                </Col>
              );
            }
          )}
        </Row>

        {/* Incidents */}
        {securityPulseFormData?.selectedIncidents?.length > 0 && (
          <Col className="mt-5">
            <p className="links">{t("incidents")}</p>
          </Col>
        )}
        <Row className="margin-top-20 margin-bottom-20 mx-0">
          {securityPulseFormData?.selectedIncidents?.map(
            (el: any, key: number) => {
              return (
                <Col
                  lg={4}
                  key={key}
                  className="tags dynamic-security-pulse-selected-assets"
                >
                  {el}
                </Col>
              );
            }
          )}
        </Row>

        {/* Divider */}
        <div className="security-pulse-details-comp" />

        {/* Footer */}
        <Row className="justify-content-center my-50px">
          <Col>
            <a href="mailto:info@email.com" className="securityPulse_footer">
              {footerData?.email}
            </a>
          </Col>
          {footerData?.contacts?.map((el: any, id: number) => {
            return (
              <Col key={id} className="d-flex flex-column">
                <span className="securityPulse_footerText1">
                  {el.countryName}
                </span>
                <p className="securityPulse_footerText2">{el.contactNo}</p>
              </Col>
            );
          })}
        </Row>

        {/* Actions Button */}
        {isPreview && (
          <Row className="justify-content-end my-5 mx-4 gap-2 flex-column-reverse flex-md-column-reverse flex-lg-row text-nowrap">
            <Col lg={2}>
              <Button
                variant="outline-secondary width-sm-200 w-100 border-radius-10 "
                onClick={() => backTOForm()}
              >
                {t("back")}
              </Button>
            </Col>
            <Col lg={2}>
              <Button
                variant="solid-success width-sm-200 w-100 "
                className="filled-btn-style  w-100"
                onClick={() => publishSecurityPulse()}
              >
                {t("publish")}
              </Button>
            </Col>
          </Row>
        )}
      </div>
    </>
  );
};

export default SecurityPulseDetailComp;
