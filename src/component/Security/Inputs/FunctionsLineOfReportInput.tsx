import { Col, Form, Row } from "react-bootstrap";
import { FunctionsLineOfReportInputProps } from "../SecurityTypes";
import { HiTrash } from "react-icons/hi2";

const FunctionsLineOfReportInput = (props: FunctionsLineOfReportInputProps) => {
  const {
    onChange,
    deletedOtherFlor,
    optionsFlor,
    othersFlor,
    preDefFlor,
    selectOtherFlor,
    selectedPreDefFlor,
    deleteNewCreatedFlor,
    newCreatedFlorOther,
  } = props;

  return (
    <>
      <Row className="text-center">
        <Col xs={6} md={5} lg={4}></Col>
        {optionsFlor.map((option, index) => (
          <Col xs={2} key={index}>
            <h1 className="securityCompliance-rcr">{option}</h1>
          </Col>
        ))}
      </Row>
      {preDefFlor.map((flor, index) => {
        return (
          <Row key={index}>
            <Col xs={6} md={5} lg={4}>
              <h1 className=" securityCompliance-rcr">{flor}</h1>
            </Col>
            {optionsFlor.map((opt, index) => {
              return (
                <Col
                  key={index}
                  xs={2}
                  className="d-flex justify-content-center"
                >
                  <Form.Check
                    className="me-0 securityGovernance-label"
                    inline
                    value={opt}
                    name={flor}
                    checked={
                      selectedPreDefFlor.find((record) => record.name === flor)
                        ?.value === opt
                    }
                    onChange={(e) => {
                      if (e.target.checked) {
                        if (
                          selectedPreDefFlor.findIndex(
                            (rec) => rec.name === e.target.name
                          ) === -1
                        ) {
                          onChange(
                            [
                              ...selectedPreDefFlor,
                              {
                                label: e.target.name,
                                name: e.target.name,
                                value: opt,
                              },
                            ],
                            othersFlor,
                            selectOtherFlor,
                            deletedOtherFlor,
                            newCreatedFlorOther
                          );
                        } else {
                          onChange(
                            [
                              ...selectedPreDefFlor.map((res, i) => {
                                if (res.name === e.target.name) {
                                  return {
                                    ...res,
                                    value: opt,
                                  };
                                }
                                return res;
                              }),
                            ],
                            othersFlor,
                            selectOtherFlor,
                            deletedOtherFlor,
                            newCreatedFlorOther
                          );
                        }
                      }
                    }}
                    type={"radio"}
                  >
                    <Form.Check.Input
                      className="me-0"
                      value={opt}
                      name={flor}
                      checked={
                        selectedPreDefFlor.find(
                          (record) => record.name === flor
                        )?.value === opt
                      }
                      onChange={(e) => {
                        if (e.target.checked) {
                          if (
                            selectedPreDefFlor.findIndex(
                              (rec) => rec.name === e.target.name
                            ) === -1
                          ) {
                            onChange(
                              [
                                ...selectedPreDefFlor,
                                {
                                  label: e.target.name,
                                  name: e.target.name,
                                  value: opt,
                                },
                              ],
                              othersFlor,
                              selectOtherFlor,
                              deletedOtherFlor,
                              newCreatedFlorOther
                            );
                          } else {
                            onChange(
                              [
                                ...selectedPreDefFlor.map((res, i) => {
                                  if (res.name === e.target.name) {
                                    return {
                                      ...res,
                                      value: opt,
                                    };
                                  }
                                  return res;
                                }),
                              ],
                              othersFlor,
                              selectOtherFlor,
                              deletedOtherFlor,
                              newCreatedFlorOther
                            );
                          }
                        }
                      }}
                      type={"radio"}
                    />
                  </Form.Check>
                </Col>
              );
            })}
          </Row>
        );
      })}
      {[...othersFlor.filter((rec) => !deletedOtherFlor.includes(rec))].map(
        (flor, index) => {
          return (
            <Row key={index}>
              <Col xs={6} md={5} lg={4}>
                <div className="d-flex justify-content-start align-items-center gap-point-25">
                  <h1 className="securityCompliance-rcr m-0">
                    {flor.toUpperCase()}
                  </h1>
                  <HiTrash
                    onClick={() => {
                      onChange(
                        selectedPreDefFlor,
                        othersFlor.filter((res, i) => res !== flor),
                        selectOtherFlor.filter((res, i) => res.name !== flor),
                        [...deletedOtherFlor, flor],
                        newCreatedFlorOther
                      );
                    }}
                    fontSize={"0.75rem"}
                    cursor={"pointer"}
                  />
                </div>
              </Col>
              {optionsFlor.map((opt, index) => {
                return (
                  <Col
                    key={index}
                    xs={2}
                    className="d-flex justify-content-center"
                  >
                    <Form.Check
                      className="me-0 securityGovernance-label"
                      inline
                      value={opt}
                      name={flor}
                      checked={
                        selectOtherFlor.find((record) => record.name === flor)
                          ?.value === opt
                      }
                      onChange={(e) => {
                        if (e.target.checked) {
                          if (
                            selectOtherFlor.findIndex(
                              (rec) => rec.name === e.target.name
                            ) === -1
                          ) {
                            onChange(
                              selectedPreDefFlor,
                              othersFlor,
                              [
                                ...selectOtherFlor,
                                {
                                  label: e.target.name,
                                  name: e.target.name,
                                  value: opt,
                                },
                              ],
                              deletedOtherFlor,
                              newCreatedFlorOther
                            );
                          } else {
                            onChange(
                              selectedPreDefFlor,
                              othersFlor,
                              [
                                ...selectOtherFlor.map((res, i) => {
                                  if (res.name === e.target.name) {
                                    return {
                                      ...res,
                                      value: opt,
                                    };
                                  }
                                  return res;
                                }),
                              ],
                              deletedOtherFlor,
                              newCreatedFlorOther
                            );
                          }
                        }
                      }}
                      type={"radio"}
                    >
                      <Form.Check.Input
                        className="me-0"
                        value={opt}
                        name={flor}
                        checked={
                          selectOtherFlor.find((record) => record.name === flor)
                            ?.value === opt
                        }
                        onChange={(e) => {
                          if (e.target.checked) {
                            if (
                              selectOtherFlor.findIndex(
                                (rec) => rec.name === e.target.name
                              ) === -1
                            ) {
                              onChange(
                                selectedPreDefFlor,
                                othersFlor,
                                [
                                  ...selectOtherFlor,
                                  {
                                    label: e.target.name,
                                    name: e.target.name,
                                    value: opt,
                                  },
                                ],
                                deletedOtherFlor,
                                newCreatedFlorOther
                              );
                            } else {
                              onChange(
                                selectedPreDefFlor,
                                othersFlor,
                                [
                                  ...selectOtherFlor.map((res, i) => {
                                    if (res.name === e.target.name) {
                                      return {
                                        ...res,
                                        value: opt,
                                      };
                                    }
                                    return res;
                                  }),
                                ],
                                deletedOtherFlor,
                                newCreatedFlorOther
                              );
                            }
                          }
                        }}
                        type={"radio"}
                      />
                    </Form.Check>
                  </Col>
                );
              })}
            </Row>
          );
        }
      )}
      {[...newCreatedFlorOther.filter((rec) => !othersFlor.includes(rec))].map(
        (flor, index) => {
          return (
            <Row key={index}>
              <Col xs={6} md={5} lg={4}>
                <div className="d-flex justify-content-start align-items-center gap-point-25">
                  <h1 className="securityCompliance-rcr m-0">
                    {flor.toUpperCase()}
                  </h1>
                  <HiTrash
                    onClick={() => {
                      onChange(
                        selectedPreDefFlor,
                        othersFlor,
                        selectOtherFlor.filter((res, i) => res.name !== flor),
                        deletedOtherFlor,
                        newCreatedFlorOther.filter((res, i) => res !== flor)
                      );
                      deleteNewCreatedFlor((prev) => {
                        const newArr = [...prev].filter(
                          (res, i) => res !== flor
                        );
                        return newArr;
                      });
                    }}
                    fontSize={"0.75rem"}
                    cursor={"pointer"}
                  />
                </div>
              </Col>
              {optionsFlor.map((opt, index) => {
                return (
                  <Col
                    key={index}
                    xs={2}
                    className="d-flex justify-content-center"
                  >
                    <Form.Check
                      className="me-0 securityGovernance-label"
                      inline
                      value={opt}
                      name={flor}
                      checked={
                        selectOtherFlor.find((record) => record.name === flor)
                          ?.value === opt
                      }
                      onChange={(e) => {
                        if (e.target.checked) {
                          if (
                            selectOtherFlor.findIndex(
                              (rec) => rec.name === e.target.name
                            ) === -1
                          ) {
                            onChange(
                              selectedPreDefFlor,
                              othersFlor,
                              [
                                ...selectOtherFlor,
                                {
                                  label: e.target.name,
                                  name: e.target.name,
                                  value: opt,
                                },
                              ],
                              deletedOtherFlor,
                              newCreatedFlorOther
                            );
                          } else {
                            onChange(
                              selectedPreDefFlor,
                              othersFlor,
                              [
                                ...selectOtherFlor.map((res, i) => {
                                  if (res.name === e.target.name) {
                                    return {
                                      ...res,
                                      value: opt,
                                    };
                                  }
                                  return res;
                                }),
                              ],
                              deletedOtherFlor,
                              newCreatedFlorOther
                            );
                          }
                        }
                      }}
                      type={"radio"}
                    >
                      <Form.Check.Input
                        className="me-0"
                        value={opt}
                        name={flor}
                        checked={
                          selectOtherFlor.find((record) => record.name === flor)
                            ?.value === opt
                        }
                        onChange={(e) => {
                          if (e.target.checked) {
                            if (
                              selectOtherFlor.findIndex(
                                (rec) => rec.name === e.target.name
                              ) === -1
                            ) {
                              onChange(
                                selectedPreDefFlor,
                                othersFlor,
                                [
                                  ...selectOtherFlor,
                                  {
                                    label: e.target.name,
                                    name: e.target.name,
                                    value: opt,
                                  },
                                ],
                                deletedOtherFlor,
                                newCreatedFlorOther
                              );
                            } else {
                              onChange(
                                selectedPreDefFlor,
                                othersFlor,
                                [
                                  ...selectOtherFlor.map((res, i) => {
                                    if (res.name === e.target.name) {
                                      return {
                                        ...res,
                                        value: opt,
                                      };
                                    }
                                    return res;
                                  }),
                                ],
                                deletedOtherFlor,
                                newCreatedFlorOther
                              );
                            }
                          }
                        }}
                        type={"radio"}
                      />
                    </Form.Check>
                  </Col>
                );
              })}
            </Row>
          );
        }
      )}
    </>
  );
};

export default FunctionsLineOfReportInput;
