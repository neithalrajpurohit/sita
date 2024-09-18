import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import {
  HiPencil,
  HiTrash,
  HiOutlineMagnifyingGlass,
  HiOutlineXMark,
} from "react-icons/hi2";
import { HiCheck } from "react-icons/hi";
import CurrencyInput from "react-currency-input-field";
import { formatCurrencyWithCommas } from "../../utils/CurrenyConverter";
import { useTranslation } from "react-i18next";

const PerAssetTechnologies = ({
  technologies,
  data,
  addHandler,
  handleOnChange,
  handleInput,
  addSelectedTechnology,
  removeSelectedTechnology,
  selectedTechnologies,
  handleEdit,
  handleDelete,
  handleSearch,
  cardId,
  handleDropDownChange,
  resetDropDownData,
  resetSearchInput,
  handleInputOnKeyDown,
}: any) => {
  const [showEditInput, setShowEditInput] = useState<any>(null);
  const [showSearch, setShowSearch] = useState(false);
  const { t } = useTranslation();

  const [assetDropDown, setAssetDropDown] = useState(
    technologies["assetTechnology"]
  );

  useEffect(() => {
    // perasset dropdown
    if (technologies["assetTechnology"].length >= 1) {
      const section = data?.find((item: any) => item.section === 1);
      const updatedDropDown = technologies["assetTechnology"]?.filter(
        (item: any) =>
          !section?.values.some(
            (card: any) => card.title === item.technology_name
          )
      );
      setAssetDropDown(updatedDropDown);
    }
  }, [data]);

  useEffect(() => {
    if (selectedTechnologies["assetTechnology"].length >= 2) {
      setShowEditInput(null);
    }
  }, [selectedTechnologies]);

  return (
    <div className="securityContainerStyle-COSC">
      <div className="p-3">
        {data?.map((card: any, i: any) => {
          return (
            <div key={i}>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <h1 className="information-security-h1 m-0 p-0">
                  {card.title}
                </h1>
                <div className="d-flex gap-3">
                  {showSearch ? (
                    <div className="d-flex align-items-center gap-2">
                      <Form.Control
                        className="cop_input-placeholder cosc-form-control-width-200"
                        id="asset_search_input"
                        placeholder={`${t("search")}...`}
                        onChange={(e) => {
                          handleSearch(
                            e,
                            3,
                            card.section,
                            "assetTech",
                            "assetTechnology"
                          );
                        }}
                      />
                      <HiOutlineXMark
                        cursor="pointer"
                        id="asset_cancel_btn"
                        size={20}
                        onClick={() => {
                          resetDropDownData(3, 1);
                          setShowSearch(false);
                          resetSearchInput();
                        }}
                      />
                    </div>
                  ) : (
                    <HiOutlineMagnifyingGlass
                      id="asset_search_btn"
                      onClick={() => {
                        setShowSearch(!showSearch);
                      }}
                      size={19}
                      cursor="pointer"
                    />
                  )}
                  {selectedTechnologies["assetTechnology"].length >= 2 && (
                    <HiTrash
                      size={20}
                      id="asset_trash_btn"
                      onClick={() => {
                        handleDelete(
                          null,
                          3,
                          1,
                          "assetTech",
                          "assetTechnology"
                        );
                      }}
                      cursor="pointer"
                    />
                  )}
                  {showEditInput && (
                    <HiCheck
                      id="asset_save_btn"
                      onClick={() => {
                        handleEdit(
                          showEditInput,
                          3,
                          1,
                          "assetTech",
                          "assetTechnology"
                        );
                        setShowEditInput(null);
                      }}
                      size={20}
                      cursor="pointer"
                    />
                  )}
                </div>
              </div>
              <div>
                <table className="border-collapse-seprate">
                  <thead className="cop_thead">
                    <tr className="cop_tr">
                      <td className="pr-3 pl-22">
                        <div>
                          <p className="m-0 pb-1 cosc-input-label">
                            {t("technology")}
                          </p>
                          <Form.Select
                            className="cop_input-placeholder"
                            placeholder="Enter name"
                            id="asset_dropdown"
                            onKeyDown={(e) => {
                              handleInputOnKeyDown(e);
                              if (e.key === "Enter") {
                                addHandler(card.section, 3, "assetTech");
                              }
                            }}
                            defaultValue={"false"}
                            value={
                              JSON.stringify(
                                technologies["assetTechnology"].find(
                                  (item: any) => {
                                    return (
                                      handleInput["assetTech"].technology ===
                                      item.technology_name
                                    );
                                  }
                                )
                              ) ?? "false"
                            }
                            onChange={(e) => {
                              const techData = JSON.parse(e.target.value);
                              handleDropDownChange(
                                techData.technology_name,
                                "technology",
                                "assetTech",
                                techData.id
                              );
                            }}
                          >
                            <option value="false" disabled>
                              Select Technology
                            </option>
                            {assetDropDown.map((item: any, i: number) => {
                              return (
                                <option key={i} value={JSON.stringify(item)}>
                                  {item.technology_name}
                                </option>
                              );
                            })}
                          </Form.Select>
                        </div>
                      </td>
                      <td className="pr-3">
                        <div>
                          <p className="m-0 pb-1 cosc-input-label">
                            {t("unitcostmonthly")}
                          </p>
                          <Form.Control
                            className="cop_curreny_input"
                            placeholder="$"
                            id="asset_edit_monthlycost"
                            onKeyDown={(e) => {
                              handleInputOnKeyDown(e);
                              if (e.key === "Enter") {
                                addHandler(card.section, 3, "assetTech");
                              }
                            }}
                            as={CurrencyInput}
                            prefix=" "
                            intlConfig={{ locale: "en-US", currency: "USD" }}
                            disabled={
                              showEditInput ||
                              handleInput.assetTech.isMonthlyInputDisabled
                            }
                            value={
                              handleInput.assetTech.monthlyCost?.length === 0
                                ? ""
                                : showEditInput
                                ? ""
                                : handleInput.assetTech.monthlyCost
                            }
                            onChange={(e) => {
                              if (e.target.value.length <= 9) {
                                handleOnChange(e, "monthlyCost", "assetTech");
                              }
                            }}
                          />
                        </div>
                      </td>
                      <td className="pr-22">
                        <div>
                          <p className="m-0 pb-1 cosc-input-label">
                            {t("unitcostannual")}
                          </p>
                          <div className="d-flex align-items-center gap-1">
                            <Form.Control
                              className="cop_curreny_input"
                              placeholder="$"
                              id="asset_annualcost"
                              onKeyDown={(e) => {
                                handleInputOnKeyDown(e);
                                if (e.key === "Enter") {
                                  addHandler(card.section, 3, "assetTech");
                                }
                              }}
                              as={CurrencyInput}
                              prefix=" "
                              intlConfig={{ locale: "en-US", currency: "USD" }}
                              disabled={
                                showEditInput ||
                                handleInput.assetTech.isAnnualInputDisabled
                              }
                              value={
                                handleInput.assetTech.annualCost?.length === 0
                                  ? ""
                                  : showEditInput
                                  ? ""
                                  : handleInput.assetTech.annualCost
                              }
                              onChange={(e) => {
                                if (e.target.value.length <= 12) {
                                  handleOnChange(e, "annualCost", "assetTech");
                                }
                              }}
                            />
                            <Button
                              id="asset_add_btn "
                              className="cosc-asset-add-btn "
                              onClick={() =>
                                addHandler(card.section, 3, "assetTech")
                              }
                            >
                              +
                            </Button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </thead>
                  <tbody className="cop_tbody cop_scrollbar cop_table_body">
                    {card?.values?.map((item: any, i: any) => {
                      return (
                        <tr className="cop_tr" key={i}>
                          <td>
                            <div className="d-flex align-items-center mt-2">
                              <Form.Check
                                value="Yes"
                                id={`${"select"}-${i}`}
                                type={"checkbox"}
                                checked={selectedTechnologies[
                                  "assetTechnology"
                                ]?.find(
                                  (card: any) => card.title === item.title
                                )}
                                label=""
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    addSelectedTechnology(
                                      item,
                                      "assetTechnology"
                                    );
                                  } else {
                                    setShowEditInput(false);
                                    resetSearchInput();
                                    removeSelectedTechnology(
                                      item,
                                      "assetTechnology"
                                    );
                                  }
                                }}
                              />
                              <div className="pl-2 font-size-zero-point-nine ">
                                {item.title}
                              </div>
                              <div className="d-flex gap-2 ml-2"></div>
                            </div>
                          </td>
                          <td>
                            <div className="font-size-point-9375-rem w-90">
                              {showEditInput &&
                              selectedTechnologies["assetTechnology"][0]
                                ?.title === item.title ? (
                                <div className="">
                                  <Form.Control
                                    className="cop_curreny_input"
                                    id="asset_edit_monthlycost"
                                    onKeyDown={(e) => {
                                      handleInputOnKeyDown(e);
                                      if (e.key === "Enter") {
                                        handleEdit(
                                          showEditInput,
                                          3,
                                          1,
                                          "assetTech",
                                          "assetTechnology"
                                        );
                                        setShowEditInput(null);
                                      }
                                    }}
                                    placeholder={
                                      formatCurrencyWithCommas(
                                        showEditInput?.statistics[0]?.value,
                                        "USD"
                                      )?.replace("US$", "") ?? "$$$"
                                    }
                                    as={CurrencyInput}
                                    prefix=" "
                                    intlConfig={{
                                      locale: "en-US",
                                      currency: "USD",
                                    }}
                                    disabled={
                                      handleInput.assetTech
                                        .isMonthlyInputDisabled
                                    }
                                    value={handleInput.assetTech.monthlyCost}
                                    onChange={(e) => {
                                      if (e.target.value.length <= 9) {
                                        handleOnChange(
                                          e,
                                          "monthlyCost",
                                          "assetTech"
                                        );
                                      }
                                    }}
                                  />
                                </div>
                              ) : (
                                <p className="m-0 text-right">
                                  {formatCurrencyWithCommas(
                                    item?.statistics[0]?.value,
                                    "USD"
                                  )?.replace("US$", "") ?? "-"}
                                </p>
                              )}
                            </div>
                          </td>
                          <td>
                            <div className="d-flex justify-content-between font-size-point-8125-rem">
                              <div className="font-size-point-9375-rem perassettechnology-container">
                                {showEditInput &&
                                selectedTechnologies["assetTechnology"][0]
                                  ?.title === item.title ? (
                                  <div className="">
                                    <Form.Control
                                      className="cop_curreny_input w-100"
                                      id="asset_edit_annualcost"
                                      onKeyDown={(e) => {
                                        handleInputOnKeyDown(e);
                                        if (e.key === "Enter") {
                                          handleEdit(
                                            showEditInput,
                                            3,
                                            1,
                                            "assetTech",
                                            "assetTechnology"
                                          );
                                          setShowEditInput(null);
                                        }
                                      }}
                                      placeholder={
                                        formatCurrencyWithCommas(
                                          showEditInput?.statistics[1]?.value,
                                          "USD"
                                        )?.replace("US$", "") ?? "$$$"
                                      }
                                      as={CurrencyInput}
                                      prefix=" "
                                      intlConfig={{
                                        locale: "en-US",
                                        currency: "USD",
                                      }}
                                      disabled={
                                        handleInput.assetTech
                                          .isAnnualInputDisabled
                                      }
                                      value={handleInput.assetTech.annualCost}
                                      onChange={(e) => {
                                        if (e.target.value.length <= 12) {
                                          handleOnChange(
                                            e,
                                            "annualCost",
                                            "assetTech"
                                          );
                                        }
                                      }}
                                    />
                                  </div>
                                ) : (
                                  <p className="m-0 text-right">
                                    {formatCurrencyWithCommas(
                                      item.statistics[1]?.value,
                                      "USD"
                                    )?.replace("US$", "") ?? "-"}
                                  </p>
                                )}
                              </div>
                              <div>
                                {selectedTechnologies["assetTechnology"]
                                  .length <= 1 &&
                                  selectedTechnologies["assetTechnology"][0]
                                    ?.title === item.title && (
                                    <div className="d-flex gap-2 ml-2">
                                      {!showEditInput && (
                                        <>
                                          <HiPencil
                                            onClick={() => {
                                              setShowEditInput(item);
                                              resetSearchInput();
                                            }}
                                            size={16}
                                            cursor={"pointer"}
                                          />
                                          <HiTrash
                                            size={16}
                                            onClick={() =>
                                              handleDelete(
                                                item,
                                                3,
                                                1,
                                                "assetTech",

                                                "assetTechnology"
                                              )
                                            }
                                            cursor="pointer"
                                          />
                                        </>
                                      )}
                                      <>
                                        {selectedTechnologies["assetTechnology"]
                                          ?.length >= 1 &&
                                          showEditInput && (
                                            <HiOutlineXMark
                                              id="asset_cancel_btn"
                                              cursor="pointer"
                                              size={20}
                                              onClick={() => {
                                                setShowEditInput(null);
                                                resetDropDownData(3, 1);
                                                resetSearchInput();
                                                handleOnChange("", "");
                                              }}
                                            />
                                          )}
                                      </>
                                    </div>
                                  )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PerAssetTechnologies;
