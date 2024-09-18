import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { Link, NavLink, useHistory, useLocation } from "react-router-dom";
import userIcon from "../assets/icons/user.png";
import whitelogo from "../assets/images/logo.png";
import { AppDispatch } from "../index";
import { userAuthenticationActionCreator } from "../store/UserAuthentication/UserAuthSlice";
import { RootState } from "../configureStore";
import { useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";
import useMeasure from "react-use-measure";
import storageSession from "redux-persist/lib/storage/session";
import { useTranslation } from "react-i18next";
import { HiChevronDown, HiBars3 } from "react-icons/hi2";
import { RoutePath } from "../helpers/RoutePath";
import Branding from "./StickyBranding/Branding";
import { StyledLogoImgNavBar } from "./GlobalComponentStyles";
type TNavbarProps = ReturnType<typeof mapStateToProps>;

const Navbar = (props: TNavbarProps) => {
  const [navbarRef, { height }] = useMeasure();
  const history = useHistory();
  const dispatch: AppDispatch = useDispatch();
  const [showTooltip, setShowTooltip] = useState(false);
  const companyLogo = useSelector(
    (state: RootState) => state.UserAuthentication.userDetails.user.company_logo
  );
  const host = useSelector((state: RootState) => state.UserAuthentication.host);
  const threatIntelState = useSelector((state: RootState) => state.ThreatIntel);
  const handleLogout = () => {
    dispatch(userAuthenticationActionCreator.handleLogout());
    storageSession.removeItem("persist:root");
    storageSession.removeItem("userTokens");
    storageSession.removeItem("rosiDropDown");
    history.push("/login");
  };

  const location = useLocation();
  const { t } = useTranslation();
  const showThreatIntel =
    threatIntelState.subscribedModules.length > 0 ? true : false;

  useEffect(() => {
    if (host !== window.location.hostname) {
      const callLogout = () => {
        dispatch(userAuthenticationActionCreator.handleLogout());
        storageSession.removeItem("persist:root");
        storageSession.removeItem("userTokens");
        history.push("/login");
      };
      callLogout();
    } else return;
  }, [dispatch, history, host]);

  useEffect(() => {
    document.body.style.setProperty("--nav-height", `${height}px`);
  }, [height]);

  if (
    !location?.pathname.includes("SecurityPulseDetail") &&
    !location.pathname.split("/").includes("Share")
  ) {
    return (
      <nav
        ref={navbarRef}
        id={
          location?.pathname !== "/SecurityPulseGrid" ? "section-to-print" : ""
        }
        className="navbar navbar-expand-lg navbar-dark  responsive  py-2"
      >
        <NavLink className="navbar-brand   font-italic  " to="/">
          {companyLogo ? (
            <div className="d-flex justify-content-center align-items-center">
              <StyledLogoImgNavBar
                showShadow={false}
                width="3em"
                className="acme macme "
                src={companyLogo}
                alt=""
              />
              <Branding />
            </div>
          ) : (
            <StyledLogoImgNavBar
              showShadow={true}
              className="acme macme"
              src={whitelogo}
              alt=""
              width="8em"
            />
          )}
        </NavLink>
        <button
          className="navbar-toggler mr-3"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <HiBars3 />
        </button>

        {/* //new nav  */}
        {props.UserData.isLoggedIn && (
          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <ul
              className="navbar-nav  nav-mobile-left-margin extra-padding-for-mobile"
              data-toggle={window.innerWidth > 932 ? "" : "collapse"}
              data-target={window.innerWidth > 932 ? "" : ".navbar-collapse"}
            >
              <li className="nav-item dashboard ">
                <NavLink
                  className="nav-link py-0 px-0"
                  to={RoutePath.DASHBOARD}
                >
                  {t("dashboard")}
                </NavLink>
              </li>
              {props.UserData.schema === "admin" &&
              props.UserData.userDetails.user.role === "SitaAdmin" ? (
                <> </>
              ) : (
                <>
                  <li className="nav-item insights ">
                    <NavLink
                      className="nav-link py-0 px-0"
                      to={RoutePath.INSIGHT}
                    >
                      {t("insights")}
                    </NavLink>
                  </li>
                  <li className="nav-item oei">
                    <NavLink className="nav-link py-0 px-0" to={RoutePath.OEI}>
                      {t("oei")}
                    </NavLink>
                  </li>
                  {props.UserData.userDetails.user.role !== "EtekAnalyst" && (
                    <>
                      <li className="nav-item risk">
                        <NavLink
                          className="nav-link py-0 px-0"
                          to={RoutePath.RISK}
                        >
                          {t("risk")}
                        </NavLink>
                      </li>
                      <li className="nav-item  rosi">
                        <NavLink
                          className="nav-link py-0 px-0"
                          to={RoutePath.ROSI}
                        >
                          RoSI
                        </NavLink>
                      </li>
                      {showThreatIntel && (
                        <li className="nav-item  threatintel">
                          <NavLink
                            className="nav-link py-0 px-0"
                            to={RoutePath.THREATINTEL}
                          >
                            {t("threatintel")}
                          </NavLink>
                        </li>
                      )}
                    </>
                  )}
                  {props.UserData.userRoles?.claims.includes(
                    "Analysis_Menu"
                  ) && (
                    <li className="nav-item dropdown px-0 ml-0">
                      <Link
                        className={`nav-link dropdown-toggle py-0 px-0 control ${
                          [
                            RoutePath.PERSPECTIVEGRID,
                            RoutePath.SECURITYPULSEGRID,
                            RoutePath.ADVISORY,
                          ].includes(location.pathname)
                            ? "active"
                            : ""
                        } `}
                        to="#"
                        id="navbarDropdown"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        {t("analysis")}
                      </Link>
                      <div
                        className="dropdown-menu navbar-analysis bg-color-theme text-center "
                        aria-labelledby="navbarDropdown"
                      >
                        <NavLink
                          className="dropdown-item py-2 "
                          to={RoutePath.PERSPECTIVEGRID}
                        >
                          {t("perspective")}
                        </NavLink>

                        <NavLink
                          className="dropdown-item py-2 "
                          to={RoutePath.SECURITYPULSEGRID}
                        >
                          {t("securitypulse")}
                        </NavLink>
                        <NavLink
                          className="dropdown-item py-2 "
                          to={RoutePath.ADVISORY}
                        >
                          {t("Advisory")}
                        </NavLink>
                      </div>
                    </li>
                  )}

                  {props.UserData.userRoles?.claims?.includes("Admin_Menu") && (
                    <li className="nav-item admin ">
                      <NavLink
                        className="nav-link py-0 px-0"
                        to={RoutePath.ADMIN}
                      >
                        {t("admin")}
                      </NavLink>
                    </li>
                  )}
                </>
              )}
            </ul>

            <div
              className=" text-white cursor-pointer flex-wrap mobile-nav-responsive d-flex "
              data-toggle={window.innerWidth > 932 ? "" : "collapse"}
              data-target={window.innerWidth > 932 ? "" : ".navbar-collapse"}
            >
              <Col className="nav-item dropdown d-flex flex-column justify-content-lg-end justify-content-start w-100">
                <Link
                  className="nav-link dropdown-toggle py-0 control "
                  to="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  data-tip
                  data-for="userName"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => {
                    setShowTooltip(false);
                  }}
                >
                  <span className="user mr-2 user-image">
                    <img
                      src={
                        props.UserData.userDetails?.user?.profile_photo
                          ? props.UserData.userDetails?.user?.profile_photo
                          : userIcon
                      }
                      alt="user Logo "
                    />
                    {showTooltip && (
                      <ReactTooltip id="userName" place="bottom">
                        {props.UserData.userDetails?.user?.first_name +
                          " " +
                          props.UserData.userDetails?.user?.last_name}
                      </ReactTooltip>
                    )}
                  </span>

                  <span className="mx-2 username-navbar">
                    <span>
                      {props.UserData.userDetails?.user?.first_name.charAt(0) +
                        props.UserData.userDetails?.user?.last_name.charAt(0)}
                    </span>{" "}
                  </span>
                  <HiChevronDown className="ml-1" color="var(--font-color)" />
                </Link>

                <div
                  className="dropdown-menu bg-color-theme navbar-user mobile-nav-dropdown text-center "
                  aria-labelledby="navbarDropdown"
                >
                  <NavLink
                    className="dropdown-item py-2  text-center "
                    to={RoutePath.EDITPROFILE}
                  >
                    <span className="EditProfileDropDown ">
                      {t("editprofile")}
                    </span>
                  </NavLink>
                  <NavLink
                    className="dropdown-item py-2 text-center "
                    to={RoutePath.RESETPASSWORD}
                  >
                    <span className="EditProfileDropDown">
                      {t("resetpassword")}
                    </span>
                  </NavLink>

                  <NavLink
                    className="dropdown-item py-2 text-center "
                    to={RoutePath.CONTACT}
                  >
                    <span className="EditProfileDropDown">
                      {" "}
                      {t("contactus")}
                    </span>
                  </NavLink>
                  <div
                    className="dropdown-item py-2 "
                    onClick={() => handleLogout()}
                  >
                    <span className="EditProfileDropDown">{t("logout")}</span>
                  </div>
                </div>
              </Col>
            </div>
          </div>
        )}
      </nav>
    );
  } else {
    return <></>;
  }
};

// export default Navbar;
function mapStateToProps(state: RootState) {
  return {
    UserData: state.UserAuthentication,
    SecurityPulseDetail: state.SecurityPulseDetails,
  };
}

export default connect(mapStateToProps)(Navbar);
