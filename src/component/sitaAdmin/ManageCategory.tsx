import React, { useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { HiPencil, HiTrash } from "react-icons/hi2";
import Modal from "../../component/Modal";
import { AdminAssetActionCreator } from "../../store/Admin/AdminAssetSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../..";
import { RootState } from "../../configureStore";
import { useHistory } from "react-router-dom";
import {
  FunctionListEntrySub,
  PreFunctionListEntry,
  PreFunctionListContainer,
  FunctionListEntry,
  BoxTitle,
  PageContainer,
  MainContent,
  FunctionContainer2,
  ButtonContainer,
  FunctionListContainer,
  PreFunctionContainerSmall,
  ButtonContainer2,
} from "./SitaAdminStyles";
import { CatProps, SubCatProps } from "./SitaAdminTypes";
import { useTranslation } from "react-i18next";

const ManageCategory = () => {
  const { t } = useTranslation();
  const categoryDefArr = useSelector(
    (state: RootState) => state.AdminAsset.categoryData
  );

  const [preDefCategory, setPreDefCategory] = useState<CatProps>({
    categoryId: null,
    categoryName: "",
    subcat: [
      {
        subcatId: null,
        subcatName: "",
      },
    ],
  });

  const history = useHistory();
  const [selectedCatId, setSelectedCatId] = useState<number | null>(null);
  const [selectedSubCatId, setSelectedSubCatId] = useState<number | null>(null);
  const [isEditingCategory, setIsisEditingCategory] = useState(false);
  const [isEditingAsset, setIsisEditingAsset] = useState(false);
  const [query, setQuery] = useState("");
  const [subQuery, setSubQuery] = useState("");
  const [isShowDeleteCategoryModal, setIsShowDeleteCategoryModal] =
    useState(false);
  const [isShowDeleteSubCatModal, setIsShowDeleteSubCatModal] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const onDeleteCategoryHide = () => {
    setIsShowDeleteCategoryModal(false);
  };
  const onDeleteSubCatHide = () => {
    setIsShowDeleteSubCatModal(false);
  };

  const [assetObj, setAssetObj] = useState<SubCatProps>({
    subcatId: null,
    subcatName: "",
  });

  const alreadyinCatList = categoryDefArr.some((value) => {
    return (
      value.categoryName.toLowerCase().replace(/\s/g, "") ===
      query.toLowerCase().replace(/\s/g, "")
    );
  });

  const objIndex = categoryDefArr.findIndex(
    (f: any) => f.categoryId === selectedCatId
  );
  const alreadyinSubCatList = categoryDefArr[objIndex]?.subcat?.some(
    (value) => {
      return (
        value.subcatName.toLowerCase().replace(/\s/g, "") ===
        subQuery.toLowerCase().replace(/\s/g, "")
      );
    }
  );

  const filterCategory = () => {
    const filterArr = categoryDefArr.filter((e) => {
      return e.categoryName
        .toLowerCase()
        .replaceAll(/\s/g, "")
        .includes(query.toLowerCase().replaceAll(/\s/g, ""));
    });
    return filterArr.length > 0 ? filterArr : categoryDefArr;
  };
  const filteredCategoryData = filterCategory();

  const filterSubCat = () => {
    const objIndex = categoryDefArr.findIndex(
      (f: any) => f.categoryId === selectedCatId
    );
    const filterArr = categoryDefArr[objIndex]?.subcat?.filter((e) => {
      return e.subcatName
        .toLowerCase()
        .replaceAll(/\s/g, "")
        .includes(subQuery.toLowerCase().replaceAll(/\s/g, ""));
    });
    return filterArr?.length > 0 ? filterArr : categoryDefArr[objIndex]?.subcat;
  };
  const filterSubCatData = filterSubCat();

  const pushtocatArr = () => {
    if (preDefCategory.categoryName === "" || alreadyinCatList) return;
    if (selectedCatId) {
      const catIndexToUpdate = categoryDefArr.findIndex(
        (f: any) => f.categoryId === selectedCatId
      );
      const newArr = [...categoryDefArr];
      newArr[catIndexToUpdate] = preDefCategory;

      dispatch(
        AdminAssetActionCreator.addPredefinedCategory({
          categoryName: preDefCategory.categoryName,
          categoryId: preDefCategory.categoryId,
        })
      );
      dispatch(AdminAssetActionCreator.updatePredefinedCategory(newArr));
      setPreDefCategory({
        categoryName: "",
        subcat: [],
        categoryId: null,
      });
      setIsisEditingCategory(false);
      setSelectedCatId(null);
      setQuery("");
    } else {
      dispatch(
        AdminAssetActionCreator.addPredefinedCategory({
          categoryName: preDefCategory.categoryName,
          categoryId: preDefCategory.categoryId,
        })
      );
      dispatch(
        AdminAssetActionCreator.updatePredefinedCategory([
          ...categoryDefArr,
          preDefCategory,
        ])
      );
      setPreDefCategory({
        categoryId: null,
        categoryName: "",
        subcat: [
          {
            subcatId: null,
            subcatName: "",
          },
        ],
      });
      setSelectedCatId(null);
      setQuery("");
    }
  };

  const pushtoAssetCatArr = () => {
    if (!selectedCatId || assetObj.subcatName === "" || alreadyinSubCatList)
      return;
    if (selectedSubCatId) {
      const assetIndexToUpdate = categoryDefArr.findIndex(
        (f: any) => f.categoryId === selectedCatId
      );

      const assetIndex = categoryDefArr[assetIndexToUpdate].subcat.findIndex(
        (f: any) => f.subcatId === selectedSubCatId
      );

      const newArr = [...categoryDefArr];
      newArr[assetIndexToUpdate] = {
        ...newArr[assetIndexToUpdate],
        subcat: [
          ...newArr[assetIndexToUpdate].subcat.slice(0, assetIndex),
          { ...assetObj },
          ...newArr[assetIndexToUpdate].subcat.slice(assetIndex + 1),
        ],
      };

      dispatch(
        AdminAssetActionCreator.addPredefinedSubCategory({
          subcatName: assetObj.subcatName,
          categoryId: selectedCatId,
          subcatId: assetObj.subcatId,
        })
      );
      dispatch(AdminAssetActionCreator.updatePredefinedCategory(newArr));
      setAssetObj({
        subcatId: null,
        subcatName: "",
      });

      setIsisEditingAsset(false);
      setSelectedSubCatId(null);
      setSubQuery("");
    } else {
      const objIndexToUpdate = categoryDefArr.findIndex(
        (f: any) => f.categoryId === selectedCatId
      );

      const newArr = [...categoryDefArr];
      newArr[objIndexToUpdate] = {
        ...newArr[objIndexToUpdate],
        subcat: [...newArr[objIndexToUpdate].subcat, assetObj],
      };

      dispatch(
        AdminAssetActionCreator.addPredefinedSubCategory({
          subcatName: assetObj.subcatName,
          categoryId: selectedCatId,
          subcatId: assetObj.subcatId,
        })
      );
      dispatch(AdminAssetActionCreator.updatePredefinedCategory(newArr));
      setAssetObj({
        subcatId: null,
        subcatName: "",
      });
      setSelectedSubCatId(null);
      setSubQuery("");
    }
  };

  const ToDeleteCategory = () => {
    if (selectedCatId) {
      const filteredArr = categoryDefArr.filter(
        (i: any) => i.categoryId !== selectedCatId
      );
      dispatch(
        AdminAssetActionCreator.removePredefinedCategory({
          categoryId: selectedCatId,
        })
      );
      dispatch(AdminAssetActionCreator.deleteCategory(filteredArr));
    } else return;
  };

  const ToDeleteSubCat = () => {
    if (selectedSubCatId) {
      const objIndexToUpdate = categoryDefArr.findIndex(
        (f: any) => f.categoryId === selectedCatId
      );
      const filteredArr = categoryDefArr[objIndexToUpdate].subcat.filter(
        (i: any) => i.subcatId !== selectedSubCatId
      );

      const newArr = [...categoryDefArr];
      newArr[objIndexToUpdate] = {
        ...newArr[objIndexToUpdate],
        subcat: [...filteredArr],
      };
      dispatch(
        AdminAssetActionCreator.removePredefinedSubCategory({
          subcatId: selectedSubCatId,
        })
      );
      dispatch(AdminAssetActionCreator.deleteCategory(newArr));
    } else return;
  };

  const isDeleteCategoryBody = (
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
            // className="border"
            onClick={() => {
              ToDeleteCategory();
              setIsShowDeleteCategoryModal(false);
            }}
          >
            {t("yes")}
          </Button>
        </Col>
        <Col>
          <Button
            variant="outline-success submit-btn-style"
            // className="border"
            onClick={onDeleteCategoryHide}
          >
            {t("no")}
          </Button>
        </Col>
      </Row>
    </>
  );

  const isDeleteSubCatBody = (
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
              ToDeleteSubCat();
              setIsShowDeleteSubCatModal(false);
            }}
          >
            {t("yes")}
          </Button>
        </Col>
        <Col>
          <Button
            variant="outline-success submit-btn-style"
            onClick={onDeleteSubCatHide}
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
                  <BoxTitle>{t("assetcategory")}</BoxTitle>
                  <InputGroup className="mb-2">
                    <Form.Control
                      maxLength={25}
                      placeholder={t("entercategoryname")}
                      value={preDefCategory.categoryName}
                      className="risk-input-style"
                      onChange={(e) => {
                        setQuery(e.target.value);

                        const objIndexToUpdate = categoryDefArr.findIndex(
                          (f: any) => f.categoryId === selectedCatId
                        );
                        !isEditingCategory && setSelectedCatId(null);
                        setPreDefCategory({
                          categoryName: e.target.value.trimStart(),
                          subcat: !isEditingCategory
                            ? []
                            : categoryDefArr[objIndexToUpdate].subcat,
                          categoryId: !isEditingCategory ? null : selectedCatId,
                        });
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          pushtocatArr();
                        }
                      }}
                    />
                    <Button
                      variant="outline-success"
                      size="sm"
                      disabled={
                        preDefCategory.categoryName === "" || alreadyinCatList
                      }
                      className="filled-btn-style"
                      onClick={pushtocatArr}
                    >
                      {isEditingCategory ? `${t("update")}` : `${t("add")}`}
                    </Button>
                  </InputGroup>
                  <PreFunctionContainerSmall>
                    <PreFunctionListContainer>
                      {filteredCategoryData.map(
                        (
                          e: {
                            categoryId: React.SetStateAction<number | null>;
                            categoryName:
                              | boolean
                              | React.ReactChild
                              | React.ReactFragment
                              | React.ReactPortal
                              | null
                              | undefined;
                          },
                          index: number
                        ) => (
                          <Row xs={12} key={index}>
                            <Col
                              xs={12}
                              onClick={() => {
                                if (selectedCatId === e.categoryId) {
                                  setSelectedCatId(null);
                                  setSelectedSubCatId(null);
                                  setIsisEditingCategory(false);
                                  setIsisEditingAsset(false);
                                  setQuery("");
                                  setSubQuery("");
                                  setPreDefCategory({
                                    categoryName: "",
                                    subcat: [],
                                    categoryId: null,
                                  });
                                  setAssetObj({
                                    subcatId: null,
                                    subcatName: "",
                                  });
                                } else {
                                  setSelectedCatId(e.categoryId);
                                  setSelectedSubCatId(null);
                                  setIsisEditingCategory(false);
                                  setIsisEditingAsset(false);
                                  setPreDefCategory({
                                    categoryName: "",
                                    subcat: [],
                                    categoryId: null,
                                  });
                                  setAssetObj({
                                    subcatId: null,
                                    subcatName: "",
                                  });
                                }
                              }}
                            >
                              <PreFunctionListEntry
                                background={
                                  e.categoryId === selectedCatId
                                    ? "#B2B2B2"
                                    : "var(--bg-color)"
                                }
                                color={
                                  e.categoryId === selectedCatId
                                    ? "#000"
                                    : "var(--font-color)"
                                }
                              >
                                {e.categoryName}
                              </PreFunctionListEntry>
                            </Col>
                          </Row>
                        )
                      )}
                    </PreFunctionListContainer>
                    <ButtonContainer2>
                      <HiPencil
                        onClick={() => {
                          if (selectedCatId) {
                            setIsisEditingCategory(true);
                            const obj = categoryDefArr.find(
                              (i: any) => i.categoryId === selectedCatId
                            );
                            setPreDefCategory({
                              categoryName: obj?.categoryName!,
                              subcat: obj?.subcat!,
                              categoryId: obj?.categoryId!,
                            });
                          } else return;
                        }}
                        cursor="pointer"
                      />
                      <HiTrash
                        onClick={() => {
                          if (selectedCatId) {
                            setIsShowDeleteCategoryModal(true);
                          } else return;
                        }}
                        cursor="pointer"
                      />
                    </ButtonContainer2>
                  </PreFunctionContainerSmall>
                  <BoxTitle>{t("assetsubcategory")}</BoxTitle>
                  <InputGroup className="mb-2">
                    <Form.Control
                      maxLength={25}
                      placeholder={t("entersubcategoryname")}
                      value={assetObj.subcatName}
                      className="risk-input-style"
                      disabled={!selectedCatId}
                      onChange={(e) => {
                        setSubQuery(e.target.value);

                        !isEditingAsset && setSelectedSubCatId(null);
                        setAssetObj({
                          subcatId: !isEditingAsset ? null : selectedSubCatId,
                          subcatName: e.target.value.trimStart(),
                        });
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          pushtoAssetCatArr();
                        }
                      }}
                    />
                    <Button
                      variant="outline-success"
                      size="sm"
                      disabled={
                        !selectedCatId ||
                        assetObj.subcatName === "" ||
                        alreadyinSubCatList
                      }
                      className="filled-btn-style"
                      onClick={pushtoAssetCatArr}
                    >
                      {isEditingAsset ? `${t("update")}` : `${t("add")}`}
                    </Button>
                  </InputGroup>
                  <PreFunctionContainerSmall>
                    <PreFunctionListContainer>
                      {filterSubCatData?.map((e: any, index: number) => (
                        <Row xs={12} key={index}>
                          <Col
                            xs={12}
                            onClick={() => {
                              if (selectedSubCatId === e.subcatId) {
                                setSelectedSubCatId(null);
                                setIsisEditingAsset(false);
                                setSubQuery("");
                                setAssetObj({
                                  subcatId: null,
                                  subcatName: "",
                                });
                              } else {
                                setSelectedSubCatId(e.subcatId);
                                setIsisEditingAsset(false);
                                setAssetObj({
                                  subcatId: null,
                                  subcatName: "",
                                });
                              }
                            }}
                          >
                            <PreFunctionListEntry
                              background={
                                e.subcatId === selectedSubCatId
                                  ? "#B2B2B2"
                                  : "var(--bg-color)"
                              }
                              color={
                                e.subcatId === selectedSubCatId
                                  ? "#000"
                                  : "var(--font-color)"
                              }
                            >
                              {e.subcatName}
                            </PreFunctionListEntry>
                          </Col>
                        </Row>
                      ))}
                    </PreFunctionListContainer>
                    <ButtonContainer2>
                      <HiPencil
                        onClick={() => {
                          if (selectedSubCatId) {
                            setIsisEditingAsset(true);
                            const obj = categoryDefArr
                              .find((i: any) => i.categoryId === selectedCatId)
                              ?.subcat?.find(
                                (i: any) => i.subcatId === selectedSubCatId
                              );
                            setAssetObj(obj!);
                          } else return;
                        }}
                        cursor="pointer"
                      />
                      <HiTrash
                        onClick={() => {
                          if (selectedSubCatId) {
                            setIsShowDeleteSubCatModal(true);
                          } else return;
                        }}
                        cursor="pointer"
                      />
                    </ButtonContainer2>
                  </PreFunctionContainerSmall>
                </Col>
                <Col md={5} className="my-3">
                  <BoxTitle>{t("acsbc")}</BoxTitle>
                  <FunctionContainer2>
                    <FunctionListContainer>
                      {categoryDefArr.map((e: any, index: number) => (
                        <Row xs={12} key={index}>
                          <Col xs={12}>
                            <FunctionListEntry
                              key={index}
                              className="font-color mr-2"
                            >
                              {e.categoryName}
                            </FunctionListEntry>
                            {e.subcat.map((g: any, i: number) => (
                              <Row key={i}>
                                <Col xs={10}>
                                  <FunctionListEntrySub>
                                    &nbsp;&nbsp;-
                                    {g.subcatName}
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
          <Row lg={6}>
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
        modalBody={isDeleteCategoryBody}
        modalTitle=""
        show={isShowDeleteCategoryModal}
        onHide={onDeleteCategoryHide}
      />
      <Modal
        modalBody={isDeleteSubCatBody}
        modalTitle=""
        show={isShowDeleteSubCatModal}
        onHide={onDeleteSubCatHide}
      />
    </PageContainer>
  );
};

export default ManageCategory;
