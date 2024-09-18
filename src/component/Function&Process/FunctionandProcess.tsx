import { useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { HiMinus, HiPencil, HiPlus, HiTrash } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch } from "../../index";
import { axiosPrivate } from "../../helpers/ApiClient";
import { EndPoints } from "../../helpers/ApiEndPoints";
import { RootState } from "../../configureStore";
import { entityFunctionAndProcessesActionCreator } from "../../store/Entity/EntityFunctionAndProcessSlice";
import { v4 as uuidv4 } from "uuid";
import { ButtonContainer, PageTitle } from "../GlobalComponentStyles";
import {
  FunctionListContainer,
  PreFunctionListContainer,
  PreFunctionListEntry,
  FunctionListEntrySub,
  PreFunctionContainer,
  FunctionContainer,
  BoxTitle,
  FunctionListEntry,
  ProcessListEntry,
  ProcessListContainer,
  StyledInputGroup,
} from "./FunctionStyles";
import { FormData, CustomObj } from "./FunctionTypes";
import { useTranslation } from "react-i18next";

const FunctionandProcess = (props: FormData) => {
  const { t } = useTranslation();
  const { data, onChange } = props;
  const {
    ADD_MASTER_FUNCTION,
    DELETE_MASTER_FUNCTION,
    ADD_MASTER_PROCESS,
    DELETE_MASTER_PROCESS,
  } = EndPoints;
  const EntityPreFunctionAndProcesses = useSelector(
    (state: RootState) => state.EntityFunctionAndProcess.PreFunctionAndProcesses
  );
  const EntityCustomFunctionAndProcesses = useSelector(
    (state: RootState) => state.EntityFunctionAndProcess.CustomFuncProcess
  );
  const EntityCustomProcesses = useSelector(
    (state: RootState) => state.EntityFunctionAndProcess.CustomProcess
  );
  const dispatch: AppDispatch = useDispatch();
  const theme = useSelector(
    (state: RootState) =>
      state.UserAuthentication.userDetails?.user?.theme_preference
  );
  const [preDefFunctions, setPreDefFunctions] = useState(
    EntityPreFunctionAndProcesses
  );
  const [selectedFunctions, setSelectedFunctions] = useState<
    {
      functionId: string;
      isuserDef: boolean;
      functionName: string;
      functionColor: string;
      process: {
        processName: string;
        isuserDef: boolean;
        processColor: string;
        processId: string;
        parentId: string;
      }[];
    }[]
  >([]);

  const [userDefFunction, setUserDefFunction] = useState({
    functionId: "",
    functionName: "",
    process: [],
    functionColor: "",
    isuserDef: true,
  });
  const [userDefProcess, setUserDefProcess] = useState({
    parentId: "",
    processName: "",
    processColor: "",
    isuserDef: true,
    processId: "",
  });

  const [userDefFunctions, setUserDefFunctions] = useState<
    {
      functionId: string;
      functionName: string;
      functionColor: string;
      process: {
        processName: string;
        isuserDef: boolean;
        processColor: string;
        processId: string;
        parentId: string;
      }[];
      isuserDef: boolean;
    }[]
  >([
    ...EntityCustomFunctionAndProcesses.filter(
      (f: any) => f.isuserDef === true
    ),
  ]);
  const [userDefProcessArr, setUserDefProcessArr] = useState<
    {
      processName: string;
      processColor: string;
      isuserDef: boolean;
      parentId: string;
      processId: string;
    }[]
  >([...EntityCustomProcesses]);

  const [selectedUserFunction, setSelectedUserFunction] = useState("");
  const [toeditUserFuction, setToEditUserFuction] = useState("");
  const [toeditUserProcess, setToEditUserProcess] = useState("");
  const [iseditingUserFuction, setIsEditingUserFuction] = useState(false);
  const [isEditingUserProcess, setIsEditingUserProcess] = useState(false);
  const [isFormDisabled, setIsFormDisabled] = useState(true);
  const [isSavingFunction, setIsSavingFunction] = useState(false);
  const [isSavingProcess, setIsSavingProcess] = useState(false);

  const [selFunction, setSelFunction] = useState<CustomObj>({
    functionId: "",
    isuserDef: false,
    functionName: "",
    functionColor: "",
    process: [],
  });

  const [selectedFunctionFromHierarchy, setSelectedFunctionFromHierarchy] =
    useState(0);

  const [selectedUserProcess, setSelectedUserProcess] = useState("");

  const ToDeleteLoc = async () => {
    if (selectedUserFunction) {
      await axiosPrivate.post(DELETE_MASTER_FUNCTION, {
        functionId: selectedUserFunction,
      });
      const filteredArr = userDefFunctions.filter(
        (i: any) => i.functionId !== selectedUserFunction
      );
      const filteredArrRedux = EntityCustomFunctionAndProcesses.filter(
        (i: any) => i.functionId !== selectedUserFunction
      );
      dispatch(
        entityFunctionAndProcessesActionCreator.deleteCustomFuncProcess(
          filteredArrRedux
        )
      );
      setUserDefFunctions(filteredArr);
      if (selectedUserFunction === toeditUserFuction) setToEditUserFuction("");
      setSelectedUserFunction("");
    } else return;
  };

  const ToPushToUserArr = async () => {
    if (isSavingFunction || userDefFunction.functionName.trim() === "") return;
    setIsSavingFunction(true);
    if (iseditingUserFuction === true) {
      const { functionId, functionName } = userDefFunction;
      await axiosPrivate.post(ADD_MASTER_FUNCTION, {
        functionId,
        functionName,
      });
      const objIndexToUpdate = userDefFunctions.findIndex(
        (f: any) => f.functionId === selectedUserFunction
      );
      const objIndexToUpdateRedux = EntityCustomFunctionAndProcesses.findIndex(
        (f: any) => f.functionId === selectedUserFunction
      );

      const updatedEntityCustomFunctionAndProcesses = [
        ...EntityCustomFunctionAndProcesses,
      ];
      updatedEntityCustomFunctionAndProcesses[objIndexToUpdateRedux] =
        userDefFunction;

      setUserDefFunctions((prev: any) => {
        const newData = [...prev];
        newData[objIndexToUpdate] = userDefFunction;
        return newData;
      });
      dispatch(
        entityFunctionAndProcessesActionCreator.updateCustomFunc(
          updatedEntityCustomFunctionAndProcesses
        )
      );
      setUserDefFunction({
        functionName: "",
        process: [],
        isuserDef: true,
        functionColor: "",
        functionId: "",
      });
      setIsEditingUserFuction(false);
      setIsSavingFunction(false);
      setSelectedUserFunction("");
    } else {
      if (
        userDefFunctions.filter(
          (f) => f.functionId === userDefFunction.functionId
        ).length > 0
      )
        return;
      const { functionId, functionName } = userDefFunction;
      await axiosPrivate.post(ADD_MASTER_FUNCTION, {
        functionId,
        functionName,
      });
      setUserDefFunctions((prev: any) => [...prev, userDefFunction]);
      dispatch(
        entityFunctionAndProcessesActionCreator.updateCustomFunc([
          ...EntityCustomFunctionAndProcesses,
          userDefFunction,
        ])
      );
      setUserDefFunction({
        functionName: "",
        process: [],
        isuserDef: true,
        functionColor: "",
        functionId: "",
      });
      setIsSavingFunction(false);
      setSelectedUserFunction("");
    }
  };
  const ToPushToUserCustomProcessArr = async () => {
    if (isSavingProcess || userDefProcess.processName.trim() === "") return;
    setIsSavingProcess(true);
    if (isEditingUserProcess === true) {
      const { parentId, processName, processId } = userDefProcess;
      await axiosPrivate.post(ADD_MASTER_PROCESS, {
        processId: processId,
        parentFunctionId: parentId,
        isuserDef: true,
        processName: processName,
      });
      const objIndexToUpdate = userDefProcessArr.findIndex(
        (f: any) => f.processId === selectedUserProcess
      );

      const objIndexToUpdateRedux = EntityCustomProcesses.findIndex(
        (f: any) => f.processId === selectedUserProcess
      );

      const updatedEntityCustomProcesses = [...EntityCustomProcesses];
      updatedEntityCustomProcesses[objIndexToUpdateRedux] = userDefProcess;

      setUserDefProcessArr((prev: any) => {
        const newData = [...prev];
        newData[objIndexToUpdate] = userDefProcess;
        return newData;
      });

      dispatch(
        entityFunctionAndProcessesActionCreator.updateCustomProcess(
          updatedEntityCustomProcesses
        )
      );

      setUserDefProcess({
        processName: "",
        isuserDef: true,
        processColor: "",
        parentId: "",
        processId: "",
      });
      setIsEditingUserProcess(false);
      setIsSavingProcess(false);
      setSelectedUserProcess("");
    } else {
      if (
        userDefProcessArr.filter(
          (f) => f.processId === userDefProcess.processId
        ).length > 0
      )
        return;
      const { parentId, processName, processId } = userDefProcess;
      await axiosPrivate.post(ADD_MASTER_PROCESS, {
        parentFunctionId: parentId,
        processId: processId,
        isuserDef: true,
        processName: processName,
      });
      setUserDefProcessArr((prev: any) => [...prev, userDefProcess]);
      dispatch(
        entityFunctionAndProcessesActionCreator.updateCustomProcess([
          ...EntityCustomProcesses,
          userDefProcess,
        ])
      );
      setUserDefProcess({
        processName: "",
        isuserDef: true,
        processColor: "",
        parentId: "",
        processId: "",
      });
      setIsSavingProcess(false);
      setSelectedUserProcess("");
    }
  };

  const ToDeleteCustomProcess = async () => {
    if (selectedUserProcess) {
      const { parentId } = userDefProcessArr.filter(
        (i: any) => i.processId === selectedUserProcess
      )[0];
      await axiosPrivate.post(DELETE_MASTER_PROCESS, {
        parentFunctionId: parentId,
        processId: selectedUserProcess,
      });
      const filteredArr = userDefProcessArr.filter(
        (i: any) => i.processId !== selectedUserProcess
      );
      dispatch(
        entityFunctionAndProcessesActionCreator.deleteCustomProcess(filteredArr)
      );
      setUserDefProcessArr(filteredArr);
      if (selectedUserProcess === toeditUserProcess) setToEditUserProcess("");
      setUserDefProcess({
        processName: "",
        processColor: "",
        isuserDef: true,
        parentId: "",
        processId: "",
      });
      setSelectedUserProcess("");
    } else return;
  };

  const ToDeleteFunctionFromHierarchy = () => {
    if (selectedFunctionFromHierarchy) {
      const functionIndexInHierarchyArray = data.filter(
        (e: any) => e.functionId !== selectedFunctionFromHierarchy
      );
      const functionProcesses = data.filter(
        (e: any) => e.functionId === selectedFunctionFromHierarchy
      );
      setUserDefProcessArr((prev) => [
        ...prev,
        ...functionProcesses[0].process.filter(
          (f: any) => f.isuserDef === true
        ),
      ]);
      onChange(functionIndexInHierarchyArray);
      setSelectedFunctionFromHierarchy(0);
      setSelFunction({
        isuserDef: false,
        functionName: "",
        process: [],
        functionId: "",
        functionColor: "",
      });
      setIsFormDisabled(true);
    } else return;
  };

  return (
    <Container fluid>
      <Row xl={12}>
        <PageTitle className="my-2">{t("functionandprocess")}</PageTitle>
        <Col xl={6}>
          <Row md={12}>
            <Col md={7} className="my-3">
              <BoxTitle>{t("predefinedfunctions")}</BoxTitle>
              <PreFunctionContainer>
                <PreFunctionListContainer>
                  {preDefFunctions.map((e: any, index: number) => (
                    <Row xs={12} key={index}>
                      <Col xs={10}>
                        <PreFunctionListEntry color={e.functionColor}>
                          {e.functionName}
                        </PreFunctionListEntry>
                      </Col>
                      <Col xs={2}>
                        <HiPlus
                          cursor="pointer"
                          color="#2ECC71"
                          onClick={() => {
                            setSelectedFunctions((prev) => [...prev, e]);
                            const filteredArr = preDefFunctions.filter(
                              (i: any) => i.functionId !== e.functionId
                            );
                            setPreDefFunctions(filteredArr);
                          }}
                        />
                      </Col>
                    </Row>
                  ))}
                </PreFunctionListContainer>
              </PreFunctionContainer>
              <BoxTitle className="margin-top-10 margin-bottom-10 mx-0">
                {t("customizedfunctions")}
              </BoxTitle>
              <InputGroup className="mb-2">
                <Form.Control
                  maxLength={25}
                  placeholder={t("entercustomfunction")}
                  value={userDefFunction.functionName}
                  className="risk-input-style"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      ToPushToUserArr();
                    }
                  }}
                  onChange={(e) => {
                    if (iseditingUserFuction === true) {
                      const existingFunction = userDefFunctions.filter(
                        (g) => g.functionId === selectedUserFunction
                      );
                      setUserDefFunction({
                        functionName: e.target.value,
                        process: [],
                        isuserDef: true,
                        functionColor: theme === "dark" ? "#FFFF00" : "#0000FF",
                        functionId: existingFunction[0].functionId,
                      });
                    } else {
                      const existingFunction = userDefFunctions.filter(
                        (g) => g.functionName === e.target.value
                      );
                      if (existingFunction.length > 0) {
                        setUserDefFunction({
                          functionName: existingFunction[0].functionName,
                          process: [],
                          isuserDef: existingFunction[0].isuserDef,
                          functionColor: existingFunction[0].functionColor,
                          functionId: existingFunction[0].functionId,
                        });
                      } else {
                        setUserDefFunction({
                          functionName: e.target.value,
                          process: [],
                          isuserDef: true,
                          functionColor:
                            theme === "dark" ? "#FFFF00" : "#0000FF",
                          functionId: uuidv4().trim().slice(0, 18),
                        });
                      }
                    }
                  }}
                />
                <Button
                  variant="outline-success"
                  size="sm"
                  disabled={
                    isSavingFunction ||
                    userDefFunction.functionName.trim() === ""
                  }
                  className="filled-btn-style"
                  onClick={ToPushToUserArr}
                >
                  {iseditingUserFuction ? `${t("update")}` : `${t("add")}`}
                </Button>
              </InputGroup>
              <PreFunctionContainer>
                <PreFunctionListContainer>
                  {userDefFunctions.map((e: any, index: number) => (
                    <Row xs={12} key={index}>
                      <Col xs={10}>
                        <PreFunctionListEntry
                          onClick={() => {
                            if (e.functionId !== selectedUserFunction) {
                              setSelectedUserFunction(e.functionId);
                            } else {
                              setSelectedUserFunction("");
                            }
                          }}
                          color={
                            e.functionColor === ""
                              ? e.functionId === selectedUserFunction
                                ? "#000"
                                : ""
                              : e.functionColor
                          }
                          background={
                            e.functionId === selectedUserFunction
                              ? "#B2B2B2"
                              : "var(--bg-color)"
                          }
                        >
                          {e.functionName}
                        </PreFunctionListEntry>
                      </Col>
                      <Col xs={2}>
                        <HiPlus
                          cursor="pointer"
                          color="#2ECC71"
                          onClick={() => {
                            setSelectedFunctions((prev) => [...prev, e]);
                            const filteredArr = userDefFunctions.filter(
                              (i: any) => i.functionId !== e.functionId
                            );
                            setUserDefFunctions(filteredArr);
                          }}
                        />
                      </Col>
                    </Row>
                  ))}
                </PreFunctionListContainer>
                <ButtonContainer>
                  <HiPencil
                    cursor="pointer"
                    onClick={() => {
                      if (selectedUserFunction !== "") {
                        setIsEditingUserFuction(true);
                        setToEditUserFuction(selectedUserFunction);
                        const obj = userDefFunctions.find(
                          (i: any) => i.functionId === selectedUserFunction
                        );
                        setUserDefFunction({
                          functionName: obj?.functionName!,
                          process: [],
                          isuserDef: true,
                          functionColor: obj?.functionColor!,
                          functionId: obj?.functionId!,
                        });
                      } else return;
                    }}
                  />
                  <HiTrash onClick={ToDeleteLoc} cursor="pointer" />
                </ButtonContainer>
              </PreFunctionContainer>
            </Col>
            <Col md={5} className="my-3 function-process-right-divider">
              <BoxTitle>{t("functions")}</BoxTitle>
              <FunctionContainer>
                <FunctionListContainer>
                  {selectedFunctions.map((e: any, index: number) => (
                    <Row xs={12} key={index}>
                      <Col xs={10}>
                        <FunctionListEntry
                          onClick={() => {
                            if (e.functionId === selFunction.functionId) {
                              setSelFunction({
                                functionId: "",
                                isuserDef: false,
                                functionName: "",
                                functionColor: "",
                                process: [],
                              });
                              setIsFormDisabled(true);
                            } else {
                              setSelFunction(e);
                              setIsFormDisabled(false);
                              const functionIndexInHierarchyArray =
                                data.findIndex(
                                  (f: any) => f.functionId === e.functionId
                                );
                              if (functionIndexInHierarchyArray === -1) {
                                onChange([...data]);
                              } else {
                                onChange([...data]);
                                const processesofSelecteFunction =
                                  data[functionIndexInHierarchyArray].process;
                                const functionIndexInSelectedFunctionArray =
                                  selectedFunctions.findIndex(
                                    (f: any) => f.functionId === e.functionId
                                  );

                                const newArr = [...selectedFunctions];
                                const processIds =
                                  processesofSelecteFunction.map(
                                    (l: any) => l.processId
                                  );

                                newArr[functionIndexInSelectedFunctionArray] = {
                                  ...newArr[
                                    functionIndexInSelectedFunctionArray
                                  ],
                                  process: newArr[
                                    functionIndexInSelectedFunctionArray
                                  ].process.filter(
                                    (i) => !processIds.includes(i.processId)
                                  ),
                                };

                                const processIdAlreadyAdded = data
                                  .map((l: any) => l.process)
                                  .flat()
                                  .map((j: any) => j.processId);

                                setUserDefProcessArr((prev) => {
                                  const newArr = [...prev];
                                  const flt = newArr.filter(
                                    (g) =>
                                      !processIdAlreadyAdded.includes(
                                        g.processId
                                      )
                                  );
                                  return flt;
                                });

                                setSelFunction(
                                  newArr[functionIndexInSelectedFunctionArray]
                                );
                              }
                            }
                          }}
                          color={
                            e.functionColor === ""
                              ? e.functionId === selFunction.functionId
                                ? "#000"
                                : ""
                              : e.functionColor
                          }
                          background={
                            e.functionId === selFunction.functionId
                              ? "#B2B2B2"
                              : "var(--bg-color)"
                          }
                        >
                          {e.functionName}
                        </FunctionListEntry>
                      </Col>
                      <Col xs={2}>
                        <HiMinus
                          cursor="pointer"
                          color="red"
                          onClick={() => {
                            setSelFunction({
                              isuserDef: false,
                              functionName: "",
                              process: [],
                              functionColor: "",
                              functionId: "",
                            });
                            setIsFormDisabled(true);
                            if (e.isuserDef === true) {
                              setUserDefFunctions((prev) => [...prev, e]);
                              const filteredArr = selectedFunctions.filter(
                                (i: any) => i.functionId !== e.functionId
                              );
                              setSelectedFunctions(filteredArr);
                            } else {
                              setPreDefFunctions((prev: any) => [...prev, e]);
                              const filteredArr = selectedFunctions.filter(
                                (i: any) => i.functionId !== e.functionId
                              );
                              setSelectedFunctions(filteredArr);
                            }
                          }}
                        />
                      </Col>
                    </Row>
                  ))}
                </FunctionListContainer>
                <ButtonContainer></ButtonContainer>
              </FunctionContainer>
            </Col>
          </Row>
        </Col>
        <Col xl={6}>
          <Row md={12}>
            <Col md={7} className="my-3">
              <BoxTitle>{t("predefinedprocesses")}</BoxTitle>
              <PreFunctionContainer
                cursor={isFormDisabled ? "not-allowed" : "auto"}
                opacity={isFormDisabled ? 0.25 : 1}
              >
                <ProcessListContainer>
                  {selFunction.isuserDef === false &&
                    selFunction.process.map((e, index: number) => (
                      <Row xs={12} key={index}>
                        <Col xs={10}>
                          <ProcessListEntry color={e.processColor}>
                            {e.processName}
                          </ProcessListEntry>
                        </Col>
                        <Col xs={2}>
                          <HiPlus
                            cursor="pointer"
                            color="#2ECC71"
                            onClick={() => {
                              if (isFormDisabled) return;
                              setSelFunction((prev) => {
                                const newArr = {
                                  ...prev,
                                };
                                newArr.process = newArr.process.filter(
                                  (i) => i.processId !== e.processId
                                );
                                return newArr;
                              });
                              const newArr = [...data];
                              const foundIndex = newArr.findIndex(
                                (i) => i.functionId === selFunction.functionId
                              );

                              if (foundIndex === -1) {
                                onChange([
                                  ...data,
                                  {
                                    functionName: selFunction.functionName,
                                    process: [e],
                                    isuserDef: selFunction.isuserDef,
                                    functionId: selFunction.functionId,
                                    functionColor: selFunction.functionColor,
                                  },
                                ]);
                              } else {
                                newArr[foundIndex] = {
                                  ...newArr[foundIndex],
                                  process: [...newArr[foundIndex].process, e],
                                };
                                onChange([...newArr]);
                              }
                            }}
                          />
                        </Col>
                      </Row>
                    ))}
                </ProcessListContainer>
              </PreFunctionContainer>
              <BoxTitle className="margin-top-10 margin-bottom-10 mx-0">
                {t("customizedprocesses")}
              </BoxTitle>
              <StyledInputGroup
                className="mb-2"
                opacity={isFormDisabled ? 0.25 : 1}
                cursor={isFormDisabled ? "not-allowed" : "auto"}
              >
                <Form.Control
                  maxLength={25}
                  placeholder={t("entercustomprocess")}
                  disabled={isFormDisabled || selFunction.functionName === ""}
                  value={userDefProcess.processName}
                  className="risk-input-style"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      ToPushToUserCustomProcessArr();
                    }
                  }}
                  onChange={(e) => {
                    const preDefPros = selFunction.process.map(
                      (e) => e.processName
                    );
                    const existingProcess = userDefProcessArr.filter(
                      (g) => g.processId === selectedUserProcess
                    );
                    if (isEditingUserProcess === true) {
                      setUserDefProcess({
                        processName: e.target.value,
                        isuserDef: existingProcess[0].isuserDef,
                        parentId: existingProcess[0].parentId,
                        processColor: existingProcess[0].processColor,
                        processId: existingProcess[0].processId,
                      });
                    } else {
                      if (preDefPros.includes(e.target.value)) {
                        setUserDefProcess({
                          processName: existingProcess[0].processName,
                          isuserDef: existingProcess[0].isuserDef,
                          parentId: existingProcess[0].parentId,
                          processColor: existingProcess[0].processColor,
                          processId: existingProcess[0].processId,
                        });
                      } else {
                        setUserDefProcess({
                          processName: e.target.value,
                          isuserDef: true,
                          parentId: selFunction.functionId,
                          processColor:
                            theme === "dark" ? "#FFFF00" : "#0000FF",
                          processId: uuidv4().trim().slice(0, 18),
                        });
                      }
                    }
                  }}
                />
                <Button
                  variant="outline-success"
                  size="sm"
                  disabled={
                    isSavingProcess || userDefProcess.processName.trim() === ""
                  }
                  className="filled-btn-style"
                  onClick={ToPushToUserCustomProcessArr}
                >
                  {isEditingUserProcess ? `${t("update")}` : `${t("add")}`}
                </Button>
              </StyledInputGroup>
              <PreFunctionContainer
                cursor={isFormDisabled ? "not-allowed" : "auto"}
                opacity={isFormDisabled ? 0.25 : 1}
              >
                <ProcessListContainer>
                  {userDefProcessArr
                    .filter((s) => s.parentId === selFunction.functionId)
                    .map((e: any, index: number) => (
                      <Row xs={12} key={index}>
                        <Col xs={10}>
                          <ProcessListEntry
                            onClick={() => {
                              if (isFormDisabled) return;
                              if (e.processId !== selectedUserProcess) {
                                setSelectedUserProcess(e.processId);
                              } else {
                                setSelectedUserProcess("");
                              }
                            }}
                            background={
                              e.processId === selectedUserProcess
                                ? "#B2B2B2"
                                : "var(--bg-color)"
                            }
                            color={
                              e.processColor === ""
                                ? e.processId === selectedUserProcess
                                  ? "#000"
                                  : ""
                                : e.processColor
                            }
                          >
                            {e.processName}
                          </ProcessListEntry>
                        </Col>
                        <Col xs={2}>
                          <HiPlus
                            cursor="pointer"
                            color="#2ECC71"
                            onClick={() => {
                              if (isFormDisabled) return;
                              const newArr = [...data];
                              const foundIndex = newArr.findIndex(
                                (i) => i.functionId === selFunction.functionId
                              );
                              if (foundIndex === -1) {
                                onChange([
                                  ...data,
                                  {
                                    functionName: selFunction.functionName,
                                    process: [e],
                                    isuserDef: selFunction.isuserDef,
                                    functionId: selFunction.functionId,
                                    functionColor: selFunction.functionColor,
                                  },
                                ]);
                              } else {
                                newArr[foundIndex] = {
                                  ...newArr[foundIndex],
                                  process: [...newArr[foundIndex].process, e],
                                };
                                onChange([...newArr]);
                              }
                              const filteredArr = userDefProcessArr.filter(
                                (i: any) => i.processId !== e.processId
                              );
                              setUserDefProcessArr(filteredArr);
                            }}
                          />
                        </Col>
                      </Row>
                    ))}
                </ProcessListContainer>
                <ButtonContainer>
                  <HiPencil
                    cursor="pointer"
                    onClick={() => {
                      if (selectedUserProcess !== "") {
                        setIsEditingUserProcess(true);
                        setToEditUserProcess(selectedUserProcess);
                        const obj = userDefProcessArr.find(
                          (i) => i.processId === selectedUserProcess
                        );
                        setUserDefProcess({
                          processName: obj?.processName!,
                          isuserDef: true,
                          processColor: obj?.processColor!,
                          parentId: obj?.parentId!,
                          processId: obj?.processId!,
                        });
                      } else return;
                    }}
                  />
                  <HiTrash onClick={ToDeleteCustomProcess} cursor="pointer" />
                </ButtonContainer>
              </PreFunctionContainer>
            </Col>
            <Col md={5} className="my-3">
              <BoxTitle>{t("fphierarchy")}</BoxTitle>
              <FunctionContainer>
                <FunctionListContainer>
                  {data.map((e: any, index: number) => (
                    <Row xs={12} key={index}>
                      <Col xs={12}>
                        <FunctionListEntry
                          key={index}
                          onClick={() => {
                            if (
                              e.functionId === selectedFunctionFromHierarchy
                            ) {
                              setSelectedFunctionFromHierarchy(0);
                            } else {
                              setSelectedFunctionFromHierarchy(e.functionId);
                            }
                          }}
                          background={
                            e.functionId === selectedFunctionFromHierarchy
                              ? "#B2B2B2"
                              : "var(--bg-color)"
                          }
                          color={
                            e.functionColor === ""
                              ? e.functionId === selectedFunctionFromHierarchy
                                ? "#000"
                                : ""
                              : e.functionColor
                          }
                          className="mr-3"
                        >
                          {e.functionName}
                        </FunctionListEntry>
                        {e.process.map((g: any, i: number) => (
                          <Row key={i}>
                            <Col xs={10}>
                              <FunctionListEntrySub color={g.processColor}>
                                &nbsp;&nbsp;-
                                {g.processName}
                              </FunctionListEntrySub>
                            </Col>
                            <Col xs={2}>
                              <HiMinus
                                cursor="pointer"
                                color="red"
                                onClick={() => {
                                  if (g.isuserDef === true) {
                                    setUserDefProcessArr((prev) => [
                                      ...prev,
                                      g,
                                    ]);

                                    const newArr = [...data];
                                    newArr[index] = {
                                      ...newArr[index],
                                      process: newArr[index].process.filter(
                                        (l: any) => l.processId !== g.processId
                                      ),
                                    };

                                    onChange([
                                      ...newArr.filter(
                                        (e) => e.process.length !== 0
                                      ),
                                    ]);
                                  } else {
                                    setSelFunction((prev) => {
                                      const newArr = {
                                        ...prev,
                                      };
                                      if (newArr.functionId === e.functionId) {
                                        newArr.process = [...newArr.process, g];
                                        return newArr;
                                      }
                                      return newArr;
                                    });
                                    const newArr = [...data];
                                    newArr[index] = {
                                      ...newArr[index],
                                      process: newArr[index].process.filter(
                                        (l: any) =>
                                          l.processName !== g.processName
                                      ),
                                    };
                                    // newArr[index].process =

                                    onChange([
                                      ...newArr.filter(
                                        (e) => e.process.length !== 0
                                      ),
                                    ]);
                                  }
                                }}
                              />
                            </Col>
                          </Row>
                        ))}
                      </Col>
                    </Row>
                  ))}
                </FunctionListContainer>
                <ButtonContainer>
                  <HiTrash
                    onClick={ToDeleteFunctionFromHierarchy}
                    cursor="pointer"
                  />
                </ButtonContainer>
              </FunctionContainer>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default FunctionandProcess;
