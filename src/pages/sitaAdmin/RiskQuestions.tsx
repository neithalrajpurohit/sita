import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { HiPencil, HiTrash } from "react-icons/hi2";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import CustomModal from "../../component/Modal";
import { AppDispatch } from "../../index";
import { useDispatch } from "react-redux";
import { RiskQuestionActionCreator } from "../../store/Risk/RiskAdminQuestionsSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../configureStore";
import { toast } from "react-toastify";
import { Overlapstyles, theme } from "../GlobalStyles";
import {
  HeadingContainer,
  PageSelectContainer,
  QuestionContainer,
  QuestionTextContainer,
  IconsContainer,
  AddButtonContainer,
  ParaStyled,
  OptionsContainerForModal,
  QuestionSpan,
  ModalContainerResponsive,
  CustomText,
  MainContent,
  PageContainer,
  ButtonContainer1,
  PageTitle1,
  RiskModleButtonContainer,
} from "./SitaAdminStyles";
import { useTranslation } from "react-i18next";
import { languageOption } from "../EditProfile/SupportedLanguage";

interface QuestionState {
  question_id: number | null;
  question_no: number;
  question: string;
  answers: {
    answer_value: number;
    answer_text: string;
    on_hover: string;
  }[];
  selected_answer: number;
}

const RiskQuestions = () => {
  const { t } = useTranslation();
  useEffect(() => {
    document.title = "RiskQuestions";
  }, []);

  const history = useHistory();
  const dispatch: AppDispatch = useDispatch();
  const totalPages = useSelector(
    (state: RootState) => state.RiskAdminQuestions.totalPage
  );

  const totalQuestion = useSelector(
    (state: RootState) => state.RiskAdminQuestions.questions
  );
  const selectedLang = useSelector(
    (state: RootState) => state.RiskAdminQuestions.langCode
  );
  const [selectedPage, setSelectedPage] = useState<number>(
    totalQuestion.screen_id
  );
  const [openAddEditModal, setOpenAddEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [sureSaveModal, setSureSaveModal] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState<number>(0);
  const [questionNoToDelete, setQuestionNoToDelete] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionState>({
    question_id: null,
    question: "",
    question_no: 0,
    answers: [],
    selected_answer: 0,
  });

  const PageOptions = totalPages
    .filter((f) => f.screen_id !== 8)
    .map((g) => {
      return { label: g.screen_name, value: g.screen_id };
    });

  const closeAddEditModal = () => {
    setOpenAddEditModal(false);
    setCurrentQuestion({
      question_id: null,
      question: "",
      question_no: 0,
      answers: [
        {
          answer_value: 0,
          answer_text: "",
          on_hover: "",
        },
        {
          answer_value: 1,
          answer_text: "",
          on_hover: "",
        },
        {
          answer_value: 2,
          answer_text: "",
          on_hover: "",
        },
        {
          answer_value: 3,
          answer_text: "",
          on_hover: "",
        },
        {
          answer_value: 4,
          answer_text: "",
          on_hover: "",
        },
        {
          answer_value: 5,
          answer_text: "",
          on_hover: "",
        },
      ],
      selected_answer: 0,
    });
  };
  const OpenAddEditModal = () => {
    setCurrentQuestion({
      question_id: null,
      question: "",
      question_no: totalQuestion.page_data.length + 1,
      answers: [
        {
          answer_value: 0,
          answer_text: "",
          on_hover: "",
        },
        {
          answer_value: 1,
          answer_text: "",
          on_hover: "",
        },
        {
          answer_value: 2,
          answer_text: "",
          on_hover: "",
        },
        {
          answer_value: 3,
          answer_text: "",
          on_hover: "",
        },
        {
          answer_value: 4,
          answer_text: "",
          on_hover: "",
        },
        {
          answer_value: 5,
          answer_text: "",
          on_hover: "",
        },
      ],
      selected_answer: 0,
    });
    setOpenAddEditModal(true);
  };

  const closeDeleteModal = () => {
    setOpenDeleteModal(false);
    setQuestionToDelete(0);
    setQuestionNoToDelete(0);
  };
  const onSureSaveClose = () => {
    setSureSaveModal(false);
  };

  const DeleteModalBody = (
    <Container fluid>
      <Row>
        <h6 className="text-danger font-weight-bold">{t("impactalltenent")}</h6>
      </Row>
      <RiskModleButtonContainer>
        <Button
          variant="outline-danger"
          onClick={() =>
            dispatch(
              RiskQuestionActionCreator.DeleteRiskQuestion({
                question_id: questionToDelete,
                question_no: questionNoToDelete,
                screen_id: totalQuestion.screen_id,
                screen_name: totalQuestion.screen_name,
                screen_type: totalQuestion.screen_type,
                lang_code: selectedLang,
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
              closeDeleteModal();
            })
          }
          className="inline-btn-style"
        >
          {t("yes")}
        </Button>
        <Button
          variant="outline-success"
          onClick={closeDeleteModal}
          className="inline-btn-style"
        >
          {t("no")}
        </Button>
      </RiskModleButtonContainer>
    </Container>
  );
  const SureModalBody = (
    <Container fluid>
      <Row>
        <h6 className="text-danger font-weight-bold">{t("impactalltenent")}</h6>
      </Row>
      <RiskModleButtonContainer>
        <Button
          variant="outline-danger"
          onClick={() =>
            dispatch(
              RiskQuestionActionCreator.AddUpdateRiskQuestion({
                question: currentQuestion,
                screen_id: totalQuestion.screen_id,
                screen_name: totalQuestion.screen_name,
                screen_type: totalQuestion.screen_type,
                lang_code: selectedLang,
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
              onSureSaveClose();
              closeAddEditModal();
            })
          }
          className="inline-btn-style"
        >
          {t("yes")}
        </Button>
        <Button
          variant="outline-success"
          onClick={onSureSaveClose}
          className="inline-btn-style"
        >
          {t("no")}
        </Button>
      </RiskModleButtonContainer>
    </Container>
  );

  const AddEditModal = (
    <ModalContainerResponsive>
      <Container fluid className="m-0">
        <Form>
          <QuestionContainer>
            <QuestionTextContainer>
              <h6>
                {t("question")} {currentQuestion.question_no}
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label></Form.Label>
                  <Form.Control
                    maxLength={255}
                    value={currentQuestion.question}
                    as="textarea"
                    rows={2}
                    onChange={(e) => {
                      setCurrentQuestion((prev) => {
                        const newObj = { ...prev };
                        newObj.question = e.target.value;
                        return newObj;
                      });
                    }}
                  />
                </Form.Group>
              </h6>
            </QuestionTextContainer>
          </QuestionContainer>
          <OptionsContainerForModal>
            {currentQuestion.answers.map((f) => (
              <Row xl={12} className="mx-0 my-1" key={f.answer_value}>
                <Col xs={12}>
                  <Row
                    xs={12}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <Col xs={2} className="my-2">
                      <CustomText>
                        {t("option")} : {f.answer_value}{" "}
                      </CustomText>
                    </Col>
                    <Col xs={5} className="my-2">
                      <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label></Form.Label>
                        <Form.Control
                          value={f.answer_text}
                          maxLength={90}
                          as="textarea"
                          rows={1}
                          onChange={(e) => {
                            setCurrentQuestion((prev) => {
                              const newObj = {
                                ...prev,
                              };
                              const indexOfExisting = newObj.answers.findIndex(
                                (k) => k.answer_value === f.answer_value
                              );
                              newObj.answers = [
                                ...newObj.answers.slice(0, indexOfExisting),
                                {
                                  ...newObj.answers[indexOfExisting],
                                  answer_text: e.target.value,
                                },
                                ...newObj.answers.slice(indexOfExisting + 1),
                              ];

                              return newObj;
                            });
                          }}
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={5} className="my-2">
                      <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label className="m-0">
                          {t("mouseover")}
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={1}
                          maxLength={300}
                          value={f.on_hover}
                          onChange={(e) => {
                            setCurrentQuestion((prev) => {
                              const newObj = {
                                ...prev,
                              };
                              const indexOfExisting = newObj.answers.findIndex(
                                (k) => k.answer_value === f.answer_value
                              );
                              newObj.answers = [
                                ...newObj.answers.slice(0, indexOfExisting),
                                {
                                  ...newObj.answers[indexOfExisting],
                                  on_hover: e.target.value,
                                },
                                ...newObj.answers.slice(indexOfExisting + 1),
                              ];

                              return newObj;
                            });
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
              </Row>
            ))}
          </OptionsContainerForModal>
          <RiskModleButtonContainer>
            <Button
              variant="outline-danger"
              onClick={closeAddEditModal}
              className="inline-btn-style"
            >
              {t("cancel")}
            </Button>
            <Button
              variant="outline-success"
              disabled={
                currentQuestion.question === "" ||
                currentQuestion.answers
                  .map((d) => d.answer_text === "" || d.on_hover === "")
                  .includes(true)
              }
              onClick={() => setSureSaveModal(true)}
              className="inline-btn-style"
            >
              {t("save")}
            </Button>
          </RiskModleButtonContainer>
        </Form>
      </Container>
    </ModalContainerResponsive>
  );

  return (
    <PageContainer>
      <MainContent>
        <Container fluid>
          <HeadingContainer>
            <PageTitle1>{t("rcob")}</PageTitle1>
            <Row>
              <PageSelectContainer>
                <Select
                  id="react-select-language"
                  placeholder={t("language")}
                  styles={Overlapstyles}
                  theme={theme}
                  value={languageOption.find((f) => f.value === selectedLang)}
                  onChange={(e) => {
                    dispatch(
                      RiskQuestionActionCreator.UpdateLanguageRisk(e?.value!)
                    ).then(() => {
                      dispatch(RiskQuestionActionCreator.FetchPageDropDown());
                    });

                    if (selectedPage !== 0) {
                      dispatch(
                        RiskQuestionActionCreator.FetchDataForSelectedPage({
                          id: selectedPage,
                          lang_code: e?.value!,
                        })
                      );
                    }
                  }}
                  options={languageOption}
                />
              </PageSelectContainer>
              {selectedLang !== "" && (
                <PageSelectContainer>
                  <Select
                    id="react-select-selectpage"
                    placeholder={t("selectpage")}
                    styles={Overlapstyles}
                    theme={theme}
                    value={PageOptions.filter((c) => {
                      if (c.value === selectedPage) return true;
                      return false;
                    })}
                    onChange={(e) => {
                      setSelectedPage(e?.value!);
                      dispatch(
                        RiskQuestionActionCreator.FetchDataForSelectedPage({
                          id: e?.value!,
                          lang_code: selectedLang,
                        })
                      );
                    }}
                    options={PageOptions}
                  />
                </PageSelectContainer>
              )}
            </Row>
          </HeadingContainer>
          <AddButtonContainer>
            <Button
              disabled={totalQuestion.page === 0}
              onClick={OpenAddEditModal}
            >
              {t("newquestion")}
            </Button>
          </AddButtonContainer>
          {selectedLang === "" && (
            <div className="d-flex justify-content-center align-items-center">
              <h4>{t("selectlang")}</h4>
            </div>
          )}
          {totalQuestion.page === 0 ? (
            <div className="d-flex justify-content-center align-items-center">
              <h5>{t("selectpage")}</h5>
            </div>
          ) : (
            <>
              {totalQuestion.page_data.length > 0 ? (
                <>
                  {totalQuestion.page_data.map((g, index) => (
                    <Form className="custom-form-styles" key={g.question_id}>
                      <QuestionContainer>
                        <QuestionTextContainer>
                          <h6>
                            {t("question")} {index + 1} :{" "}
                            <QuestionSpan>{g.question}</QuestionSpan>
                          </h6>
                        </QuestionTextContainer>
                        <IconsContainer>
                          <HiPencil
                            cursor="pointer"
                            onClick={() => {
                              setOpenAddEditModal(true);
                              setCurrentQuestion((prev) => {
                                const newobj = {
                                  ...prev,
                                  question: g.question,
                                  question_id: g.question_id,
                                  question_no: g.question_no,
                                  answers: g.answers,
                                  selected_answer: 0,
                                };

                                return newobj;
                              });
                            }}
                            fontSize="1.25rem"
                          />
                          <HiTrash
                            cursor="pointer"
                            fontSize="1.25rem"
                            onClick={() => {
                              setOpenDeleteModal(true);
                              setQuestionToDelete(g.question_id);
                              setQuestionNoToDelete(g.question_no);
                            }}
                          />
                        </IconsContainer>
                      </QuestionContainer>
                      {g.answers.map((f) => (
                        <Row xl={12} className="my-1 mx-0" key={f.answer_value}>
                          <Col xs={12}>
                            <Row
                              xs={12}
                              className="d-flex justify-content-between align-items-center"
                            >
                              <Col xs={2} className="my-2">
                                <ParaStyled>
                                  {t("option")} : {f.answer_value}{" "}
                                </ParaStyled>
                              </Col>
                              <Col xs={5} className="my-2">
                                <ParaStyled>{f.answer_text}</ParaStyled>
                              </Col>
                              <Col xs={5} className="my-2">
                                <ParaStyled>{f.on_hover}</ParaStyled>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      ))}
                    </Form>
                  ))}
                </>
              ) : (
                <div className="d-flex justify-content-center align-items-center">
                  <h5>{t("addquestion")}</h5>
                </div>
              )}
            </>
          )}
        </Container>
      </MainContent>
      <ButtonContainer1>
        <Button
          variant="outline-secondary"
          size="sm"
          className="unfilled-btn-style"
          onClick={() => history.goBack()}
        >
          {t("previous")}
        </Button>
      </ButtonContainer1>

      <CustomModal
        modalBody={AddEditModal}
        show={openAddEditModal}
        onHide={closeAddEditModal}
      />
      <CustomModal
        modalBody={DeleteModalBody}
        show={openDeleteModal}
        onHide={closeDeleteModal}
      />
      <CustomModal
        modalBody={SureModalBody}
        show={sureSaveModal}
        onHide={onSureSaveClose}
      />
    </PageContainer>
  );
};

export default RiskQuestions;
