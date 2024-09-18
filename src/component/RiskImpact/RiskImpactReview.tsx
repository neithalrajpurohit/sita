import React from "react";
import {
  StyledBookMark,
  StyledRiskImpactTableRow,
  StyledRiskImpactTd,
  StyledTable,
  StyledTableContainer,
} from "./RiskImpactStyles";
import { OutputData, RGUData, transformData } from "./RiskImpactUtils";
import { useTranslation } from "react-i18next";
import { formatCurrencyWithCommas } from "../../utils/CurrenyConverter";

interface TRiskImpactReviewProps {
  data: RGUData[];
}

function RiskImpactReview({ data }: TRiskImpactReviewProps) {
  const { t } = useTranslation();
  const transformedArray: OutputData[] = transformData(data);
  return (
    <StyledTableContainer>
      <StyledTable>
        <thead>
          <tr>
            <th>{t("rgu").toUpperCase()}</th>
            <th>{t("revenue").toUpperCase()}</th>
            <th>{t("function").toUpperCase()}</th>
            <th>{t("process").toUpperCase()}</th>
          </tr>
        </thead>
        <tbody>
          {[...transformedArray].map((e, index) => {
            const { function_name, rgu_name } = e;
            const checkRgu =
              index > 0
                ? rgu_name === transformedArray[index - 1].rgu_name
                : false;
            const checkFunc =
              index > 0 && checkRgu
                ? function_name === transformedArray[index - 1].function_name
                : false;

            return (
              <StyledRiskImpactTableRow
                key={e.id}
                borderTop={
                  checkRgu ? "transparent" : `2px solid var(--font-color)`
                }
                borderRight="2px solid var(--font-color)"
                borderLeft="2px solid var(--font-color)"
                borderBottom={
                  transformedArray.length === index + 1
                    ? `2px solid var(--font-color)`
                    : checkRgu
                    ? "transparent"
                    : !checkFunc
                    ? "transparent"
                    : `2px solid var(--font-color)`
                }
              >
                <StyledRiskImpactTd
                  className="special_td font-weight-bolder"
                  opacity={checkRgu ? 0 : 1}
                >
                  <StyledBookMark />
                  {e.rgu_name}
                </StyledRiskImpactTd>
                <StyledRiskImpactTd opacity={checkRgu ? 0 : 1}>
                  {formatCurrencyWithCommas(Number(e.revenue), "USD")}
                </StyledRiskImpactTd>
                <StyledRiskImpactTd opacity={checkFunc ? 0 : 1}>
                  {e.function_name}
                </StyledRiskImpactTd>
                <td>{e.process_name}</td>
              </StyledRiskImpactTableRow>
            );
          })}
        </tbody>
      </StyledTable>
    </StyledTableContainer>
  );
}

export default RiskImpactReview;
