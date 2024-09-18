import { useEffect } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import GeneralDashboard from "../../component/GeneralDashboard";
import { RootState } from "../../configureStore";
import SitaAdminDashboard from "../../component/sitaAdmin/SitaAdminDashboard";

const DashboardPage = () => {
    useEffect(() => {
        document.title = "Dashboard";
    }, []);

    const schema = useSelector(
        (state: RootState) => state.UserAuthentication.schema
    );
    const role = useSelector(
        (state: RootState) => state.UserAuthentication.userDetails.user.role
    );

    return schema === "admin" && role === "SitaAdmin" ? (
        <SitaAdminDashboard />
    ) : (
        <GeneralDashboard />
    );
};

export default withRouter(DashboardPage);
