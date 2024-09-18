import { orderBy } from "lodash";

export default function formatNumber(num: number) {
  if (num < 0) {
    return "0";
  }

  const suffixes = ["", "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No"];

  let suffixIndex = 0;
  while (num >= 1000 && suffixIndex < suffixes.length - 1) {
    suffixIndex++;
    num /= 1000;
  }

  return (Math.round(num * 100) / 100).toString() + suffixes[suffixIndex];
}

export const formatLargeNumber = (number: number) => {
  if (number >= 1e12) {
    return (number / 1e12).toFixed(1) + "T";
  } else if (number >= 1e9) {
    return (number / 1e9).toFixed(1) + "B";
  } else if (number >= 1e6) {
    return (number / 1e6).toFixed(1) + "M";
  } else if (number >= 1e3) {
    return (number / 1e3).toFixed(1) + "K";
  } else {
    return number.toFixed(1).toString();
  }
};

type TShowTopTenAssetArr = {
  asset_name: string;
  residual_risk: string;
  inherient_risk: string;
  cost: string;
}[];

export const showTopTenAssetsByRisk = (arr: TShowTopTenAssetArr) => {
  if (arr.length === 0) {
    return `<b>0 Assets</b>`;
  }
  if (arr.length > 10) {
    return String([
      ...orderBy([...arr], ["residual_risk"], ["desc"])
        .map(
          (asset) =>
            `<tr>${asset.asset_name}: ${asset.residual_risk}</tr> <br />`
        )
        .slice(0, 10),
      `<b>...${arr.length - 10} more asset</b>`,
    ]).replaceAll(",", "");
  }

  return String([
    ...orderBy([...arr], ["residual_risk"], ["desc"])
      .map(
        (asset) => `<tr>${asset.asset_name}: ${asset.residual_risk}</tr> <br />`
      )
      .slice(0, 10),
  ]).replaceAll(",", "");
};
