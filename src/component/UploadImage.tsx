import { useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import pdfIcon from "../assets/icons/pdfIcon.svg";
import UploadIcon from "../assets/icons/Upload.svg";
import { useTranslation } from "react-i18next";
import { UploadImgButton, UploadImgColumn } from "./GlobalComponentStyles";

interface UploadImageProps {
  eventHandler: any;
  imageData: string;
  imageDataKey: string;
  imageDataName?: string;
  setFileName?: any;
  imageDataNameKey?: string;
  Accept: string;
  isRequired?: boolean;
  validated?: boolean;
}
const UploadImage = (props: UploadImageProps) => {
  const { t } = useTranslation();
  const [errorMsg, setErrorMsg] = useState("");
  const [isErrorMsg, setIsErrorMsg] = useState(false);

  const formatBytes = (bytes: number, decimals = 0) => {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;

    return parseFloat((bytes / k).toFixed(dm)) + "kb";
  };

  const inputRefs = useRef<HTMLElement[]>([]);
  const formRef = useRef<any>(null);

  const onSelectFileGraph = (e: any, key: string) => {
    if (!e.target.files || e.target.files.length === 0) {
      // if (props.setFileName) {
      //   props.setFileName(props.imageDataNameKey, undefined);
      // }
      return;
    }

    if (props.Accept.includes("." + e.target.files[0].name.split(".")[1])) {
      if (parseFloat(formatBytes(e.target.files[0].size)) < 500) {
        if (props.setFileName) {
          props.setFileName(props.imageDataNameKey, e.target.files[0].name);
        }
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);

        reader.onload = () => {
          props.eventHandler(key, reader.result);
        };

        setIsErrorMsg(false);
        setErrorMsg("");
      } else {
        handleDelete();
        setIsErrorMsg(true);
        setErrorMsg(`${t("imagesize1")}`);
      }
    } else {
      handleDelete();
      setIsErrorMsg(true);
      setErrorMsg(`${t("imageformat1")}`);
    }
  };

  const handleDelete = () => {
    if (props.setFileName) {
      props.setFileName(props.imageDataNameKey, "");
    }
    props.eventHandler(props.imageDataKey, "");
    formRef.current.reset();
    setIsErrorMsg(false);
    setErrorMsg("");
  };

  function truncate(
    text: string,
    startChars: number,
    endChars: number,
    maxLength: number
  ) {
    if (text.length > maxLength) {
      var start = text.substring(0, startChars);
      var end = text.substring(text.length - endChars, text.length);
      while (start.length + end.length < maxLength) {
        start = start + ".";
      }
      return start + "....." + end;
    }
    return text;
  }

  return (
    <Row>
      <Col lg={12}>
        <form ref={formRef}>
          <Row>
            <Col lg={12}>
              <Form.Control
                type="file"
                // ref={inputRef1}
                ref={(el: any) => (inputRefs.current[0] = el)}
                className="d-none flex-8"
                name={props.imageDataKey}
                onChange={(e) => onSelectFileGraph(e, e.target.name)}
                accept={props.Accept}
              />
              <UploadImgButton
                variant="outline-secondary"
                className={
                  props?.validated && props?.isRequired
                    ? !props.imageData
                      ? "border border-danger rmt form-control"
                      : "border border-success rmt form-control"
                    : "border rmt form-control"
                }
                imgUrl={`url(${UploadIcon})`}
                onClick={() => inputRefs.current[0]?.click()}
              >
                <span className="upload-text">
                  {props.imageDataName
                    ? truncate(props.imageDataName, 16, 9, 25)
                    : `${t("uploadgraph")}`}
                </span>
                <span className="float-right pt-1 upload-image-max-kb-span">
                  (500kb max)
                </span>
              </UploadImgButton>
              {props?.isRequired && props?.validated && !props?.imageData && (
                <span className="invalidInput">{t("requiredfield")}</span>
              )}
            </Col>
            {props.imageData && (
              <UploadImgColumn
                className="mt-3"
                lg={12}
                innerWidth={window.innerWidth}
                imgUrl={`url(${props.imageData})`}
              >
                <Button
                  variant="light bg-white border-0 upload-image-delete-button"
                  onClick={() => handleDelete()}
                >
                  {/* <i className="fa fa-remove"></i> */}
                  {"\u274C"}
                </Button>

                {props.imageDataName?.includes(".pdf") && (
                  <>
                    <img
                      className="mt-5 upload-image-pdfIcon"
                      src={pdfIcon}
                      alt=""
                    />
                    <div></div>
                    <div>
                      {formatBytes(
                        atob(props.imageData.split("base64,")[1]).length
                      )}
                    </div>
                  </>
                )}
              </UploadImgColumn>
            )}
          </Row>
        </form>
      </Col>
      <Col lg={12}>
        {isErrorMsg && (
          <Row className="text-center text-capitalize">
            <div className="alert alert-danger" role="alert">
              <span>{errorMsg}</span>
              <Button
                variant="light  border-0 p-0 upload-image-reset-button"
                onClick={() => {
                  setIsErrorMsg(false);
                  formRef.current.reset();
                }}
              >
                &times;
              </Button>
            </div>
          </Row>
        )}
      </Col>
    </Row>
  );
};

export default UploadImage;
