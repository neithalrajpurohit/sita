import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "../../configureStore";
import RiskQuestions from "./../sitaAdmin/RiskQuestions";
import RiskUserDashboard from "../../component/RiskUserDashboard/RiskUserDashboard";
import { useEffect } from "react";

const Risk = () => {
  useEffect(() => {
    document.title = "Risk";
  }, []);
  const role = useSelector(
    (state: RootState) => state.UserAuthentication?.userDetails?.user?.role
  );
  const history = useHistory();

  return (
    <>
      {role === "SitaAdmin" && <RiskQuestions />}
      {role === "EtekAnalyst" && history.push(`/`)}
      {(role === "ClientAdmin" || role === "ClientUser") && (
        <RiskUserDashboard />
      )}
    </>
  );
};

export default Risk;
