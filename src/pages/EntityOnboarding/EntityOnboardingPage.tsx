import { useEffect, useState } from "react";
import { Button, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../index";
import { useHistory } from "react-router-dom";
import AddEntityForm from "../../component/AddEntityForm";
import EntityAssets from "../../component/Entity/EntityAssets";
import EntityReview from "../../component/Entity/EntityReview";
import EntityFormBar from "../../component/FormBar";
import FunctionandProcess from "../../component/Function&Process/FunctionandProcess";
import CustomModal from "../../component/Modal";
import { RootState } from "../../configureStore";
import { entityAssetsActionCreator } from "../../store/Entity/EntityAssetSlice";
import { entityCreationActionCreator } from "../../store/Entity/EntityCreationSlice";
import { entityFunctionAndProcessesActionCreator } from "../../store/Entity/EntityFunctionAndProcessSlice";
import { entityFilledStatusActionCreator } from "../../store/Entity/EntityOnboardingStatusSlice";
import { userAuthenticationActionCreator } from "../../store/UserAuthentication/UserAuthSlice";
import {
  PageContainer,
  ButtonContainer,
  PageTitle,
  MainContent,
} from "./EntityStyles";
import { InitialState } from "./EntityType";
import { useTranslation } from "react-i18next";
import EntityAssetsSummary from "../../component/Entity/EntityAssetsSummary";
import { entityASVActionCreator } from "../../store/Entity/EntityAssetSummaryValidationSlice";
import { toast } from "react-toastify";

const EntityOnBoardingPage = () => {
  const { t } = useTranslation();
  const [Arr, setArr] = useState([
    `${t("entityandlocations")}`,
    `${t("functionandprocess")}`,
    `${t("assets")}`,
    `${t("assetsummaryvalidation")}`,
    `${t("review")}`,
  ]);
  const [currentActive, setCurrentActive] = useState(Arr[0]);
  const [isLoading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const [stet, setStet] = useState<InitialState>({
    EntityForm: {
      companyId: 1,
      no_of_employee: 0,
      companyName: "",
      companyLogo: "",
      companyLocations: [],
    },
    FunctionAndProcesses: [],
    Assets: [],
    AssetSummaryValidation: [],
  });
  const [pageStatus, setPageStatus] = useState<"saved" | "unsaved">("saved");
  const [unsavedDataPopup, setUnsavedDataPopup] = useState({
    show: false,
    from: "",
    to: "",
  });
  const role = useSelector(
    (state: RootState) => state.UserAuthentication?.userDetails?.user?.role
  );

  const EntityCreate = useSelector(
    (state: RootState) => state.EntityCreation.entityCreation
  );
  const EntityFunctionAndProcesses = useSelector(
    (state: RootState) => state.EntityFunctionAndProcess.FunctionAndProcesses
  );
  const EntityAssetsTableData = useSelector(
    (state: RootState) => state.EntityAsset.assetTableData
  );
  const entityAssetsSummaryValidationData = useSelector(
    (state: RootState) =>
      state.EntityAssetSummaryValidation.AssetSummaryValidation
  );

  const filled = useSelector((state: RootState) => state.EntityStatus.page);
  useEffect(() => {
    document.title = "Entity Onboarding";
  }, []);
  useEffect(() => {
    setArr([
      `${t("entityandlocations")}`,
      `${t("functionandprocess")}`,
      `${t("assets")}`,
      `${t("assetsummaryvalidation")}`,
      `${t("review")}`,
    ]);
  }, [t]);

  useEffect(() => {
    dispatch(entityFilledStatusActionCreator.fetchEntityFilledStatus());
    dispatch(entityCreationActionCreator.fetchEntityCreation());
    dispatch(
      entityFunctionAndProcessesActionCreator.fetchEntityFunctionAndProcesses()
    );
    dispatch(
      entityFunctionAndProcessesActionCreator.fetchEntityPreFunctionAndProcesses()
    );
    dispatch(
      entityFunctionAndProcessesActionCreator.fetchEntityCustomFuncProcess()
    );
    dispatch(entityAssetsActionCreator.fetchEntityAssets());
    dispatch(entityASVActionCreator.fetchAssetSummaryValidationData());
  }, [dispatch]);

  useEffect(() => {
    setStet((prev: any) => ({
      ...prev,
      EntityForm: EntityCreate,
    }));
  }, [EntityCreate]);

  useEffect(() => {
    setStet((prev: any) => ({
      ...prev,
      FunctionAndProcesses: EntityFunctionAndProcesses,
    }));
  }, [EntityFunctionAndProcesses]);

  useEffect(() => {
    setStet((prev: any) => ({
      ...prev,
      Assets: EntityAssetsTableData,
    }));
  }, [EntityAssetsTableData]);

  useEffect(() => {
    setStet((prev: any) => ({
      ...prev,
      AssetSummaryValidation: entityAssetsSummaryValidationData,
    }));
  }, [entityAssetsSummaryValidationData]);

  const handleBackClick = () => {
    const indexofCurrent = Arr.indexOf(currentActive);
    setLoading(true);
    if (pageStatus === "unsaved") {
      setUnsavedDataPopup({
        show: true,
        from: currentActive,
        to: Arr[indexofCurrent - 1],
      });
    } else {
      setLoading(false);
      setPageStatus("saved");
      setCurrentActive(Arr[indexofCurrent - 1]);
    }
  };

  const saveAndContinue = () => {
    const indexofCurrent = Arr.indexOf(currentActive);
    setLoading(true);
    if (pageStatus === "unsaved") {
      setUnsavedDataPopup({
        show: true,
        from: currentActive,
        to: Arr[indexofCurrent + 1],
      });
    } else {
      setLoading(false);
      setPageStatus("saved");
      setCurrentActive(Arr[indexofCurrent + 1]);
    }
  };
  const OnlySave = () => {
    const indexofCurrent = Arr.indexOf(currentActive);
    setIsSaving(true);
    switch (currentActive) {
      case `${t("entityandlocations")}`:
        dispatch(
          entityCreationActionCreator.updateEntityCreationBackend(
            stet.EntityForm
          )
        ).then(() => {
          dispatch(
            userAuthenticationActionCreator.updateCompanyLogo(
              stet.EntityForm.companyLogo
            )
          ).then(() => {
            dispatch(
              entityFilledStatusActionCreator.updateEntityFilledStatus({
                page: indexofCurrent + 1,
              })
            ).then(() => {
              setIsSaving(false);
              setPageStatus("saved");
            });
          });
        });

        break;
      case `${t("functionandprocess")}`:
        dispatch(
          entityFunctionAndProcessesActionCreator.updateEntityFunctionAndProcesses(
            stet.FunctionAndProcesses.filter((e) => e.process.length !== 0)
          )
        ).then(() => {
          dispatch(
            entityFilledStatusActionCreator.updateEntityFilledStatus({
              page: indexofCurrent + 1,
            })
          ).then(() => {
            setIsSaving(false);
            setPageStatus("saved");
          });
        });
        break;
      case `${t("assets")}`:
        dispatch(entityAssetsActionCreator.fetchEntityAssets()).then((res) => {
          toast(res.payload.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            progress: undefined,
            theme: "dark",
          });
          dispatch(
            entityASVActionCreator.fetchAssetSummaryValidationData()
          ).then(() => {
            dispatch(
              entityFilledStatusActionCreator.updateEntityFilledStatus({
                page: indexofCurrent + 1,
              })
            ).then(() => {
              setIsSaving(false);
              setPageStatus("saved");
            });
          });
        });

        break;
      case `${t("assetsummaryvalidation")}`:
        dispatch(
          entityASVActionCreator.updateAssetSummaryValidationData(
            stet.AssetSummaryValidation
          )
        ).then(() => {
          dispatch(
            entityFilledStatusActionCreator.updateEntityFilledStatus({
              page: indexofCurrent + 2,
            })
          ).then(() => {
            setIsSaving(false);
            setPageStatus("saved");
          });
        });

        break;
      case `${t("review")}`:
        break;

      default:
        break;
    }
  };

  return (
    <PageContainer>
      {role === "SitaAdmin" && history.push(`/`)}
      {role === "EtekAnalyst" && history.push(`/`)}
      {role === "ClientAdmin" && (
        <>
          <Row lg={12} className="mt-2 mb-1">
            <PageTitle>{t("entityonboarding")}</PageTitle>
          </Row>
          <Row lg={12}>
            <EntityFormBar
              Arr={Arr}
              currentActive={currentActive}
              filled={filled}
              onClick={(clickedBar) => {
                const clickedPageNumber = Arr.indexOf(clickedBar) + 1;
                if (clickedPageNumber <= filled + 1) {
                  if (pageStatus === "unsaved") {
                    setUnsavedDataPopup({
                      show: true,
                      from: currentActive,
                      to: clickedBar,
                    });
                  } else {
                    setCurrentActive(clickedBar);
                  }
                }
              }}
            />
          </Row>
          <MainContent>
            {currentActive === Arr[0] && (
              <AddEntityForm
                data={stet.EntityForm}
                onChange={(newData: any) => {
                  setPageStatus("unsaved");

                  setStet((prev) => {
                    return { ...prev, EntityForm: newData };
                  });
                  dispatch(
                    entityCreationActionCreator.updateEntityCreation(newData)
                  );
                }}
              />
            )}
            {currentActive === Arr[1] && (
              <FunctionandProcess
                data={stet.FunctionAndProcesses}
                onChange={(newData: any) => {
                  setPageStatus("unsaved");
                  setStet((prev) => {
                    return {
                      ...prev,
                      FunctionAndProcesses: newData,
                    };
                  });
                }}
              />
            )}
            {currentActive === Arr[2] && (
              <EntityAssets
                data={stet.Assets}
                dataStatus={pageStatus}
                onChange={(newData: any) => {
                  setPageStatus("unsaved");
                  setStet((prev) => {
                    return { ...prev, Assets: newData };
                  });
                }}
              />
            )}
            {currentActive === Arr[3] && (
              <EntityAssetsSummary
                data={stet.AssetSummaryValidation}
                onChange={(newData) => {
                  setPageStatus("unsaved");
                  setStet((prev) => {
                    return {
                      ...prev,
                      AssetSummaryValidation: newData,
                    };
                  });
                }}
              />
            )}
            {currentActive === Arr[4] && <EntityReview />}
          </MainContent>
          <ButtonContainer>
            {currentActive !== Arr[0] && (
              <Button
                variant="outline-secondary"
                size="sm"
                disabled={isSaving || isLoading}
                className="unfilled-btn-style"
                onClick={handleBackClick}
              >
                {t("previous")}
              </Button>
            )}
            <Button
              variant="outline-success"
              size="sm"
              disabled={isSaving}
              className="unfilled-btn-style"
              onClick={
                currentActive !== Arr[4]
                  ? isSaving
                    ? undefined
                    : OnlySave
                  : history.goBack
              }
            >
              {currentActive !== Arr[4]
                ? isSaving
                  ? `${t("saving")}`
                  : `${t("save")}`
                : `${t("submit")}`}
            </Button>
            {currentActive !== Arr[4] && (
              <Button
                variant="outline-secondary"
                size="sm"
                disabled={isLoading}
                className="unfilled-btn-style"
                onClick={!isLoading ? saveAndContinue : undefined}
              >
                {isLoading ? `${t("saving")}` : `${t("next")}`}
              </Button>
            )}
          </ButtonContainer>
        </>
      )}
      {role === "ClientUser" && (
        <>
          <MainContent>
            <EntityReview />
          </MainContent>
          <ButtonContainer>
            <Button
              variant="outline-secondary"
              size="sm"
              className="unfilled-btn-style"
              onClick={() => history.goBack()}
            >
              {t("close")}
            </Button>
          </ButtonContainer>
        </>
      )}
      <CustomModal
        show={unsavedDataPopup.show}
        onHide={() => {
          setUnsavedDataPopup({ show: false, from: "", to: "" });
        }}
        modalTitle={t("unsaveddata")}
        modalBody={
          <div>
            <p>{t("unsaveddatamsg")}</p>
            <div className="d-flex justify-content-end gap-1rem ">
              <Button
                variant="outline-danger"
                className="unfilled-btn-style"
                onClick={() => {
                  setCurrentActive(unsavedDataPopup.to);
                  setUnsavedDataPopup({
                    show: false,
                    from: "",
                    to: "",
                  });
                  setPageStatus("saved");
                  setLoading(false);
                }}
              >
                {t("no")}
              </Button>
              <Button
                variant="outline-success"
                className="unfilled-btn-style"
                onClick={() => {
                  OnlySave();
                  setCurrentActive(unsavedDataPopup.to);
                  setUnsavedDataPopup({
                    show: false,
                    from: "",
                    to: "",
                  });
                  setPageStatus("saved");
                  setLoading(false);
                }}
              >
                {t("yes")}
              </Button>
            </div>
          </div>
        }
      />
    </PageContainer>
  );
};

export default EntityOnBoardingPage;
