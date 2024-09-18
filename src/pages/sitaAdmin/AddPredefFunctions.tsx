import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  PageContainer,
  ButtonContainer,
  PageTitle,
  MainContent,
} from "./SitaAdminStyles";
import { AppDispatch } from "../..";
import FunctionProcess from "../../component/sitaAdmin/FunctionProcess";
import { AdminAssetActionCreator } from "../../store/Admin/AdminAssetSlice";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AddPredefFunctions = () => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(AdminAssetActionCreator.fetchFunctionAndProcessData());
  }, [dispatch]);

  return (
    <PageContainer>
      <MainContent>
        <PageTitle className="mt-4">{t("aphierarchy")}</PageTitle>
        <FunctionProcess />
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

export default AddPredefFunctions;
