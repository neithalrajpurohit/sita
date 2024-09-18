import { useTranslation } from "react-i18next";

export const AddEditPrespectiveOptions = () => {
  const { t } = useTranslation();

  return {
    AnalysisTypeOption: [
      {
        value: "Alert",
        label: `${t("incident")}`,
      },
      {
        value: "Pattern",
        label: `${t("pattern")}`,
      },
      {
        value: "Analysis",
        label: `${t("analysis")}`,
      },
    ],
    ActedUponOption: [
      {
        value: "Notified",
        label: `${t("notified")}`,
      },
      {
        value: "Under_investigation",
        label: `${t("underinvestigation")}`,
      },
      {
        value: "Contained",
        label: `${t("contained")}`,
      },
      {
        value: "Closed_by_Etek",
        label: `${t("closedbyetek")}`,
      },
      {
        value: "Closed_by_client",
        label: `${t("closebyclient")}`,
      },
      {
        value: "No_action",
        label: `${t("noaction")}`,
      },
    ],
    SelectLevel: [
      {
        value: "High",
        label: `${t("high")}`,
      },
      {
        value: "Medium",
        label: `${t("medium")}`,
      },
      {
        value: "Low",
        label: `${t("low")}`,
      },
    ],
    ActionTaken: [
      {
        value: "Confirmed",
        label: `${t("confirmed")}`,
      },
      {
        value: "Under_investigation",
        label: `${t("underinvestigation")}`,
      },
      {
        value: "False_Positive",
        label: `${t("falsepositive")}`,
      },
    ],
  };
};

export const SecurityPulseCriticality = () => {
  const { t } = useTranslation();
  return [
    {
      value: "High",
      label: `${t("high")}`,
    },
    {
      value: "Medium",
      label: `${t("medium")}`,
    },
    {
      value: "Low",
      label: `${t("low")}`,
    },
  ];
};
