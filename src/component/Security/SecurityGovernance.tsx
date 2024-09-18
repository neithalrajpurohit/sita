import { Col, Form, Row } from "react-bootstrap";
import SliderBar from "../SliderBar";
import { MarksType, AuditmarksType, SecurityPropType } from "./SecurityTypes";
import { useTranslation } from "react-i18next";
import MultiSelectSecurityGovernance from "./Inputs/MultiSelectSecurityGovernance";
import { useRef, useState } from "react";
import { HiCheck, HiMinus, HiPlus } from "react-icons/hi2";
import { ModalCloseButton } from "../GlobalComponentStyles";
import { uniq } from "lodash";

const SecurityGovernance = (props: SecurityPropType) => {
  const { onPageDataChange, pageData } = props;
  const cisoOtherRef = useRef<any>();
  const memberOtherRef = useRef<any>();
  // For CISO Line OF Report
  const [cisoOthers, setCisoOthers] = useState<string[]>([]);
  const [showCISOSOtherInput, setShowCISOSOtherInput] = useState(false);
  const [cisoInputValue, setCisoInputValue] = useState("");

  // For MEMBERS
  const [newMembersOther, setNewMembersOther] = useState<string[]>([]);
  const [showMembersOtherInput, setShowMembersOtherInput] = useState(false);
  const [membersInputValue, setMembersInputValue] = useState("");
  const { t } = useTranslation();

  const Marksfont = `${window.innerWidth > 768 ? "0.75rem" : "0.55  rem"}`;
  const marks: MarksType = {
    0: {
      style: {
        color: "var(--riskonboarding-body-text-color)",
        width: "16.6%",
        whiteSpace: "pre-wrap",
        overflowWrap: "break-word",
        fontSize: Marksfont,
      },
      label: "Weekly",
    },
    20: {
      style: {
        color: "var(--riskonboarding-body-text-color)",
        width: "16.6%",
        whiteSpace: "pre-wrap",
        overflowWrap: "break-word",
        fontSize: Marksfont,
      },
      label: "Fortnight",
    },
    40: {
      style: {
        color: "var(--riskonboarding-body-text-color)",
        width: "16.6%",
        whiteSpace: "pre-wrap",
        overflowWrap: "break-word",
        fontSize: Marksfont,
      },
      label: "Monthly",
    },
    60: {
      style: {
        color: "var(--riskonboarding-body-text-color)",
        width: "16.6%",
        whiteSpace: "pre-wrap",
        overflowWrap: "break-word",
        fontSize: Marksfont,
      },
      label: "Quarterly",
    },
    80: {
      style: {
        color: "var(--riskonboarding-body-text-color)",
        width: "16.6%",
        whiteSpace: "pre-wrap",
        overflowWrap: "break-word",
        fontSize: Marksfont,
      },
      label: "Annually",
    },
    100: {
      style: {
        color: "var(--riskonboarding-body-text-color)",
        width: "12.6%",
        whiteSpace: "pre-wrap",
        overflowWrap: "break-word",
        fontSize: Marksfont,
        textAlign: "left",
      },
      label: "On Demand",
    },
  };

  const Auditmarks: AuditmarksType = {
    0: {
      style: {
        color: "var(--riskonboarding-body-text-color)",
        width: "14.2%",
        whiteSpace: "pre-wrap",
        overflowWrap: "break-word",
        fontSize: Marksfont,
      },
      label: "Never",
    },
    15: {
      style: {
        color: "var(--riskonboarding-body-text-color)",
        width: "14.2%",
        whiteSpace: "pre-wrap",
        overflowWrap: "break-word",
        fontSize: Marksfont,
      },
      label: "Weekly",
    },
    32: {
      style: {
        color: "var(--riskonboarding-body-text-color)",
        width: "14.2%",
        whiteSpace: "pre-wrap",
        overflowWrap: "break-word",
        fontSize: Marksfont,
      },
      label: "Fortnight",
    },
    48: {
      style: {
        color: "var(--riskonboarding-body-text-color)",
        width: "14.2%",
        whiteSpace: "pre-wrap",
        overflowWrap: "break-word",
        fontSize: Marksfont,
      },
      label: "Monthly",
    },
    66: {
      style: {
        color: "var(--riskonboarding-body-text-color)",
        width: "14.2%",
        whiteSpace: "pre-wrap",
        overflowWrap: "break-word",
        fontSize: Marksfont,
      },
      label: "Quarterly",
    },
    84: {
      style: {
        color: "var(--riskonboarding-body-text-color)",
        width: "14.2%",
        whiteSpace: "pre-wrap",
        overflowWrap: "break-word",
        fontSize: Marksfont,
      },
      label: "Annually",
    },
    100: {
      style: {
        color: "var(--riskonboarding-body-text-color)",
        width: "12.2%",
        whiteSpace: "pre-wrap",
        overflowWrap: "break-word",
        fontSize: Marksfont,
        textAlign: "left",
      },
      label: "On Demand",
    },
  };

  function findKeyAndValue<T extends Record<any, any>, K extends Function>(
    marks: T,
    predicate: K
  ) {
    for (const [key, value] of Object.entries(marks)) {
      if (predicate(value)) {
        return [key, value];
      }
    }
    return [null, null];
  }

  const toggleMembersOther = () => {
    setShowMembersOtherInput(!showMembersOtherInput);
  };
  const toggleCISOOther = () => {
    setShowCISOSOtherInput(!showCISOSOtherInput);
  };

  const pushToNewMembersArr = () => {
    setNewMembersOther((prev) => {
      const newArr = [...prev, membersInputValue];
      return newArr;
    });
    onPageDataChange({
      ...pageData,
      security_governance: {
        ...pageData["security_governance"],
        members_others: [
          ...uniq([
            ...pageData.security_governance.members_others,
            ...[...newMembersOther, membersInputValue],
          ]),
        ],
        deleted_members_others: pageData["security_governance"][
          "deleted_members_others"
        ].filter((rec) => rec !== membersInputValue),
      },
    });
    setMembersInputValue("");
    setShowMembersOtherInput(false);
  };

  const pushToCisoArr = () => {
    setCisoOthers((prev) => {
      const newArr = [...prev, cisoInputValue];
      return newArr;
    });
    onPageDataChange({
      ...pageData,
      security_governance: {
        ...pageData["security_governance"],
        ciso_lor_others: [
          ...uniq([
            ...pageData.security_governance.ciso_lor_others,
            ...[...cisoOthers, cisoInputValue],
          ]),
        ],
        deleted_ciso_others: pageData["security_governance"][
          "deleted_ciso_others"
        ].filter((rec) => rec !== cisoInputValue),
      },
    });
    setCisoInputValue("");
    setShowCISOSOtherInput(false);
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
        <Col xs={12}>
          <h1 className="securityTitleStyle">
            {t("securitygovernance").toUpperCase()}
          </h1>
        </Col>
      </Row>
      <div className="p-3">
        <Row md={12}>
          <Col md={12}>
            <div className="d-flex justify-content-between align-items-center mb-1 ">
              <h1 className="securityGovernance-iaf-h1-members m-0 pr-3 white-space-nowrap ">
                {t("cisolor").toUpperCase()}
              </h1>
              {!showCISOSOtherInput && (
                <ModalCloseButton className="m-0">
                  <button onClick={toggleCISOOther}>
                    <HiPlus color="inherent" fontSize="1rem" cursor="pointer" />
                  </button>
                </ModalCloseButton>
              )}
              {showCISOSOtherInput && (
                <>
                  <ModalCloseButton className="m-0">
                    <Form.Control
                      className="certificateRegulationInput"
                      type="text"
                      placeholder={t("eorh").toUpperCase()}
                      value={cisoInputValue}
                      onChange={(e) => setCisoInputValue(e.target.value)}
                      maxLength={15}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          if (
                            cisoInputValue.trim() !== "" &&
                            !alreadyExistInList(
                              [
                                ...pageData["security_governance"][
                                  "ciso_lor_others"
                                ],
                                ...pageData["security_governance"][
                                  "predefined_ciso_lor"
                                ],
                              ],
                              cisoInputValue,
                              pageData["security_governance"][
                                "deleted_ciso_others"
                              ]
                            )
                          ) {
                            cisoOtherRef.current.click();
                          }
                        }
                      }}
                    />
                    <>
                      {cisoInputValue.trim() === "" ||
                      alreadyExistInList(
                        [
                          ...pageData["security_governance"]["ciso_lor_others"],
                          ...pageData["security_governance"][
                            "predefined_ciso_lor"
                          ],
                        ],
                        cisoInputValue,
                        pageData["security_governance"]["deleted_ciso_others"]
                      ) ? (
                        <button onClick={toggleCISOOther}>
                          <HiMinus
                            fontSize="1rem"
                            color="inherent"
                            cursor="pointer"
                          />
                        </button>
                      ) : (
                        <button ref={cisoOtherRef} onClick={pushToCisoArr}>
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
          <Col md={12} className="mb-3">
            <div className="inline">
              <MultiSelectSecurityGovernance
                others={pageData["security_governance"]["ciso_lor_others"]}
                preDefs={pageData["security_governance"]["predefined_ciso_lor"]}
                selectedOthers={
                  pageData["security_governance"]["selected_ciso_lor_others"]
                }
                selectedPreDefs={
                  pageData["security_governance"]["selected_ciso_lor"]
                }
                deletedOther={
                  pageData["security_governance"]["deleted_ciso_others"]
                }
                newCreatedOther={cisoOthers}
                deleteNewCreated={setCisoOthers}
                onChange={(
                  selectedPreDef,
                  other,
                  selectedOther,
                  deletedOthers,
                  newMembersOthers
                ) => {
                  onPageDataChange({
                    ...pageData,
                    security_governance: {
                      ...pageData["security_governance"],
                      selected_ciso_lor: selectedPreDef,
                      ciso_lor_others: [
                        ...uniq([...other, ...newMembersOthers]),
                      ],
                      selected_ciso_lor_others: selectedOther,
                      deleted_ciso_others: deletedOthers,
                    },
                  });
                }}
              />
            </div>
          </Col>
        </Row>
        <Row md={12}>
          <Col md={12} className="mt-3">
            <h1 className="securityGovernance-iaf-h1">
              {t("ssc").toUpperCase()}
            </h1>
          </Col>
          <Col md={12} className="mb-3">
            <div className="inline securityGovernance-label">
              <h1 className="securityGovernance-strm-h1">
                {t("isthereasc")} &nbsp; &nbsp;
              </h1>

              <Form.Check
                inline
                value="Yes"
                name="group"
                type={"checkbox"}
                label="Yes"
                checked={
                  pageData["security_governance"]["steering_committee"] ===
                  "Yes"
                }
                onChange={(e) => {
                  onPageDataChange({
                    ...pageData,
                    security_governance: {
                      ...pageData["security_governance"],
                      steering_committee: "Yes",
                    },
                  });
                }}
              />
              <Form.Check
                inline
                value="No"
                name="group"
                type={"checkbox"}
                label="No"
                checked={
                  pageData["security_governance"]["steering_committee"] === "No"
                }
                onChange={(e) => {
                  onPageDataChange({
                    ...pageData,
                    security_governance: {
                      ...pageData["security_governance"],
                      steering_committee: "No",
                    },
                  });
                }}
              />
            </div>
          </Col>
        </Row>
        <Row md={12}>
          <Col md={12} className="mt-3">
            <div className="d-flex justify-content-between align-items-center mb-1 ">
              <h1 className="securityGovernance-iaf-h1-members m-0 pr-3">
                {t("members").toUpperCase()}
              </h1>
              {!showMembersOtherInput && (
                <ModalCloseButton className="m-0">
                  <button onClick={toggleMembersOther}>
                    <HiPlus color="inherent" fontSize="1rem" cursor="pointer" />
                  </button>
                </ModalCloseButton>
              )}
              {showMembersOtherInput && (
                <>
                  <ModalCloseButton className="m-0">
                    <Form.Control
                      className="certificateRegulationInput"
                      type="text"
                      placeholder={t("enterothermembers").toUpperCase()}
                      value={membersInputValue}
                      onChange={(e) => setMembersInputValue(e.target.value)}
                      maxLength={15}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          if (
                            membersInputValue.trim() !== "" &&
                            !alreadyExistInList(
                              [
                                ...pageData["security_governance"][
                                  "members_others"
                                ],
                                ...pageData["security_governance"][
                                  "predefined_members"
                                ],
                              ],
                              membersInputValue,
                              pageData["security_governance"][
                                "deleted_members_others"
                              ]
                            )
                          ) {
                            memberOtherRef.current.click();
                          }
                        }
                      }}
                    />
                    <>
                      {membersInputValue.trim() === "" ||
                      alreadyExistInList(
                        [
                          ...pageData["security_governance"]["members_others"],
                          ...pageData["security_governance"][
                            "predefined_members"
                          ],
                        ],
                        membersInputValue,
                        pageData["security_governance"][
                          "deleted_members_others"
                        ]
                      ) ? (
                        <button onClick={toggleMembersOther}>
                          <HiMinus
                            fontSize="1rem"
                            color="inherent"
                            cursor="pointer"
                          />
                        </button>
                      ) : (
                        <button
                          ref={memberOtherRef}
                          onClick={pushToNewMembersArr}
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
          <Col md={12} className="mb-3">
            <div className=" inline">
              <MultiSelectSecurityGovernance
                others={pageData["security_governance"]["members_others"]}
                preDefs={pageData["security_governance"]["predefined_members"]}
                selectedOthers={
                  pageData["security_governance"]["selected_members_others"]
                }
                selectedPreDefs={
                  pageData["security_governance"]["selected_members"]
                }
                deletedOther={
                  pageData["security_governance"]["deleted_members_others"]
                }
                newCreatedOther={newMembersOther}
                deleteNewCreated={setNewMembersOther}
                onChange={(
                  selectedPreDef,
                  other,
                  selectedOther,
                  deletedOthers,
                  newCreatedOtherUpdated
                ) => {
                  onPageDataChange({
                    ...pageData,
                    security_governance: {
                      ...pageData["security_governance"],
                      selected_members: selectedPreDef,
                      members_others: [
                        ...uniq([...other, ...newCreatedOtherUpdated]),
                      ],
                      selected_members_others: selectedOther,
                      deleted_members_others: deletedOthers,
                    },
                  });
                }}
              />
            </div>
          </Col>
        </Row>
        <Row
          md={12}
          className="justify-content-center align-items-center margin-bottom-46-4 mt-3"
        >
          <h1 className="col-md-12 securityGovernance-iaf-h1">
            {t("howoftendotheymeet").toUpperCase()}
          </h1>
          <Col md={12}>
            <SliderBar
              marks={marks}
              value={
                findKeyAndValue(
                  marks,
                  (obj: any) =>
                    obj.label ===
                    pageData["security_governance"]["meeting_frequency"]
                )[0]
              }
              onChange={(newValue) => {
                onPageDataChange({
                  ...pageData,
                  security_governance: {
                    ...pageData["security_governance"],
                    meeting_frequency: marks[newValue].label,
                  },
                });
              }}
              marginRight={20}
              marginLeft={20}
              marginTop={0}
              marginBottom={0}
              width="100%"
            />
          </Col>
        </Row>
        <br />
        <Row
          md={12}
          className="align-items-center justify-content-center margin-bottom-24"
        >
          <h1 className="col-md-12 securityGovernance-iaf-h1">
            {t("iaf").toUpperCase()}
          </h1>
          <Col md={12}>
            <SliderBar
              marks={Auditmarks}
              value={
                findKeyAndValue(
                  Auditmarks,
                  (obj: any) =>
                    obj.label ===
                    pageData["security_governance"]["internal_audit_frequency"]
                )[0]
              }
              onChange={(newValue) => {
                onPageDataChange({
                  ...pageData,
                  security_governance: {
                    ...pageData["security_governance"],
                    internal_audit_frequency: Auditmarks[newValue].label,
                  },
                });
              }}
              width="100%"
              marginRight={20}
              marginLeft={20}
              marginTop={10}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SecurityGovernance;
