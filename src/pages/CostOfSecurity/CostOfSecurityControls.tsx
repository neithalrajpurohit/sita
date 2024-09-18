import React, { useEffect, useState } from "react";
import InformationSecurity from "./InformationSecurity";
import PerUserTechnologies from "./PerUserTechnologies";
import PerAssetTechnologies from "./PerAssetTechnologies";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {
  FetchCostOfSecurity,
  GetTechnologies,
  UpdateTechnologies,
} from "./../../store/CostOfSecurityControls/CostOfSecuritySlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../index";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import { RootState } from "../../configureStore";
import CustomModal from "../../component/Modal";
import Loading from "../../component/Loading";

import { toast } from "react-toastify";
import { LoadingContainer } from "../GlobalStyles";
import { PageTitle } from "../EntityOnboarding/EntityStyles";

const CostOfSecurityControls = () => {
  const history = useHistory();
  const dispatch: AppDispatch = useDispatch();
  const costOfSecurity = useSelector(
    (state: RootState) => state.CostOfSecurity
  );
  const { t } = useTranslation();
  const [informationSecurity, setInformationSecurity] = useState<any>([]);
  const [userTechnology, setUserTechnology] = useState<any[]>([]);
  const [assetTechnology, setAssetTechnology] = useState<any>([]);
  const [handleInput, setHandleInput] = useState<any>({
    perUserTech: {
      technology: "",
      monthlyCost: "",
      annualCost: "",
      isMonthlyInputDisabled: false,
      isAnnualInputDisabled: false,
    },
    entityTech: {
      technology: "",
      monthlyCost: "",
      annualCost: "",
      isMonthlyInputDisabled: false,
      isAnnualInputDisabled: false,
    },
    assetTech: {
      technology: "",
      monthlyCost: "",
      annualCost: "",
      isMonthlyInputDisabled: false,
      isAnnualInputDisabled: false,
    },
  });
  const [technologies, setTechnologies] = useState<any>({
    userTechnology: [],
    assetTechnology: [],
    entityTechnology: [],
  });
  const [selectedTechnologies, setSelectedTechnologies] = useState<any>({
    userTechnology: [],
    assetTechnology: [],
    entityTechnology: [],
  });
  const [info, setInfo] = useState({
    strategicLevel: "",
    tacticLevel: "",
    strategicCost: "",
    tacticCost: "",
    soc: "",
    netseg: "",
    other: "",
    totalEmployees: "",
    unitCoverage: "",
    totalCost: "",
  });
  const [techId, setTechId] = useState<number>(0);
  const [alertMessage, setAlertMessage] = useState({
    alertMessage: "",
    unsavedMessage: "",
  });

  useEffect(() => {
    document.title = t("costofsecuritycontrols");
  }, [t]);

  const fetchCostOfSecurity = () => {
    sessionStorage.removeItem("card2");
    sessionStorage.removeItem("card3");
    dispatch(FetchCostOfSecurity())
      .unwrap()
      .then((res) => {
        const securityData = res?.find((card: any) => {
          return card.id === 1;
        });
        setInformationSecurity(securityData?.data);
        const userTechData = res?.find((card: any) => {
          return card.id === 2;
        });
        setUserTechnology(userTechData?.data);
        const assetTechData = res?.find((card: any) => {
          return card.id === 3;
        });
        setAssetTechnology(assetTechData?.data);
      });
  };
  useEffect(() => {
    sessionStorage.removeItem("card2");
    sessionStorage.removeItem("card3");
    sessionStorage.removeItem("editUnsavedData");
    dispatch(GetTechnologies());
    fetchCostOfSecurity();
  }, []);

  useEffect(() => {
    setTechnologies({
      assetTechnology: costOfSecurity.assetTechnologies,
      userTechnology: costOfSecurity.userTechnologies,
      entityTechnology: costOfSecurity.entityTechnologies,
    });
  }, [costOfSecurity]);

  const addHandler = (
    sectionId: number,
    cardId: number,
    sectionName: string
  ) => {
    if (handleInput[sectionName].technology.length === 0) {
      setAlertMessage({
        ...alertMessage,
        alertMessage: t("pleaseselecttechnology"),
      });
      // return alert("Please select the technology")
      return;
    }
    if (
      Number(handleInput[sectionName].monthlyCost) === 0 ||
      Number(handleInput[sectionName].annualCost) === 0
    ) {
      setAlertMessage({
        ...alertMessage,
        alertMessage: t("pleaseentermonthlyandannuallycost"),
      });

      return;
    }
    if (sectionName === "perUserTech" || sectionName === "entityTech") {
      const filteredState = userTechnology.filter(
        (item: any) => item.section !== sectionId
      );
      const find = userTechnology.find(
        (user: any) => user.section === sectionId
      );
      const dataToUpdate = {
        title: handleInput[sectionName].technology,
        id: techId,
        statistics: [
          {
            title: "Unit Cost($) Monthly",
            value: Number(handleInput[sectionName].monthlyCost),
            type: "monthly",
          },
          {
            title: "Unit Cost($) Annual",
            value: Number(handleInput[sectionName].annualCost),
            type: "annual",
          },
        ],
      };

      let findCopy: any = {
        section: sectionId,
        values: {
          title: find.values.title,
          id: find.values.id,
          values: [...find.values.values, dataToUpdate],
        },
      };
      if (cardId === 2) {
        if (sectionId === 1) {
          const updatedState = [findCopy, ...filteredState];
          setUserTechnology(updatedState);
          sessionStorage.setItem("card2", JSON.stringify(updatedState));
        } else {
          const updatedState = [...filteredState, findCopy];
          setUserTechnology(updatedState);
          sessionStorage.setItem("card2", JSON.stringify(updatedState));
        }
        setHandleInput({
          ...handleInput,
          [sectionName]: {
            technology: "",
            monthlyCost: "",
            annualCost: "",
            isMonthlyInputDisabled: false,
            isAnnualInputDisabled: false,
          },
        });
        return;
      }
      const updatedState = [findCopy, ...filteredState];
      setUserTechnology(updatedState);
    } else if (sectionName === "assetTech") {
      const filteredState = assetTechnology.filter(
        (item: any) => item.section !== sectionId
      );
      const find = assetTechnology.find(
        (user: any) => user.section === sectionId
      );
      const dataToUpdate = {
        title: handleInput[sectionName].technology,
        id: techId,
        statistics: [
          {
            title: "Unit Cost($) Monthly",
            value: Number(handleInput[sectionName].monthlyCost),
            type: "monthly",
          },
          {
            title: "Unit Cost($) Annual",
            value: Number(handleInput[sectionName].annualCost),
            type: "annual",
          },
        ],
      };

      let findCopy: any = {
        section: sectionId,
        title: find.title,
        values: [...find.values, dataToUpdate],
      };
      const updatedState = [findCopy, ...filteredState];
      sessionStorage.setItem("card3", JSON.stringify(updatedState));

      setAssetTechnology(updatedState);
      setHandleInput({
        ...handleInput,
        [sectionName]: {
          technology: "",
          monthlyCost: "",
          annualCost: "",
          isMonthlyInputDisabled: false,
          isAnnualInputDisabled: false,
        },
      });
    }
  };

  const handleDropDownChange = (
    title: string,
    name: string,
    sectionName: string,
    technologyId: number
  ) => {
    setTechId(technologyId);
    setHandleInput({
      ...handleInput,
      [sectionName]: { ...handleInput[sectionName], technology: title },
    });
  };

  const handleOnChange = (
    e: React.ChangeEvent<any>,
    name: string,
    sectionName: string
  ) => {
    const value = e.target.value;
    const numericInput = parseFloat(value.replace(/[^0-9.]/g, ""));
    if (Number.isNaN(numericInput)) {
      setHandleInput({
        perUserTech: {
          technology: "",
          monthlyCost: "",
          annualCost: "",
          isMonthlyInputDisabled: false,
          isAnnualInputDisabled: false,
        },
        entityTech: {
          technology: "",
          monthlyCost: "",
          annualCost: "",
          isMonthlyInputDisabled: false,
          isAnnualInputDisabled: false,
        },
        assetTech: {
          technology: "",
          monthlyCost: "",
          annualCost: "",
          isMonthlyInputDisabled: false,
          isAnnualInputDisabled: false,
        },
      });
      return;
    }
    if (name === "monthlyCost") {
      let value = Number(numericInput);
      let annualTotal = value * 12;
      setHandleInput({
        ...handleInput,
        [sectionName]: {
          ...handleInput[sectionName],
          isMonthlyInputDisabled: false,
          isAnnualInputDisabled: true,
          annualCost: annualTotal,
          [name]: numericInput,
        },
      });
    } else if (name === "annualCost") {
      let value = Number(numericInput);
      let monthlyCost = Math.floor(value / 12);
      setHandleInput({
        ...handleInput,
        [sectionName]: {
          ...handleInput[sectionName],
          isMonthlyInputDisabled: true,
          isAnnualInputDisabled: false,
          monthlyCost: monthlyCost,
          [name]: numericInput,
        },
      });
    } else if (name) {
      setHandleInput({
        ...handleInput,
        [sectionName]: { ...handleInput[sectionName], [name]: e.target.value },
      });
    }

    if (e && e.target.value.length === 0) {
      setHandleInput({
        ...handleInput,
        [sectionName]: {
          ...handleInput[sectionName],
          isMonthlyInputDisabled: false,
          isAnnualInputDisabled: false,
          technology: "",
          monthlyCost: "",
          annualCost: "",
        },
      });
    }

    if (!e) {
      setHandleInput({
        ...handleInput,
        [sectionName]: {
          isMonthlyInputDisabled: false,
          isAnnualInputDisabled: false,
          technology: "",
          monthlyCost: "",
          annualCost: "",
        },
      });
    }
  };

  const resetDropDownData = (cardId: number, sectionId: number) => {
    const securityData = costOfSecurity.data.find((card: any) => {
      return card.id === cardId;
    });
    if (cardId === 2) {
      let savedWithNewAdded: any = sessionStorage.getItem("card2");
      if (savedWithNewAdded) {
        savedWithNewAdded = JSON.parse(savedWithNewAdded);
      }
      const prevState = securityData.data?.find(
        (data: any) => data.section !== sectionId
      );
      const find = savedWithNewAdded
        ? savedWithNewAdded.find((data: any) => data.section === sectionId)
        : securityData.data.find((data: any) => data.section === sectionId);

      const findOtherCard = savedWithNewAdded?.find(
        (data: any) => data.section !== sectionId
      );
      const newSate = {
        section: sectionId,
        values: {
          id: sectionId,
          title: find.values.title,
          values: find.values.values,
        },
      };
      if (sectionId === 1) {
        if (findOtherCard) {
          setUserTechnology([newSate, findOtherCard]);
        } else {
          setUserTechnology([newSate, prevState]);
        }
      } else if (sectionId === 2) {
        if (findOtherCard) {
          setUserTechnology([findOtherCard, newSate]);
        } else {
          setUserTechnology([prevState, newSate]);
        }
      }
      return;
    }
    if (cardId === 3) {
      const prevState = securityData.data.filter(
        (data: any) => data.section !== sectionId
      );
      let savedWithNewAdded: any = sessionStorage.getItem("card3");
      if (savedWithNewAdded) {
        savedWithNewAdded = JSON.parse(savedWithNewAdded);
      }

      const find = savedWithNewAdded
        ? savedWithNewAdded.find((data: any) => data.section === sectionId)
        : securityData.data.find((data: any) => data.section === sectionId);
      const newState = {
        section: sectionId,
        title: find.title,
        values: find.values,
      };
      setAssetTechnology([newState, ...prevState]);
    }
  };

  const handleSearch = (
    e: React.ChangeEvent<HTMLInputElement>,
    cardId: number,
    sectionId: number,
    sectionName: string,
    name: string
  ) => {
    if (sectionName === "perUserTech" || sectionName === "entityTech") {
      const removedPreviousState = userTechnology.filter(
        (item: any) => item.section !== sectionId
      );

      const prevState = userTechnology?.find(
        (user: any) => user.section === sectionId
      );

      const filterState = prevState.values.values.filter((item: any) =>
        item.title.toLowerCase().includes(e.target.value.toLowerCase())
      );

      const newState = {
        section: sectionId,
        values: {
          id: sectionId,
          title: prevState.values.title,
          values: filterState,
        },
      };

      if (sectionId === 1) {
        setUserTechnology([newState, ...removedPreviousState]);

        setSelectedTechnologies({ ...selectedTechnologies, [name]: [] });
      } else {
        setUserTechnology([...removedPreviousState, newState]);

        setSelectedTechnologies({ ...selectedTechnologies, [name]: [] });
      }

      setHandleInput({
        ...handleInput,
        [sectionName]: {
          technology: "",
          monthlyCost: "",
          annualCost: "",
          isMonthlyInputDisabled: false,
          isAnnualInputDisabled: false,
        },
      });

      if (e.target.value.length === 0) {
        // reset back to original state
        resetDropDownData(cardId, sectionId);
      }
    } else {
      const removedPreviousState = assetTechnology.filter(
        (item: any) => item.section !== sectionId
      );

      const prevState = assetTechnology?.find(
        (user: any) => user.section === sectionId
      );

      const filterState = prevState.values.filter((item: any) =>
        item.title.toLowerCase().includes(e.target.value.toLowerCase())
      );

      const newState = {
        section: sectionId,
        title: prevState.title,
        values: filterState,
      };
      if (cardId === 3) {
        setAssetTechnology([newState, ...removedPreviousState]);

        setSelectedTechnologies({ ...selectedTechnologies, [name]: [] });
        setHandleInput({
          ...handleInput,
          [sectionName]: {
            technology: "",
            monthlyCost: "",
            annualCost: "",
            isMonthlyInputDisabled: false,
            isAnnualInputDisabled: false,
          },
        });

        if (e.target.value.length === 0) {
          // reset back to original state
          resetDropDownData(cardId, sectionId);
        }
      }
    }
  };

  const handleEdit = (
    item: any,
    cardId: number,
    sectionId: number,
    sectionName: string,
    name: string
  ) => {
    if (
      Number(handleInput[sectionName].monthlyCost) === 0 ||
      Number(handleInput[sectionName].annualCost) === 0
    ) {
      setAlertMessage({
        ...alertMessage,
        alertMessage: t("pleaseentermonthlyandannuallycost"),
      });

      return;
    }
    sessionStorage.setItem("editUnsavedData", "unsaved");
    if (sectionName === "perUserTech" || sectionName === "entityTech") {
      let copyItem = { ...item };
      copyItem.statistics = [
        {
          title: "Unit Cost($) Monthly",
          value: Number(handleInput[sectionName].monthlyCost),
          type: "monthly",
        },
        {
          title: "Unit Cost($) Annual",
          value: Number(handleInput[sectionName].annualCost),
          type: "annual",
        },
      ];
      const prevState = userTechnology.filter(
        (item: any) => item.section !== sectionId
      );
      const find = userTechnology.find(
        (user: any) => user.section === sectionId
      );
      let filteredState = find.values.values.filter(
        (card: any) => card.title !== item.title
      );
      const newState = [{ ...copyItem }, ...filteredState];

      const updatedState = {
        section: sectionId,

        values: {
          title: find.values.title,
          id: find.values.id,
          values: newState,
        },
      };
      if (cardId === 2) {
        if (sectionId === 1) {
          // to preserve original order
          setUserTechnology([updatedState, ...prevState]);
        } else {
          setUserTechnology([...prevState, updatedState]);
        }
      }
      setSelectedTechnologies({ ...selectedTechnologies, [name]: [] });
      setHandleInput({
        ...handleInput,
        [sectionName]: {
          technology: "",
          monthlyCost: "",
          annualCost: "",
          isMonthlyInputDisabled: false,
          isAnnualInputDisabled: false,
        },
      });
    } else {
      let copyItem = { ...item };
      copyItem.statistics = [
        {
          title: "Unit Cost($) Monthly",
          value: Number(handleInput[sectionName].monthlyCost),
          type: "monthly",
        },
        {
          title: "Unit Cost($) Annual",
          value: Number(handleInput[sectionName].annualCost),
          type: "annual",
        },
      ];
      const prevState = assetTechnology.filter(
        (item: any) => item.section !== sectionId
      );
      const find = assetTechnology.find(
        (user: any) => user.section === sectionId
      );

      let filteredState = find.values.filter(
        (card: any) => card.title !== item.title
      );

      const newState = [copyItem, ...filteredState];

      const updatedState = {
        title: find.title,
        id: find.id,
        values: newState,
        section: sectionId,
      };

      setAssetTechnology([...prevState, updatedState]);
      setSelectedTechnologies({ ...selectedTechnologies, [name]: [] });
      setHandleInput({
        ...handleInput,
        [sectionName]: {
          technology: "",
          monthlyCost: "",
          annualCost: "",
          isMonthlyInputDisabled: false,
          isAnnualInputDisabled: false,
        },
      });
    }
  };

  const resetSearchInput = () => {
    setHandleInput({
      perUserTech: {
        technology: "",
        monthlyCost: "",
        annualCost: "",
        isMonthlyInputDisabled: false,
        isAnnualInputDisabled: false,
      },
      entityTech: {
        technology: "",
        monthlyCost: "",
        annualCost: "",
        isMonthlyInputDisabled: false,
        isAnnualInputDisabled: false,
      },
      assetTech: {
        technology: "",
        monthlyCost: "",
        annualCost: "",
        isMonthlyInputDisabled: false,
        isAnnualInputDisabled: false,
      },
    });
  };
  const handleInputOnKeyDown = (e: React.KeyboardEvent<any>) => {
    if (e.code === "Minus") {
      e.preventDefault();
    }
    if (e.code === "Equal") {
      e.preventDefault();
    }
    if (e.code === "KeyE") {
      e.preventDefault();
    }
    if (e.code === "Period") {
      e.preventDefault();
    }
  };
  const handleDelete = (
    item: any,
    cardId: number,
    sectionId: number,
    sectionName: string,
    name: string
  ) => {
    if (sectionName === "perUserTech" || sectionName === "entityTech") {
      const filteredState = userTechnology.filter(
        (item: any) => item.section !== sectionId
      );
      const find = userTechnology.find(
        (user: any) => user.section === sectionId
      );

      const selectedTitles = selectedTechnologies[name].map(
        (item: any) => item.title
      );
      const filteredItems = find.values.values.filter(
        (item: any) => !selectedTitles.includes(item.title)
      );
      const newState = {
        section: sectionId,
        values: {
          id: sectionId,
          title: find.values.title,
          values: filteredItems,
        },
      };
      if (cardId === 2) {
        if (sectionId === 1) {
          // to preserve original order
          setUserTechnology([newState, ...filteredState]);
          sessionStorage.setItem(
            "card2",
            JSON.stringify([newState, ...filteredState])
          );
        } else {
          setUserTechnology([...filteredState, newState]);
          sessionStorage.setItem(
            "card2",
            JSON.stringify([...filteredState, newState])
          );
        }
      }
      setSelectedTechnologies({ ...selectedTechnologies, [name]: [] });
      setHandleInput({
        ...handleInput,
        [sectionName]: {
          technology: "",
          monthlyCost: "",
          annualCost: "",
          isMonthlyInputDisabled: false,
          isAnnualInputDisabled: false,
        },
      });
    } else {
      const filteredState = assetTechnology.filter(
        (item: any) => item.section !== sectionId
      );

      const find = assetTechnology.find(
        (user: any) => user.section === sectionId
      );

      const selectedTitles = selectedTechnologies[name].map(
        (item: any) => item.title
      );
      const filteredItems = find.values.filter(
        (item: any) => !selectedTitles.includes(item.title)
      );

      const newState = {
        section: sectionId,
        title: find.title,
        id: find.id,
        values: filteredItems,
      };

      setAssetTechnology([...filteredState, newState]);
      sessionStorage.setItem(
        "card3",
        JSON.stringify([...filteredState, newState])
      );
      setSelectedTechnologies({ ...selectedTechnologies, [name]: [] });
      setHandleInput({
        ...handleInput,
        [sectionName]: {
          technology: "",
          monthlyCost: "",
          annualCost: "",
          isMonthlyInputDisabled: false,
          isAnnualInputDisabled: false,
        },
      });
    }
    setTechId(0);
  };
  const handleSave = () => {
    const cloneObject: any = _.cloneDeep(informationSecurity);

    if (
      cloneObject[0].values.values[0].qty &&
      (String(cloneObject[0].values.values[0].qty).length <= 0 ||
        String(cloneObject[0].values.values[1].qty).length <= 0)
    ) {
      return setAlertMessage({
        ...alertMessage,
        alertMessage: t("pleaseentertacticlevelandstrategicleveltosave"),
      });
    }
    if (info.strategicLevel) {
      cloneObject[0].values.values[0].qty = Number(info.strategicLevel);
    }
    if (info.tacticLevel) {
      cloneObject[0].values.values[1].qty = Number(info.tacticLevel);
    }
    if (info.strategicCost) {
      cloneObject[0].values.values[0].annual_cost_value = Number(
        info.strategicCost
      );
    }
    if (info.tacticCost) {
      cloneObject[0].values.values[1].annual_cost_value = Number(
        info.tacticCost
      );
    }
    if (info.soc) {
      cloneObject[1].values.values[0].value = Number(info.soc);
    }
    if (info.netseg) {
      cloneObject[1].values.values[1].value = Number(info.netseg);
    }
    if (info.other) {
      cloneObject[1].values.values[2].value = Number(info.other);
    }
    if (info.totalEmployees) {
      cloneObject[2].values.values[0].value = Number(info.totalEmployees);
    }
    if (info.unitCoverage) {
      cloneObject[2].values.values[1].values[0].value = Math.round(
        Number(info.unitCoverage)
      );
    }
    if (info.totalCost) {
      cloneObject[2].values.values[1].values[1].value = Number(info.totalCost);
    }

    const updateData = [
      { id: 1, data: cloneObject },
      { id: 2, data: userTechnology },
      { id: 3, data: assetTechnology[0].values },
    ];

    dispatch(UpdateTechnologies(updateData))
      .unwrap()
      .then((res) => {
        toast(res.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
          theme: "dark",
        });

        setAlertMessage({
          ...alertMessage,
          alertMessage: "",
          unsavedMessage: "",
        });
        setTechId(0);
        fetchCostOfSecurity();
      });
  };
  //selecting check box
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // to save editUnsavedData display alert modal on cancel press
    const value = e.target.value;
    if (e.target.name === "unitCoverage") {
      setInfo((prevState) => {
        return { ...prevState, [e.target.name]: e.target.value };
      });
    } else {
      const numericInput = parseFloat(value.replace(/[^0-9.]/g, "")); //meric characters

      if (Number.isNaN(numericInput)) {
        if (e.target.name === "strategicLevel") {
          setInfo({ ...info, strategicLevel: "" });
        } else if (e.target.name === "tacticLevel") {
          setInfo({ ...info, tacticLevel: "" });
        } else if (e.target.name === "strategicCost") {
          setInfo({ ...info, strategicCost: "" });
        } else if (e.target.name === "tacticCost") {
          setInfo({ ...info, tacticCost: "" });
        } else if (e.target.name === "soc") {
          setInfo({ ...info, soc: "" });
        } else if (e.target.name === "netseg") {
          setInfo({ ...info, netseg: "" });
        } else if (e.target.name === "other") {
          setInfo({ ...info, other: "" });
        } else if (e.target.name === "totalEmployees") {
          setInfo({ ...info, totalEmployees: "" });
        } else if (e.target.name === "totalCost") {
          setInfo({ ...info, totalCost: "" });
        }
        return;
      }
      sessionStorage.setItem("editUnsavedData", "unsavedData");
      setInfo((prevState) => {
        return { ...prevState, [e.target.name]: numericInput };
      });
    }
  };

  const addSelectedTechnology = (item: any, name: string) => {
    const updatedTechnology = {
      ...selectedTechnologies,
      [name]: [...selectedTechnologies[name], item],
    };
    setSelectedTechnologies(updatedTechnology);
  };

  const removeSelectedTechnology = (item: any, name: string) => {
    const updatedTechnology = selectedTechnologies[name].filter(
      (card: any) => card.title !== item.title
    );
    setSelectedTechnologies({
      ...selectedTechnologies,
      [name]: updatedTechnology,
    });
  };

  const handleCancelPress = () => {
    const perUserUnsavedData = sessionStorage.getItem("card2");
    const entityUnsavedData = sessionStorage.getItem("card3");
    const editUnsavedData = sessionStorage.getItem("editUnsavedData");

    if (perUserUnsavedData || entityUnsavedData || editUnsavedData) {
      setAlertMessage({
        ...alertMessage,
        unsavedMessage: t("youhaveunsavedataDoyouhavetosaveit?"),
      });
    } else {
      history.goBack();
    }
  };

  if (
    costOfSecurity.isCostDataLoading ||
    costOfSecurity.isDropdownTechLoading
  ) {
    return (
      <LoadingContainer>
        <Loading title="" width="" />
      </LoadingContainer>
    );
  }

  return (
    <div className="px-2 py-0">
      <PageTitle className="my-2">{t("costofsecuritycontrols")}</PageTitle>
      {/* {Alert Modal Box} */}
      <CustomModal
        onHide={() => {
          if (!alertMessage.unsavedMessage) {
            setAlertMessage({
              ...alertMessage,
              alertMessage: "",
              unsavedMessage: "",
            });
          } else {
            setAlertMessage({
              ...alertMessage,
              alertMessage: "",
              unsavedMessage: "",
            });
          }
        }}
        size={"md"}
        show={
          alertMessage.alertMessage.length >= 1 ||
          alertMessage.unsavedMessage.length >= 1
        }
        dialogClassName={""}
        modalBody={
          <div className="font-color">
            {alertMessage.alertMessage
              ? alertMessage.alertMessage
              : alertMessage.unsavedMessage}
          </div>
        }
        modalFooter={
          <div>
            {alertMessage.unsavedMessage ? (
              <div className="d-flex gap-4">
                <Button
                  variant="outline-secondary"
                  className="unfilled-btn-style"
                  onClick={() => {
                    setAlertMessage({
                      ...alertMessage,
                      alertMessage: "",
                      unsavedMessage: "",
                    });
                    sessionStorage.removeItem("card2");
                    sessionStorage.removeItem("card3");
                    sessionStorage.removeItem("editUnsavedData");
                    history.goBack();
                  }}
                >
                  Discard
                </Button>
                <Button
                  variant="outline-secondary"
                  className="unfilled-btn-style"
                  onClick={() => {
                    sessionStorage.removeItem("card2");
                    sessionStorage.removeItem("card3");
                    sessionStorage.removeItem("editUnsavedData");
                    handleSave();
                    setAlertMessage({
                      ...alertMessage,
                      alertMessage: "",
                      unsavedMessage: "",
                    });
                  }}
                >
                  {t("save")}
                </Button>
              </div>
            ) : (
              <>
                <Button
                  variant="outline-secondary"
                  className="unfilled-btn-style"
                  onClick={() =>
                    setAlertMessage({
                      ...alertMessage,
                      alertMessage: "",
                    })
                  }
                >
                  {t("ok")}
                </Button>
              </>
            )}
          </div>
        }
      />
      <div className="cosc-grid">
        {costOfSecurity?.data?.length >= 1 &&
          costOfSecurity?.data?.map((card: any, i: any) => {
            if (card.id === 1) {
              return (
                <div key={i}>
                  <p className="mb-1 font-size-zero-point-nine ">
                    * {t("allcostsareinusd")}
                  </p>
                  <InformationSecurity
                    data={informationSecurity}
                    key={i}
                    info={info}
                    handleInputChange={handleInputChange}
                    handleInputOnKeyDown={handleInputOnKeyDown}
                  />
                </div>
              );
            } else if (card.id === 2) {
              return (
                <div key={i}>
                  <p className="mb-1 font-size-zero-point-nine ">
                    * {t("allcostsareinusd")}
                  </p>
                  <PerUserTechnologies
                    technologies={technologies}
                    data={userTechnology}
                    addHandler={addHandler}
                    handleOnChange={handleOnChange}
                    handleInput={handleInput}
                    addSelectedTechnology={addSelectedTechnology}
                    removeSelectedTechnology={removeSelectedTechnology}
                    selectedTechnologies={selectedTechnologies}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    handleSearch={handleSearch}
                    cardId={card.id}
                    resetDropDownData={resetDropDownData}
                    handleDropDownChange={handleDropDownChange}
                    resetSearchInput={resetSearchInput}
                    handleInputOnKeyDown={handleInputOnKeyDown}
                  />
                </div>
              );
            } else if (card.id === 3) {
              return (
                <div key={i}>
                  <p className="mb-1 font-size-zero-point-nine ">
                    * {t("allcostsareinusd")}
                  </p>
                  <PerAssetTechnologies
                    key={i}
                    technologies={technologies}
                    data={assetTechnology}
                    addHandler={addHandler}
                    handleOnChange={handleOnChange}
                    handleInput={handleInput}
                    addSelectedTechnology={addSelectedTechnology}
                    removeSelectedTechnology={removeSelectedTechnology}
                    selectedTechnologies={selectedTechnologies}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    handleSearch={handleSearch}
                    cardId={card.id}
                    resetDropDownData={resetDropDownData}
                    handleDropDownChange={handleDropDownChange}
                    resetSearchInput={resetSearchInput}
                    handleInputOnKeyDown={handleInputOnKeyDown}
                  />
                </div>
              );
            }
            return <></>;
          })}
      </div>
      <div>
        <div className="mt-2 d-flex gap-4 justify-content-end pr-4 mb-3">
          <Button
            variant="outline-secondary"
            size="sm"
            className="unfilled-btn-style"
            onClick={() => history.goBack()}
          >
            {t("previous")}
          </Button>
          <Button
            variant="outline-secondary"
            size="sm"
            className="unfilled-btn-style"
            onClick={handleCancelPress}
          >
            {t("cancel")}
          </Button>
          <Button
            variant="outline-secondary"
            size="sm"
            className="unfilled-btn-style"
            onClick={() => handleSave()}
          >
            {t("save")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CostOfSecurityControls;
