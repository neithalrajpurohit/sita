import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { SecurityBudgetInputProps, BudgetMarksType } from "../SecurityTypes";
import { clamp } from "../../../utils/clamp";
import SliderBar from "../../SliderBar";
import { useTranslation } from "react-i18next";
import {
  SecurityBudgetInputFormLabel,
  SecurityBudgetInputH1,
} from "../../GlobalComponentStyles";

const Marksfont = `${window.innerWidth > 768 ? "0.75rem" : "0.55  rem"}`;
// TODO:

const budgetmarks: BudgetMarksType = {
  0: {
    style: {
      width: "17%",
      whiteSpace: "pre-wrap",
      overflowWrap: "break-word",
      color: "var(--riskonboarding-body-text-color)",
      fontSize: Marksfont,
    },
    label: "<=50k",
    value: 50000,
  },
  20: {
    style: {
      width: "17%",
      whiteSpace: "pre-wrap",
      overflowWrap: "break-word",
      color: "var(--riskonboarding-body-text-color)",
      fontSize: Marksfont,
    },
    label: "<=500k",
    value: 500000,
  },
  40: {
    style: {
      width: "17%",
      whiteSpace: "pre-wrap",
      overflowWrap: "break-word",
      color: "var(--riskonboarding-body-text-color)",
      fontSize: Marksfont,
    },
    label: "<=1M",
    value: 1000000,
  },
  60: {
    style: {
      width: "17%",
      whiteSpace: "pre-wrap",
      overflowWrap: "break-word",
      color: "var(--riskonboarding-body-text-color)",
      fontSize: Marksfont,
    },
    label: "<=10M",
    value: 10000000,
  },
  80: {
    style: {
      width: "17%",
      whiteSpace: "pre-wrap",
      overflowWrap: "break-word",
      color: "var(--riskonboarding-body-text-color)",
      fontSize: Marksfont,
    },
    label: "<=50M",
    value: 50000000,
  },
  100: {
    style: {
      width: "17%",
      whiteSpace: "pre-wrap",
      overflowWrap: "break-word",
      color: "var(--riskonboarding-body-text-color)",
      fontSize: Marksfont,
    },
    label: "<=100M",
    value: 100000000,
  },
};

const SecurityBudgetInput = (props: SecurityBudgetInputProps) => {
  const { value, onChange } = props;
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState(value);
  const [sliderValue, setSliderValue] = useState(() => {
    const budgetBrackets = Object.values(budgetmarks).map((res) => res.value);
    const selectedBracket = budgetBrackets.find((x) => x >= inputValue);
    const [slectedeBracketKey] =
      Object.entries(budgetmarks).find(([key, value]) => {
        return selectedBracket === value.value;
      }) || (["100", null] as any);
    return parseInt(slectedeBracketKey as unknown as string);
  });
  return (
    <>
      <Row md={12}>
        <Col md={12}>
          <SecurityBudgetInputH1>
            {t("securitybudget").toUpperCase()}
          </SecurityBudgetInputH1>
        </Col>
        <Col md={12}>
          <Form.Group
            as={Row}
            className="mb-2"
            controlId="formHorizontalFirstName"
          >
            <SecurityBudgetInputFormLabel column sm={3}>
              {t("asb")}
            </SecurityBudgetInputFormLabel>
            <Col sm={5}>
              <Form.Control
                name="notnow"
                type="number"
                placeholder={t("enteramount")}
                value={inputValue}
                onKeyDown={(e) => {
                  const exceptThisSymbols = ["e", "E", "+", "-", "."];

                  exceptThisSymbols.includes(e.key) && e.preventDefault();
                }}
                onChange={(e) => {
                  if ([""].includes(e.target.value)) {
                    setInputValue("" as unknown as number);
                    return setSliderValue(0);
                  }
                  const newInputValue = parseInt(e.target.value);
                  if (Number.isNaN(newInputValue)) return;
                  setInputValue(clamp(0, 100000000, newInputValue));
                  onChange(e.target.value as unknown as number);

                  // update slider value
                  const budgetBrackets = Object.values(budgetmarks).map(
                    (res) => res.value
                  );
                  const selectedBracket = budgetBrackets.find(
                    (x) => x >= parseInt(e.target.value)
                  );

                  const [slectedeBracketKey] =
                    Object.entries(budgetmarks).find(([key, value]) => {
                      return selectedBracket === value.value;
                    }) || (["100", null] as any);
                  setSliderValue(
                    parseInt(slectedeBracketKey) as unknown as number
                  );
                }}
                maxLength={10}
                className="security-budget-input-form-control"
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
      <Row
        md={12}
        className="d-flex align-items-center justify-content-center w-100"
      >
        <Col md={12}>
          <SliderBar
            marks={budgetmarks}
            value={sliderValue}
            onChange={(newValue) => {
              //budget value
              // const budgetBrackets = Object.values(budgetmarks).map(
              //   (res) => res.value
              // );
              //  get sliderValue
              if (inputValue !== sliderValue) {
                setSliderValue(newValue);
              }
              if (Object.keys(budgetmarks).includes(newValue.toString())) {
                setSliderValue(newValue);
                setInputValue(
                  budgetmarks[`${newValue}`].value as unknown as number
                );
                onChange(budgetmarks[`${newValue}`].value as unknown as number);
              }
            }}
            marginRight={30}
            marginLeft={40}
            marginTop={10}
            marginBottom={60}
            width="100%"
          />
        </Col>
      </Row>
    </>
  );
};

export default SecurityBudgetInput;
