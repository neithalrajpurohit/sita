import React from "react";
import {
  StyledRguContainer,
  DataCard,
  DataCardMiddleTitle,
  DataCardBody,
} from "./RiskImpactStyles";
import { HiPencil, HiTrash } from "react-icons/hi2";
import { ButtonContainer } from "../GlobalComponentStyles";
import { Col } from "react-bootstrap";
import { RGUData } from "./RiskImpactUtils";
import { formatCurrencyWithCommas } from "../../utils/CurrenyConverter";
import { useTranslation } from "react-i18next";

interface RGUListProps {
  rguDataList: RGUData[];
  selectedRguId: number | null; // Replace 'string' with the actual type
  setSelectedRguId: React.Dispatch<React.SetStateAction<number | null>>;
  setIsEditingRgu: React.Dispatch<React.SetStateAction<boolean>>;
  deleteRguFromList: () => void;
  setData: React.Dispatch<React.SetStateAction<RGUData>>;
}

const RGUList: React.FC<RGUListProps> = ({
  rguDataList,
  selectedRguId,
  setSelectedRguId,
  setIsEditingRgu,
  deleteRguFromList,
  setData,
}) => {
  const { t } = useTranslation();
  return (
    <Col lg={12} className="my-1">
      <DataCard>
        <DataCardMiddleTitle>{t("rgu")}</DataCardMiddleTitle>
        <DataCardBody height="9.25rem">
          {rguDataList.map((rgu, index) => (
            <StyledRguContainer
              backgroundColor={selectedRguId === rgu.id ? "#B2B2B2" : ""}
              color={selectedRguId === rgu.id ? "black" : ""}
              id={`rgu_container_${index}`}
              key={rgu.id}
              onClick={() =>
                setSelectedRguId((prev) => (prev === rgu.id ? null : rgu.id))
              }
            >
              <div className="w-100 wordBreakAll">{rgu.rgu_name}</div>
              <b>{formatCurrencyWithCommas(Number(rgu.revenue), "USD")} </b>
            </StyledRguContainer>
          ))}
        </DataCardBody>
      </DataCard>
      <ButtonContainer
        className="my-2"
        pointerEnvents={selectedRguId === null ? "none" : "all"}
        opacity={selectedRguId === null ? 0.75 : 1}
      >
        <HiPencil
          cursor="pointer"
          onClick={() => {
            setIsEditingRgu(true);
            const objToEdit = rguDataList.find((e) => e.id === selectedRguId);
            setData({
              ...objToEdit!,
              revenue: String(objToEdit?.revenue!),
            });
          }}
        />
        <HiTrash cursor="pointer" onClick={deleteRguFromList} />
      </ButtonContainer>
    </Col>
  );
};

export default RGUList;
