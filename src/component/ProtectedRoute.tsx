import { connect } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { RoutePath } from "../helpers/RoutePath";
import { RootState } from "../configureStore";

// type ProtectedRouteProps = ReturnType<typeof mapStateToProps>;
export interface ProtectedRouteProps extends RouteProps {
  isAuthenticated: boolean;
  role?: string;
  schema: string;
  firstTimeLogin: boolean;
  threatIntelSubscribedModules: string[];
}

const ProtectedRoute = (props: ProtectedRouteProps) => {
  let redirectPath = "";
  let AllowedRoute: any = [];

  const CommonAllowedRoute = [
    RoutePath.DASHBOARD,
    RoutePath.DYNAMICSECURITYPULSEDETAILS,
    RoutePath.CONTACT,
    RoutePath.ADMIN,
    RoutePath.EDITPROFILE,
    RoutePath.FORGETPASSWORD,
    RoutePath.INSIGHT,
    RoutePath.INSIGHTDETAIL,
    RoutePath.OEI,
    RoutePath.PERSPECTIVEDETAIL,
    RoutePath.PERSPECTIVEGRID,
    RoutePath.RESETPASSWORD,
    RoutePath.SECURITYPULSEDETAIL,
    RoutePath.SECURITYPULSEGRID,
    RoutePath.SENTMAIL,
    RoutePath.VERIFYOTP,
    RoutePath.RESETPASSWORD,
    RoutePath.LOGIN,
    RoutePath.CYBLEFEED,
    RoutePath.ADVISORY,
  ];

  if (!props.isAuthenticated) {
    redirectPath = RoutePath.LOGIN;
  }

  if (redirectPath) {
    const renderComponent = () => <Redirect to={{ pathname: redirectPath }} />;
    return <Route component={renderComponent} render={undefined} />;
  }

  switch (props.role) {
    case "SitaAdmin":
      if (props.firstTimeLogin) {
        AllowedRoute = [
          RoutePath.SENTMAIL,
          RoutePath.VERIFYOTP,
          RoutePath.RESETPASSWORD,
          RoutePath.LOGIN,
        ];
      } else {
        if (props.schema === "admin") {
          AllowedRoute = [
            RoutePath.DASHBOARD,
            RoutePath.CONTACT,
            RoutePath.EDITPROFILE,
            RoutePath.FORGETPASSWORD,
            RoutePath.ADDPREDEFFUNCTIONS,
            RoutePath.MANAGEUSERS,
            RoutePath.USERMANAGEMENT,
            RoutePath.TMFFACTOR,
            RoutePath.RISK,
            RoutePath.TENANTPACKAGES,
            RoutePath.USECASEANDRULE,
            RoutePath.MANAGECATEGORY,
            RoutePath.MANAGETYPESTAGS,
            RoutePath.SENTMAIL,
            RoutePath.VERIFYOTP,
            RoutePath.RESETPASSWORD,
            RoutePath.LOGIN,
          ];
        } else {
          AllowedRoute = [...CommonAllowedRoute];
        }
      }
      break;
    case "EtekAnalyst":
      if (props.firstTimeLogin) {
        AllowedRoute = [
          RoutePath.SENTMAIL,
          RoutePath.VERIFYOTP,
          RoutePath.RESETPASSWORD,
          RoutePath.LOGIN,
        ];
      } else {
        AllowedRoute = [
          ...CommonAllowedRoute,
          RoutePath.ADDEDITPERSPECTIVE,
          RoutePath.ADDEDITSECURITYPULSE,
        ];
      }
      break;
    case "ClientAdmin":
      if (props.firstTimeLogin) {
        AllowedRoute = [
          RoutePath.SENTMAIL,
          RoutePath.VERIFYOTP,
          RoutePath.RESETPASSWORD,
          RoutePath.LOGIN,
        ];
      } else {
        if (props.threatIntelSubscribedModules.length > 0) {
          AllowedRoute = [
            ...CommonAllowedRoute,
            RoutePath.RISK,
            RoutePath.RISKONBOARDING,
            RoutePath.ENTITYONBOARDING,
            RoutePath.COSTOFSECURITYCONTROLS,
            RoutePath.RISKIMPACT,
            RoutePath.ROSI,
            RoutePath.THREATINTEL,
          ];
        } else {
          AllowedRoute = [
            ...CommonAllowedRoute,
            RoutePath.RISK,
            RoutePath.RISKONBOARDING,
            RoutePath.ENTITYONBOARDING,
            RoutePath.COSTOFSECURITYCONTROLS,
            RoutePath.RISKIMPACT,
            RoutePath.ROSI,
          ];
        }
      }
      break;
    case "ClientUser":
      if (props.firstTimeLogin) {
        AllowedRoute = [
          RoutePath.SENTMAIL,
          RoutePath.VERIFYOTP,
          RoutePath.RESETPASSWORD,
          RoutePath.LOGIN,
        ];
      } else {
        AllowedRoute = [
          ...CommonAllowedRoute,
          RoutePath.RISK,
          RoutePath.RISKDASHBOARD,
          RoutePath.ENTITYONBOARDING,
          RoutePath.ROSI,
          RoutePath.THREATINTEL,
        ];
      }
      break;
    default:
      break;
  }

  if (props.role !== undefined) {
    if (AllowedRoute.filter((f: string) => f === props.path).length === 0) {
      const renderComponent = () => (
        <Redirect to={{ pathname: RoutePath.LOGIN }} />
      );
      return <Route component={renderComponent} render={undefined} />;
    }
  }

  return <Route {...props} />;
};

// export default ProtectedRoute
function mapStateToProps(state: RootState) {
  return {
    isAuthenticated: state.UserAuthentication.isLoggedIn,
    role: state.UserAuthentication?.userDetails?.user?.role,
    schema: state.UserAuthentication.schema,
    firstTimeLogin: state.UserAuthentication.first_time_login,
    threatIntelSubscribedModules: state.ThreatIntel.subscribedModules,
  };
}

export default connect(mapStateToProps)(ProtectedRoute);
