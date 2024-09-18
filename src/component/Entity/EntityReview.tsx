import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../configureStore";
import { useThemeVal } from "../../hooks/useThemeVar";
import { StyledTable } from "../GlobalComponentStyles";
import GoogleMapCard2 from "../GoogleMap/GoogleMapCard2";
import {
  BrandContainer2,
  CustomCardBodyAssets,
  CustomCardBodyFunction,
  CustomCardContainer,
  CustomCardHeader,
  EntityReviewColumn,
  ImageContainer2,
  ListContainer,
  ListEntry,
  ListEntrySub,
  MapContainer,
  PageTitle,
} from "./EntityStyles";

const EntityReview = () => {
  const { t } = useTranslation();
  const EntityData = useSelector(
    (state: RootState) => state.EntityCreation.entityCreation
  );
  const EntityFunctionAndProcesses = useSelector(
    (state: RootState) => state.EntityFunctionAndProcess.FunctionAndProcesses
  );
  const EntityAssetsTable = useSelector(
    (state: RootState) => state.EntityAsset.assetTableData
  );

  const exampleMapStyles = [
    {
      // featureType: "geometry",
      elementType: "geometry",
      stylers: [{ color: useThemeVal("geometry") }],
    },
    {
      featureType: "water",
      // elementType: "water",

      stylers: [
        {
          color: useThemeVal("water"),
        },
      ],
    },
  ];
  return (
    <Container fluid>
      <Row md={12}>
        <PageTitle className="my-2">{t("review")}</PageTitle>
      </Row>
      <Row md={12}>
        <BrandContainer2>
          <ImageContainer2>
            <img src={EntityData.companyLogo} alt="" />
          </ImageContainer2>
          <PageTitle className="my-2">{EntityData.companyName}</PageTitle>
        </BrandContainer2>
      </Row>
      <Row md={12} className="px-0">
        <Col lg={6} className="px-0">
          <EntityReviewColumn lg={12}>
            <CustomCardContainer>
              <CustomCardHeader>
                {EntityData.companyName} {t("location")}
              </CustomCardHeader>
              <MapContainer>
                <GoogleMapCard2
                  mapstyle={exampleMapStyles}
                  marker={EntityData.companyLocations.map((e: any) => {
                    return {
                      ...e.position,
                      info: `${e.office}, ${e.city}, ${e.state},${e.country}`,
                    };
                  })}
                />
              </MapContainer>
            </CustomCardContainer>
          </EntityReviewColumn>
        </Col>
        <Col lg={6} className="px-0">
          <EntityReviewColumn lg={12}>
            <CustomCardContainer>
              <CustomCardHeader>{t("fphierarchy")}</CustomCardHeader>
              <CustomCardBodyFunction>
                <ListContainer>
                  <Row xs={12}>
                    {EntityFunctionAndProcesses.map((e, index) => (
                      <Col xs={12} key={index} className="my-2">
                        <ListEntry color={e.functionColor}>
                          {e.functionName}
                        </ListEntry>
                        {e.process.map((g, i) => (
                          <Row key={i}>
                            <Col xs={10}>
                              <ListEntrySub color={g.processColor}>
                                &nbsp;&nbsp;-
                                {g.processName}
                              </ListEntrySub>
                            </Col>
                          </Row>
                        ))}
                      </Col>
                    ))}
                  </Row>
                </ListContainer>
              </CustomCardBodyFunction>
            </CustomCardContainer>
          </EntityReviewColumn>
          <EntityReviewColumn lg={12}>
            <CustomCardContainer>
              <CustomCardHeader>{t("assets").toUpperCase()}</CustomCardHeader>
              <CustomCardBodyAssets>
                <ListContainer>
                  <StyledTable>
                    <thead>
                      <tr>
                        <th>{t("asset").toUpperCase()}</th>
                        <th>{t("function").toUpperCase()}</th>
                        <th>{t("process").toUpperCase()}</th>
                        <th>{t("geo").toUpperCase()}</th>
                        <th>{t("category").toUpperCase()}</th>
                        <th>{t("subcategory").toUpperCase()}</th>
                        <th>{t("type").toUpperCase()}</th>
                        <th>{t("subtype").toUpperCase()}</th>
                        <th>{t("tags").toUpperCase()}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {EntityAssetsTable.map((e: any, index: number) => (
                        <tr key={index}>
                          <td>{e.assetName}</td>
                          <td>{e.functionData.functionName}</td>
                          <td>
                            {e.functionData.processes
                              .map((f: any) => f.processName)
                              .join(",")}
                          </td>
                          <td>{e.location.locationName}</td>
                          <td>{e.category.categoryName}</td>
                          <td>{e.category.subcategory.subcategoryName}</td>
                          <td>{e.type.typeName}</td>
                          <td>{e.type.subtype.subtypeName}</td>
                          <td>
                            {e.tags.length > 0 &&
                              e.tags.map((f: any) => f.tagsName).join(" , ")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </StyledTable>
                </ListContainer>
              </CustomCardBodyAssets>
            </CustomCardContainer>
          </EntityReviewColumn>
        </Col>
      </Row>
    </Container>
  );
};

export default EntityReview;
