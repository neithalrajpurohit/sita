import { useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import calender from "../../assets/icons/calenderIcon.svg";
import AutoCompleteInput from "../AutocompleteInput";
import RequiredFields from "../RequiredFields";
import UploadImage from "../UploadImage";
import { AddEditPerspectiveColumn, theme } from "../../pages/GlobalStyles";
import { inputStyle } from "../GlobalComponentStyles";
import { AddEditAnalysisCompProps } from "./AddEditTypes";
import { useTranslation } from "react-i18next";
// @ts-ignore
import * as locales from "react-date-range/dist/locale";

import { RootState } from "../../configureStore";

const AddEditAnalysisComp = (props: AddEditAnalysisCompProps) => {
  const { t } = useTranslation();
  const selectedLang = useSelector(
    (state: RootState) => state.UserAuthentication.language
  );

  const {
    imageData1,
    imageData2,
    imageData3,
    imageData4,
    perspectiveTitle,
    startDateTime,
    endDateTime,
    barGraphTitle,
    perspectiveInput,
    recomendationsInput,
    imageData1Name,
    imageData2Name,
    imageData3Name,
    imageData4Name,
    selectedLevelFilter,
    selectedPerspectiveFilter,
    selectedActionTakenFilter,
    selectedIds,
    selectedAssets,
    selectedEntities,
    selectedActedUponFilter,
  } = props.FormData;

  const {
    limit,
    SelectLevel,
    ActionTaken,
    errorMsg,
    isErrorMsg,
    AnalysisTypeOption,
    incidentList,
    ActedUponOption,
    assetList,
    entityList,
  } = props.options;

  const { handleCancel, handlePreview, handleSaveAsDraft } =
    props.buttonEventHandler;
  const { getIncidentList, getAssetList, getEntityList } =
    props.tagsEventHandler;

  const [validated, setValidated] = useState(false);
  const [submitType, setSubmitType] = useState("");
  const submitBtnRef = useRef<any>();

  let handleColor = (time: any) => {
    return time.getHours() > 12 ? "text-error" : "text-error";
  };

  const checkFormValidation = (event: any) => {
    event.preventDefault();

    if (
      !imageData1 ||
      !perspectiveTitle ||
      !perspectiveInput ||
      !recomendationsInput ||
      !imageData1Name ||
      !selectedPerspectiveFilter ||
      !selectedActionTakenFilter ||
      !(selectedIds !== null && selectedIds.length > 0) ||
      !selectedActedUponFilter
    ) {
      return true;
    }
    return false;
  };

  const handleSubmit = (event: any) => {
    // alert("hii");
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(false);
      event.preventDefault();
      event.stopPropagation();
    } else if (form.checkValidity() === true && !checkFormValidation(event)) {
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
        <Row>
          <AddEditPerspectiveColumn lg={2} className="mt-20">
            <RequiredFields />
            <Select
              id="react-select-perspectivetype"
              styles={{
                // Fixes the overlapping problem of the component
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  ...inputStyle,
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
                  ...inputStyle,
                }),
                input: (baseStyles, state) => ({
                  ...baseStyles,
                  color: state.itemScope
                    ? "var(--entityonboarding-text-color)"
                    : "var(--entityonboarding-text-color)",
                }),
                singleValue: (provided, state) => ({
                  ...provided,
                  ...inputStyle,
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
              className={
                validated
                  ? selectedPerspectiveFilter === ""
                    ? "Date-input invalidInputBorder"
                    : "Date-input validInputBorder"
                  : " Date-input"
              }
              // className=" Date-input"
              placeholder={t("perspectivetype")}
              options={AnalysisTypeOption}
              isSearchable={false}
              defaultValue={AnalysisTypeOption.find(
                (x) => x.value === selectedPerspectiveFilter
              )}
              onChange={(e) => {
                props.eventHandler("selectedPerspectiveFilter", e?.value);
                //empty tag
                props.eventHandler("selectedIds", []);
                //
                // props.deletePropertiesOfFormData({ name: "startDateTime" });
                // props.deletePropertiesOfFormData({ name: "endDateTime" });
                // props.deletePropertiesOfFormData({ name: "selectedLevelFilter" });
              }}
            />
            {selectedPerspectiveFilter === "" && validated && (
              <span className="invalidInput">{t("requiredfield")}</span>
            )}
          </AddEditPerspectiveColumn>
          <Col lg={4} className="mt-20 ">
            <RequiredFields />
            <AutoCompleteInput
              data={{
                tags: selectedIds ? selectedIds : [],
                InputArray: incidentList ? incidentList : [],
              }}
              handleTags={(tags: any) =>
                props.eventHandler("selectedIds", tags)
              }
              eventHandler={{
                getInputArray: getIncidentList,
              }}
              placeholder={t("iapi").toUpperCase()}
              allowMultiple={
                selectedPerspectiveFilter?.toLocaleLowerCase() === "alert"
                  ? true
                  : false
              }
              tagFetchStatus={props?.tagFetchStatus}
              minChar={3}
              validated={validated}
              isRequired={true}
              type="number"
            />
          </Col>
          <Col lg={2} className="mt-20">
            <RequiredFields />
            <Select
              id="react-select-actedupon"
              className={
                validated
                  ? selectedActedUponFilter === ""
                    ? "Date-input invalidInputBorder"
                    : "Date-input validInputBorder"
                  : " Date-input"
              }
              placeholder={t("actedupon")}
              options={ActedUponOption}
              isSearchable={false}
              defaultValue={ActedUponOption.find(
                (x) => x.value === selectedActedUponFilter
              )}
              onChange={(e) =>
                props.eventHandler("selectedActedUponFilter", e?.value)
              }
              styles={{
                // Fixes the overlapping problem of the component
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  ...inputStyle,
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
                  ...inputStyle,
                }),
                input: (baseStyles, state) => ({
                  ...baseStyles,
                  color: state.itemScope
                    ? "var(--entityonboarding-text-color)"
                    : "var(--entityonboarding-text-color)",
                }),
                singleValue: (provided, state) => ({
                  ...provided,
                  ...inputStyle,
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
            {selectedActedUponFilter === "" && validated && (
              <span className="invalidInput">{t("requiredfield")}</span>
            )}
          </Col>
          <AddEditPerspectiveColumn lg={2} className="mt-20">
            <RequiredFields />
            <Select
              id="react-select-incidentstatus"
              className={
                validated
                  ? selectedActionTakenFilter === ""
                    ? "Date-input invalidInputBorder"
                    : "Date-input validInputBorder"
                  : " Date-input"
              }
              placeholder={t("incidentstatus").toUpperCase()}
              options={ActionTaken}
              defaultValue={ActionTaken.find(
                (x) => x.value === selectedActionTakenFilter
              )}
              isSearchable={false}
              onChange={(e) =>
                props.eventHandler("selectedActionTakenFilter", e?.value)
              }
              styles={{
                // Fixes the overlapping problem of the component
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  ...inputStyle,
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
                  ...inputStyle,
                }),
                input: (baseStyles, state) => ({
                  ...baseStyles,
                  color: state.itemScope
                    ? "var(--entityonboarding-text-color)"
                    : "var(--entityonboarding-text-color)",
                }),
                singleValue: (provided, state) => ({
                  ...provided,
                  ...inputStyle,
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
            {selectedActionTakenFilter === "" && validated && (
              <span className="invalidInput">{t("requiredfield")}</span>
            )}
          </AddEditPerspectiveColumn>
        </Row>
        <Row className="my-5">
          <Col lg={5}>
            <RequiredFields />
            <Form.Group controlId="validationCustomTitle">
              <Form.Control
                className="analysis-input risk-input-style"
                type="text"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    submitBtnRef.current.click();
                  }
                }}
                maxLength={100}
                name="perspectiveTitle"
                value={perspectiveTitle}
                onChange={(e) =>
                  props.eventHandler(e.target.name, e.target.value)
                }
                placeholder={t("perspectivetitle").toUpperCase()}
                required
              />
              <Form.Control.Feedback type="invalid">
                {t("requiredfield")}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        {selectedPerspectiveFilter?.toLocaleLowerCase() === "alert" && (
          <Row className="my-5">
            <Col lg={3} md={4} className="DatePicker mt-20 ">
              <DatePicker
                className="form-control Date-input noBgValidationIcon"
                showTimeSelect
                selected={startDateTime ? new Date(startDateTime) : null}
                onChange={(date) => props.eventHandler("startDateTime", date)}
                timeClassName={handleColor}
                maxDate={endDateTime ? new Date(endDateTime) : null}
                dateFormat="  dd/MM/yyyy  | hh:mm:ss aa"
                placeholderText={t("startdateandtime").toUpperCase()}
                locale={locales[selectedLang]}
                timeCaption={t("time")}
              />
              <img
                src={calender}
                className="mt-2 add-edit-prespective-comp-date-img"
                alt=""
              />
            </Col>
            <Col lg={3} md={4} className="DatePicker mt-20">
              <DatePicker
                className="form-control Date-input noBgValidationIcon"
                showTimeSelect
                selected={endDateTime ? new Date(endDateTime) : null}
                onChange={(date) => props.eventHandler("endDateTime", date)}
                minDate={startDateTime ? new Date(startDateTime) : null}
                timeClassName={handleColor}
                dateFormat="  dd/MM/yyyy  | hh:mm:ss aa"
                placeholderText={t("enddateandtime").toUpperCase()}
                locale={locales[selectedLang]}
                timeCaption={t("time")}
              />
              <img
                src={calender}
                className="mt-2 add-edit-prespective-comp-date-img"
                alt=""
              />
            </Col>
            <Col lg={2} className="mt-20">
              <Select
                id="react-select-criticality"
                className=" Date-input"
                placeholder={t("criticality").toUpperCase()}
                options={SelectLevel}
                isSearchable={false}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    submitBtnRef.current.click();
                  }
                }}
                defaultValue={SelectLevel.find(
                  (x) => x.value === selectedLevelFilter
                )}
                onChange={(e) =>
                  props.eventHandler("selectedLevelFilter", e?.value)
                }
                // styles={customDropDownStyles}
                styles={{
                  // Fixes the overlapping problem of the component
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    ...inputStyle,
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
                    ...inputStyle,
                  }),
                  input: (baseStyles, state) => ({
                    ...baseStyles,
                    color: state.itemScope
                      ? "var(--entityonboarding-text-color)"
                      : "var(--entityonboarding-text-color)",
                  }),
                  singleValue: (provided, state) => ({
                    ...provided,
                    ...inputStyle,
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
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary25: "var(--entityonboarding-text-color)",
                    primary: "var(--entityonboarding-text-color)",
                  },
                })}
              />
            </Col>
          </Row>
        )}
        <Row className="mt-50">
          <Col lg={4} className="mt-20">
            <RequiredFields />
            <UploadImage
              eventHandler={(name: string, value: string) =>
                props.eventHandler(name, value)
              }
              setFileName={(name: string, value: string) =>
                props.eventHandler(name, value)
              }
              imageData={imageData1}
              imageDataName={imageData1Name}
              imageDataKey="imageData1"
              imageDataNameKey="imageData1Name"
              Accept=".png,.jpg,.jpeg,.gif,.webp,.tiff,.heif,.heic,.pdf"
              validated={validated}
              isRequired={true}
            />
          </Col>

          <Col lg={4} className="mt-20">
            <UploadImage
              eventHandler={(name: string, value: string) =>
                props.eventHandler(name, value)
              }
              setFileName={(name: string, value: string) =>
                props.eventHandler(name, value)
              }
              imageData={imageData2}
              imageDataName={imageData2Name}
              imageDataKey="imageData2"
              imageDataNameKey="imageData2Name"
              Accept=".png,.jpg,.jpeg,.gif,.webp,.tiff,.heif,.heic,.pdf"
            />
          </Col>
        </Row>

        <Row className="mt-5">
          <Col lg={6} className="mt-20">
            <Form.Control
              type="text"
              name="barGraphTitle"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  submitBtnRef.current.click();
                }
              }}
              value={barGraphTitle}
              onChange={(e) =>
                props.eventHandler(e.target.name, e.target.value)
              }
              placeholder={t("egt").toUpperCase()}
              className="risk-input-style"
            />
          </Col>
        </Row>

        <Row className="my-3">
          <Col lg={4} className="mt-20">
            <UploadImage
              eventHandler={(name: string, value: string) =>
                props.eventHandler(name, value)
              }
              setFileName={(name: string, value: string) =>
                props.eventHandler(name, value)
              }
              imageData={imageData3}
              imageDataName={imageData3Name}
              imageDataKey="imageData3"
              imageDataNameKey="imageData3Name"
              Accept=".png,.jpg,.jpeg,.gif,.webp,.tiff,.heif,.heic,.pdf"
            />
          </Col>
          <Col lg={4} className="mt-20">
            <UploadImage
              eventHandler={(name: string, value: string) =>
                props.eventHandler(name, value)
              }
              setFileName={(name: string, value: string) =>
                props.eventHandler(name, value)
              }
              imageData={imageData4}
              imageDataName={imageData4Name}
              imageDataKey="imageData4"
              imageDataNameKey="imageData4Name"
              Accept=".png,.jpg,.jpeg,.gif,.webp,.tiff,.heif,.heic,.pdf"
            />
          </Col>
        </Row>

        <Row className="mt-5">
          <Col sm={12} lg={6} className="mt-20">
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Group controlId="CustomValidationPerspective">
                <Form.Label className="AddAnaysis-Label">
                  {" "}
                  {t("perspective").toUpperCase()}{" "}
                  <span className="text-danger mb-4">*</span>{" "}
                </Form.Label>
                <Form.Control
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      submitBtnRef.current.click();
                    }
                  }}
                  className="AddAnaysis-Input risk-input-style"
                  as="textarea"
                  rows={5}
                  maxLength={limit}
                  name="perspectiveInput"
                  onChange={(e) =>
                    props.eventHandler(e.target.name, e.target.value)
                  }
                  placeholder={t("enterinfo")}
                  value={perspectiveInput}
                  required
                />

                <span className="mt-2">
                  {perspectiveInput?.length === limit && (
                    <span className="text-danger ml-2 textarea-footer">
                      {t("inputlimit")}
                    </span>
                  )}
                  <span className="float-right textarea-footer">
                    {perspectiveInput?.length ? perspectiveInput?.length : 0}/
                    {limit} characters
                  </span>
                </span>
                <Form.Control.Feedback type="invalid">
                  {t("requiredfield")}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Group>
          </Col>
          <Col sm={12} lg={6} className="mt-20">
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label className="AddAnaysis-Label">
                {t("recomendations").toUpperCase()}{" "}
                <span className="text-danger mb-4">*</span>
              </Form.Label>
              <Form.Control
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    submitBtnRef.current.click();
                  }
                }}
                as="textarea"
                className="AddAnaysis-Input risk-input-style"
                placeholder={t("enterinfo")}
                rows={5}
                maxLength={limit}
                name="recomendationsInput"
                onChange={(e) =>
                  props.eventHandler(e.target.name, e.target.value)
                }
                value={recomendationsInput}
                required
              />
              {recomendationsInput?.length === limit && (
                <span className="text-danger ml-2 textarea-footer">
                  {t("inputlimit")}
                </span>
              )}
              <span className="float-right textarea-footer">
                {recomendationsInput?.length ? recomendationsInput?.length : 0}/
                {limit} characters
              </span>
              <Form.Control.Feedback type="invalid">
                {t("requiredfield")}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-5 mb-1">
          <span className="Tag-Text">{t("tags")}</span>
        </Row>
        <Row className="mb-5">
          <Col lg={4} className="mt-20">
            <AutoCompleteInput
              data={{
                tags: selectedAssets ? selectedAssets : [],
                InputArray: assetList ? assetList : [],
              }}
              handleTags={(tags: any) =>
                props.eventHandler("selectedAssets", tags)
              }
              eventHandler={{
                getInputArray: getAssetList,
              }}
              placeholder={t("assets")}
              allowMultiple={true}
              tagFetchStatus={props?.tagFetchStatus}
              minChar={3}
            />
          </Col>
          <Col lg={4} className="mt-20">
            <AutoCompleteInput
              data={{
                tags: selectedEntities ? selectedEntities : [],
                InputArray: entityList ? entityList : [],
              }}
              handleTags={(tags: any) =>
                props.eventHandler("selectedEntities", tags)
              }
              eventHandler={{
                getInputArray: getEntityList,
              }}
              placeholder={t("entity")}
              allowMultiple={true}
              tagFetchStatus={props?.tagFetchStatus}
              minChar={3}
            />
          </Col>
        </Row>
        {isErrorMsg && (
          <Row className="text-center text-capitalize">
            <div
              className="alert alert-danger alert-dismissible fade show"
              role="alert"
            >
              <span>{errorMsg}</span>
            </div>
          </Row>
        )}

        <Row className="justify-content-end my-5 gap-2 mx-2 mx-lg-0 flex-column-reverse flex-md-column-reverse flex-lg-row text-nowrap">
          <Col lg={2}>
            <Button
              variant="outline-secondary width-sm-200 w-100 border-radius-10 "
              onClick={() => handleCancel()}
            >
              {t("cancel")}
            </Button>
          </Col>
          <Col lg={2}>
            <Button
              type="submit"
              variant="outline-secondary width-sm-200 w-100 border-radius-10 "
              onClick={() => setSubmitType("draft")}
            >
              {t("saveasdraft")}
            </Button>
          </Col>
          <Col lg={2}>
            <Button
              type="submit"
              ref={submitBtnRef}
              variant="width-sm-200 w-100"
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

export default AddEditAnalysisComp;
