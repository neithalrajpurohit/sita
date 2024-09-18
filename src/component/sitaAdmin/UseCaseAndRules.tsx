import React, { useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import CustomModal from "../Modal";
import { HiPencil, HiTrash } from "react-icons/hi2";
import {
  PageContainer,
  MainContent,
  FunctionContainer2,
  ButtonContainer,
  FunctionListContainer,
  BoxTitle,
  ButtonContainer2,
  PreFunctionContainerSmall,
  PreFunctionListContainer,
  PreFunctionListEntry,
  FunctionListEntry,
  FunctionListEntrySub,
} from "./SitaAdminStyles";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../configureStore";
import { AppDispatch } from "../../index";
import { AdminAssetActionCreator } from "../../store/Admin/AdminAssetSlice";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const UseCaseAndRules = () => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const useCaseAndRules = useSelector(
    (state: RootState) => state.AdminAsset.useCases
  );

  const [useCase, setUseCase] = useState<{
    usecaseName: string;
    usecaseId: null | number;
  }>({
    usecaseName: "",
    usecaseId: null,
  });

  const [selectedUseCaseId, setSelectedUseCaseId] = useState<null | number>(
    null
  );

  const [isEditingUseCase, setIsEditingUseCase] = useState(false);
  const [showDeleteUseCaseModal, setShowDeleteUseCaseModal] = useState(false);

  const [rule, setRule] = useState<{
    ruleId: number | null;
    ruleName: string;
  }>({ ruleId: null, ruleName: "" });

  const [selectedRuleId, setSelectedRuleId] = useState<number | null>(null);
  const [isEditingRule, setIsEditingRule] = useState(false);
  const [showDeleteRuleModal, setShowDeleteRuleModal] = useState(false);

  const resetCompState = () => {
    setIsEditingUseCase(false);
    setSelectedUseCaseId(null);
    setUseCase({
      usecaseName: "",
      usecaseId: null,
    });
    setShowDeleteUseCaseModal(false);
    setRule({ ruleId: null, ruleName: "" });
    setIsEditingRule(false);
    setSelectedRuleId(null);
    setShowDeleteRuleModal(false);
  };

  const addUpdateUseCase = () => {
    if (useCase.usecaseName === "") return;
    dispatch(AdminAssetActionCreator.addUpdateUseCase(useCase)).then((res) => {
      toast(res.payload.Message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        theme: "dark",
      });
      resetCompState();
    });
  };
  const deleteUseCase = () => {
    dispatch(
      AdminAssetActionCreator.deleteUseCase({ usecaseId: selectedUseCaseId })
    ).then((res) => {
      toast(res.payload.Message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        theme: "dark",
      });
      resetCompState();
    });
  };

  const addUpdateRule = () => {
    if (selectedUseCaseId === null || rule.ruleName === "") return;
    dispatch(
      AdminAssetActionCreator.addUpdateRuleToUseCase({
        usecaseId: selectedUseCaseId,
        ...rule,
      })
    ).then((res) => {
      toast(res.payload.Message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        theme: "dark",
      });
      resetCompState();
    });
  };
  const deleteRule = () => {
    dispatch(
      AdminAssetActionCreator.deleteRule({
        ruleId: selectedRuleId,
      })
    ).then((res) => {
      toast(res.payload.Message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        theme: "dark",
      });
      resetCompState();
    });
  };

  const DeleteUseCaseModal = (
    <>
      <Row className="my-4 mt-6">
        <Col lg={12}>
          <div className="usecases-rules-column">
            <p>{t("impactalltenent")}</p>
          </div>
        </Col>
      </Row>

      <Row className="float-right">
        <Col>
          <Button
            variant="outline-danger"
            onClick={deleteUseCase}
            className="submit-btn-style"
          >
            {t("yes")}
          </Button>
        </Col>
        <Col>
          <Button
            variant="outline-success"
            onClick={() => {
              resetCompState();
            }}
            className="submit-btn-style"
          >
            {t("no")}
          </Button>
        </Col>
      </Row>
    </>
  );
  const DeleteRuleModal = (
    <>
      <Row className="my-4 mt-6">
        <Col lg={12}>
          <div className="usecases-rules-column">
            <p>{t("impactalltenent")}</p>
          </div>
        </Col>
      </Row>

      <Row className="float-right">
        <Col>
          <Button
            variant="outline-danger"
            onClick={deleteRule}
            className="submit-btn-style"
          >
            {t("yes")}
          </Button>
        </Col>
        <Col>
          <Button
            variant="outline-success"
            onClick={() => {
              resetCompState();
            }}
            className="submit-btn-style"
          >
            {t("no")}
          </Button>
        </Col>
      </Row>
    </>
  );

  return (
    <PageContainer>
      <MainContent>
        <Container fluid>
          <Row md={12}>
            <Col md={12}>
              <Row md={12}>
                <Col md={7} className="my-3">
                  <BoxTitle>{t("usecase")}</BoxTitle>
                  <InputGroup className="mb-2">
                    <Form.Control
                      maxLength={25}
                      placeholder={t("enterusecase")}
                      value={useCase.usecaseName}
                      className="risk-input-style"
                      onChange={(e) => {
                        setUseCase((prev) => {
                          const newobj = { ...prev };
                          newobj.usecaseId = isEditingUseCase
                            ? selectedUseCaseId
                            : null;
                          newobj.usecaseName = e.target.value;
                          return newobj;
                        });
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          addUpdateUseCase();
                        }
                      }}
                    />
                    <Button
                      variant="outline-success"
                      size="sm"
                      disabled={useCase.usecaseName === ""}
                      className="filled-btn-style"
                      onClick={addUpdateUseCase}
                    >
                      {isEditingUseCase ? `${t("update")}` : `${t("add")}`}
                    </Button>
                  </InputGroup>
                  <PreFunctionContainerSmall>
                    <PreFunctionListContainer>
                      {useCaseAndRules.map((e) => (
                        <Row xs={12} key={e.usecaseId}>
                          <Col
                            xs={12}
                            onClick={() => {
                              setSelectedUseCaseId((prev) => {
                                if (prev === e.usecaseId) {
                                  return null;
                                }
                                return e.usecaseId;
                              });
                            }}
                          >
                            <PreFunctionListEntry
                              background={
                                e.usecaseId === selectedUseCaseId
                                  ? "#B2B2B2"
                                  : "var(--bg-color)"
                              }
                              color={
                                e.usecaseId === selectedUseCaseId
                                  ? "#000"
                                  : "var(--font-color)"
                              }
                            >
                              {e.usecaseName}
                            </PreFunctionListEntry>
                          </Col>
                        </Row>
                      ))}
                    </PreFunctionListContainer>
                    <ButtonContainer2>
                      <HiPencil
                        onClick={() => {
                          if (selectedUseCaseId !== null) {
                            setIsEditingUseCase(true);
                            const obj = useCaseAndRules.find(
                              (i) => i.usecaseId === selectedUseCaseId
                            );
                            setUseCase((prev) => {
                              const newobj = { ...prev };
                              newobj.usecaseId = obj?.usecaseId!;
                              newobj.usecaseName = obj?.usecaseName!;
                              return newobj;
                            });
                          } else return;
                        }}
                        cursor="pointer"
                      />
                      <HiTrash
                        onClick={() => {
                          if (selectedUseCaseId !== null) {
                            setShowDeleteUseCaseModal(true);
                          } else return;
                        }}
                        cursor="pointer"
                      />
                    </ButtonContainer2>
                  </PreFunctionContainerSmall>
                  <BoxTitle>{t("rule")}</BoxTitle>
                  <InputGroup className="mb-2">
                    <Form.Control
                      maxLength={25}
                      placeholder={t("enterrule")}
                      value={rule.ruleName}
                      className="risk-input-style"
                      disabled={!selectedUseCaseId}
                      onChange={(e) => {
                        setRule({
                          ruleName: e.target.value,
                          ruleId: isEditingRule ? selectedRuleId : null,
                        });
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          addUpdateRule();
                        }
                      }}
                    />
                    <Button
                      variant="outline-success"
                      size="sm"
                      disabled={
                        selectedUseCaseId === null || rule.ruleName === ""
                      }
                      className="filled-btn-style"
                      onClick={addUpdateRule}
                    >
                      {isEditingRule ? `${t("update")}` : `${t("add")}`}
                    </Button>
                  </InputGroup>
                  <PreFunctionContainerSmall>
                    <PreFunctionListContainer>
                      {useCaseAndRules
                        .find((i) => i.usecaseId === selectedUseCaseId)
                        ?.Rule?.map((e) => (
                          <Row xs={12} key={e.ruleId}>
                            <Col
                              xs={12}
                              onClick={() => {
                                setSelectedRuleId((prev) => {
                                  if (prev === e.ruleId) {
                                    return null;
                                  }
                                  return e.ruleId;
                                });
                              }}
                            >
                              <PreFunctionListEntry
                                background={
                                  e.ruleId === selectedRuleId
                                    ? "#B2B2B2"
                                    : "var(--bg-color)"
                                }
                                color={
                                  e.ruleId === selectedRuleId
                                    ? "#000"
                                    : "var(--font-color)"
                                }
                              >
                                {e.ruleName}
                              </PreFunctionListEntry>
                            </Col>
                          </Row>
                        ))}
                    </PreFunctionListContainer>
                    <ButtonContainer2>
                      <HiPencil
                        onClick={() => {
                          if (selectedRuleId) {
                            setIsEditingRule(true);
                            const obj = useCaseAndRules
                              .find((i) => i.usecaseId === selectedUseCaseId)
                              ?.Rule?.find((i) => i.ruleId === selectedRuleId);
                            setRule((prev) => {
                              const newobj = { ...prev };
                              newobj.ruleId = obj?.ruleId!;
                              newobj.ruleName = obj?.ruleName!;
                              return newobj;
                            });
                          } else return;
                        }}
                        cursor="pointer"
                      />
                      <HiTrash
                        onClick={() => {
                          if (selectedRuleId !== null) {
                            setShowDeleteRuleModal(true);
                          } else return;
                        }}
                        cursor="pointer"
                      />
                    </ButtonContainer2>
                  </PreFunctionContainerSmall>
                </Col>
                <Col md={5} className="my-3">
                  <BoxTitle>{t("ucar")}</BoxTitle>
                  <FunctionContainer2>
                    <FunctionListContainer>
                      {useCaseAndRules.map((e) => (
                        <Row xs={12} key={e.usecaseId}>
                          <Col xs={12}>
                            <FunctionListEntry className="font-color mr-3">
                              {e.usecaseName}
                            </FunctionListEntry>
                            {e.Rule.map((g) => (
                              <Row key={g.ruleId}>
                                <Col xs={10}>
                                  <FunctionListEntrySub>
                                    &nbsp;&nbsp;-
                                    {g.ruleName}
                                  </FunctionListEntrySub>
                                </Col>
                                <Col xs={2}></Col>
                              </Row>
                            ))}
                          </Col>
                        </Row>
                      ))}
                    </FunctionListContainer>
                    <ButtonContainer></ButtonContainer>
                  </FunctionContainer2>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </MainContent>
      <CustomModal
        modalBody={DeleteUseCaseModal}
        modalTitle=""
        show={showDeleteUseCaseModal}
        onHide={resetCompState}
      />
      <CustomModal
        modalBody={DeleteRuleModal}
        modalTitle=""
        show={showDeleteRuleModal}
        onHide={resetCompState}
      />
    </PageContainer>
  );
};
export default UseCaseAndRules;
