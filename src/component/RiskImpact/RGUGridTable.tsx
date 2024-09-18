import { useTranslation } from "react-i18next";
import { FuntionAndProcessOfRgu } from "../../store/Rgu/RguType";
import {
  RGUTableBodyContainer,
  RGUTableContainer,
  RGUTableStyledCheckBox,
  RguGridTable,
} from "./RiskImpactStyles";
import { RGUData } from "./RiskImpactUtils";
import React from "react";

interface Props {
  listType: "function" | "process";
  data: RGUData[];
  listOfFunctionProcess: FuntionAndProcessOfRgu[];
  onSave: (data: RGUData[]) => void;
  setRguDataList: React.Dispatch<React.SetStateAction<RGUData[]>>;
}

function RGUGridTable({
  listType,
  data,
  listOfFunctionProcess,
  onSave,
  setRguDataList,
}: Props) {
  const { t } = useTranslation();

  const onFunctionNameClick = (
    fn: FuntionAndProcessOfRgu,
    rguId: null | number
  ) => {
    const newArr = [...data];
    const indexOfSelectedRgu = newArr.findIndex((y) => y.id === rguId);

    let updatedArr: RGUData[];

    if (
      newArr[indexOfSelectedRgu].functions_processes
        .map((gg) => gg.id)
        .includes(fn.id)
    ) {
      updatedArr = [
        ...newArr.slice(0, indexOfSelectedRgu),
        {
          ...newArr[indexOfSelectedRgu],
          functions_processes: [
            ...newArr[indexOfSelectedRgu].functions_processes.filter(
              (pp) => pp.id !== fn.id
            ),
          ],
        },
        ...newArr.slice(indexOfSelectedRgu + 1),
      ];
    } else {
      updatedArr = [
        ...newArr.slice(0, indexOfSelectedRgu),
        {
          ...newArr[indexOfSelectedRgu],
          functions_processes: [
            ...newArr[indexOfSelectedRgu].functions_processes,
            { ...fn },
          ],
        },
        ...newArr.slice(indexOfSelectedRgu + 1),
      ];
    }

    setRguDataList(updatedArr);
    onSave(updatedArr);
  };

  const onProcessNameClick = (
    fn: FuntionAndProcessOfRgu,
    p: {
      id: number;
      process_name: string;
      parent_id: string;
      process_id: string;
    },
    rguId: null | number
  ) => {
    const newArr = [...data];
    const indexOfSelectedRgu = newArr.findIndex((y) => y.id === rguId);

    const indexOfFunction = newArr[
      indexOfSelectedRgu
    ].functions_processes.findIndex((pp) => pp.id === fn.id);

    let updatedArr: RGUData[];

    if (
      newArr[indexOfSelectedRgu].functions_processes
        .map((gg) => gg.id)
        .includes(fn.id)
    ) {
      // first Condition check if process array includes clicked id  then remove it
      // if not included then add
      // if array length in zero then remove the fn obj
      if (
        newArr[indexOfSelectedRgu].functions_processes[indexOfFunction].process
          .map((lk) => lk.id)
          .includes(p.id)
      ) {
        // remove the process

        updatedArr = [
          ...newArr.slice(0, indexOfSelectedRgu),
          {
            ...newArr[indexOfSelectedRgu],
            functions_processes: [
              ...newArr[indexOfSelectedRgu].functions_processes.slice(
                0,
                indexOfFunction
              ),
              {
                ...newArr[indexOfSelectedRgu].functions_processes[
                  indexOfFunction
                ],
                process: newArr[indexOfSelectedRgu].functions_processes[
                  indexOfFunction
                ].process.filter((gg) => gg.id !== p.id),
              },
              ...newArr[indexOfSelectedRgu].functions_processes.slice(
                indexOfFunction + 1
              ),
            ].filter((h) => h.process.length !== 0),
          },
          ...newArr.slice(indexOfSelectedRgu + 1),
        ];
      } else {
        // add
        updatedArr = updatedArr = [
          ...newArr.slice(0, indexOfSelectedRgu),
          {
            ...newArr[indexOfSelectedRgu],
            functions_processes: [
              ...newArr[indexOfSelectedRgu].functions_processes.slice(
                0,
                indexOfFunction
              ),
              {
                ...newArr[indexOfSelectedRgu].functions_processes[
                  indexOfFunction
                ],
                process: [
                  ...newArr[indexOfSelectedRgu].functions_processes[
                    indexOfFunction
                  ].process,
                  { ...p },
                ],
              },
              ...newArr[indexOfSelectedRgu].functions_processes.slice(
                indexOfFunction + 1
              ),
            ].filter((h) => h.process.length !== 0),
          },
          ...newArr.slice(indexOfSelectedRgu + 1),
        ];
      }
    } else {
      updatedArr = [
        ...newArr.slice(0, indexOfSelectedRgu),
        {
          ...newArr[indexOfSelectedRgu],
          functions_processes: [
            ...newArr[indexOfSelectedRgu].functions_processes,
            {
              ...fn,
              process: [
                {
                  ...p,
                },
              ],
            },
          ],
        },
        ...newArr.slice(indexOfSelectedRgu + 1),
      ];
    }
    setRguDataList(updatedArr);
    onSave(updatedArr);
  };

  return (
    <RGUTableContainer>
      <RGUTableBodyContainer>
        <RguGridTable>
          <thead>
            <tr>
              {listType === "function" && (
                <th className="borderRight">{t("functions").toUpperCase()}</th>
              )}
              {listType === "process" && (
                <th className="borderRight">{t("processes").toUpperCase()}</th>
              )}

              {data.map((rgu) => (
                <th key={rgu.id}>
                  <div className="rguNameContainer">
                    <div className="rotate">{rgu.rgu_name.toUpperCase()}</div>
                    <div className="count">
                      {listType === "function" && (
                        <b>
                          ({rgu.functions_processes.length}/
                          {listOfFunctionProcess.length})
                        </b>
                      )}
                      {listType === "process" && (
                        <b>
                          (
                          {
                            rgu.functions_processes
                              .map((func) => func.process)
                              .flat().length
                          }
                          /
                          {
                            listOfFunctionProcess
                              .map((func) => func.process)
                              .flat().length
                          }
                          )
                        </b>
                      )}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {listType === "function" && (
              <>
                {listOfFunctionProcess.map((func, index: number) => (
                  <tr key={func.id}>
                    <td className="borderRight">{func.function_name}</td>

                    {data.map((rgu) => (
                      <td key={rgu.id}>
                        <RGUTableStyledCheckBox
                          type="checkbox"
                          id="default-checkbox"
                          label=""
                          checked={
                            rgu.functions_processes.findIndex((record) => {
                              return record.id === func.id;
                            }) !== -1
                          }
                          onChange={() => onFunctionNameClick(func, rgu.id)}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </>
            )}
            {listType === "process" && (
              <>
                {listOfFunctionProcess.map((func) => (
                  <React.Fragment key={func.function_id}>
                    {func.process.map((process) => (
                      <tr key={func.id + process.process_id}>
                        <td className="borderRight">{process.process_name}</td>
                        {data.map((rgu) => (
                          <td key={rgu.id}>
                            <RGUTableStyledCheckBox
                              type="checkbox"
                              id="default-checkbox"
                              label=""
                              checked={
                                rgu.functions_processes.findIndex((record) => {
                                  return (
                                    record.process.findIndex((pr) => {
                                      return pr.id === process.id;
                                    }) !== -1
                                  );
                                }) !== -1
                              }
                              onChange={() =>
                                onProcessNameClick(func, process, rgu.id)
                              }
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </>
            )}
          </tbody>
        </RguGridTable>
      </RGUTableBodyContainer>
    </RGUTableContainer>
  );
}

export default RGUGridTable;
