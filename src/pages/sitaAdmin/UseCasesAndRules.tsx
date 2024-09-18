import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../..";
import {
  PageContainer,
  MainContent,
  ButtonContainer,
  PageTitle,
} from "./SitaAdminStyles";
import { AdminAssetActionCreator } from "../../store/Admin/AdminAssetSlice";
import { useHistory } from "react-router-dom";
import UseCaseAndRules from "../../component/sitaAdmin/UseCaseAndRules";
import { useTranslation } from "react-i18next";

const UseCasesAndRules = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(AdminAssetActionCreator.fetchUseCaseAndRules());
  }, [dispatch]);
  return (
    <PageContainer>
      <MainContent>
        <PageTitle className="mt-4">{t("ucar")}</PageTitle>
        <UseCaseAndRules />
      </MainContent>
      <ButtonContainer>
        <Button
          variant="outline-secondary"
          size="sm"
          className="unfilled-btn-style"
          onClick={() => history.goBack()}
        >
          {t("previous")}
        </Button>
      </ButtonContainer>
    </PageContainer>
  );
};

export default UseCasesAndRules;
