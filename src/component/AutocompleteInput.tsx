import React, { useRef, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import Loading from "./Loader";
import { useTranslation } from "react-i18next";

interface AutoCompleteInputProps {
  data: { tags: string[]; InputArray: string[] };
  eventHandler: { getInputArray: any };
  handleTags: any;
  placeholder?: string;
  allowMultiple?: boolean;
  tagFetchStatus?: {
    isTagLoading: boolean;
    isTagFetchError: boolean;
  };
  minChar: number;
  isRequired?: boolean;
  validated?: boolean;
  type?: string;
}

const AutoCompleteInput = (props: AutoCompleteInputProps) => {
  const { t } = useTranslation();
  const { tags, InputArray } = props.data;

  const { handleTags, placeholder, allowMultiple } = props;

  const { getInputArray } = props.eventHandler;

  const [input, setInput] = useState<string>("");

  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isCloseList, setisCloseList] = useState(false);

  const inputRef = useRef<any>(null);

  const onChange = async (e: any) => {
    const { value } = e.target;
    setInput(value);

    setisCloseList(false);
    setIsError(false);
    setErrorMsg("");
    if (value.length >= props.minChar) {
      setisCloseList(true);
      getInputArray(value);
    }
  };

  const updateList = (value: any) => {
    const trimmedInput = value;
    if (!tags.includes(trimmedInput)) {
      if (InputArray.includes(trimmedInput)) {
        handleTags([...tags, trimmedInput]);
        setInput("");
      } else {
        setIsError(true);
        setErrorMsg("Not In List");
        setisCloseList(false);
      }
    } else {
      setIsError(true);
      setErrorMsg("Already Selected");
      setisCloseList(false);
    }
  };

  const remove = (tag: any) => {
    const currentTag = tags.filter((item: any) => item !== tag);
    handleTags(currentTag);
  };

  const setReadOnly = () => {
    return !allowMultiple && tags.length > 0;
  };

  const handleBlur = (e: any) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setisCloseList(false);
    }
    // setInput("");
  };

  const handleFocus = () => {
    if (input.length >= props.minChar) {
      setisCloseList(true);
    }
  };

  return (
    <Row>
      <Col lg={12} className="">
        <Row>
          <Col lg={12}>
            <span onBlur={(e) => handleBlur(e)}>
              <input
                ref={inputRef}
                readOnly={setReadOnly()}
                value={input}
                className={
                  props.validated
                    ? tags.length === 0
                      ? "form-control Date-input invalidInputBorder noBgValidationIcon"
                      : "form-control Date-input validInputBorder noBgValidationIcon"
                    : "form-control Date-input noBgValidationIcon"
                }
                placeholder={placeholder ? placeholder : "Enter A tag"}
                // onKeyDown={onKeyDown}
                onChange={onChange}
                disabled={setReadOnly()}
                onFocus={() => handleFocus()}
                type={props.type}
                // required={props?.isRequired}
              />
              {props?.isRequired && props?.validated && tags.length === 0 && (
                <span className="invalidInput">{t("requiredfield")}</span>
              )}

              <div>
                {isCloseList && input && input.length > 0 && (
                  <div tabIndex={0} className="autocomplete-div-style">
                    {props.tagFetchStatus?.isTagLoading ? (
                      <span className="text-center  AllList height-60px">
                        <div className="mt-3">
                          <Loading loaderType="BeatLoader" />
                        </div>
                      </span>
                    ) : props.tagFetchStatus?.isTagFetchError ? (
                      <div className="text-center ml-4  alert alert-danger w-90">
                        {t("erroroccuredwhilefetchingthedata")}
                      </div>
                    ) : (
                      <Card className="border-0 bg-color">
                        {isCloseList &&
                        input &&
                        input?.length > 0 &&
                        InputArray?.length > 0
                          ? InputArray.map((y, key) => {
                              return (
                                <div
                                  key={key}
                                  className="list border-bottom  p-2 px-3 bg-color z-index-2"
                                  onClick={() => {
                                    updateList(y);
                                    inputRef.current.focus();
                                  }}
                                >
                                  <span className="text-capitalize">{y}</span>
                                </div>
                              );
                            })
                          : isCloseList &&
                            input.length > 0 && (
                              <>
                                <span className="text-center ml-1 alert alert-warning  background-alert-card font-color height-60px ">
                                  {t("nodatafound")}
                                </span>
                              </>
                            )}
                      </Card>
                    )}
                  </div>
                )}
              </div>
              {isError && (
                <div className="alert alert-danger  mt-3" role="alert">
                  {errorMsg}
                </div>
              )}
            </span>
          </Col>
        </Row>

        <div className="d-flex flex-wrap gap-2 justify-content-start w-100">
          {tags?.map((tag: any, key: React.Key | null | undefined) => (
            <span className="mt-2 mb-1" key={key}>
              <Button variant="outline-secondary" onClick={() => remove(tag)}>
                {tag}
                <i className="fa fa-remove ml-2"></i>
              </Button>
            </span>
          ))}
        </div>
      </Col>
    </Row>
  );
};

export default AutoCompleteInput;
