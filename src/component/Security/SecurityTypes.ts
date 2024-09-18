import { Dispatch, SetStateAction } from "react";
import { SecurityManagementFetchPageResponse } from "../../store/Risk/RiskType";

export interface RiskOnBoardingProps {
  pageData: SecurityManagementFetchPageResponse["page_data"];
  onPageDataChange: (updatedPageData: RiskOnBoardingProps["pageData"]) => void;
}

export interface MarksType {
  [key: number]: {
    style: {
      color: string;
      width?: string;
      whiteSpace?: string;
      overflowWrap?: string;
      fontSize?: string;
      textAlign?: string;
    };
    label: string;
  };
}

export interface AuditmarksType {
  [key: number]: {
    style: {
      color: string;
      width?: any;
      whiteSpace?: string;
      overflowWrap?: string;
      fontSize?: string;
      textAlign?: string;
    };
    label: string;
  };
}

export interface BudgetMarksType {
  [key: number]: {
    style: { [key: string]: string };
    label: string;
    value: number;
  };
}

export interface FunctionsLineOfReportInputProps {
  preDefFlor: string[];
  optionsFlor: string[];
  selectedPreDefFlor: { name: string; label: string; value: string }[];
  othersFlor: string[];
  selectOtherFlor: { name: string; label: string; value: string }[];
  deletedOtherFlor: string[];
  newCreatedFlorOther: string[];
  deleteNewCreatedFlor: Dispatch<SetStateAction<string[]>>;
  onChange: (
    selectedPreDefFlor: FunctionsLineOfReportInputProps["selectedPreDefFlor"],
    othersFlor: FunctionsLineOfReportInputProps["othersFlor"],
    selectOtherFlor: FunctionsLineOfReportInputProps["selectOtherFlor"],
    deletedOtherFlor: FunctionsLineOfReportInputProps["deletedOtherFlor"],
    newCreatedFlorOther: FunctionsLineOfReportInputProps["newCreatedFlorOther"]
  ) => void;
}

export interface SecurityBudgetInputProps {
  value: number;
  onChange: (newValue: number) => void;
}

export interface CertificateRegulationInputProps {
  deleted_regulation_others: {
    label: string;
    name: string;
    freq: number;
  }[];
  predefined_regulation: string[];
  regulation_others: {
    label: string;
    name: string;
    freq: number;
  }[];
  selected_regulation: {
    label: string;
    name: string;
    freq: number;
  }[];
  onChange: (
    selected_regulation: CertificateRegulationInputProps["selected_regulation"],
    regulation_others: CertificateRegulationInputProps["regulation_others"],
    deleted_regulation_others: CertificateRegulationInputProps["deleted_regulation_others"]
  ) => void;
}

export interface SecurityPropType {
  pageData: SecurityManagementFetchPageResponse["page_data"];
  onPageDataChange: (updatedPageData: RiskOnBoardingProps["pageData"]) => void;
}
