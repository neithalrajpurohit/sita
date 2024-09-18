import React from "react";
import { Container, Form, Row } from "react-bootstrap";
import {
  AssetFillIndicator,
  AssetFillIndicatorContainer,
  AssetFillIndicatorText,
  AssetGridContainer,
  AssetGridHeaderItem,
  AssetGridItem,
  AssetSummaryBox,
  AssetSummaryBoxBody,
  PageTitle,
} from "./EntityStyles";
import { useTranslation } from "react-i18next";
import { AssetSummaryProps } from "./EntityTypes";

function EntityAssetsSummary(props: AssetSummaryProps) {
  const { t } = useTranslation();
  const { data, onChange } = props;

  const onTotalInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    item: {
      type_id: number;
      type_name: string;
      enrolled_assets: number;
      total_asset_qty: number;
      same_as_enrolled: boolean;
      soc_coverage: number;
    }
  ) => {
    if (event.target.value.length > 5) return;
    let value = event.target.value;
    const newArr = [...data];
    const indexOfCurrentObj = newArr.findIndex(
      (index) => index.type_id === item.type_id
    );
    const condition = Number(value) <= item.enrolled_assets;
    const updateNewArr = [
      ...newArr.slice(0, indexOfCurrentObj),
      {
        ...item,
        total_asset_qty: Number(value),
        same_as_enrolled:
          item.enrolled_assets === Number(value)
            ? item.enrolled_assets === Number(value)
            : false,
        soc_coverage: condition
          ? 100
          : Number(
              Number((item.enrolled_assets * 100) / Number(value)).toFixed(1)
            ),
      },
      ...newArr.slice(indexOfCurrentObj + 1),
    ];
    onChange([...updateNewArr]);
  };
  const onTotalInputBlur = (
    event: React.FocusEvent<HTMLInputElement>,
    item: {
      type_id: number;
      type_name: string;
      enrolled_assets: number;
      total_asset_qty: number;
      same_as_enrolled: boolean;
      soc_coverage: number;
    }
  ) => {
    if (event.target.value.length > 5) return;
    let value = event.target.value;
    const newArr = [...data];
    const indexOfCurrentObj = newArr.findIndex(
      (index) => index.type_id === item.type_id
    );
    const condition = Number(value) <= item.enrolled_assets;
    const updateNewArr = [
      ...newArr.slice(0, indexOfCurrentObj),
      {
        ...item,
        total_asset_qty: condition ? item.enrolled_assets : Number(value),
        same_as_enrolled: condition
          ? true
          : item.enrolled_assets === Number(value),
        soc_coverage: condition
          ? 100
          : Number(
              Number((item.enrolled_assets * 100) / Number(value)).toFixed(1)
            ),
      },
      ...newArr.slice(indexOfCurrentObj + 1),
    ];
    onChange([...updateNewArr]);
  };

  const onSameAsEnrolledSelected = (
    event: React.ChangeEvent<HTMLInputElement>,
    item: {
      type_id: number;
      type_name: string;
      enrolled_assets: number;
      total_asset_qty: number;
      same_as_enrolled: boolean;
      soc_coverage: number;
    }
  ) => {
    const newArr = [...data];
    const indexOfCurrentObj = newArr.findIndex(
      (index) => index.type_id === item.type_id
    );
    const condition =
      item.enrolled_assets === item.total_asset_qty
        ? true
        : event.target.checked;
    const updateNewArr = [
      ...newArr.slice(0, indexOfCurrentObj),
      {
        ...item,
        total_asset_qty: condition
          ? item.enrolled_assets
          : item.total_asset_qty,
        same_as_enrolled:
          item.enrolled_assets === item.total_asset_qty ? true : condition,
        soc_coverage: condition
          ? 100
          : Number(
              Number(
                (item.enrolled_assets * 100) / item.total_asset_qty
              ).toFixed(1)
            ),
      },
      ...newArr.slice(indexOfCurrentObj + 1),
    ];
    onChange([...updateNewArr]);
  };

  function dynamicColor(value: number) {
    let color;
    if (value > 75 && value <= 100) {
      color = "#06AE4E";
    } else if (value > 50 && value <= 75) {
      color = "#F3C627";
    } else if (value > 25 && value <= 50) {
      color = "#f6860e";
    } else {
      color = "#FE0002";
    }
    return color;
  }

  return (
    <Container fluid>
      <Row md={12}>
        <PageTitle className="my-2">{t("assetsummaryvalidation")}</PageTitle>
      </Row>
      <Row xl={12}>
        <AssetSummaryBox>
          <AssetGridContainer className="mb-3">
            <AssetGridHeaderItem align={"left"}>
              {t("assettype")}
            </AssetGridHeaderItem>
            <AssetGridHeaderItem align={"center"}>
              {t("enrolled")}
            </AssetGridHeaderItem>
            <AssetGridHeaderItem align={"center"}>
              {t("total")}
            </AssetGridHeaderItem>
            <AssetGridHeaderItem align={"center"}>
              {t("sameasenrolled")}
            </AssetGridHeaderItem>
            <AssetGridHeaderItem align={"center"}>
              {t("netrumcoverage")} (%)
            </AssetGridHeaderItem>
          </AssetGridContainer>
          <AssetSummaryBoxBody>
            <AssetGridContainer>
              {data.map((item) => (
                <React.Fragment key={item.type_id}>
                  <AssetGridItem align={"left"}>{item.type_name}</AssetGridItem>
                  <AssetGridItem align={"center"}>
                    {item.enrolled_assets}
                  </AssetGridItem>
                  <AssetGridItem align={"left"}>
                    <Form.Control
                      type="number"
                      min={item.enrolled_assets}
                      step={1}
                      max={99999}
                      inputMode="numeric" // Show up and down arrows
                      value={item.total_asset_qty}
                      onKeyDown={(event) => {
                        const allowedKeys = [
                          "Backspace",
                          "Delete",
                          "Tab",
                          "ArrowLeft",
                          "ArrowRight",
                          "ArrowUp",
                          "ArrowDown",
                        ];
                        if (
                          !(
                            (event.key >= "0" && event.key <= "9") ||
                            allowedKeys.includes(event.key)
                          )
                        ) {
                          event.preventDefault();
                        }
                      }}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        onTotalInputChange(event, item)
                      }
                      onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
                        onTotalInputBlur(event, item)
                      }
                    />
                  </AssetGridItem>
                  <AssetGridItem align={"center"}>
                    <Form.Check
                      type="checkbox"
                      id="default-checkbox"
                      label=""
                      checked={item.same_as_enrolled}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        onSameAsEnrolledSelected(event, item)
                      }
                    />
                  </AssetGridItem>
                  <AssetGridItem align={"center"}>
                    <AssetFillIndicatorContainer>
                      <AssetFillIndicator
                        maxWidth="12.5rem"
                        color={dynamicColor(item.soc_coverage)}
                        fillNumber={item.soc_coverage}
                      ></AssetFillIndicator>
                      <AssetFillIndicatorText
                        color={dynamicColor(item.soc_coverage)}
                      >
                        {item.soc_coverage + "%"}
                      </AssetFillIndicatorText>
                    </AssetFillIndicatorContainer>
                  </AssetGridItem>
                </React.Fragment>
              ))}
            </AssetGridContainer>
          </AssetSummaryBoxBody>
        </AssetSummaryBox>
      </Row>
    </Container>
  );
}

export default EntityAssetsSummary;
