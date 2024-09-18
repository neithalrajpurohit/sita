import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { AdminAssetActionCreator } from "../../store/Admin/AdminAssetSlice";
import { AppDispatch } from "../../index";
import { Button } from "react-bootstrap";
import TmfFactor from "../../component/sitaAdmin/TmfFactor";
import {
  PageContainer,
  ButtonContainer,
  MainContent,
  PageTitle,
} from "./SitaAdminStyles";
import { useTranslation } from "react-i18next";

const TmfFactorPage = () => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    document.title = "TMF";
  }, []);

  useEffect(() => {
    dispatch(AdminAssetActionCreator.fetchFunctionAndProcessData()).then(() => {
      dispatch(AdminAssetActionCreator.fetchTmfAllData());
    });
  }, [dispatch]);

  return (
    <PageContainer>
      <MainContent>
        <PageTitle className="mt-4">TMF</PageTitle>
        <TmfFactor />
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

export default TmfFactorPage;
