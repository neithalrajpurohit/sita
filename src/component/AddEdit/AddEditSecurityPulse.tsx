import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import Select from "react-select";
import { useEffect, useRef, useState } from "react";
import { FormDataState } from "../../definition/AddEditSecurityPulse";
import AutoCompleteInput from "../AutocompleteInput";
import RequiredFields from "../RequiredFields";
import UploadImage from "../UploadImage";
import { theme } from "../../pages/GlobalStyles";
import { RiskinputStyle } from "../GlobalComponentStyles";
import { SecurityPulseForm } from "./AddEditTypes";
import { useTranslation } from "react-i18next";

const AddEditSecurityPulse = (props: SecurityPulseForm) => {
  const { t } = useTranslation();
  const {
    securityPulseTitle,
    mainTitle,
    sections,
    recommendations,
    links,
    selectedAssets,
    selectedEntities,
    selectedIncidents,
    criticality,
  } = props.FormData;
  const { getIncidentList, getAssetList, getEntityList } =
    props.tagsEventHandler;

  const { handleCancel, handleSaveAsDraft, handlePreview } =
    props.buttonEventHandler;

  const [validated, setValidated] = useState(false);
  const [submitType, setSubmitType] = useState("");

  const sectionRefs = useRef<HTMLElement[]>([]);
  const recommendationsRefs = useRef<HTMLElement[]>([]);
  const linkRefs = useRef<HTMLElement[]>([]);

  const submitBtnRef = useRef<any>();

  const {
    limit,
    incidentInputList,
    assetsInputList,
    entityInputList,
    criticalityList,
  } = props.options;

  const handleArrayOfObject = (payload: {
    parent: string;
    key: number;
    name: string;
    value: any;
  }) => {
    let tempFormData = [
      ...props?.FormData[payload?.parent as keyof typeof handleArrayOfObject],
    ];
    let newFormData = tempFormData.map((x: FormDataState, key: number) => {
      if (key === payload.key) {
        const updatedObj = { ...x, [payload.name]: payload.value };
        return updatedObj;
      }
      return x;
    });
    props.eventHandler(payload.parent, newFormData);
  };

  const handleArrayOfString = (payload: {
    parent: string;
    key: number;
    name: string;
    value: any;
  }) => {
    let tempFormData = [
      ...props?.FormData[payload?.parent as keyof typeof handleArrayOfObject],
    ];

    let newFormData = tempFormData.map((x: FormDataState, key: number) => {
      if (key === payload.key) {
        const updatedObj = payload.value;

        return updatedObj;
      }
      return x;
    });
    props.eventHandler(payload.parent, newFormData);
  };

  const removeArrayOfString = (payload: { parent: string; key: number }) => {
    let tempFormData = [
      ...props.FormData[payload.parent as keyof typeof addMoreArrayOfObject],
    ];

    tempFormData.splice(payload.key, 1);

    props.eventHandler(payload.parent, tempFormData);
  };

  const addMoreArrayOfObject = (payload: {
    parent: string;
    addSection: any;
  }) => {
    props.eventHandler(payload.parent, [
      ...props.FormData[payload.parent as keyof typeof addMoreArrayOfObject],
      payload.addSection,
    ]);
  };

  const removeArrayOfObject = (payload: { parent: string; key: number }) => {
    let tempFormData = [
      ...props.FormData[payload.parent as keyof typeof removeArrayOfObject],
    ];
    tempFormData = tempFormData.filter(
      (x) => tempFormData.indexOf(x) !== payload.key
    );

    props.eventHandler(payload.parent, tempFormData);
  };

  const checkFormValidation = (event: any) => {
    event.preventDefault();
    if (
      securityPulseTitle &&
      mainTitle &&
      criticality &&
      sections.every(
        (item) => item.imageData && item.imageDataName && item.info
      ) &&
      recommendations.every((item) => item) &&
      links.every((item) => item.linkText && item.linkUrl)
    ) {
      return true;
    }
    return false;
  };

  const dragItem = useRef<any>(null);
  const dragOverItem = useRef<any>();

  const dragStart = (e: any, position: number) => {
    dragItem.current = position;
  };

  const dragEnter = (e: any, position: number) => {
    dragOverItem.current = position;
  };

  const dropArrayOfString = (parent: string) => {
    let tempFormData = [
      ...props.FormData[parent as keyof typeof removeArrayOfObject],
    ];
    const copyListItems = [...tempFormData];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);

    dragItem.current = null;
    dragOverItem.current = null;
    props.eventHandler(parent, copyListItems);
  };

  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(false);
      event.preventDefault();
      event.stopPropagation();
    } else if (form.checkValidity() === true && checkFormValidation(event)) {
      event.preventDefault();

      if (submitType === "preview") {
        handlePreview();
      } else if (submitType === "draft") {
        handleSaveAsDraft();
      }
    }
    setValidated(true);
  };

  return (
    <div className="rml">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        {/* Page Title Input &  Criticality */}
        <Row className="margin-top-30">
          <Col lg={5} className="position-relative">
            <RequiredFields />
            <Form.Group controlId="validationCustom01">
              <Form.Control
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    submitBtnRef.current.click();
                  }
                }}
                type="text"
                maxLength={400}
                value={securityPulseTitle}
                name="securityPulseTitle"
                onChange={(e) =>
                  props.eventHandler(e.target.name, e.target.value)
                }
                placeholder={t("enterpagetitle").toUpperCase()}
                required
              />
              <Form.Control.Feedback type="invalid">
                {t("requiredfield")}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col lg={3} className="ml-lg-4 my-lg-0 my-4 position-relative">
            <RequiredFields />
            {/* <form aria-required> */}
            <Select
              id="react-select-criticality"
              className={
                validated
                  ? criticality === ""
                    ? "invalidInputBorder"
                    : "validInputBorder"
                  : ""
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  submitBtnRef.current.click();
                }
              }}
              placeholder={t("criticality").toUpperCase()}
              options={criticalityList}
              isSearchable={false}
              defaultValue={criticalityList.find(
                (x: any) => x.value === criticality
              )}
              onChange={(e) => {
                props.eventHandler("criticality", e?.value);
              }}
              styles={{
                // Fixes the overlapping problem of the component
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  ...RiskinputStyle,
                }),
                menuList: (provided) => ({
                  ...provided,
                  "&::-webkit-scrollbar": {
                    width: "0.5rem",
                    height: "0.5rem",
                    zIndex: 2,
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "var(--entityonboarding-text-color)",
                    borderRadius: "0.25rem",
                  },
                }),
                menu: (provided, state) => ({
                  ...provided,
                  zIndex: 2,
                  ...RiskinputStyle,
                }),
                input: (baseStyles, state) => ({
                  ...baseStyles,
                  color: state.itemScope
                    ? "var(--entityonboarding-text-color)"
                    : "var(--entityonboarding-text-color)",
                }),
                singleValue: (provided, state) => ({
                  ...provided,
                  ...RiskinputStyle,
                }),
                option: (baseStyles, state) => ({
                  ...baseStyles,
                  color: state.isSelected
                    ? "var(--bg-color)"
                    : state.isFocused
                    ? "var(--bg-color)"
                    : "var(--entityonboarding-text-color)",
                }),
              }}
              theme={theme}
            />
            {criticality === "" && validated && (
              <span className="invalidInput">{t("pleasesavecritically")}</span>
            )}
          </Col>
        </Row>

        {/* Main Title Input */}
        <Row>
          <Col lg={12} className="margin-top-30">
            <Form.Group controlId="validationCustom02">
              <RequiredFields />
              <Form.Control
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    submitBtnRef.current.click();
                  }
                }}
                type="text"
                maxLength={400}
                className="text-capitalize"
                value={mainTitle}
                name="mainTitle"
                onChange={(e) =>
                  props.eventHandler(e.target.name, e.target.value)
                }
                placeholder={t("entermainsectiontitle").toUpperCase()}
                required
              />
              <Form.Control.Feedback type="invalid">
                {t("requiredfield")}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        {/* Dynamic Sections */}
        {sections?.map((curElm: any, key: number) => {
          return (
            <Row key={key} className="flex-column mx-auto my-5">
              <Row className="flex-column my-4 p-3 anlyasis-border-security-pulse">
                <Col lg={4} className="my-4">
                  <RequiredFields />
                  <UploadImage
                    eventHandler={(name: string, value: string) =>
                      props.sectionsHandler({
                        name: name,
                        value: value,
                        key: key,
                      })
                    }
                    setFileName={(name: string, value: string) => {
                      props.sectionsHandler({
                        name: name,
                        value: value,
                        key: key,
                      });
                    }}
                    imageData={curElm?.imageData}
                    imageDataName={curElm?.imageDataName}
                    imageDataKey="imageData"
                    imageDataNameKey="imageDataName"
                    Accept=".png,.jpg,.jpeg,.gif,.webp,.tiff,.heif,.heic,.pdf"
                    isRequired={true}
                    validated={validated}
                  />
                </Col>
                <Col sm={12} lg={12} className="margin-top-30">
                  <RequiredFields />
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <RequiredFields />
                    <Form.Control
                      ref={(el: any) => (sectionRefs.current[key] = el)}
                      className="AddAnaysis-Input"
                      as="textarea"
                      rows={5}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          submitBtnRef.current.click();
                        }
                      }}
                      maxLength={limit}
                      name="info"
                      value={curElm.info}
                      onChange={(e) =>
                        handleArrayOfObject({
                          parent: "sections",
                          name: e.target.name,
                          value: e.target.value,
                          key: key,
                        })
                      }
                      required
                      placeholder={t("enterinfo") + "( Max 200 Charater)"}
                    />
                    <Form.Control.Feedback type="invalid">
                      {t("requiredfield")}
                    </Form.Control.Feedback>
                    <span className="mt-2">
                      {curElm.info.length === limit && (
                        <span className="text-danger ml-2 textarea-footer">
                          {t("inputlimit")}
                        </span>
                      )}
                      <span className="float-right textarea-footer">
                        {curElm.info.length}/{limit} charectors
                      </span>
                    </span>
                  </Form.Group>
                </Col>
              </Row>

              <Row lg={12} className="flex justify-content-end my-2 gap-4">
                {key + 1 === sections.length && (
                  <Button
                    variant="outline-success"
                    className="filled-button-analysis"
                    type="button"
                    onClick={() => {
                      addMoreArrayOfObject({
                        parent: "sections",
                        addSection: {
                          imageData: "",
                          imageDataName: "",
                          info: "",
                        },
                      });
                      setTimeout(() => {
                        sectionRefs.current[sections.length]?.focus();
                      }, 200);
                    }}
                  >
                    {t("addmore")}
                  </Button>
                )}
                {sections.length !== 1 && (
                  <Button
                    type="button"
                    variant="outline-danger"
                    className="filled-button-analysis-danger"
                    onClick={() => {
                      removeArrayOfObject({
                        parent: "sections",
                        key: key,
                      });
                    }}
                  >
                    Delete
                  </Button>
                )}
              </Row>
            </Row>
          );
        })}

        {/* Recomendations & Links */}
        <Row className="my-4 ">
          <Col lg={6}>
            <div className="d-flex-column p-2">
              <p className="recommendations">
                {t("recomendations")}
                <span className="text-danger mb-4">*</span>
              </p>

              <div className="d-flex flex-column justify-content-end align-items-end p-2">
                {recommendations?.map((el, key) => {
                  return (
                    <div
                      key={key}
                      className="my-2 w-100"
                      onDragStart={(e) => dragStart(e, key)}
                      onDragEnter={(e) => dragEnter(e, key)}
                      onDragEnd={(e) => dropArrayOfString("recommendations")}
                      draggable
                    >
                      <Form.Group
                        controlId={`validationCustomRecommendation${key}`}
                      >
                        <InputGroup>
                          <Form.Control
                            ref={(el: any) =>
                              (recommendationsRefs.current[key] = el)
                            }
                            required
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                submitBtnRef.current.click();
                              }
                            }}
                            maxLength={100}
                            value={el}
                            aria-label="Dollar amount (with dot and two decimal places)"
                            onChange={(e) =>
                              handleArrayOfString({
                                parent: "recommendations",
                                name: e.target.name,
                                value: e.target.value,
                                key: key,
                              })
                            }
                          />

                          <Button
                            variant="outline-danger"
                            onClick={() =>
                              removeArrayOfString({
                                parent: "recommendations",
                                key: key,
                              })
                            }
                            disabled={recommendations.length === 1}
                          >
                            X
                          </Button>
                          <Form.Control.Feedback type="invalid">
                            {t("requiredfield")}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Form.Group>
                    </div>
                  );
                })}
                <div>
                  <Button
                    variant="outline-success"
                    type="button"
                    className="my-2 filled-button-analysis"
                    onClick={() => {
                      addMoreArrayOfObject({
                        parent: "recommendations",
                        addSection: "",
                      });
                      setTimeout(() => {
                        recommendationsRefs.current[
                          recommendations.length
                        ]?.focus();
                      }, 200);
                    }}
                  >
                    {t("addmore")}
                  </Button>
                </div>
              </div>
            </div>
          </Col>

          <Col lg={6}>
            <div className="d-flex-column p-2 ">
              <p className="links">
                {t("links").toUpperCase()}
                <span className="text-danger mb-4">*</span>
              </p>
              <div className="p-2">
                {links?.map((el, key) => {
                  return (
                    <div key={key}>
                      <div className="my-2 d-flex flex-column gap-2 p-3 w-100 anlyasis-border-security-pulse">
                        <Form.Group
                          controlId={`validationCustomLinksTitle${key}`}
                        >
                          <Form.Control
                            value={el.linkText}
                            ref={(el: any) => (linkRefs.current[key] = el)}
                            placeholder={t("enterlinktitle").toUpperCase()}
                            name="linkText"
                            maxLength={100}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                submitBtnRef.current.click();
                              }
                            }}
                            onChange={(e) =>
                              handleArrayOfObject({
                                parent: "links",
                                name: e.target.name,
                                value: e.target.value,
                                key: key,
                              })
                            }
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            {t("requiredfield")}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group
                          controlId={`validationCustomLinksUrl${key}`}
                        >
                          <Form.Control
                            value={el.linkUrl}
                            placeholder={t("enterlinkurl").toUpperCase()}
                            name="linkUrl"
                            maxLength={100}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                submitBtnRef.current.click();
                              }
                            }}
                            onChange={(e) =>
                              handleArrayOfObject({
                                parent: "links",
                                name: e.target.name,
                                value: e.target.value,
                                key: key,
                              })
                            }
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            {t("requiredfield")}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </div>

                      <div className="d-flex justify-content-end gap-3 w-100">
                        {key + 1 === links.length && (
                          <Button
                            variant="outline-success"
                            type="button"
                            className="my-2 filled-button-analysis"
                            onClick={() => {
                              addMoreArrayOfObject({
                                parent: "links",
                                addSection: {
                                  linkUrl: "",
                                  linkText: "",
                                },
                              });
                              setTimeout(() => {
                                linkRefs.current[links.length]?.focus();
                              }, 200);
                            }}
                          >
                            {t("addmore")}
                          </Button>
                        )}
                        {links.length > 1 && (
                          <Button
                            variant="outline-danger"
                            className="my-2 filled-button-analysis-link-remove"
                            onClick={() =>
                              removeArrayOfObject({
                                parent: "links",
                                key: key,
                              })
                            }
                          >
                            X
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Col>
        </Row>

        {/* Tags */}
        <Row>
          <Col lg={4} className="mb-4">
            <AutoCompleteInput
              data={{
                tags: selectedAssets ? selectedAssets : [],
                InputArray: assetsInputList ? assetsInputList : [],
              }}
              eventHandler={{ getInputArray: getAssetList }}
              handleTags={(tags: any) =>
                props.eventHandler("selectedAssets", tags)
              }
              allowMultiple={true}
              tagFetchStatus={props?.tagFetchStatus}
              placeholder={t("assets")}
              minChar={3}
            />
          </Col>
          <Col lg={4} className="mb-4">
            <AutoCompleteInput
              data={{
                tags: selectedEntities ? selectedEntities : [],
                InputArray: entityInputList ? entityInputList : [],
              }}
              eventHandler={{ getInputArray: getEntityList }}
              handleTags={(tags: any) =>
                props.eventHandler("selectedEntities", tags)
              }
              allowMultiple={true}
              tagFetchStatus={props?.tagFetchStatus}
              placeholder={t("entity")}
              minChar={3}
            />
          </Col>
          <Col lg={4} className="mb-4">
            <AutoCompleteInput
              data={{
                tags: selectedIncidents ? selectedIncidents : [],
                InputArray: incidentInputList ? incidentInputList : [],
              }}
              eventHandler={{ getInputArray: getIncidentList }}
              handleTags={(tags: any) =>
                props.eventHandler("selectedIncidents", tags)
              }
              allowMultiple={true}
              tagFetchStatus={props?.tagFetchStatus}
              placeholder={t("incidents")}
              minChar={3}
              type="number"
            />
          </Col>
        </Row>

        {/* Submit & Cancel Button */}
        <Row className="justify-content-end my-5 gap-2 mx-2 mx-lg-0 flex-column-reverse flex-md-column-reverse flex-lg-row text-nowrap">
          <Col lg={2}>
            <Button
              variant="outline-secondary border-radius-10 width-sm-200 w-100"
              onClick={() => handleCancel()}
            >
              {t("cancel")}
            </Button>
          </Col>
          <Col lg={2}>
            <Button
              ref={submitBtnRef}
              type="submit"
              variant="outline-secondary width-sm-200 w-100 border-radius-10"
              onClick={() => setSubmitType("draft")}
              // disabled={!checkFormValidation()}
            >
              {t("saveasdraft")}
            </Button>
          </Col>
          <Col lg={2}>
            <Button
              type="submit"
              variant="outline-success width-sm-200 w-100"
              className="filled-btn-style"
              onClick={() => setSubmitType("preview")}
            >
              {t("preview")}
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AddEditSecurityPulse;
