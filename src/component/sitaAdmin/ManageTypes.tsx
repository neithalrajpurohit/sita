import React, { useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { HiPencil, HiTrash } from "react-icons/hi2";
import Modal from "../../component/Modal";
import { useSelector } from "react-redux";
import { RootState } from "../../configureStore";
import { AdminAssetActionCreator } from "../../store/Admin/AdminAssetSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../..";
import { useHistory } from "react-router-dom";
import {
  PageContainer,
  MainContent,
  ButtonContainer,
  ButtonContainer2,
  PreFunctionContainerSmall2,
  PreFunctionListContainer,
  PreFunctionListEntry,
  BoxTitle,
  FunctionContainer3,
  FunctionListContainer,
  FunctionListEntrySub,
  FunctionListEntry,
} from "./SitaAdminStyles";
import { SubTypeProps, TagspProps, TypeProps } from "./SitaAdminTypes";
import { useTranslation } from "react-i18next";

const ManageTypes = () => {
  const { t } = useTranslation();
  const typeDefArr = useSelector(
    (state: RootState) => state.AdminAsset.typeData
  );
  const tagDefArr = useSelector(
    (state: RootState) => state.AdminAsset.tagsData
  );

  const history = useHistory();
  const [preDefType, setPreDefType] = useState<TypeProps>({
    typeId: null,
    typeName: "",
    subtype: [
      {
        subtypeId: null,
        subtypeName: "",
      },
    ],
  });

  const [preDefTag, setPreDefTag] = useState<TagspProps>({
    tagsId: null,
    tagsName: "",
  });

  const [selectedTypeId, setSelectedTypeId] = useState<number | null>(null);
  const [selectedSubTypeId, setSelectedSubTypeId] = useState<number | null>(
    null
  );
  const [selectedTagId, setSelectedTagId] = useState<number | null>(null);
  const [isEditingType, setIsisEditingType] = useState(false);
  const [isEditingSubType, setIsEditingSubType] = useState(false);
  const [isEditingTag, setIsisEditingTag] = useState(false);
  const [isShowDeleteTypeModal, setIsShowDeleteTypeModal] = useState(false);
  const [query, setQuery] = useState("");
  const [subQuery, setSubQuery] = useState("");
  const [tagQuery, setTagQuery] = useState("");

  const [isShowDeleteSubTypeModal, setIsShowDeleteSubTypeModal] =
    useState(false);
  const [isShowDeleteTagModal, setIsShowDeleteTagModal] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const onDeleteTypeHide = () => {
    setIsShowDeleteTypeModal(false);
  };
  const onDeleteSubTypeHide = () => {
    setIsShowDeleteSubTypeModal(false);
  };
  const onDeleteTagHide = () => {
    setIsShowDeleteTagModal(false);
  };

  const [subtypeObj, setSubTypeObj] = useState<SubTypeProps>({
    subtypeId: null,
    subtypeName: "",
  });

  const alreadyinTypeList = typeDefArr.some((value) => {
    return (
      value.typeName.toLowerCase().replace(/\s/g, "") ===
      query.toLowerCase().replace(/\s/g, "")
    );
  });

  const objIndex = typeDefArr.findIndex(
    (f: any) => f.typeId === selectedTypeId
  );
  const alreadyinSubTypeList = typeDefArr[objIndex]?.subtype?.some((value) => {
    return (
      value.subtypeName.toLowerCase().replace(/\s/g, "") ===
      subQuery.toLowerCase().replace(/\s/g, "")
    );
  });

  const alreadyinTagList = tagDefArr.some((value) => {
    return (
      value.tagsName.toLowerCase().replace(/\s/g, "") ===
      tagQuery.toLowerCase().replace(/\s/g, "")
    );
  });

  const filterType = () => {
    const filterArr = typeDefArr.filter((e) => {
      return e.typeName
        .toLowerCase()
        .replaceAll(/\s/g, "")
        .includes(query.toLowerCase().replaceAll(/\s/g, ""));
    });
    return filterArr.length > 0 ? filterArr : typeDefArr;
  };
  const filteredTypeData = filterType();

  const filterSubType = () => {
    const objIndex = typeDefArr.findIndex(
      (f: any) => f.typeId === selectedTypeId
    );
    const filterArr = typeDefArr[objIndex]?.subtype?.filter((e) => {
      return e.subtypeName
        .toLowerCase()
        .replaceAll(/\s/g, "")
        .includes(subQuery.toLowerCase().replaceAll(/\s/g, ""));
    });
    return filterArr?.length > 0 ? filterArr : typeDefArr[objIndex]?.subtype;
  };
  const filterSubTypeData = filterSubType();

  const filterTags = () => {
    const filterArr = tagDefArr.filter((e) => {
      return e.tagsName
        .toLowerCase()
        .replaceAll(/\s/g, "")
        .includes(tagQuery.toLowerCase().replaceAll(/\s/g, ""));
    });
    return filterArr.length > 0 ? filterArr : tagDefArr;
  };
  const filteredTagsData = filterTags();

  const pushtotypeArr = () => {
    if (selectedTypeId) {
      const catIndexToUpdate = typeDefArr.findIndex(
        (f: any) => f.typeId === selectedTypeId
      );

      const newArr = [...typeDefArr];
      newArr[catIndexToUpdate] = preDefType;

      dispatch(
        AdminAssetActionCreator.addPredefinedType({
          typeName: preDefType.typeName,
          typeId: preDefType.typeId,
        })
      );

      dispatch(AdminAssetActionCreator.updatePredefinedType(newArr));
      setPreDefType({
        typeId: null,
        typeName: "",
        subtype: [
          {
            subtypeId: null,
            subtypeName: "",
          },
        ],
      });
      setIsisEditingType(false);
      setSelectedTypeId(null);
      setQuery("");
    } else {
      dispatch(
        AdminAssetActionCreator.addPredefinedType({
          typeName: preDefType.typeName,
          typeId: preDefType.typeId,
        })
      );
      dispatch(
        AdminAssetActionCreator.updatePredefinedType([
          ...typeDefArr,
          preDefType,
        ])
      );

      setPreDefType({
        typeId: null,
        typeName: "",
        subtype: [
          {
            subtypeId: null,
            subtypeName: "",
          },
        ],
      });
      setSelectedTypeId(null);
      setQuery("");
    }
  };

  const pushtoSubTypeArr = () => {
    if (subtypeObj.subtypeName === "" || alreadyinSubTypeList) return;
    if (selectedSubTypeId) {
      const assetIndexToUpdate = typeDefArr.findIndex(
        (f: any) => f.typeId === selectedTypeId
      );

      const assetIndex = typeDefArr[assetIndexToUpdate].subtype.findIndex(
        (f: any) => f.subtypeId === selectedSubTypeId
      );

      const newArr = [...typeDefArr];
      newArr[assetIndexToUpdate] = {
        ...newArr[assetIndexToUpdate],
        subtype: [
          ...newArr[assetIndexToUpdate].subtype.slice(0, assetIndex),
          { ...subtypeObj },
          ...newArr[assetIndexToUpdate].subtype.slice(assetIndex + 1),
        ],
      };

      dispatch(
        AdminAssetActionCreator.addPredefinedSubType({
          subtypeName: subtypeObj.subtypeName,
          typeId: selectedTypeId,
          subtypeId: subtypeObj.subtypeId,
        })
      );
      dispatch(AdminAssetActionCreator.updatePredefinedType(newArr));

      setSubTypeObj({
        subtypeId: null,
        subtypeName: "",
      });

      setIsEditingSubType(false);
      setSelectedSubTypeId(null);
      setSubQuery("");
    } else {
      const objIndexToUpdate = typeDefArr.findIndex(
        (f: any) => f.typeId === selectedTypeId
      );

      const newData = [...typeDefArr];
      newData[objIndexToUpdate] = {
        ...newData[objIndexToUpdate],
        subtype: [...newData[objIndexToUpdate].subtype, subtypeObj],
      };

      dispatch(
        AdminAssetActionCreator.addPredefinedSubType({
          subtypeName: subtypeObj.subtypeName,
          typeId: selectedTypeId,
          subtypeId: subtypeObj.subtypeId,
        })
      );
      dispatch(AdminAssetActionCreator.updatePredefinedType(newData));

      setSubTypeObj({
        subtypeId: null,
        subtypeName: "",
      });
      setSelectedSubTypeId(null);
      setSubQuery("");
    }
  };

  const pushtoTagArr = () => {
    if (preDefTag.tagsName === "" || alreadyinTagList) return;
    if (selectedTagId) {
      const tagIndexToUpdate = tagDefArr.findIndex(
        (f: any) => f.tagsId === selectedTagId
      );

      const newData = [...tagDefArr];
      newData[tagIndexToUpdate] = preDefTag;

      dispatch(
        AdminAssetActionCreator.addPredefinedTags({
          tagsId: preDefTag.tagsId,
          tagsName: preDefTag.tagsName,
        })
      );
      dispatch(AdminAssetActionCreator.updatePredefinedTags(newData));

      setPreDefTag({
        tagsId: null,
        tagsName: "",
      });
      setIsisEditingTag(false);
      setSelectedTagId(null);
      setTagQuery("");
    } else {
      dispatch(
        AdminAssetActionCreator.addPredefinedTags({
          tagsId: preDefTag.tagsId,
          tagsName: preDefTag.tagsName,
        })
      );
      dispatch(
        AdminAssetActionCreator.updatePredefinedTags([...tagDefArr, preDefTag])
      );

      setPreDefTag({
        tagsId: null,
        tagsName: "",
      });
      setSelectedTagId(null);
      setTagQuery("");
    }
  };

  const ToDeleteType = () => {
    if (selectedTypeId) {
      const filteredArr = typeDefArr.filter(
        (i: any) => i.typeId !== selectedTypeId
      );

      dispatch(
        AdminAssetActionCreator.removePredefinedType({
          typeId: selectedTypeId,
        })
      );
      dispatch(AdminAssetActionCreator.deleteType(filteredArr));
    } else return;
  };
  const ToDeleteSubType = () => {
    if (selectedSubTypeId) {
      const objIndexToUpdate = typeDefArr.findIndex(
        (f: any) => f.typeId === selectedTypeId
      );
      const filteredArr = typeDefArr[objIndexToUpdate].subtype.filter(
        (i: any) => i.subtypeId !== selectedSubTypeId
      );

      const newData = [...typeDefArr];
      newData[objIndexToUpdate] = {
        ...newData[objIndexToUpdate],
        subtype: [...filteredArr],
      };

      dispatch(
        AdminAssetActionCreator.removePredefinedSubType({
          subtypeId: selectedSubTypeId,
        })
      );
      dispatch(AdminAssetActionCreator.deleteType(newData));
    } else return;
  };
  const ToDeleteTag = () => {
    if (selectedTagId) {
      const filteredArr = tagDefArr.filter(
        (i: any) => i.tagsId !== selectedTagId
      );
      dispatch(
        AdminAssetActionCreator.removePredefinedTags({
          tagsId: selectedTagId,
        })
      );
      dispatch(AdminAssetActionCreator.deleteTags(filteredArr));
    } else return;
  };

  const isDeleteTypeBody = (
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
            variant="outline-danger submit-btn-style"
            onClick={() => {
              ToDeleteType();
              setIsShowDeleteTypeModal(false);
            }}
          >
            {t("yes")}
          </Button>
        </Col>
        <Col>
          <Button
            variant="outline-success submit-btn-style"
            onClick={onDeleteTypeHide}
          >
            {t("no")}
          </Button>
        </Col>
      </Row>
    </>
  );

  const isDeleteSubTypeBody = (
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
            variant="outline-danger submit-btn-style"
            onClick={() => {
              ToDeleteSubType();
              setIsShowDeleteSubTypeModal(false);
            }}
          >
            {t("yes")}
          </Button>
        </Col>
        <Col>
          <Button
            variant="outline-success submit-btn-style"
            onClick={onDeleteSubTypeHide}
          >
            {t("no")}
          </Button>
        </Col>
      </Row>
    </>
  );

  const isDeleteTagBody = (
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
            variant="outline-danger submit-btn-style"
            onClick={() => {
              ToDeleteTag();
              setIsShowDeleteTagModal(false);
            }}
          >
            {t("yes")}
          </Button>
        </Col>
        <Col>
          <Button
            variant="outline-success submit-btn-style"
            onClick={onDeleteTagHide}
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
                  <BoxTitle>{t("assettype")}</BoxTitle>

                  <PreFunctionContainerSmall2>
                    <PreFunctionListContainer>
                      {filteredTypeData.map((e: any, index: number) => (
                        <Row xs={12} key={index}>
                          <Col
                            xs={12}
                            onClick={() => {
                              if (selectedTypeId === e.typeId) {
                                setSelectedTypeId(null);
                                setIsisEditingType(false);
                                setIsEditingSubType(false);
                                setQuery("");
                                setSubQuery("");
                                setPreDefType({
                                  typeId: null,
                                  typeName: "",
                                  subtype: [
                                    {
                                      subtypeId: null,
                                      subtypeName: "",
                                    },
                                  ],
                                });

                                setSubTypeObj({
                                  subtypeId: null,
                                  subtypeName: "",
                                });
                              } else {
                                setSelectedTypeId(e.typeId);
                                setIsisEditingType(false);
                                setIsEditingSubType(false);
                                setPreDefType({
                                  typeId: null,
                                  typeName: "",
                                  subtype: [
                                    {
                                      subtypeId: null,
                                      subtypeName: "",
                                    },
                                  ],
                                });

                                setSubTypeObj({
                                  subtypeId: null,
                                  subtypeName: "",
                                });
                              }
                            }}
                          >
                            <PreFunctionListEntry
                              background={
                                e.typeId === selectedTypeId
                                  ? "#B2B2B2"
                                  : "var(--bg-color)"
                              }
                              color={
                                e.typeId === selectedTypeId
                                  ? "#000"
                                  : "var(--font-color)"
                              }
                            >
                              {e.typeName}
                            </PreFunctionListEntry>
                          </Col>
                        </Row>
                      ))}
                    </PreFunctionListContainer>
                  </PreFunctionContainerSmall2>
                  <BoxTitle>{t("assetsubtype")}</BoxTitle>
                  <InputGroup className="mb-2">
                    <Form.Control
                      maxLength={60}
                      placeholder={t("entersubtypename")}
                      value={subtypeObj.subtypeName}
                      disabled={!selectedTypeId}
                      className="risk-input-style"
                      onChange={(e) => {
                        setSubQuery(e.target.value);
                        !isEditingSubType && setSelectedSubTypeId(null);

                        setSubTypeObj({
                          subtypeId: !isEditingSubType
                            ? null
                            : selectedSubTypeId,
                          subtypeName: e.target.value.trimStart(),
                        });
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          pushtoSubTypeArr();
                        }
                      }}
                    />
                    <Button
                      variant="outline-success"
                      size="sm"
                      disabled={
                        subtypeObj.subtypeName === "" || alreadyinSubTypeList
                      }
                      className="filled-btn-style"
                      onClick={pushtoSubTypeArr}
                    >
                      {isEditingSubType ? `${t("update")}` : `${t("add")}`}
                    </Button>
                  </InputGroup>
                  <PreFunctionContainerSmall2>
                    <PreFunctionListContainer>
                      {filterSubTypeData?.map((e: any, index: number) => (
                        <Row xs={12} key={index}>
                          <Col
                            xs={12}
                            onClick={() => {
                              if (selectedSubTypeId === e.subtypeId) {
                                setSelectedSubTypeId(null);
                                setSubQuery("");
                              } else {
                                setSelectedSubTypeId(e.subtypeId);
                              }
                            }}
                          >
                            <PreFunctionListEntry
                              background={
                                e.subtypeId === selectedSubTypeId
                                  ? "#B2B2B2"
                                  : "var(--bg-color)"
                              }
                              color={
                                e.subtypeId === selectedSubTypeId
                                  ? "#000"
                                  : "var(--font-color)"
                              }
                            >
                              {e.subtypeName}
                            </PreFunctionListEntry>
                          </Col>
                        </Row>
                      ))}
                    </PreFunctionListContainer>
                    <ButtonContainer2>
                      <HiPencil
                        onClick={() => {
                          if (selectedSubTypeId) {
                            setIsEditingSubType(true);
                            const obj = typeDefArr
                              .find((i: any) => i.typeId === selectedTypeId)
                              ?.subtype?.find(
                                (i: any) => i.subtypeId === selectedSubTypeId
                              );
                            setSubTypeObj(obj!);
                          } else return;
                        }}
                        cursor="pointer"
                      />
                      <HiTrash
                        onClick={() => {
                          if (selectedSubTypeId) {
                            setIsShowDeleteSubTypeModal(true);
                          } else return;
                        }}
                        cursor="pointer"
                      />
                    </ButtonContainer2>
                  </PreFunctionContainerSmall2>
                  <BoxTitle>{t("assettags")}</BoxTitle>
                  <InputGroup className="mb-2">
                    <Form.Control
                      maxLength={25}
                      placeholder={t("entertagname")}
                      value={preDefTag.tagsName}
                      className="risk-input-style"
                      onChange={(e) => {
                        setTagQuery(e.target.value);
                        !isEditingTag && setSelectedTagId(null);
                        setPreDefTag({
                          tagsId: !isEditingTag ? null : selectedTagId,
                          tagsName: e.target.value.trimStart(),
                        });
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          pushtoTagArr();
                        }
                      }}
                    />
                    <Button
                      variant="outline-success"
                      size="sm"
                      disabled={preDefTag.tagsName === "" || alreadyinTagList}
                      className="filled-btn-style"
                      onClick={pushtoTagArr}
                    >
                      {isEditingTag ? `${t("update")}` : `${t("add")}`}
                    </Button>
                  </InputGroup>
                </Col>
                <Col md={5} className="my-3">
                  <BoxTitle>{t("atstc")}</BoxTitle>
                  <FunctionContainer3>
                    <FunctionListContainer>
                      {typeDefArr.map((e: any, index: number) => (
                        <Row xs={12} key={index}>
                          <Col xs={12}>
                            <FunctionListEntry
                              key={index}
                              className="font-color mr-2"
                            >
                              {e.typeName}
                            </FunctionListEntry>
                            {e.subtype.map((g: any, i: number) => (
                              <Row key={i}>
                                <Col xs={10}>
                                  <FunctionListEntrySub>
                                    &nbsp;&nbsp;-
                                    {g.subtypeName}
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
                  </FunctionContainer3>
                  <BoxTitle>{t("predefinedassettags")}</BoxTitle>
                  <PreFunctionContainerSmall2>
                    <PreFunctionListContainer>
                      {filteredTagsData.map((e, index: number) => (
                        <Row xs={12} key={index}>
                          <Col
                            xs={12}
                            onClick={() => {
                              if (selectedTagId === e.tagsId) {
                                setSelectedTagId(null);
                                setIsisEditingTag(false);
                                setTagQuery("");
                                setPreDefTag({
                                  tagsId: null,
                                  tagsName: "",
                                });
                              } else {
                                setSelectedTagId(e.tagsId);
                                setIsisEditingTag(false);
                                setPreDefTag({
                                  tagsId: null,
                                  tagsName: "",
                                });
                              }
                            }}
                          >
                            <PreFunctionListEntry
                              background={
                                e.tagsId === selectedTagId
                                  ? "#B2B2B2"
                                  : "var(--bg-color)"
                              }
                              color={
                                e.tagsId === selectedTagId
                                  ? "#000"
                                  : "var(--font-color)"
                              }
                            >
                              {e.tagsName}
                            </PreFunctionListEntry>
                          </Col>
                        </Row>
                      ))}
                    </PreFunctionListContainer>
                    <ButtonContainer2>
                      <HiPencil
                        onClick={() => {
                          if (selectedTagId) {
                            setIsisEditingTag(true);
                            const obj = tagDefArr.find(
                              (i: any) => i.tagsId === selectedTagId
                            );

                            setPreDefTag({
                              tagsId: obj?.tagsId!,
                              tagsName: obj?.tagsName!,
                            });
                          } else return;
                        }}
                        cursor="pointer"
                      />
                      <HiTrash
                        onClick={() => {
                          if (selectedTagId) {
                            setIsShowDeleteTagModal(true);
                          } else return;
                        }}
                        cursor="pointer"
                      />
                    </ButtonContainer2>
                  </PreFunctionContainerSmall2>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row lg={6} className="mt-3">
            <Col lg={6}>
              <div className="d-flex justify-content-between align-items-center">
                <h6>{t("addtmftopublish")}</h6>
                <Button
                  variant="outline-success"
                  size="sm"
                  className="filled-btn-style"
                  onClick={() => history.push("/TmfFactor")}
                >
                  {t("addtmfbtntext")}
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </MainContent>
      <Modal
        modalBody={isDeleteTypeBody}
        modalTitle=""
        show={isShowDeleteTypeModal}
        onHide={onDeleteTypeHide}
      />

      <Modal
        modalBody={isDeleteSubTypeBody}
        modalTitle=""
        show={isShowDeleteSubTypeModal}
        onHide={onDeleteSubTypeHide}
      />

      <Modal
        modalBody={isDeleteTagBody}
        modalTitle=""
        show={isShowDeleteTagModal}
        onHide={onDeleteTagHide}
      />
    </PageContainer>
  );
};

export default ManageTypes;
