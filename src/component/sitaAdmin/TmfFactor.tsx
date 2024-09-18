import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { HiPencil, HiTrash } from "react-icons/hi2";
import { CurrentObjToPushProps } from "./SitaAdminTypes";
import { RootState } from "../../configureStore";
import { useSelector } from "react-redux";
import { AppDispatch } from "../../index";
import { useDispatch } from "react-redux";
import { AdminAssetActionCreator } from "../../store/Admin/AdminAssetSlice";
import { toast } from "react-toastify";
import {
  TableContainer,
  StyledTable,
  ButtonContainer1,
  PageMiddleTitle,
  ProcessContainer,
  ProcessListEntry,
  ProcessListContainer,
  FunctionListContainer1,
} from "./SitaAdminStyles";
import { useTranslation } from "react-i18next";
import { EntityAssetsTableRow } from "../GlobalComponentStyles";

const TmfFactor = () => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const submitBtnRef = useRef<any>();
  const assestCategory = useSelector(
    (state: RootState) => state.AdminAsset.categoryData
  );
  const assetType = useSelector(
    (state: RootState) => state.AdminAsset.typeData
  );
  const tmfInput = useSelector((state: RootState) => state.AdminAsset.tmfInput);
  const allData = useSelector(
    (state: RootState) => state.AdminAsset.tmfDataArr
  );

  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const [currentObjToPush, setCurrentObjToPush] =
    useState<CurrentObjToPushProps>({
      id: null,
      category: {
        categoryId: null,
        categoryName: "",
        subcategory: {
          subcategoryId: null,
          subcategoryName: "",
        },
      },
      type: {
        typeId: null,
        typeName: "",
        subtype: {
          subtypeId: null,
          subtypeName: "",
        },
      },
      tmfFactor: [
        ...tmfInput.map((l) => {
          return { ...l, value: 1 };
        }),
      ],
    });

  const onSubmit = () => {
    if (
      currentObjToPush.category.categoryId === null ||
      currentObjToPush.category.subcategory.subcategoryId === null ||
      currentObjToPush.type.typeId === null ||
      currentObjToPush.type.subtype.subtypeId === null ||
      isLoading === true
    )
      return;
    setIsLoading(true);
    dispatch(AdminAssetActionCreator.addUpdatetmfFactor(currentObjToPush)).then(
      (res) => {
        toast.success(res.payload.Message, {
          position: "top-center",
          autoClose: 4000,
        });
        setCurrentObjToPush({
          id: null,
          category: {
            categoryId: null,
            categoryName: "",
            subcategory: {
              subcategoryId: null,
              subcategoryName: "",
            },
          },
          type: {
            typeId: null,
            typeName: "",
            subtype: {
              subtypeId: null,
              subtypeName: "",
            },
          },
          tmfFactor: [
            ...tmfInput.map((l) => {
              return { ...l, value: 1 };
            }),
          ],
        });
        setSelectedRow(null);
        setIsEditing(false);
        setIsLoading(false);
      }
    );
  };
  const DeleteSelectedRow = () => {
    if (selectedRow === null) return;
    setIsLoading(true);
    dispatch(AdminAssetActionCreator.deleteTmfFactor({ id: selectedRow })).then(
      (res) => {
        toast.success(res.payload.Message, {
          position: "top-center",
          autoClose: 4000,
        });
        setCurrentObjToPush({
          id: null,
          category: {
            categoryId: null,
            categoryName: "",
            subcategory: {
              subcategoryId: null,
              subcategoryName: "",
            },
          },
          type: {
            typeId: null,
            typeName: "",
            subtype: {
              subtypeId: null,
              subtypeName: "",
            },
          },
          tmfFactor: [
            ...tmfInput.map((l) => {
              return { ...l, value: 1 };
            }),
          ],
        });
        setSelectedRow(null);
        setIsEditing(false);
        setIsLoading(false);
      }
    );
  };
  useEffect(() => {
    if (window) {
      window.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
          submitBtnRef.current.click();
        }
      });
    }
  }, []);

  return (
    <Container fluid>
      <Row lg={12}>
        <Col lg={3}>
          <PageMiddleTitle>{t("assetcategory")}</PageMiddleTitle>
          <ProcessContainer>
            <ProcessListContainer>
              <Row xs={12}>
                {assestCategory.map((e, index: number) => (
                  <Col
                    xs={10}
                    key={index}
                    onClick={() => {
                      if (
                        currentObjToPush.category.categoryId === e.categoryId
                      ) {
                        setCurrentObjToPush((prev) => {
                          return {
                            ...prev,
                            category: {
                              categoryId: null,
                              categoryName: "",
                              subcategory: {
                                subcategoryId: null,
                                subcategoryName: "",
                              },
                            },
                          };
                        });
                      } else {
                        setCurrentObjToPush((prev) => {
                          return {
                            ...prev,
                            category: {
                              categoryId: e.categoryId,
                              categoryName: e.categoryName,
                              subcategory: {
                                subcategoryId: null,
                                subcategoryName: "",
                              },
                            },
                          };
                        });
                      }
                    }}
                  >
                    <ProcessListEntry
                      background={
                        e.categoryId === currentObjToPush.category.categoryId
                          ? "#B2B2B2"
                          : "var(--bg-color)"
                      }
                      color={
                        e.categoryId === currentObjToPush.category.categoryId
                          ? "black"
                          : "var(--font-color)"
                      }
                    >
                      {e.categoryName}
                    </ProcessListEntry>
                  </Col>
                ))}
              </Row>
            </ProcessListContainer>
          </ProcessContainer>
          <PageMiddleTitle>{t("assetsubcategory")}</PageMiddleTitle>
          <ProcessContainer>
            <ProcessListContainer>
              <Row xs={12}>
                {assestCategory
                  .find(
                    (e) => e.categoryId === currentObjToPush.category.categoryId
                  )
                  ?.subcat.map((e, index: number) => (
                    <Col
                      xs={10}
                      key={index}
                      onClick={() => {
                        if (
                          currentObjToPush.category.subcategory
                            .subcategoryId === e.subcatId
                        ) {
                          setCurrentObjToPush((prev) => {
                            return {
                              ...prev,
                              category: {
                                ...prev.category,
                                subcategory: {
                                  subcategoryId: null,
                                  subcategoryName: "",
                                },
                              },
                              type: {
                                typeId: null,
                                typeName: "",
                                subtype: {
                                  subtypeId: null,
                                  subtypeName: "",
                                },
                              },
                            };
                          });
                        } else {
                          setCurrentObjToPush((prev) => {
                            return {
                              ...prev,
                              category: {
                                ...prev.category,
                                subcategory: {
                                  subcategoryId: e.subcatId,
                                  subcategoryName: e.subcatName,
                                },
                              },
                              type: {
                                typeId: null,
                                typeName: "",
                                subtype: {
                                  subtypeId: null,
                                  subtypeName: "",
                                },
                              },
                            };
                          });
                        }
                      }}
                    >
                      <ProcessListEntry
                        background={
                          currentObjToPush.category.subcategory
                            .subcategoryId === e.subcatId
                            ? "#B2B2B2"
                            : "var(--bg-color)"
                        }
                        color={
                          currentObjToPush.category.subcategory
                            .subcategoryId === e.subcatId
                            ? "black"
                            : "var(--font-color)"
                        }
                      >
                        {e.subcatName}
                      </ProcessListEntry>
                    </Col>
                  ))}
              </Row>
            </ProcessListContainer>
          </ProcessContainer>
          <PageMiddleTitle>{t("assettype")}</PageMiddleTitle>
          <ProcessContainer>
            <ProcessListContainer>
              <Row xs={12}>
                {assetType.map((e, index: number) => (
                  <Col
                    xs={10}
                    key={index}
                    onClick={() => {
                      if (currentObjToPush.type.typeId === e.typeId) {
                        setCurrentObjToPush((prev) => {
                          return {
                            ...prev,
                            type: {
                              typeId: null,
                              typeName: "",
                              subtype: {
                                subtypeId: null,
                                subtypeName: "",
                              },
                            },
                          };
                        });
                      } else {
                        setCurrentObjToPush((prev) => {
                          return {
                            ...prev,
                            type: {
                              typeId: e.typeId,
                              typeName: e.typeName,
                              subtype: {
                                subtypeId: null,
                                subtypeName: "",
                              },
                            },
                          };
                        });
                      }
                    }}
                  >
                    <ProcessListEntry
                      background={
                        e.typeId === currentObjToPush.type.typeId
                          ? "#B2B2B2"
                          : "var(--bg-color)"
                      }
                      color={
                        e.typeId === currentObjToPush.type.typeId
                          ? "black"
                          : "var(--font-color)"
                      }
                    >
                      {e.typeName}
                    </ProcessListEntry>
                  </Col>
                ))}
              </Row>
            </ProcessListContainer>
          </ProcessContainer>
          <PageMiddleTitle>{t("assetsubtype")}</PageMiddleTitle>
          <ProcessContainer>
            <ProcessListContainer>
              <Row xs={12}>
                {assetType
                  .find((e) => e.typeId === currentObjToPush.type.typeId)
                  ?.subtype.map((e, index: number) => (
                    <Col
                      xs={10}
                      key={index}
                      onClick={() => {
                        if (
                          currentObjToPush.type.subtype.subtypeId ===
                          e.subtypeId
                        ) {
                          setCurrentObjToPush((prev) => {
                            return {
                              ...prev,
                              type: {
                                ...prev.type,
                                subtype: {
                                  subtypeId: null,
                                  subtypeName: "",
                                },
                              },
                            };
                          });
                        } else {
                          setCurrentObjToPush((prev) => {
                            return {
                              ...prev,
                              type: {
                                ...prev.type,
                                subtype: {
                                  subtypeId: e.subtypeId,
                                  subtypeName: e.subtypeName,
                                },
                              },
                            };
                          });
                        }
                      }}
                    >
                      <ProcessListEntry
                        background={
                          currentObjToPush.type.subtype.subtypeId ===
                          e.subtypeId
                            ? "#B2B2B2"
                            : "var(--bg-color)"
                        }
                        color={
                          currentObjToPush.type.subtype.subtypeId ===
                          e.subtypeId
                            ? "black"
                            : "var(--font-color)"
                        }
                      >
                        {e.subtypeName}
                      </ProcessListEntry>
                    </Col>
                  ))}
              </Row>
            </ProcessListContainer>
          </ProcessContainer>
        </Col>
        <Col lg={5}>
          {tmfInput.map((e) => {
            const val =
              currentObjToPush.tmfFactor.find((f) => f.key === e.key)?.value ??
              "";

            return (
              <Row className="my-4" key={e.key}>
                <Col className="p-0">
                  <ProcessListEntry>{e.key}</ProcessListEntry>
                </Col>
                <Col className="p-0">
                  <ProcessListEntry>{e.keyName}</ProcessListEntry>
                </Col>
                <Col className="p-0">
                  <ProcessListEntry>{e.operationalOn}</ProcessListEntry>
                </Col>
                <Col className="p-0">
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <Form.Control
                      placeholder="0 to 1"
                      value={val}
                      onChange={(l) => {
                        const { value } = l.target;
                        // const regex = /^(0(\.\d)?|1(\.0)?)$/;
                        const regex = /^(0(\.\d{0,2})?|1(\.0{0,2})?)$/;

                        if (regex.test(value)) {
                          setCurrentObjToPush((prev) => {
                            const newArr = {
                              ...prev,
                            };

                            if (
                              newArr.tmfFactor.map((c) => c.key).includes(e.key)
                            ) {
                              const indexOfExisting =
                                newArr.tmfFactor.findIndex(
                                  (k) => k.key === e.key
                                );

                              newArr.tmfFactor = [
                                ...newArr.tmfFactor.slice(0, indexOfExisting),
                                {
                                  ...e,
                                  value: Number(Number(value).toFixed(2)),
                                },
                                ...newArr.tmfFactor.slice(indexOfExisting + 1),
                              ];
                            } else {
                              newArr.tmfFactor = [
                                ...newArr.tmfFactor,
                                {
                                  ...e,
                                  value: Number(Number(value).toFixed(2)),
                                },
                              ];
                            }
                            return newArr;
                          });
                        } else return;
                      }}
                      min={0}
                      max={1}
                      step={0.01}
                      type="number"
                    />
                  </Form>
                </Col>
              </Row>
            );
          })}
          <ButtonContainer1>
            <Button
              ref={submitBtnRef}
              onClick={onSubmit}
              disabled={
                currentObjToPush.category.categoryId === null ||
                currentObjToPush.category.subcategory.subcategoryId === null ||
                currentObjToPush.type.typeId === null ||
                currentObjToPush.type.subtype.subtypeId === null ||
                isLoading === true
              }
              variant="outline-success"
              size="sm"
              className="filled-btn-style-tmf mt-2"
            >
              {isEditing ? `${t("update")}` : `${t("add")}`}
            </Button>
          </ButtonContainer1>
        </Col>
        <Col lg={4}>
          <PageMiddleTitle>{t("itf")}</PageMiddleTitle>
          <TableContainer>
            <FunctionListContainer1>
              <StyledTable>
                <thead>
                  <tr>
                    <th>{t("category").toUpperCase()}</th>
                    <th>{t("subcategory").toUpperCase()}</th>
                    <th>{t("type").toUpperCase()}</th>
                    <th>{t("subtype").toUpperCase()}</th>
                    <th>{t("tmffactor").toUpperCase()}</th>
                  </tr>
                </thead>
                <tbody>
                  {allData.map((e) => (
                    <EntityAssetsTableRow
                      key={e.id}
                      onClick={() => {
                        if (selectedRow === e.id) {
                          setCurrentObjToPush({
                            id: null,
                            category: {
                              categoryId: null,
                              categoryName: "",
                              subcategory: {
                                subcategoryId: null,
                                subcategoryName: "",
                              },
                            },
                            type: {
                              typeId: null,
                              typeName: "",
                              subtype: {
                                subtypeId: null,
                                subtypeName: "",
                              },
                            },
                            tmfFactor: [
                              ...tmfInput.map((l) => {
                                return {
                                  ...l,
                                  value: 1,
                                };
                              }),
                            ],
                          });
                          setSelectedRow(null);
                          setIsEditing(false);
                        } else {
                          setSelectedRow(e.id);
                        }
                      }}
                      background={
                        e.id === selectedRow ? "#B2B2B2" : "var(--bg-color)"
                      }
                      color={
                        e.id === selectedRow ? "black" : "var(--font-color)"
                      }
                    >
                      <td>{e.category.categoryName}</td>
                      <td>{e.category.subcategory.subcategoryName}</td>
                      <td>{e.type.typeName}</td>
                      <td>{e.type.subtype.subtypeName}</td>
                      <td>
                        {JSON.stringify(
                          e.tmfFactor
                            .map((l) => ({
                              [l.key]: l.value,
                            }))
                            .flat()
                        )}
                      </td>
                    </EntityAssetsTableRow>
                  ))}
                </tbody>
              </StyledTable>
            </FunctionListContainer1>

            <ButtonContainer1>
              <HiPencil
                cursor="pointer"
                onClick={() => {
                  if (selectedRow !== null) {
                    setIsEditing(true);
                    const objonEditIndex = allData.find(
                      (d) => d.id === selectedRow
                    );
                    if (objonEditIndex !== undefined) {
                      setCurrentObjToPush(objonEditIndex);
                    }
                  } else return;
                }}
              />
              <HiTrash onClick={DeleteSelectedRow} cursor="pointer" />
            </ButtonContainer1>
          </TableContainer>
        </Col>
      </Row>
    </Container>
  );
};

export default TmfFactor;
