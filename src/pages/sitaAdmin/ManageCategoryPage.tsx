import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../..";
import ManageCategory from "../../component/sitaAdmin/ManageCategory";
import { AdminAssetActionCreator } from "../../store/Admin/AdminAssetSlice";
import { useHistory } from "react-router-dom";
import {
  PageContainer,
  ButtonContainer,
  PageTitle,
  MainContent,
} from "./SitaAdminStyles";
import { useTranslation } from "react-i18next";

const ManageCategoryPage = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(AdminAssetActionCreator.fetchFunctionAndProcessData());
  }, [dispatch]);
  return (
    <PageContainer>
      <MainContent>
        <PageTitle className="mt-4">{t("aphierarchy")}</PageTitle>
        <ManageCategory />
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

export default ManageCategoryPage;
