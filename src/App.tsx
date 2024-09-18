import "bootstrap/dist/css/bootstrap.min.css";
import { lazy, Suspense, useEffect, useLayoutEffect } from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import ReactGA from "react-ga4";
import { useTranslation } from "react-i18next";
import { connect, useSelector } from "react-redux";
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import DisableRiskAndRosi from "./component/DisableRiskAndRosi";
import LazyLoading from "./component/LazyLoading";
import LogoutTimer from "./component/LogoutTimer";
import Navbar from "./component/Navbar";
import ProtectedRoute from "./component/ProtectedRoute";
import { RootState } from "./configureStore";
import { RoutePath } from "./helpers/RoutePath";
import { useScreenWidthFontSize } from "./hooks/useScreenWidthFontSize";
import "./site.scss";
import "./ThemeVar.css";

const AddEditPerspective = lazy(
  () => import("./pages/AddEditPerspective/AddEditPerspectivePage")
);
const SecurityPulse = lazy(
  () => import("./pages/AddEditPerspective/AddEditSecurityPulsePage")
);
const Admin = lazy(() => import("./pages/Admin/AdminPage"));
const Contact = lazy(() => import("./pages/Contact/ContactPage"));
const Dashboard = lazy(() => import("./pages/Dashboard/DashboardPage"));
const EditProfile = lazy(() => import("./pages/EditProfile/EditProfilePage"));
const EntityOnBoarding = lazy(
  () => import("./pages/EntityOnboarding/EntityOnboardingPage")
);
const ForgetPassword = lazy(() => import("./pages/Password/ForgetPassword"));
const InsightDetails = lazy(() => import("./pages/Insights/InsightDetailPage"));
const Login = lazy(() => import("./pages/Authentication/LoginPage"));
const PerspectiveDetail = lazy(
  () => import("./pages/Perspective/PerspectiveDetailPage")
);
const PerspectiveGrid = lazy(
  () => import("./pages/Perspective/PerspectiveGridPage")
);
const ResetPassword = lazy(() => import("./pages/Password/ResetPasswordPage"));
const RiskOnboarding = lazy(() => import("./pages/Risk/RiskOnboardingPage"));

const SecurityPulseDetail = lazy(
  () => import("./pages/SecurityPulse/SecurityPulseDetailsPage")
);
const SecurityPulseGrid = lazy(
  () => import("./pages/SecurityPulse/SecurityGridPage")
);
const SentMail = lazy(
  () => import("./pages/Verification/MailVerificationPage")
);

const Risk = lazy(() => import("./pages/Risk/RiskPage"));
const Rosi = lazy(() => import("./pages/Rosi/RosiPage"));
const VerifyOtp = lazy(
  () => import("./pages/Verification/OtpVerificationPage")
);
const DynamicSecurityPulse = lazy(
  () => import("./pages/SecurityPulse/DynamicSecurityPulsePage")
);
const Advisory = lazy(() => import("./pages/Advisory/AdvisoryPage"));
const AdvisoryDetail = lazy(() => import("./pages/Advisory/AdvisoryDetail"));
// Sita Admin Routes
const ManageUsers = lazy(() => import("./pages/sitaAdmin/ManageUsers"));
const UserManagement = lazy(() => import("./pages/sitaAdmin/UserManagement"));
const TenantPackages = lazy(() => import("./pages/sitaAdmin/TenantPackages"));
const AddPreDefFunctions = lazy(
  () => import("./pages/sitaAdmin/AddPredefFunctions")
);
const ManageCatrgoryPage = lazy(
  () => import("./pages/sitaAdmin/ManageCategoryPage")
);
const ManageTypesTagsPage = lazy(
  () => import("./pages/sitaAdmin/ManageTypesTagsPage")
);

const TmfFactorPage = lazy(() => import("./pages/sitaAdmin/TmfFactorPage"));
const UseCaseAndRulePage = lazy(
  () => import("./pages/sitaAdmin/UseCasesAndRules")
);

const OeiPage = lazy(() => import("./pages/Oei/OeiPage"));
const InsightPage = lazy(() => import("./pages/Insights/InsightPage"));
const CybleFeedsPage = lazy(() => import("./pages/CybleFeeds/CybleFeedPage"));
const CostOfSecurityPage = lazy(
  () => import("./pages/CostOfSecurity/CostOfSecurityControls")
);
const RiskImpactPage = lazy(() => import("./pages/RiskImpact/RiskImpactPage"));
const AutmaticAssetDiscoveryPage = lazy(
  () => import("./pages/AutomaticAssetDiscovery/AutmaticAssetDiscoveryPage")
);
const AADEventDetailsPage = lazy(
  () => import("./pages/AutomaticAssetDiscovery/AADEventDetails")
);

const ThreatIntel = lazy(() => import("./pages/ThreatIntel/ThreatIntel"));

const TrackingID = "G-93WRMTMJNM";
ReactGA.initialize(TrackingID, {
  gaOptions: {
    cookieFlags: "max-age=7200;secure;samesite=none;",
  },
});

type TUserProps = ReturnType<typeof mapStateToProps>;
function App(props: TUserProps) {
  const { ready } = useTranslation();

  useEffect(() => {
    ReactGA.send(window.location.pathname + window.location.search);
  });
  const isLoggedIn = props.UserData.isLoggedIn;
  const tenantPackage = useSelector(
    (state: RootState) => state.UserAuthentication.package
  );

  useEffect(() => {
    // to body tag add data-theme attribute
    if (props.UserData?.userDetails?.user?.theme_preference !== undefined) {
      document.body.setAttribute(
        "data-theme",
        props.UserData.userDetails.user.theme_preference
      );
    } else {
      document.body.setAttribute("data-theme", "dark");
    }
  }, [props.UserData?.userDetails?.user?.theme_preference]);

  const baseFontSize = useScreenWidthFontSize();

  useLayoutEffect(() => {
    const htmlNode = document.querySelector("html");
    if (!htmlNode) return;
    htmlNode.style.setProperty("font-size", `${baseFontSize / 16}rem`);
    return () => {
      htmlNode.style.setProperty("font-size", `${1}rem`);
    };
  }, [baseFontSize]);

  if (!ready) return <LazyLoading />;
  const isEnterpriseTenant = tenantPackage !== "Enterprise";
  return (
    <div className="app">
      <Router>
        {isLoggedIn && <Navbar />}
        <Suspense fallback={<LazyLoading />}>
          <div
            className={isLoggedIn ? "pageContainer " : "pageContainerNoLogin"}
          >
            <Switch>
              {/* PUBLIC ROUTES WHICH WORKS WITHOUT CREDENTIALS */}
              <Route exact path="/" component={Login} />

              <Route path={RoutePath.SENTMAIL} component={SentMail} />

              <Route
                exact
                path={RoutePath.FORGETPASSWORD}
                component={ForgetPassword}
              />
              <Route exact path={RoutePath.VERIFYOTP} component={VerifyOtp} />
              <Route
                path={RoutePath.DYNAMICSECURITYPULSEDETAILS}
                component={DynamicSecurityPulse}
              />
              <Route
                path={RoutePath.DYNAMICADVISORYDETAILS}
                component={AdvisoryDetail}
              />

              {/* PROTECTED ROUTES WHICH WON'T WORK WITHOUT CREDENTIALS */}

              <ProtectedRoute
                path={RoutePath.DASHBOARD}
                component={Dashboard}
              />

              <ProtectedRoute
                path={RoutePath.INSIGHT}
                component={InsightPage}
              />
              <ProtectedRoute path={RoutePath.OEI} component={OeiPage} />
              <ProtectedRoute
                path={RoutePath.ROSI}
                component={isEnterpriseTenant ? DisableRiskAndRosi : Rosi}
              />

              <ProtectedRoute
                path={RoutePath.INSIGHTDETAIL}
                component={InsightDetails}
              />

              <ProtectedRoute
                path={RoutePath.PERSPECTIVEGRID}
                component={PerspectiveGrid}
              />
              <ProtectedRoute
                path={RoutePath.ADDEDITPERSPECTIVE}
                component={AddEditPerspective}
              />
              <ProtectedRoute
                path={RoutePath.PERSPECTIVEDETAIL}
                component={PerspectiveDetail}
              />
              <ProtectedRoute
                path={RoutePath.SECURITYPULSEGRID}
                component={SecurityPulseGrid}
              />
              <ProtectedRoute
                path={RoutePath.ADDEDITSECURITYPULSE}
                component={SecurityPulse}
              />
              <ProtectedRoute
                path={RoutePath.SECURITYPULSEDETAIL}
                component={SecurityPulseDetail}
              />

              <ProtectedRoute
                path={RoutePath.EDITPROFILE}
                component={EditProfile}
              />
              <ProtectedRoute path={RoutePath.ADVISORY} component={Advisory} />
              <ProtectedRoute
                path={RoutePath.RESETPASSWORD}
                component={ResetPassword}
              />
              <ProtectedRoute path={RoutePath.CONTACT} component={Contact} />
              <ProtectedRoute
                path={RoutePath.CYBLEFEED}
                component={CybleFeedsPage}
              />
              <ProtectedRoute
                path={RoutePath.THREATINTEL}
                component={ThreatIntel}
              />

              {/* ADMIN ROUTES STARTS FROM HERE*/}
              <ProtectedRoute path={RoutePath.ADMIN} component={Admin} />

              {/* Entity On Boarding Routes */}
              <ProtectedRoute
                path={RoutePath.ENTITYONBOARDING}
                component={EntityOnBoarding}
              />
              <ProtectedRoute
                path={RoutePath.AUTOMATICASSETDISCOVERY}
                component={AutmaticAssetDiscoveryPage}
              />
              <ProtectedRoute
                path={RoutePath.AUTOMATICASSETDISCOVERYEVENTDETAIL}
                component={AADEventDetailsPage}
              />

              <ProtectedRoute
                path={RoutePath.RISKONBOARDING}
                component={
                  isEnterpriseTenant ? DisableRiskAndRosi : RiskOnboarding
                }
              />
              <ProtectedRoute
                path={RoutePath.COSTOFSECURITYCONTROLS}
                component={
                  isEnterpriseTenant ? DisableRiskAndRosi : CostOfSecurityPage
                }
              />

              <ProtectedRoute
                path={RoutePath.RISK}
                component={isEnterpriseTenant ? DisableRiskAndRosi : Risk}
              />

              <ProtectedRoute
                path={RoutePath.RISKIMPACT}
                component={
                  isEnterpriseTenant ? DisableRiskAndRosi : RiskImpactPage
                }
              />

              {/* SITA ADMIN MANAGE USERS ROUTES */}

              <ProtectedRoute
                path={RoutePath.MANAGEUSERS}
                component={ManageUsers}
              />
              <ProtectedRoute
                path={RoutePath.USERMANAGEMENT}
                component={UserManagement}
              />
              <ProtectedRoute
                path={RoutePath.ADDPREDEFFUNCTIONS}
                component={AddPreDefFunctions}
              />
              <ProtectedRoute
                path={RoutePath.MANAGECATEGORY}
                component={ManageCatrgoryPage}
              />
              <ProtectedRoute
                path={RoutePath.MANAGETYPESTAGS}
                component={ManageTypesTagsPage}
              />
              <ProtectedRoute
                path={RoutePath.TENANTPACKAGES}
                component={TenantPackages}
              />
              <ProtectedRoute
                path={RoutePath.TMFFACTOR}
                component={TmfFactorPage}
              />
              <ProtectedRoute
                path={RoutePath.USECASEANDRULE}
                component={UseCaseAndRulePage}
              />

              <Route exact path="/*" render={() => <Redirect to="/" />} />
            </Switch>
          </div>
        </Suspense>
      </Router>
      <LogoutTimer />
      <ToastContainer />
    </div>
  );
}

function mapStateToProps(state: RootState) {
  return {
    UserData: state.UserAuthentication,
  };
}

export default connect(mapStateToProps)(App);
