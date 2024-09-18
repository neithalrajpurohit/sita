import { Col, Form, Row } from "react-bootstrap";
import { SecurityPropType } from "./SecurityTypes";
import { clamp } from "../../utils/clamp";
import FunctionsLineOfReportInput from "./Inputs/FunctionsLineOfReportInput";
import SecurityBudgetInput from "./Inputs/SecurityBudgetInput";
import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";
import { HiCheck, HiMinus, HiPlus } from "react-icons/hi2";
import { ModalCloseButton } from "../GlobalComponentStyles";
import { uniq } from "lodash";

const SecurityOrginazationForm = (props: SecurityPropType) => {
  const { onPageDataChange, pageData } = props;
  const florOtherRef = useRef<any>();
  const [newFlorOther, setNewFlorOther] = useState<string[]>([]);
  const [showFlorOtherInput, setShowFlorOtherInput] = useState(false);
  const [florInputValue, setFlorInputValue] = useState("");

  const { t } = useTranslation();

  const toggleFlorOther = () => {
    setShowFlorOtherInput(!showFlorOtherInput);
  };

  const pushToNewFlorOtherArr = () => {
    setNewFlorOther((prev) => {
      const newArr = [...prev, florInputValue];
      return newArr;
    });

    onPageDataChange({
      ...pageData,
      security_organization: {
        ...pageData["security_organization"],
        flor_others: [
          ...uniq([
            ...pageData.security_organization.flor_others,
            ...[...newFlorOther, florInputValue],
          ]),
        ],
        selected_flor_others: [
          ...uniq([
            ...pageData.security_organization.selected_flor_others,
            { label: florInputValue, name: florInputValue, value: "NA" },
          ]),
        ],
        deleted_flor_others:
          pageData.security_organization.deleted_flor_others.filter(
            (rec) => rec !== florInputValue
          ),
      },
    });

    setFlorInputValue("");
    setShowFlorOtherInput(false);
  };

  const alreadyExistInList = (
    arr: string[],
    str: string,
    deletedArr: string[]
  ) => {
    return deletedArr
      .map((res) => res.toLowerCase())
      .includes(str.toLowerCase())
      ? false
      : arr.map((res) => res.toLowerCase()).includes(str.toLowerCase());
  };

  return (
    <div className="securityContainerStyle">
      <Row md={12}>
        <Col md={12}>
          <h1 className="securityTitleStyle">
            {t("securityorganization").toUpperCase()}
          </h1>
        </Col>
      </Row>

      <div className="p-3">
        <Row md={12} className="margin-bottom-24">
          <h1 className="col-md-12 securityGovernance-iaf-h1">
            {t("hmprdtc").toUpperCase()}
          </h1>
          <Col md={12}>
            <Row>
              <Col lg={12}>
                <Form.Group
                  as={Row}
                  className="mb-1"
                  controlId="formHorizontalFirstName"
                >
                  <Form.Label column sm={3} className="font-size-point-75-rem">
                    {t("directreports")}
                  </Form.Label>

                  <Col sm={5}>
                    <Form.Control
                      name="Reports"
                      type="number"
                      placeholder={t("enternumber")}
                      maxLength={100}
                      className="risk-input-style"
                      value={
                        pageData["security_organization"]["direct_reports"]
                      }
                      onKeyDown={(e) => {
                        const exceptThisSymbols = ["e", "E", "+", "-", "."];
                        exceptThisSymbols.includes(e.key) && e.preventDefault();
                      }}
                      onChange={(e) => {
                        onPageDataChange({
                          ...pageData,
                          security_organization: {
                            ...pageData["security_organization"],
                            direct_reports:
                              e.target.value === ""
                                ? ("" as unknown as number)
                                : clamp(
                                    1,
                                    500,
                                    e.target.value as unknown as number
                                  ),
                          },
                        });
                      }}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col lg={12}>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalFirstName"
                >
                  <Form.Label column sm={3} className="font-size-point-75-rem">
                    {t("indirectreports")}
                  </Form.Label>

                  <Col sm={5}>
                    <Form.Control
                      name="Reports"
                      type="number"
                      placeholder={t("enternumber")}
                      maxLength={100}
                      className="risk-input-style"
                      value={
                        pageData["security_organization"]["indirect_reports"]
                      }
                      onKeyDown={(e) => {
                        const exceptThisSymbols = ["e", "E", "+", "-", "."];

                        exceptThisSymbols.includes(e.key) && e.preventDefault();
                      }}
                      onChange={(e) => {
                        onPageDataChange({
                          ...pageData,
                          security_organization: {
                            ...pageData["security_organization"],
                            indirect_reports:
                              e.target.value === ""
                                ? ("" as unknown as number)
                                : clamp(
                                    1,
                                    500,
                                    e.target.value as unknown as number
                                  ),
                          },
                        });
                      }}
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Row />
            </Row>
          </Col>
        </Row>

        <Row md={12} className="margin-bottom-24">
          <Col md={12}>
            <div className="d-flex justify-content-between align-items-center mb-1 ">
              <h1 className="securityGovernance-iaf-h1-members m-0 pr-3 white-space-nowrap ">
                {t("flor").toUpperCase()}
              </h1>
              {!showFlorOtherInput && (
                <ModalCloseButton className="m-0">
                  <button onClick={toggleFlorOther}>
                    <HiPlus color="inherent" fontSize="1rem" cursor="pointer" />
                  </button>
                </ModalCloseButton>
              )}
              {showFlorOtherInput && (
                <>
                  <ModalCloseButton className="m-0">
                    <Form.Control
                      className="certificateRegulationInput"
                      type="text"
                      placeholder={t("eorh").toUpperCase()}
                      value={florInputValue}
                      onChange={(e) => setFlorInputValue(e.target.value)}
                      maxLength={15}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          if (
                            florInputValue.trim() !== "" &&
                            !alreadyExistInList(
                              [
                                ...pageData["security_organization"][
                                  "predefined_flor"
                                ],
                                ...pageData["security_organization"][
                                  "flor_others"
                                ],
                              ],
                              florInputValue,
                              [
                                ...pageData["security_organization"][
                                  "deleted_flor_others"
                                ],
                              ]
                            )
                          ) {
                            florOtherRef.current.click();
                          }
                        }
                      }}
                    />
                    <>
                      {florInputValue.trim() === "" ||
                      alreadyExistInList(
                        [
                          ...pageData["security_organization"][
                            "predefined_flor"
                          ],
                          ...pageData["security_organization"]["flor_others"],
                        ],
                        florInputValue,
                        [
                          ...pageData["security_organization"][
                            "deleted_flor_others"
                          ],
                        ]
                      ) ? (
                        <button onClick={toggleFlorOther}>
                          <HiMinus
                            fontSize="1rem"
                            color="inherent"
                            cursor="pointer"
                          />
                        </button>
                      ) : (
                        <button
                          ref={florOtherRef}
                          onClick={pushToNewFlorOtherArr}
                        >
                          <HiCheck
                            fontSize="1rem"
                            color="inherent"
                            cursor="pointer"
                          />
                        </button>
                      )}
                    </>
                  </ModalCloseButton>
                </>
              )}
            </div>
          </Col>
          <Col md={12}>
            <FunctionsLineOfReportInput
              deletedOtherFlor={
                pageData["security_organization"]["deleted_flor_others"]
              }
              preDefFlor={pageData["security_organization"]["predefined_flor"]}
              optionsFlor={
                pageData["security_organization"]["predefined_flor_values"]
              }
              othersFlor={pageData["security_organization"]["flor_others"]}
              selectOtherFlor={
                pageData["security_organization"]["selected_flor_others"]
              }
              selectedPreDefFlor={
                pageData["security_organization"]["selected_flor"]
              }
              deleteNewCreatedFlor={setNewFlorOther}
              newCreatedFlorOther={newFlorOther}
              onChange={(
                selectedPreDefFlor,
                othersFlor,
                selectOtherFlor,
                deletedOtherFlor,
                newCreatedFlorOther
              ) => {
                onPageDataChange({
                  ...pageData,
                  security_organization: {
                    ...pageData["security_organization"],
                    selected_flor: selectedPreDefFlor,
                    flor_others: [
                      ...uniq([...othersFlor, ...newCreatedFlorOther]),
                    ],
                    selected_flor_others: selectOtherFlor,
                    deleted_flor_others: deletedOtherFlor,
                  },
                });
              }}
            />
          </Col>
        </Row>
      </div>

      <SecurityBudgetInput
        value={pageData["security_organization"]["security_budget"]}
        onChange={(updatedSecurityBudget) => {
          onPageDataChange({
            ...pageData,
            security_organization: {
              ...pageData["security_organization"],
              security_budget: updatedSecurityBudget,
            },
          });
        }}
      />
    </div>
  );
};

export default SecurityOrginazationForm;
