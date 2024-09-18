import React, { Dispatch, SetStateAction } from "react";
import { Form } from "react-bootstrap";
import { HiTrash } from "react-icons/hi2";

interface IMultiSelectSecurityGovernance {
  preDefs: string[];
  selectedPreDefs: string[];
  others: string[];
  selectedOthers: string[];
  deletedOther: string[];
  newCreatedOther: string[];
  deleteNewCreated: Dispatch<SetStateAction<string[]>>;
  onChange: (
    selectedPreDefs: string[],
    others: string[],
    selectedOthers: string[],
    deletedOther: string[],
    newCreatedOther: string[]
  ) => void;
}

const MultiSelectSecurityGovernance: React.FC<
  IMultiSelectSecurityGovernance
> = ({
  preDefs,
  selectedPreDefs,
  others,
  selectedOthers,
  onChange,
  deletedOther,
  newCreatedOther,
  deleteNewCreated,
}) => {
  return (
    <Form className="securityGovernance-label">
      {preDefs.map((res, i) => {
        let isSelected = selectedPreDefs.includes(res);
        return (
          <Form.Check
            key={res}
            inline
            name={res}
            type={"checkbox"}
            label={res.toUpperCase()}
            checked={isSelected}
            onChange={(e) => {
              if (e.target.checked) {
                onChange(
                  [...selectedPreDefs, res],
                  others,
                  selectedOthers,
                  deletedOther,
                  newCreatedOther
                );
              } else {
                onChange(
                  selectedPreDefs.filter((rec) => rec !== res),
                  others,
                  selectedOthers,
                  deletedOther,
                  newCreatedOther
                );
              }
            }}
          />
        );
      })}
      {[...others.filter((rec) => !deletedOther.includes(rec))].map(
        (res, i) => {
          let isSelected = selectedOthers.includes(res);
          return (
            <React.Fragment key={res}>
              <Form.Check
                inline
                name={res}
                type={"checkbox"}
                label={
                  <div className="d-flex justify-content-center align-items-center gap-point-25">
                    {res.toUpperCase()}
                    <HiTrash
                      color="inherent"
                      cursor="pointer"
                      onClick={() => {
                        onChange(
                          selectedPreDefs,
                          others.filter((rec) => rec !== res),
                          selectedOthers.filter((rec) => rec !== res),
                          [...deletedOther, res],
                          newCreatedOther
                        );
                      }}
                    />
                  </div>
                }
                checked={isSelected}
                onChange={(e) => {
                  if (e.target.checked) {
                    onChange(
                      selectedPreDefs,
                      others,
                      [...selectedOthers, res],
                      deletedOther,
                      newCreatedOther
                    );
                  } else {
                    onChange(
                      selectedPreDefs,
                      others,
                      selectedOthers.filter((rec) => rec !== res),
                      deletedOther,
                      newCreatedOther
                    );
                  }
                }}
              />
            </React.Fragment>
          );
        }
      )}
      {[...newCreatedOther.filter((rec) => !others.includes(rec))].map(
        (res, i) => {
          let isSelected = selectedOthers.includes(res);
          return (
            <React.Fragment key={res}>
              <Form.Check
                inline
                name={res.toUpperCase()}
                type={"checkbox"}
                label={
                  <div className="d-flex justify-content-center align-items-center gap-point-25">
                    {res}
                    <HiTrash
                      color="inherent"
                      cursor="pointer"
                      onClick={() => {
                        onChange(
                          selectedPreDefs,
                          others.filter((rec) => rec !== res),
                          selectedOthers.filter((rec) => rec !== res),
                          deletedOther,
                          newCreatedOther.filter((rec) => rec !== res)
                        );
                        deleteNewCreated((prev) => {
                          const newArr = [...prev].filter((rec) => rec !== res);
                          return newArr;
                        });
                      }}
                    />
                  </div>
                }
                checked={isSelected}
                onChange={(e) => {
                  if (e.target.checked) {
                    onChange(
                      selectedPreDefs,
                      others,
                      [...selectedOthers, res],
                      deletedOther,
                      newCreatedOther
                    );
                  } else {
                    onChange(
                      selectedPreDefs,
                      others,
                      selectedOthers.filter((rec) => rec !== res),
                      deletedOther,
                      newCreatedOther
                    );
                  }
                }}
              />
            </React.Fragment>
          );
        }
      )}
    </Form>
  );
};

export default MultiSelectSecurityGovernance;
