import { useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { CSVLink } from "react-csv";
import {
  HiOutlineMagnifyingGlass,
  HiOutlineXMark,
  HiPencil,
  HiTrash,
} from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { AppDispatch } from "../../index";
import { RootState } from "../../configureStore";
import { entityAssetsActionCreator } from "../../store/Entity/EntityAssetSlice";
import { axiosPrivate } from "../../helpers/ApiClient";
import { EndPoints } from "../../helpers/ApiEndPoints";
import { theme } from "../../pages/GlobalStyles";
import {
  PageTitle,
  StyledTable,
  CustomSelectStyles,
  EntityAssetsTableRow,
} from "../GlobalComponentStyles";
import {
  PageMiddleTitle,
  PageTagline,
  BrandContainer,
  ImageContianer,
  FunctionContainer,
  FunctionListContainer,
  FunctionListEntry,
  FunctionListEntrySub,
  ProcessContainer,
  ProcessListContainer,
  ProcessListEntry,
  ButtonContainer2,
  StyledSearchContainer,
  StyledSearchInput,
  TableContainer,
  ButtonContainer,
  SampleCSVData,
} from "./EntityStyles";
import { FormData, CurrentSelectedType, OptionsArr } from "./EntityTypes";
import { useTranslation } from "react-i18next";
import { entityASVActionCreator } from "../../store/Entity/EntityAssetSummaryValidationSlice";

const EntityAssets = (props: FormData) => {
  const { t } = useTranslation();
  const { data, onChange } = props;
  const EntityData = useSelector(
    (state: RootState) => state.EntityCreation.entityCreation
  );
  const assestCategory = useSelector(
    (state: RootState) => state.EntityAsset.assetCategory
  );

  const assestCompanyFunction = useSelector(
    (state: RootState) => state.EntityAsset.companyFunction
  );
  const assestLocation = useSelector(
    (state: RootState) => state.EntityAsset.companyLocation
  );
  const assestTags = useSelector((state: RootState) => state.EntityAsset.tags);

  const assetRejectedData = useSelector(
    (state: RootState) => state.EntityAsset.rejectedData
  );

  const dispatch: AppDispatch = useDispatch();
  const { DELETE_ASSET } = EndPoints;

  const [currentObjToPush, setCurrentObjToPush] = useState<CurrentSelectedType>(
    {
      assetId: null,
      assetName: "",
      functionData: {
        functionId: "",
        functionName: "",
        processes: [],
      },
      location: {
        locationId: 0,
        locationName: "",
      },
      category: {
        categoryId: 0,
        categoryName: "",
        subcategory: {
          subcategoryId: 0,
          subcategoryName: "",
        },
      },
      type: {
        typeId: 0,
        typeName: "",
        subtype: {
          subtypeId: 0,
          subtypeName: "",
        },
      },
      tags: [],
      is_internal: true,
    }
  );

  const [rowIndexSelected, setRowIndexSelected] = useState<
    number | undefined
  >();
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any>();

  const PushtoTable = () => {
    dispatch(entityAssetsActionCreator.updateEntityAssets([currentObjToPush]))
      .then(() => {
        setCurrentObjToPush({
          assetId: null,
          assetName: "",
          functionData: {
            functionId: "",
            functionName: "",
            processes: [],
          },
          location: {
            locationId: 0,
            locationName: "",
          },
          category: {
            categoryId: 0,
            categoryName: "",
            subcategory: {
              subcategoryId: 0,
              subcategoryName: "",
            },
          },
          type: {
            typeId: 0,
            typeName: "",
            subtype: {
              subtypeId: 0,
              subtypeName: "",
            },
          },
          tags: [],
          is_internal: true,
        });
        setIsEditing(false);
        setRowIndexSelected(undefined);
      })
      .then(() => {
        dispatch(entityASVActionCreator.fetchAssetSummaryValidationData());
      });
  };

  const DeleteSelectedRow = async () => {
    if (rowIndexSelected !== undefined) {
      const deleteAsset = await axiosPrivate.post(DELETE_ASSET, {
        assetId: rowIndexSelected,
      });
      if (deleteAsset.data.status === 201) {
        const newArr = [...data].filter(
          (e, index) => e.assetId !== rowIndexSelected
        );
        onChange([...newArr]);
        dispatch(entityASVActionCreator.fetchAssetSummaryValidationData());
        setCurrentObjToPush({
          assetId: null,
          assetName: "",
          functionData: {
            functionId: "",
            functionName: "",
            processes: [],
          },
          location: {
            locationId: 0,
            locationName: "",
          },
          category: {
            categoryId: 0,
            categoryName: "",
            subcategory: {
              subcategoryId: 0,
              subcategoryName: "",
            },
          },
          type: {
            typeId: 0,
            typeName: "",
            subtype: {
              subtypeId: 0,
              subtypeName: "",
            },
          },
          tags: [],
          is_internal: true,
        });
        setIsEditing(false);
        setRowIndexSelected(undefined);
      } else return;
    } else return;
  };

  const TagOptions: OptionsArr[] = assestTags.map((e) => ({
    value: e.tagsId,
    label: e.tagsName,
  }));

  const changeHandler = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  // Handle search query change
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Filter the data based on the search query
  const filteredData = data.filter((item: any) =>
    // Customize the logic based on your table data structure
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <Container fluid>
      <Row xl={12}>
        <Col xl={3} className="my-2">
          <Row md={12}>
            <Col md={12}>
              <PageTitle>{t("assets")}</PageTitle>
              <PageTagline>{t("rev2")}</PageTagline>
            </Col>
            <Col md={12} className="my-1">
              <BrandContainer>
                <ImageContianer>
                  <img src={EntityData.companyLogo} alt="" />
                </ImageContianer>
                <PageTitle>{EntityData.companyName}</PageTitle>
              </BrandContainer>
              <PageMiddleTitle>{t("assethierarchy")}</PageMiddleTitle>
            </Col>
            <Col md={12} className="my-1">
              <PageMiddleTitle>{t("fphierarchy")}</PageMiddleTitle>
              <FunctionContainer>
                <FunctionListContainer>
                  <Row xs={12}>
                    {assestCompanyFunction.map((e, index: number) => (
                      <Col xs={12} key={index} className="my-2">
                        <FunctionListEntry
                          key={index}
                          onClick={() => {
                            if (
                              currentObjToPush.functionData.functionId ===
                              e.functionId
                            ) {
                              setCurrentObjToPush((prev) => {
                                return {
                                  ...prev,
                                  functionData: {
                                    functionId: "",
                                    functionName: "",
                                    processes: [],
                                  },
                                  assetId: null,
                                };
                              });
                            } else {
                              setCurrentObjToPush((prev) => {
                                return {
                                  ...prev,
                                  functionData: {
                                    functionId: e.functionId,
                                    functionName: e.functionName,
                                    processes: [],
                                  },
                                  assetId: null,
                                };
                              });
                            }
                          }}
                          background={
                            e.functionId ===
                            currentObjToPush.functionData.functionId
                              ? "#B2B2B2"
                              : "var(--bg-color)"
                          }
                          color={e.functionColor}
                        >
                          {e.functionName}
                        </FunctionListEntry>
                        {e.process.map((g, i: number) => (
                          <FunctionListEntrySub
                            key={i}
                            color={g.processColor}
                            cursor="pointer"
                            background={
                              currentObjToPush.functionData.processes
                                .map((l) => l.processId)
                                .includes(g.processId)
                                ? "#B2B2B2"
                                : "var(--bg-color)"
                            }
                            onClick={() => {
                              if (
                                currentObjToPush.functionData.functionId === ""
                              )
                                return;
                              const includedProcess =
                                currentObjToPush.functionData.processes.map(
                                  (l) => l.processId
                                );
                              if (
                                currentObjToPush.functionData.functionId ===
                                e.functionId
                              ) {
                                if (includedProcess.includes(g.processId)) {
                                  setCurrentObjToPush((prev) => {
                                    return {
                                      ...prev,
                                      functionData: {
                                        ...prev.functionData,
                                        processes: [
                                          ...prev.functionData.processes.filter(
                                            (o) => o.processId !== g.processId
                                          ),
                                        ],
                                      },
                                    };
                                  });
                                } else {
                                  setCurrentObjToPush((prev) => {
                                    return {
                                      ...prev,
                                      functionData: {
                                        ...prev.functionData,
                                        processes: [
                                          ...prev.functionData.processes,
                                          g,
                                        ],
                                      },
                                    };
                                  });
                                }
                              } else return;
                            }}
                          >
                            &nbsp;&nbsp;-
                            {g.processName}
                          </FunctionListEntrySub>
                        ))}
                      </Col>
                    ))}
                  </Row>
                </FunctionListContainer>
              </FunctionContainer>
            </Col>
            <Col md={12}>
              <PageMiddleTitle>
                {EntityData.companyName} {t("location")}
              </PageMiddleTitle>
              <FunctionContainer>
                <FunctionListContainer>
                  <Row xs={12}>
                    {assestLocation.map((e, index: number) => (
                      <Col
                        xs={10}
                        key={index}
                        onClick={() => {
                          setCurrentObjToPush((prev) => {
                            const newObj = {
                              ...prev,
                            };
                            if (newObj.location.locationId === e.locationId) {
                              return {
                                ...prev,
                                location: {
                                  locationId: 0,
                                  locationName: "",
                                },
                              };
                            } else {
                              return {
                                ...prev,
                                location: {
                                  locationId: e.locationId,
                                  locationName: e.locationName,
                                },
                              };
                            }
                          });
                        }}
                      >
                        <FunctionListEntry
                          background={
                            currentObjToPush.location.locationId ===
                            e.locationId
                              ? "#B2B2B2"
                              : "var(--bg-color)"
                          }
                          color={
                            currentObjToPush.location.locationId ===
                            e.locationId
                              ? "black"
                              : "var(--font-color)"
                          }
                        >
                          {e.locationName}
                        </FunctionListEntry>
                      </Col>
                    ))}
                  </Row>
                </FunctionListContainer>
              </FunctionContainer>
            </Col>
          </Row>
        </Col>
        <Col xl={3} className="mt-2">
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
                              categoryId: 0,
                              categoryName: "",
                              subcategory: {
                                subcategoryId: 0,
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
                                subcategoryId: 0,
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
                                  subcategoryId: 0,
                                  subcategoryName: "",
                                },
                              },
                              type: {
                                typeId: 0,
                                typeName: "",
                                subtype: {
                                  subtypeId: 0,
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
                                typeId: 0,
                                typeName: "",
                                subtype: {
                                  subtypeId: 0,
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
                {assestCategory
                  .find(
                    (e) => e.categoryId === currentObjToPush.category.categoryId
                  )
                  ?.subcat.find(
                    (f) =>
                      f.subcatId ===
                      currentObjToPush.category.subcategory.subcategoryId
                  )
                  ?.typeData.map((e, index: number) => (
                    <Col
                      xs={10}
                      key={index}
                      onClick={() => {
                        if (currentObjToPush.type.typeId === e.typeId) {
                          setCurrentObjToPush((prev) => {
                            return {
                              ...prev,
                              type: {
                                typeId: 0,
                                typeName: "",
                                subtype: {
                                  subtypeId: 0,
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
                                  subtypeId: 0,
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
                {assestCategory
                  .find(
                    (e) => e.categoryId === currentObjToPush.category.categoryId
                  )
                  ?.subcat.find(
                    (f) =>
                      f.subcatId ===
                      currentObjToPush.category.subcategory.subcategoryId
                  )
                  ?.typeData.find(
                    (g) => g.typeId === currentObjToPush.type.typeId
                  )
                  ?.subType.map((e, index: number) => (
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
                                  subtypeId: 0,
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
        <Col xl={6} className="my-2">
          <Row md={12}>
            <Col md={12}>
              <ButtonContainer2>
                <PageTagline>{t("skipmanual")}</PageTagline>
                <CSVLink data={SampleCSVData} filename={"Sample_CSV"}>
                  <PageTagline>{t("csvtemp")}</PageTagline>
                </CSVLink>
                {assetRejectedData.length > 0 && (
                  <CSVLink data={assetRejectedData} filename={"RejectedData"}>
                    <PageTagline className="text-danger">
                      Rejected Data
                    </PageTagline>
                  </CSVLink>
                )}
              </ButtonContainer2>
            </Col>
            <Col md={12}>
              {/* <InputGroup> */}
              <div className="d-flex">
                <Form.Label
                  className="entity-assets-upload-csv"
                  htmlFor="profile_photo"
                >
                  {t("choosefile")}
                </Form.Label>
                <Form.Label className="entity-assets-upload-csv-form-label">
                  {t("nofilechosen")}
                </Form.Label>

                <Form.Control
                  id="profile_photo"
                  disabled={true}
                  hidden={true}
                  name="profile_photo"
                  onChange={changeHandler}
                  className="risk-input-style"
                  placeholder={t("nofile")}
                  type="file"
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                />
                <Button
                  variant="outline-success "
                  disabled={!selectedFile}
                  size="sm"
                  className="filled-btn-style-upload"
                  onClick={() => {
                    dispatch(
                      entityAssetsActionCreator.uploadEntityAssets(selectedFile)
                    );
                  }}
                >
                  {t("upload")}
                </Button>
              </div>
              {/* </InputGroup> */}
            </Col>

            <Col md={12}>
              <Row>
                <Col md={6}>
                  <PageMiddleTitle>{t("assetname")}</PageMiddleTitle>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      className="risk-input-style"
                      placeholder={t("assetname")}
                      maxLength={30}
                      value={currentObjToPush.assetName}
                      onChange={(e) =>
                        setCurrentObjToPush((prev) => {
                          return {
                            ...prev,
                            assetName: e.target.value,
                          };
                        })
                      }
                    />
                  </InputGroup>
                </Col>
                <Col md={6}>
                  <PageMiddleTitle>{t("assettags")}</PageMiddleTitle>
                  <Select
                    id="react-select-assettags"
                    isMulti
                    placeholder={t("assettags")}
                    value={TagOptions.filter((option) => {
                      return currentObjToPush.tags
                        .map((j) => j.tagsName)
                        .includes(option.label);
                    })}
                    styles={CustomSelectStyles}
                    theme={theme}
                    onChange={(e) => {
                      setCurrentObjToPush((prev) => {
                        const newValue = { ...prev };
                        newValue.tags = [
                          ...e.map((i: any) => {
                            return {
                              tagsId: i.value,
                              tagsName: i.label,
                            };
                          }),
                        ];
                        return newValue;
                      });
                    }}
                    options={TagOptions}
                  />
                </Col>
                <Col className="d-flex justify-content-between align-items-center w-100">
                  <div className="flex-grow-1">
                    <Form>
                      <Form.Check
                        type="checkbox"
                        id="default-checkbox"
                        label={t("isinternal")}
                        checked={currentObjToPush.is_internal}
                        onChange={(e) => {
                          setCurrentObjToPush((prev) => {
                            const newValue = {
                              ...prev,
                            };
                            newValue.is_internal = e.target.checked;
                            return newValue;
                          });
                        }}
                      />
                    </Form>
                  </div>
                  <div className="flex-grow-1 text-end">
                    <Button
                      variant="outline-success"
                      disabled={
                        currentObjToPush.functionData.functionId === "" ||
                        currentObjToPush.functionData.processes.length === 0 ||
                        currentObjToPush.assetName.trim() === "" ||
                        currentObjToPush.category.categoryId === 0 ||
                        currentObjToPush.category.subcategory.subcategoryId ===
                          0 ||
                        currentObjToPush.type.subtype.subtypeId === 0 ||
                        currentObjToPush.location.locationId === 0 ||
                        currentObjToPush.type.typeId === 0
                      }
                      size="sm"
                      className="filled-btn-style-add-update-long mt-2"
                      onClick={() => {
                        PushtoTable();
                      }}
                    >
                      {isEditing ? `${t("update")}` : `${t("add")}`}
                    </Button>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col md={12}>
              <div className="d-flex w-100 justify-content-start align-item-center">
                <PageMiddleTitle className="mr-4">
                  {t("assets")}
                </PageMiddleTitle>
                <StyledSearchContainer>
                  <StyledSearchInput
                    onChange={handleSearch}
                    type="text"
                    value={searchQuery}
                    placeholder={t("searchintable")}
                  />
                  {searchQuery === "" ? (
                    <HiOutlineMagnifyingGlass
                      fontSize="1rem"
                      className="mx-2"
                    />
                  ) : (
                    <HiOutlineXMark
                      fontSize="1rem"
                      className="mx-2"
                      onClick={() => {
                        setSearchQuery("");
                      }}
                    />
                  )}
                </StyledSearchContainer>
              </div>
              <TableContainer>
                <FunctionListContainer>
                  <StyledTable>
                    <thead>
                      <tr>
                        <th>{t("asset").toUpperCase()}</th>
                        <th>{t("function").toUpperCase()}</th>
                        <th>{t("process").toUpperCase()}</th>
                        <th>{t("geo").toUpperCase()}</th>
                        <th>{t("category").toUpperCase()}</th>
                        <th>{t("subcategory").toUpperCase()}</th>
                        <th>{t("type").toUpperCase()}</th>
                        <th>{t("subtype").toUpperCase()}</th>
                        <th>{t("tags").toUpperCase()}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((e: any, index: number) => (
                        <EntityAssetsTableRow
                          key={e.assetId}
                          onClick={() => {
                            if (rowIndexSelected === e.assetId) {
                              setRowIndexSelected(undefined);
                            } else {
                              setRowIndexSelected(e.assetId);
                            }
                          }}
                          background={
                            e.assetId === rowIndexSelected
                              ? "#B2B2B2"
                              : "var(--bg-color)"
                          }
                          color={
                            e.assetId === rowIndexSelected
                              ? "black"
                              : "var(--font-color)"
                          }
                        >
                          <td>{e.assetName}</td>
                          <td>{e.functionData.functionName}</td>
                          <td>
                            {e.functionData.processes
                              .map((f: any) => f.processName)
                              .join(",")}
                          </td>
                          <td>{e.location.locationName}</td>
                          <td>{e.category.categoryName}</td>
                          <td>{e.category.subcategory.subcategoryName}</td>
                          <td>{e.type.typeName}</td>
                          <td>{e.type.subtype.subtypeName}</td>
                          <td>
                            {e.tags.length > 0 &&
                              e.tags.map((f: any) => f.tagsName).join(" , ")}
                          </td>
                        </EntityAssetsTableRow>
                      ))}
                    </tbody>
                  </StyledTable>
                </FunctionListContainer>

                <ButtonContainer>
                  <HiPencil
                    onClick={() => {
                      if (rowIndexSelected !== undefined) {
                        setIsEditing(true);
                        const objonEditIndex = data.find(
                          (d: any) => d.assetId === rowIndexSelected
                        );
                        setCurrentObjToPush(objonEditIndex);
                      } else return;
                    }}
                  />
                  <HiTrash onClick={DeleteSelectedRow} />
                </ButtonContainer>
              </TableContainer>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default EntityAssets;
