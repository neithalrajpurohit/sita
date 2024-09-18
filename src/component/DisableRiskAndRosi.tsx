import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "../configureStore";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const DisableRiskAndRosi = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const tenantPackage = useSelector(
    (state: RootState) => state.UserAuthentication.package
  );
  const isEnterpriseTenant = tenantPackage !== "Enterprise";

  useEffect(() => {
    const disableRiskRosi = () => {
      if (isEnterpriseTenant) {
        toast(t("upgradeplanmsg") + " - " + t("contactus"), {
          position: "top-right",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
          theme: "dark",
        });
        history.goBack();
      }
    };
    disableRiskRosi();
  }, [isEnterpriseTenant, history, tenantPackage, t]);

  return null;
};

export default DisableRiskAndRosi;
