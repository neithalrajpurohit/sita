import { RoutePath } from "../helpers/RoutePath";

import Handshake from "../assets/cardIcons/handshake.png";
import Touch from "../assets/cardIcons/touchControl.png";
import Contract from "../assets/cardIcons/contract.png";
import Daigram from "../assets/cardIcons/diagram.png";
import Search from "../assets/cardIcons/search.png";
import Collabrate from "../assets/cardIcons/collaborate.png";

// Icons For Sita Admin
import Fp from "../assets/cardIcons/functionprocess.png";
import Category from "../assets/cardIcons/category.png";
import TypesTags from "../assets/cardIcons/typestags.png";
import RiskQ from "../assets/cardIcons/riskques.png";
import Subscrp from "../assets/cardIcons/subscription.png";
import MTenent from "../assets/cardIcons/managetanent.png";
import TMFIcon from "../assets/cardIcons/tmf.png";
import UseCaseIcon from "../assets/cardIcons/usecaserules.png";
import { useTranslation } from "react-i18next";

export const EntityCard = () => {
  const { t } = useTranslation();
  return [
    {
      cardTitle: `${t("entityonboarding")}`,
      icon: Handshake,
      link: RoutePath.ENTITYONBOARDING,
      isDisabled: false,
    },
    {
      cardTitle: `${t("riskcontrols")}`,
      icon: Touch,
      link: RoutePath.RISKONBOARDING,
      isDisabled: false,
    },
    {
      cardTitle: `${t("riskimpact")}`,
      icon: Contract,
      link: RoutePath.RISKIMPACT,
      isDisabled: false,
    },
    {
      cardTitle: `${t("automaticassetdiscovery")}`,
      icon: Daigram,
      link: "#",
      isDisabled: true,
    },
    {
      cardTitle: `${t("compliance")}`,
      icon: Search,
      link: "#",
      isDisabled: true,
    },
    {
      cardTitle: `${t("costofsecuritycontrols")}`,
      icon: Collabrate,
      link: RoutePath.COSTOFSECURITYCONTROLS,
      isDisabled: false,
    },
  ];
};

export const SitaAdminCardData = () => {
  const { t } = useTranslation();

  return [
    {
      cardTitle: `${t("functionandprocess")}`,
      icon: Fp,
      link: RoutePath.ADDPREDEFFUNCTIONS,
      isDisabled: false,
    },
    {
      cardTitle: `${t("categoryandsubcategory")}`,
      icon: Category,
      link: RoutePath.MANAGECATEGORY,
      isDisabled: false,
    },
    {
      cardTitle: `${t("typesandtags")}`,
      icon: TypesTags,
      link: RoutePath.MANAGETYPESTAGS,
      isDisabled: false,
    },
    {
      cardTitle: `${t("tmffactor")}`,
      icon: TMFIcon,
      link: RoutePath.TMFFACTOR,
      isDisabled: false,
    },
    {
      cardTitle: `${t("riskquestions")}`,
      icon: RiskQ,
      link: RoutePath.RISK,
      isDisabled: false,
    },
    {
      cardTitle: `${t("subscriptions")}`,
      icon: Subscrp,
      link: RoutePath.TENANTPACKAGES,
      isDisabled: false,
    },
    {
      cardTitle: `${t("addmanagetanent")}`,
      icon: MTenent,
      link: RoutePath.MANAGEUSERS,
      isDisabled: false,
    },
    {
      cardTitle: `${t("usecaseandrule")}`,
      icon: UseCaseIcon,
      link: RoutePath.USECASEANDRULE,
      isDisabled: false,
    },
  ];
};
