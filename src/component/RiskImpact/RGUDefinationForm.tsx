import React, { useRef } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import { RGUData, getRandomHexColor } from "./RiskImpactUtils";
import { ButtonContainer, PageMiddleTitle } from "../GlobalComponentStyles";
import { useTranslation } from "react-i18next";

interface RGUDefinitionFormProps {
  data: RGUData;
  setData: React.Dispatch<React.SetStateAction<RGUData>>;
  pushRguObjToList: () => void;
  isEditingRgu: boolean;
  isSaving: boolean;
  usedColors: Set<string>;
}

const RGUDefinitionForm: React.FC<RGUDefinitionFormProps> = ({
  data,
  setData,
  pushRguObjToList,
  isEditingRgu,
  usedColors,
  isSaving,
}) => {
  const { t } = useTranslation();
  const submitBtnRef = useRef<any>();
  return (
    <Col lg={12} className="my-1">
      <div>
        <PageMiddleTitle>{t("rgudef")}</PageMiddleTitle>
        <Row className="my-3">
          <Col className="col-xs-6">
            <Form.Label>{t("businessunit")}</Form.Label>
            <Form.Control
              id="rgu_name_input"
              value={data.rgu_name}
              onChange={(e) => {
                const inputText = e.target.value.replace(/[^a-zA-Z\s]/g, ""); // Remove non-alphabetic characters and spaces
                setData((prev) => {
                  const newObj = { ...prev };
                  newObj.revenue_unit = "$";
                  newObj.rgu_color = getRandomHexColor(usedColors);
                  newObj.rgu_name = inputText;
                  return newObj;
                });
              }}
              placeholder={t("enterbusinessunit")}
              type="text"
              maxLength={75}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (
                    data.revenue.trim() !== "" &&
                    data.rgu_name.trim() !== ""
                  ) {
                    submitBtnRef.current.click();
                  }
                }
              }}
            />
          </Col>
        </Row>
        <Row className="my-1">
          <Col className="col-xs-6">
            <Form.Label>{t("revenueannual")}</Form.Label>
            <Form.Control
              id="rgu_revenue_input"
              className="currencyInput"
              value={data.revenue.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} // Format the value with commas
              onKeyDown={(e) => {
                const allowedKeys = [
                  "Backspace",
                  "Delete",
                  "Tab",
                  "ArrowLeft",
                  "ArrowRight",
                ];
                if (
                  !(
                    (e.key >= "0" && e.key <= "9") ||
                    allowedKeys.includes(e.key)
                  )
                ) {
                  e.preventDefault();
                }
                if (e.key === "Enter") {
                  if (
                    data.revenue.trim() !== "" &&
                    data.rgu_name.trim() !== ""
                  ) {
                    submitBtnRef.current.click();
                  }
                }
              }}
              onChange={(e) => {
                if (e.target.value.replace(/,/g, "").length <= 9) {
                  // Remove commas and convert to a number
                  const newValue = e.target.value.replace(/,/g, "");
                  setData((prev) => {
                    const newObj = { ...prev };
                    newObj.revenue = String(newValue);
                    return newObj;
                  });
                } else return;
              }}
              placeholder={t("enterannualamount")}
              type="text"
            />
          </Col>
        </Row>
        <Row className="mb-1">
          <ButtonContainer>
            <Button
              ref={submitBtnRef}
              id="rgu_add_button"
              variant="outline-success"
              size="sm"
              className="filled-btn-style-add-update-long"
              onClick={pushRguObjToList}
              disabled={
                isSaving ||
                data.revenue.trim() === "" ||
                data.rgu_name.trim() === ""
              }
            >
              {isEditingRgu ? t("update") : t("add")}
            </Button>
          </ButtonContainer>
        </Row>
      </div>
    </Col>
  );
};

export default RGUDefinitionForm;
