import { useEffect, useState } from "react";
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

const PerUserTechnologies = ({
  data,
  addHandler,
  handleOnChange,
  handleInput,
  technologies,
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
  const [showSectionTwoInput, setShowSectionTwoInput] = useState(false);
  const { t } = useTranslation();

  const [perUserDropDown, setPerUserDropDown] = useState(
    technologies["userTechnology"]
  );
  const [entityDropDown, setEntityDropDown] = useState(
    technologies["entityTechnology"]
  );

  useEffect(() => {
    if (selectedTechnologies["userTechnology"].length >= 2) {
      setShowEditInput(null);
    }
  }, [selectedTechnologies]);

  useEffect(() => {
    // peruser dropdown
    if (technologies["userTechnology"].length >= 1) {
      const section = data?.find((item: any) => item.section === 1);
      const updatedDropDown = technologies["userTechnology"]?.filter(
        (item: any) =>
          !section?.values?.values.some(
            (card: any) => card.title === item.technology_name
          )
      );
      setPerUserDropDown(updatedDropDown);
    }

    //entity level
    if (technologies["entityTechnology"].length >= 1) {
      const section = data?.find((item: any) => item.section === 2);
      const updatedDropDown = technologies["entityTechnology"]?.filter(
        (item: any) =>
          !section?.values?.values.some(
            (card: any) => card.title === item.technology_name
          )
      );
      setEntityDropDown(updatedDropDown);
    }
  }, [data]);

  return (
    <div className="securityContainerStyle-COSC">
      <div className="p-3">
        {data.map((card: any, i: any) => {
          if (card.section === 1) {
            return (
              <div key={i}>
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <h1 className="information-security-h1 m-0 p-0">
                    {card.values.title}
                  </h1>
                  <div className="d-flex gap-3">
                    {showSearch ? (
                      <div className="d-flex align-items-center gap-2">
                        <Form.Control
                          className="cop_input-placeholder cosc-form-control-width-200 "
                          type="text"
                          id="user_search_input"
                          placeholder={`${t("search")}...`}
                          onChange={(e) => {
                            handleSearch(
                              e,
                              cardId,
                              card.section,
                              "perUserTech",
                              "userTechnology"
                            );
                          }}
                        />
                        <HiOutlineXMark
                          cursor="pointer"
                          id="user_cancel_btn"
                          size={20}
                          onClick={() => {
                            resetDropDownData(2, card.section);
                            setShowSearch(false);
                            resetSearchInput();
                          }}
                        />
                      </div>
                    ) : (
                      <HiOutlineMagnifyingGlass
                        id="user_search_btn"
                        onClick={() => {
                          setShowSearch(true);
                        }}
                        size={19}
                        cursor="pointer"
                      />
                    )}
                    {selectedTechnologies["userTechnology"].length >= 2 && (
                      <HiTrash
                        id="user_trash_btn"
                        size={20}
                        onClick={() => {
                          handleDelete(
                            null,
                            cardId,
                            card.section,
                            "perUserTech",
                            "userTechnology"
                          );
                        }}
                        cursor="pointer"
                      />
                    )}
                    {showEditInput?.section === 1 && (
                      <HiCheck
                        id="user_save_btn"
                        onClick={() => {
                          handleEdit(
                            showEditInput,
                            cardId,
                            card.section,
                            "perUserTech",
                            "userTechnology"
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
                              id="user_dropdown"
                              value={
                                JSON.stringify(
                                  technologies["userTechnology"].find(
                                    (item: any) => {
                                      return (
                                        handleInput["perUserTech"]
                                          .technology === item.technology_name
                                      );
                                    }
                                  )
                                ) ?? "false"
                              }
                              onKeyDown={(e) => {
                                handleInputOnKeyDown(e);
                                if (e.key === "Enter") {
                                  addHandler(
                                    card.section,
                                    cardId,
                                    "perUserTech"
                                  );
                                }
                              }}
                              placeholder="Enter name"
                              onChange={(e) => {
                                const techData = JSON.parse(e.target.value);

                                handleDropDownChange(
                                  techData.technology_name,
                                  "technology",
                                  "perUserTech",
                                  techData.id
                                );
                              }}
                            >
                              <option disabled value="false">
                                Select Technology
                              </option>
                              {perUserDropDown?.map((item: any, i: number) => {
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
                              id="user_edit_monthlycost"
                              as={CurrencyInput}
                              prefix=" "
                              intlConfig={{ locale: "en-US", currency: "USD" }}
                              onKeyDown={(e) => {
                                handleInputOnKeyDown(e);
                                if (e.key === "Enter") {
                                  addHandler(
                                    card.section,
                                    cardId,
                                    "perUserTech"
                                  );
                                }
                              }}
                              disabled={
                                showEditInput ||
                                handleInput.perUserTech.isMonthlyInputDisabled
                              }
                              value={
                                handleInput.perUserTech.monthlyCost?.length ===
                                0
                                  ? ""
                                  : showEditInput
                                  ? ""
                                  : handleInput.perUserTech.monthlyCost
                              }
                              onChange={(e) => {
                                if (e.target.value.length <= 9) {
                                  handleOnChange(
                                    e,
                                    "monthlyCost",
                                    "perUserTech"
                                  );
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
                                id="user_edit_annualinput"
                                placeholder="$"
                                onKeyDown={(e) => {
                                  handleInputOnKeyDown(e);
                                  if (e.key === "Enter") {
                                    addHandler(
                                      card.section,
                                      cardId,
                                      "perUserTech"
                                    );
                                  }
                                }}
                                as={CurrencyInput}
                                prefix=" "
                                intlConfig={{
                                  locale: "en-US",
                                  currency: "USD",
                                }}
                                disabled={
                                  showEditInput ||
                                  handleInput.perUserTech.isAnnualInputDisabled
                                }
                                value={
                                  handleInput.perUserTech.annualCost?.length ===
                                  0
                                    ? ""
                                    : showEditInput
                                    ? ""
                                    : handleInput.perUserTech.annualCost
                                }
                                onChange={(e) => {
                                  if (e.target.value.length <= 12) {
                                    handleOnChange(
                                      e,
                                      "annualCost",
                                      "perUserTech"
                                    );
                                  }
                                }}
                              />
                              <Button
                                className="cosc-asset-add-btn"
                                onClick={() =>
                                  addHandler(
                                    card.section,
                                    cardId,
                                    "perUserTech"
                                  )
                                }
                              >
                                +
                              </Button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </thead>
                    <tbody className="cop_tbody cop_scrollbar cosc-tbody-perusertech">
                      {card?.values.values.map((item: any, i: any) => {
                        return (
                          <tr className="cop_tr" key={i}>
                            <td>
                              <div className="d-flex align-items-center mt-2">
                                <Form.Check
                                  className="cop_curreny_input"
                                  value="Yes"
                                  id={`${"select"}-${i}`}
                                  type={"checkbox"}
                                  checked={selectedTechnologies[
                                    "userTechnology"
                                  ]?.find(
                                    (card: any) => card.title === item.title
                                  )}
                                  label=""
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      addSelectedTechnology(
                                        item,
                                        "userTechnology"
                                      );
                                    } else {
                                      resetSearchInput();
                                      setShowEditInput(false);
                                      setShowSectionTwoInput(false);
                                      removeSelectedTechnology(
                                        item,
                                        "userTechnology"
                                      );
                                    }
                                  }}
                                />
                                <div className="pl-2 font-size-point-9375-rem">
                                  {item.title}
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="w-90 font-size-zero-point-nine ">
                                {showEditInput?.section === 1 &&
                                selectedTechnologies["userTechnology"][0]
                                  ?.title === item.title ? (
                                  <div className="">
                                    <Form.Control
                                      className="cop_curreny_input"
                                      onKeyDown={(e) => {
                                        handleInputOnKeyDown(e);
                                        if (e.key === "Enter") {
                                          handleEdit(
                                            showEditInput,
                                            cardId,
                                            card.section,
                                            "perUserTech",
                                            "userTechnology"
                                          );
                                          setShowEditInput(null);
                                        }
                                      }}
                                      id="user_edit_monthlyinput"
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
                                        handleInput.perUserTech
                                          .isMonthlyInputDisabled
                                      }
                                      value={
                                        handleInput.perUserTech.monthlyCost
                                      }
                                      onChange={(e) => {
                                        if (e.target.value.length <= 9) {
                                          handleOnChange(
                                            e,
                                            "monthlyCost",
                                            "perUserTech"
                                          );
                                        }
                                      }}
                                    />
                                  </div>
                                ) : (
                                  <p className="m-0 pr-3 text-right">
                                    {formatCurrencyWithCommas(
                                      item?.statistics[0]?.value,
                                      "USD"
                                    )?.replace("US$", "") ?? "-"}
                                  </p>
                                )}
                              </div>
                            </td>
                            <td>
                              <div className="d-flex justify-content-between font-size-zero-point-nine ">
                                <div className="w-75 font-size-zero-point-nine ">
                                  {showEditInput?.section === 1 &&
                                  selectedTechnologies["userTechnology"][0]
                                    ?.title === item.title ? (
                                    <div className="">
                                      <Form.Control
                                        className="cop_curreny_input"
                                        id="user_annual_edit_input"
                                        onKeyDown={(e) => {
                                          handleInputOnKeyDown(e);
                                          if (e.key === "Enter") {
                                            handleEdit(
                                              showEditInput,
                                              cardId,
                                              card.section,
                                              "perUserTech",
                                              "userTechnology"
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
                                          handleInput.perUserTech
                                            .isAnnualInputDisabled
                                        }
                                        value={
                                          handleInput.perUserTech.annualCost
                                        }
                                        onChange={(e) => {
                                          if (e.target.value.length <= 12) {
                                            handleOnChange(
                                              e,
                                              "annualCost",
                                              "perUserTech"
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
                                  {selectedTechnologies["userTechnology"]
                                    .length <= 1 &&
                                    selectedTechnologies["userTechnology"][0]
                                      ?.title === item.title && (
                                      <div className="d-flex gap-2 ml-2">
                                        {!showEditInput && (
                                          <>
                                            <HiPencil
                                              id="user_edit_btn"
                                              onClick={() => {
                                                // reset previus typed input values
                                                resetSearchInput();
                                                setShowEditInput({
                                                  ...item,
                                                  section: 1,
                                                });
                                              }}
                                              size={16}
                                              cursor="pointer"
                                            />
                                            <HiTrash
                                              id="user_trash_btn"
                                              size={16}
                                              onClick={() =>
                                                handleDelete(
                                                  item,
                                                  cardId,
                                                  card.section,
                                                  "perUserTech",
                                                  "userTechnology"
                                                )
                                              }
                                              cursor="pointer"
                                            />
                                          </>
                                        )}
                                        <>
                                          {selectedTechnologies[
                                            "userTechnology"
                                          ]?.length >= 1 &&
                                            showEditInput?.section === 1 && (
                                              <HiOutlineXMark
                                                id="usercancel_btn"
                                                cursor="pointer"
                                                size={20}
                                                onClick={() => {
                                                  setShowEditInput(null);
                                                  resetDropDownData(
                                                    2,
                                                    card.section
                                                  );
                                                  //clear input field
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
          } else if (card.section === 2) {
            return (
              <div key={i}>
                {/* <-----------------------------------------> */}
                <div className="mt-4">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <h1 className="information-security-h1 m-0 p-0">
                      {card.values.title}
                    </h1>
                    <div className="d-flex gap-3">
                      {showSectionTwoInput ? (
                        <div className="d-flex align-items-center gap-2">
                          <Form.Control
                            className="cop_input-placeholder cosc-form-control-width-200"
                            id="entity_search"
                            type="text"
                            placeholder={`${t("search")}...`}
                            onChange={(e) => {
                              handleSearch(
                                e,
                                cardId,
                                card.section,
                                "entityTech",
                                "entityTechnology"
                              );
                            }}
                          />
                          <HiOutlineXMark
                            cursor="pointer"
                            id="entity_cancel_btn"
                            size={20}
                            onClick={() => {
                              resetDropDownData(2, card.section);
                              setShowSectionTwoInput(false);
                              resetSearchInput();
                            }}
                          />
                        </div>
                      ) : (
                        <HiOutlineMagnifyingGlass
                          id="entity_search_btn"
                          onClick={() => {
                            setShowSectionTwoInput(true);
                          }}
                          size={19}
                          cursor="pointer"
                        />
                      )}
                      {selectedTechnologies["entityTechnology"].length >= 2 && (
                        <HiTrash
                          id="entitytrash_btn"
                          size={20}
                          onClick={() => {
                            handleDelete(
                              null,
                              cardId,
                              card.section,
                              "entityTech",
                              "entityTechnology"
                            );
                          }}
                          cursor="pointer"
                        />
                      )}
                      {showEditInput?.section === 2 && (
                        <HiCheck
                          id="entity_save_btn"
                          onClick={() => {
                            handleEdit(
                              showEditInput,
                              cardId,
                              card.section,
                              "entityTech",
                              "entityTechnology"
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
                                id="enity_dropdown"
                                value={
                                  JSON.stringify(
                                    technologies["entityTechnology"].find(
                                      (item: any) => {
                                        return (
                                          handleInput["entityTech"]
                                            .technology === item.technology_name
                                        );
                                      }
                                    )
                                  ) ?? "false"
                                }
                                onKeyDown={(e) => {
                                  handleInputOnKeyDown(e);
                                  if (e.key === "Enter") {
                                    addHandler(
                                      card.section,
                                      cardId,
                                      "entityTech"
                                    );
                                  }
                                }}
                                placeholder="Enter name"
                                onChange={(e) => {
                                  const techData = JSON.parse(e.target.value);
                                  handleDropDownChange(
                                    techData.technology_name,
                                    "technology",
                                    "entityTech",
                                    techData.id
                                  );
                                }}
                              >
                                <option value="false" disabled>
                                  Select Technology
                                </option>
                                {entityDropDown?.map((item: any, i: number) => {
                                  return (
                                    <option
                                      key={i}
                                      value={JSON.stringify(item)}
                                    >
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
                                id="entity_edit_input"
                                placeholder="$"
                                onKeyDown={(e) => {
                                  handleInputOnKeyDown(e);
                                  if (e.key === "Enter") {
                                    addHandler(
                                      card.section,
                                      cardId,
                                      "entityTech"
                                    );
                                  }
                                }}
                                as={CurrencyInput}
                                prefix=" "
                                intlConfig={{
                                  locale: "en-US",
                                  currency: "USD",
                                }}
                                disabled={
                                  showEditInput ||
                                  handleInput.entityTech.isMonthlyInputDisabled
                                }
                                value={
                                  handleInput.entityTech.monthlyCost?.length ===
                                  0
                                    ? ""
                                    : showEditInput
                                    ? ""
                                    : handleInput.entityTech.monthlyCost
                                }
                                onChange={(e) => {
                                  if (showEditInput) {
                                    setShowEditInput(false);
                                  }
                                  if (e.target.value.length <= 9) {
                                    handleOnChange(
                                      e,
                                      "monthlyCost",
                                      "entityTech"
                                    );
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
                                  id="entity_annual_input"
                                  onKeyDown={(e) => {
                                    handleInputOnKeyDown(e);
                                    if (e.key === "Enter") {
                                      addHandler(
                                        card.section,
                                        cardId,
                                        "entityTech"
                                      );
                                    }
                                  }}
                                  placeholder="$"
                                  as={CurrencyInput}
                                  prefix=" "
                                  intlConfig={{
                                    locale: "en-US",
                                    currency: "USD",
                                  }}
                                  disabled={
                                    showEditInput ||
                                    handleInput.entityTech.isAnnualInputDisabled
                                  }
                                  value={
                                    handleInput.entityTech.annualCost
                                      ?.length === 0
                                      ? ""
                                      : showEditInput
                                      ? ""
                                      : handleInput.entityTech.annualCost
                                  }
                                  onChange={(e) => {
                                    if (showEditInput) {
                                      setShowEditInput(false);
                                    }
                                    if (e.target.value.length <= 12) {
                                      handleOnChange(
                                        e,
                                        "annualCost",
                                        "entityTech"
                                      );
                                    }
                                  }}
                                />
                                <Button
                                  id="entity_edit_btn"
                                  className="cosc-asset-add-btn"
                                  onClick={() =>
                                    addHandler(
                                      card.section,
                                      cardId,
                                      "entityTech"
                                    )
                                  }
                                >
                                  +
                                </Button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </thead>
                      <tbody className="cop_tbody cop_scrollbar cosc-tbody-perusertech-2">
                        {card?.values.values.map((item: any, i: any) => {
                          return (
                            <tr className="cop_tr" key={i}>
                              <td>
                                <div className="d-flex align-items-center mt-2">
                                  <Form.Check
                                    className="cop_curreny_input"
                                    value="Yes"
                                    id={`${"select"}-${i}`}
                                    type={"checkbox"}
                                    checked={selectedTechnologies[
                                      "entityTechnology"
                                    ]?.find(
                                      (card: any) => card.title === item.title
                                    )}
                                    label=""
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        addSelectedTechnology(
                                          item,
                                          "entityTechnology"
                                        );
                                      } else {
                                        resetSearchInput();
                                        setShowEditInput(false);
                                        setShowSectionTwoInput(false);
                                        removeSelectedTechnology(
                                          item,
                                          "entityTechnology"
                                        );
                                      }
                                    }}
                                  />
                                  <div className="pl-2 font-size-zero-point-nine ">
                                    {item.title}
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div className="font-size-zero-point-nine ">
                                  {showEditInput?.section === 2 &&
                                  selectedTechnologies["entityTechnology"][0]
                                    ?.title === item.title ? (
                                    <div className="pr-3">
                                      <Form.Control
                                        className="cop_curreny_input"
                                        id="entity_monthlycost"
                                        onKeyDown={(e) => {
                                          handleInputOnKeyDown(e);
                                          if (e.key === "Enter") {
                                            handleEdit(
                                              showEditInput,
                                              cardId,
                                              card.section,
                                              "entityTech",
                                              "entityTechnology"
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
                                          handleInput.entityTech
                                            .isMonthlyInputDisabled
                                        }
                                        value={
                                          handleInput.entityTech.monthlyCost
                                        }
                                        onChange={(e) => {
                                          if (e.target.value.length <= 9) {
                                            handleOnChange(
                                              e,
                                              "monthlyCost",
                                              "entityTech"
                                            );
                                          }
                                        }}
                                      />
                                    </div>
                                  ) : (
                                    <p className="m-0 pr-4 text-right">
                                      {formatCurrencyWithCommas(
                                        item?.statistics[0]?.value,
                                        "USD"
                                      )?.replace("US$", "") ?? "-"}
                                    </p>
                                  )}
                                </div>
                              </td>
                              <td>
                                <div className="d-flex  justify-content-between font-size-point-875-rem">
                                  <div className="font-size-point-875-rem w-75">
                                    {showEditInput?.section === 2 &&
                                    selectedTechnologies["entityTechnology"][0]
                                      ?.title === item.title ? (
                                      <div className="">
                                        <Form.Control
                                          className="cop_curreny_input"
                                          id="entity_annualcost"
                                          onKeyDown={(e) => {
                                            handleInputOnKeyDown(e);
                                            if (e.key === "Enter") {
                                              handleEdit(
                                                showEditInput,
                                                cardId,
                                                card.section,
                                                "entityTech",
                                                "entityTechnology"
                                              );
                                              setShowEditInput(null);
                                            }
                                          }}
                                          placeholder={
                                            formatCurrencyWithCommas(
                                              showEditInput?.statistics[1]
                                                ?.value,
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
                                            handleInput.entityTech
                                              .isAnnualInputDisabled
                                          }
                                          value={
                                            handleInput.entityTech.annualCost
                                          }
                                          onChange={(e) => {
                                            if (e.target.value.length <= 12) {
                                              handleOnChange(
                                                e,
                                                "annualCost",
                                                "entityTech"
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
                                    {selectedTechnologies["entityTechnology"]
                                      .length <= 1 &&
                                      selectedTechnologies[
                                        "entityTechnology"
                                      ][0]?.title === item.title && (
                                        <div className="d-flex gap-2 ml-2">
                                          {!showEditInput && (
                                            <>
                                              <HiPencil
                                                id="entity_edit"
                                                onClick={() => {
                                                  resetSearchInput();
                                                  setShowEditInput({
                                                    ...item,
                                                    section: 2,
                                                  });
                                                }}
                                                size={16}
                                                cursor="pointer"
                                              />
                                              <HiTrash
                                                id="entity_delete"
                                                size={16}
                                                onClick={() =>
                                                  handleDelete(
                                                    item,
                                                    cardId,
                                                    card.section,
                                                    "entityTech",
                                                    "entityTechnology"
                                                  )
                                                }
                                                cursor="pointer"
                                              />
                                            </>
                                          )}
                                          <>
                                            {selectedTechnologies[
                                              "entityTechnology"
                                            ]?.length >= 1 &&
                                              showEditInput?.section === 2 && (
                                                <HiOutlineXMark
                                                  id="entity_cancel"
                                                  cursor="pointer"
                                                  size={20}
                                                  onClick={() => {
                                                    setShowEditInput(null);
                                                    resetDropDownData(
                                                      2,
                                                      card.section
                                                    );
                                                    //clear input field
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
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default PerUserTechnologies;
