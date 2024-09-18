import { useIdleTimer } from "react-idle-timer";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { AppDispatch } from "..";
import { userAuthenticationActionCreator } from "../store/UserAuthentication/UserAuthSlice";
import { useTranslation } from "react-i18next";

export default function LogoutTimer() {
  const timeout = 10 * 60 * 1000;
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();

  const token = useSelector(
    (state: any) => state.UserAuthentication.userAcessToken
  );

  const handleOnIdle = () => {
    if (token !== "") {
      dispatch(userAuthenticationActionCreator.handleLogout());
      sessionStorage.removeItem("persist:root");
      sessionStorage.removeItem("userTokens");
      history.push("/");
      toast.error(`${t("inactiveuser")}`, { autoClose: 4000 });
    } else return;
  };

  const idleTimer = useIdleTimer({
    timeout,
    onIdle: handleOnIdle,
  });

  return <></>;
}
