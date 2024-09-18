import { useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { HiPencil, HiTrash } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { RootState } from "../../configureStore";
import Modal from "../../component/Modal";
import { AdminAssetActionCreator } from "../../store/Admin/AdminAssetSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../..";
import { v4 as uuidv4 } from "uuid";
import { FunctionListContainer } from "../Function&Process/FunctionStyles";
import {
  PreFunctionContainer,
  FunctionListEntrySub,
  PreFunctionListEntry,
  PreFunctionListContainer,
  FunctionListEntry,
  FunctionContainer,
  BoxTitle,
  ButtonContainer2,
} from "./SitaAdminStyles";
import { preProcessType, preDefineType } from "./SitaAdminTypes";
import { useTranslation } from "react-i18next";

const FunctionProcess = () => {
  const { t } = useTranslation();
  const theme = useSelector(
    (state: RootState) =>
      state.UserAuthentication.userDetails?.user?.theme_preference
  );
  const prevPreDefArr = useSelector(
    (state: RootState) => state.AdminAsset.functionData
  );

  const [preDefFunction, setPreDefFunction] = useState<preDefineType>({
    id: null,
    functionColor: "",
    functionId: "",
    functionName: "",
    isuserDef: false,
    process: [
      {
        id: null,
        isuserDef: false,
        parentId: "",
        processColor: "",
        processId: "",
        processName: "",
      },
    ],
  });

  const [selectedFunctionId, setSelectedFunctionId] = useState("");
  const [selectedPreFuncId, setSelectedPreFuncId] = useState("");
  const [isEditingFunction, setIsEditingFunction] = useState(false);
  const [isEditingPreFunc, setIsEditingPreFunc] = useState(false);
  const [query, setQuery] = useState("");
  const [subQuery, setSubQuery] = useState("");

  const [isShowDeleteFunctionModal, setIsShowDeleteFunctionModal] =
    useState(false);
  const [isShowDeleteProcessModal, setIsShowDeleteProcessModal] =
    useState(false);

  const onDeleteFunctionHide = () => {
    setIsShowDeleteFunctionModal(false);
  };
  const onDeleteProcessHide = () => {
    setIsShowDeleteProcessModal(false);
  };
  const dispatch: AppDispatch = useDispatch();

  const [processObj, setProcessObj] = useState<preProcessType>({
    id: null,
    isuserDef: false,
    parentId: "",
    processColor: "",
    processId: "",
    processName: "",
  });

  const alreadyinFunctionList = prevPreDefArr.some((value) => {
    return (
      value.functionName.toLowerCase().replace(/\s/g, "") ===
      query.toLowerCase().replace(/\s/g, "")
    );
  });

  const objIndex = prevPreDefArr.findIndex(
    (f: any) => f.functionId === selectedFunctionId
  );
  const alreadyinProcessList = prevPreDefArr[objIndex]?.process?.some(
    (value) => {
      return (
        value.processName.toLowerCase().replace(/\s/g, "") ===
        subQuery.toLowerCase().replace(/\s/g, "")
      );
    }
  );

  const filterFunction = () => {
    const filterArr = prevPreDefArr.filter((e) => {
      return e.functionName
        .toLowerCase()
        .replaceAll(/\s/g, "")
        .includes(query.toLowerCase().replaceAll(/\s/g, ""));
    });
    return filterArr.length > 0 ? filterArr : prevPreDefArr;
  };
  const filteredFunctionData = filterFunction();

  const filterProcess = () => {
    const objIndex = prevPreDefArr.findIndex(
      (f: any) => f.functionId === selectedFunctionId
    );
    const filterArr = prevPreDefArr[objIndex]?.process?.filter((e) => {
      return e.processName
        .toLowerCase()
        .replaceAll(/\s/g, "")
        .includes(subQuery.toLowerCase().replaceAll(/\s/g, ""));
    });
    return filterArr?.length > 0 ? filterArr : prevPreDefArr[objIndex]?.process;
  };
  const filterProcessData = filterProcess();

  const pushtoFnArr = () => {
    if (preDefFunction.functionName === "" || alreadyinFunctionList) return;
    if (selectedFunctionId) {
      const objIndexToUpdate = prevPreDefArr.findIndex(
        (f: any) => f.functionId === selectedFunctionId
      );
      const newArr = [...prevPreDefArr];
      newArr[objIndexToUpdate] = preDefFunction;
      dispatch(
        AdminAssetActionCreator.addPredefinedFunction({
          id: preDefFunction.id,
          functionId: preDefFunction.functionId,
          functionName: preDefFunction.functionName,
        })
      ).then(() => {
        setPreDefFunction({
          id: null,
          functionName: "",
          process: [],
          isuserDef: false,
          functionColor: "",
          functionId: "",
        });
        setIsEditingFunction(false);
        setSelectedFunctionId("");
        setQuery("");
      });

      // dispatch(AdminAssetActionCreator.updatePredefinedFunction(newArr));
    } else {
      dispatch(
        AdminAssetActionCreator.addPredefinedFunction({
          id: preDefFunction.id,
          functionId: preDefFunction.functionId,
          functionName: preDefFunction.functionName,
        })
      ).then(() => {
        setPreDefFunction({
          id: null,
          functionId: "",
          isuserDef: false,
          functionColor: "",
          functionName: "",
          process: [
            {
              id: null,
              isuserDef: false,
              parentId: "",
              processColor: "",
              processId: "",
              processName: "",
            },
          ],
        });
        setSelectedFunctionId("");
        setQuery("");
      });

      // dispatch(
      //   AdminAssetActionCreator.updatePredefinedFunction([
      //     ...prevPreDefArr,
      //     preDefFunction,
      //   ])
      // );
    }
  };

  const pushtoPreFnArr = () => {
    if (
      !selectedFunctionId ||
      processObj.processName === "" ||
      alreadyinProcessList
    )
      return;
    if (selectedPreFuncId) {
      const objIndexToUpdate = prevPreDefArr.findIndex(
        (f) => f.functionId === selectedFunctionId
      );

      const processIndex = prevPreDefArr[objIndexToUpdate].process.findIndex(
        (f) => f.processId === selectedPreFuncId
      );
      const newArr = [...prevPreDefArr];
      newArr[objIndexToUpdate] = {
        ...newArr[objIndexToUpdate],
        process: [
          ...newArr[objIndexToUpdate].process.slice(0, processIndex),
          { ...processObj },
          ...newArr[objIndexToUpdate].process.slice(processIndex + 1),
        ],
      };
      dispatch(
        AdminAssetActionCreator.addPredefinedProcess({
          id: processObj.id,
          parentFunctionId: selectedFunctionId,
          processId: processObj.processId,
          processName: processObj.processName,
          isuserDef: processObj.isuserDef,
        })
      ).then(() => {
        setProcessObj({
          id: null,
          isuserDef: false,
          parentId: "",
          processColor: "",
          processId: "",
          processName: "",
        });

        setSelectedPreFuncId("");
        setIsEditingPreFunc(false);
        setSubQuery("");
      });

      // dispatch(AdminAssetActionCreator.updatePredefinedFunction(newArr));
    } else {
      const objIndexToUpdate = prevPreDefArr.findIndex(
        (f: any) => f.functionId === selectedFunctionId
      );

      const newArr = [...prevPreDefArr];
      newArr[objIndexToUpdate] = {
        ...newArr[objIndexToUpdate],
        process: [...newArr[objIndexToUpdate].process, processObj],
      };
      dispatch(
        AdminAssetActionCreator.addPredefinedProcess({
          id: processObj.id,
          parentFunctionId: selectedFunctionId,
          processId: processObj.processId,
          processName: processObj.processName,
          isuserDef: processObj.isuserDef,
        })
      ).then(() => {
        setProcessObj({
          id: null,
          isuserDef: false,
          parentId: "",
          processColor: "",
          processId: "",
          processName: "",
        });

        setSelectedPreFuncId("");
        setSubQuery("");
      });
      // dispatch(AdminAssetActionCreator.updatePredefinedFunction(newArr));
    }
  };

  const ToDeleteFunc = () => {
    if (selectedFunctionId) {
      const filteredArr = prevPreDefArr.filter(
        (i) => i.functionId !== selectedFunctionId
      );
      dispatch(
        AdminAssetActionCreator.removePredefinedFunction({
          functionId: selectedFunctionId,
        })
      );
      dispatch(AdminAssetActionCreator.deleteFunction(filteredArr));
    } else return;
  };
  const ToDeleteProc = () => {
    if (selectedPreFuncId) {
      const objIndexToUpdate = prevPreDefArr.findIndex(
        (f) => f.functionId === selectedFunctionId
      );
      const filteredArr = prevPreDefArr[objIndexToUpdate].process.filter(
        (i) => i.processId !== selectedPreFuncId
      );
      const newArr = [...prevPreDefArr];
      newArr[objIndexToUpdate] = {
        ...newArr[objIndexToUpdate],
        process: [...filteredArr],
      };

      dispatch(
        AdminAssetActionCreator.removePredefinedProcess({
          processId: selectedPreFuncId,
        })
      );
      dispatch(AdminAssetActionCreator.deleteFunction(newArr));
    } else return;
  };

  const isDeleteFunctionBody = (
    <>
      <Row className="my-4 mt-6">
        <Col lg={12}>
          <div className="imapct-all-tenant-msg">
            <p>{t("impactalltenent")}</p>
          </div>
        </Col>
      </Row>

      <Row className="float-right">
        <Col>
          <Button
            variant="outline-danger"
            onClick={() => {
              ToDeleteFunc();
              setIsShowDeleteFunctionModal(false);
            }}
            className="submit-btn-style"
          >
            {t("yes")}
          </Button>
        </Col>
        <Col>
          <Button
            variant="outline-success"
            onClick={onDeleteFunctionHide}
            className="submit-btn-style"
          >
            {t("no")}
          </Button>
        </Col>
      </Row>
    </>
  );

  const isDeleteProcessBody = (
    <>
      <Row className="my-4 mt-6">
        <Col lg={12}>
          <div className="imapct-all-tenant-msg">
            <p>{t("impactalltenent")}</p>
          </div>
        </Col>
      </Row>

      <Row className="float-right">
        <Col>
          <Button
            variant="outline-danger"
            onClick={() => {
              ToDeleteProc();
              setIsShowDeleteProcessModal(false);
            }}
            className="submit-btn-style"
          >
            {t("yes")}
          </Button>
        </Col>
        <Col>
          <Button
            variant="outline-success"
            onClick={onDeleteProcessHide}
            className="submit-btn-style"
          >
            {t("no")}
          </Button>
        </Col>
      </Row>
    </>
  );

  return (
    <>
      <Container fluid>
        <Row md={12}>
          <Col md={12}>
            <Row md={12}>
              <Col md={7} className="my-3">
                <BoxTitle>{t("predefinedfunctions")}</BoxTitle>
                <InputGroup className="mb-2">
                  <Form.Control
                    maxLength={25}
                    placeholder={t("enterfunctionname")}
                    value={preDefFunction.functionName}
                    className="risk-input-style"
                    onChange={(e) => {
                      setQuery(e.target.value);
                      const objIndexToUpdate = prevPreDefArr.findIndex(
                        (f: any) => f.functionId === selectedFunctionId
                      );
                      !isEditingFunction && setSelectedFunctionId("");
                      setPreDefFunction({
                        id: !isEditingFunction
                          ? null
                          : prevPreDefArr[objIndexToUpdate].id,
                        functionName: e.target.value.trimStart(),
                        process: !isEditingFunction
                          ? []
                          : prevPreDefArr[objIndexToUpdate].process,
                        isuserDef: false,
                        functionColor: theme === "dark" ? "#FFFF00" : "#0000FF",
                        functionId: !isEditingFunction
                          ? uuidv4().trim().slice(0, 18)
                          : selectedFunctionId,
                      });
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        pushtoFnArr();
                      }
                    }}
                  />
                  <Button
                    variant="outline-success"
                    size="sm"
                    disabled={
                      preDefFunction.functionName === "" ||
                      alreadyinFunctionList
                    }
                    className="filled-btn-style"
                    onClick={pushtoFnArr}
                  >
                    {isEditingFunction ? `${t("update")}` : `${t("add")}`}
                  </Button>
                </InputGroup>
                <PreFunctionContainer>
                  <PreFunctionListContainer>
                    {filteredFunctionData.map((e: any, index: number) => (
                      <Row xs={12} key={index}>
                        <Col
                          xs={12}
                          onClick={() => {
                            if (selectedFunctionId === e.functionId) {
                              setSelectedFunctionId("");
                              setSelectedPreFuncId("");
                              setIsEditingFunction(false);
                              setIsEditingPreFunc(false);
                              setQuery("");
                              setSubQuery("");
                              setPreDefFunction({
                                id: null,
                                functionName: "",
                                process: [],
                                isuserDef: false,
                                functionColor: "",
                                functionId: "",
                              });
                              setProcessObj({
                                id: null,
                                isuserDef: false,
                                parentId: "",
                                processColor: "",
                                processId: "",
                                processName: "",
                              });
                            } else {
                              setSelectedFunctionId(e.functionId);
                              setSelectedPreFuncId("");
                              setIsEditingFunction(false);
                              setIsEditingPreFunc(false);
                              setPreDefFunction({
                                id: null,
                                functionName: "",
                                process: [],
                                isuserDef: false,
                                functionColor: "",
                                functionId: "",
                              });
                              setProcessObj({
                                id: null,
                                isuserDef: false,
                                parentId: "",
                                processColor: "",
                                processId: "",
                                processName: "",
                              });
                            }
                          }}
                        >
                          <PreFunctionListEntry
                            color={
                              e.functionId === selectedFunctionId
                                ? "#000"
                                : "var(--font-color)"
                            }
                            background={
                              e.functionId === selectedFunctionId
                                ? "#B2B2B2"
                                : "var(--bg-color)"
                            }
                          >
                            {e.functionName}
                          </PreFunctionListEntry>
                        </Col>
                      </Row>
                    ))}
                  </PreFunctionListContainer>
                  <ButtonContainer2>
                    <HiPencil
                      cursor="pointer"
                      onClick={() => {
                        if (selectedFunctionId !== "") {
                          setIsEditingFunction(true);
                          const obj = prevPreDefArr.find(
                            (i: any) => i.functionId === selectedFunctionId
                          );
                          setPreDefFunction({
                            id: obj?.id!,
                            functionName: obj?.functionName!,
                            process: obj?.process!,
                            isuserDef: false,
                            functionColor: obj?.functionColor!,
                            functionId: obj?.functionId!,
                          });
                        } else return;
                      }}
                    />

                    <HiTrash
                      onClick={() => {
                        if (selectedFunctionId) {
                          setIsShowDeleteFunctionModal(true);
                        } else return;
                      }}
                      cursor="pointer"
                    />
                  </ButtonContainer2>
                </PreFunctionContainer>
                <BoxTitle>{t("predefinedprocesses")}</BoxTitle>
                <InputGroup className="mb-2">
                  <Form.Control
                    maxLength={25}
                    placeholder={t("enterprocessname")}
                    value={processObj.processName}
                    className="risk-input-style"
                    disabled={!selectedFunctionId}
                    onChange={(e) => {
                      setSubQuery(e.target.value);
                      !isEditingPreFunc && setSelectedPreFuncId("");
                      setProcessObj({
                        id: !isEditingPreFunc
                          ? null
                          : filterProcessData.filter(
                              (g) => g.processId === selectedPreFuncId
                            )[0].id,
                        isuserDef: false,
                        parentId: selectedFunctionId,
                        processColor: theme === "dark" ? "#FFFF00" : "#0000FF",
                        processId: !isEditingPreFunc
                          ? uuidv4().trim().slice(0, 18)
                          : selectedPreFuncId,
                        processName: e.target.value.trimStart(),
                      });
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        pushtoPreFnArr();
                      }
                    }}
                  />
                  <Button
                    variant="outline-success"
                    size="sm"
                    className="filled-btn-style"
                    disabled={
                      !selectedFunctionId ||
                      processObj.processName === "" ||
                      alreadyinProcessList
                    }
                    onClick={pushtoPreFnArr}
                  >
                    {isEditingPreFunc ? `${t("update")}` : `${t("add")}`}
                  </Button>
                </InputGroup>
                <PreFunctionContainer>
                  <PreFunctionListContainer>
                    {filterProcessData?.map((e: any, index: number) => (
                      <Row xs={12} key={index}>
                        <Col
                          xs={12}
                          onClick={() => {
                            if (selectedPreFuncId === e.processId) {
                              setSelectedPreFuncId("");
                              setIsEditingPreFunc(false);
                              setSubQuery("");
                              setProcessObj({
                                id: null,
                                isuserDef: false,
                                parentId: "",
                                processColor: "",
                                processId: "",
                                processName: "",
                              });
                            } else {
                              setSelectedPreFuncId(e.processId);
                              setIsEditingPreFunc(false);
                              setProcessObj({
                                id: null,
                                isuserDef: false,
                                parentId: "",
                                processColor: "",
                                processId: "",
                                processName: "",
                              });
                            }
                          }}
                        >
                          <PreFunctionListEntry
                            color={
                              e.processId === selectedPreFuncId
                                ? "#000"
                                : "var(--font-color)"
                            }
                            background={
                              e.processId === selectedPreFuncId
                                ? "#B2B2B2"
                                : "var(--bg-color)"
                            }
                          >
                            {e.processName}
                          </PreFunctionListEntry>
                        </Col>
                      </Row>
                    ))}
                  </PreFunctionListContainer>
                  <ButtonContainer2>
                    <HiPencil
                      onClick={() => {
                        if (selectedPreFuncId) {
                          setIsEditingPreFunc(true);
                          const obj = prevPreDefArr
                            .find(
                              (i: any) => i.functionId === selectedFunctionId
                            )
                            ?.process?.find(
                              (i: any) => i.processId === selectedPreFuncId
                            );
                          setProcessObj({
                            id: obj?.id!,
                            isuserDef: obj?.isuserDef!,
                            parentId: obj?.parentId!,
                            processColor: obj?.processColor!,
                            processId: obj?.processId!,
                            processName: obj?.processName!,
                          });
                        } else return;
                      }}
                      cursor="pointer"
                    />
                    <HiTrash
                      onClick={() => {
                        if (selectedPreFuncId) {
                          setIsShowDeleteProcessModal(true);
                        } else return;
                      }}
                      cursor="pointer"
                    />
                  </ButtonContainer2>
                </PreFunctionContainer>
              </Col>
              <Col
                md={5}
                className="my-3 function-process-right-divider"
                disabled={!selectedFunctionId ? true : false}
              >
                <BoxTitle>{t("pfpphierarchy")}</BoxTitle>
                <FunctionContainer>
                  <FunctionListContainer>
                    {prevPreDefArr.map((e: any, index: number) => (
                      <Row xs={12} key={index}>
                        <Col xs={12}>
                          <FunctionListEntry
                            key={index}
                            className="font-color mr-2"
                          >
                            {e.functionName}
                          </FunctionListEntry>
                          {e.process.map((g: any, i: number) => (
                            <Row key={i}>
                              <Col xs={10}>
                                <FunctionListEntrySub className="font-color">
                                  &nbsp;&nbsp;-
                                  {g.processName}
                                </FunctionListEntrySub>
                              </Col>
                              <Col xs={2}></Col>
                            </Row>
                          ))}
                        </Col>
                      </Row>
                    ))}
                  </FunctionListContainer>
                </FunctionContainer>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <Modal
        modalBody={isDeleteFunctionBody}
        modalTitle=""
        show={isShowDeleteFunctionModal}
        onHide={onDeleteFunctionHide}
      />
      <Modal
        modalBody={isDeleteProcessBody}
        modalTitle=""
        show={isShowDeleteProcessModal}
        onHide={onDeleteProcessHide}
      />
    </>
  );
};

export default FunctionProcess;
