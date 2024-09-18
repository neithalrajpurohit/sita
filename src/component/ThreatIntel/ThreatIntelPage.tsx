import { Container } from "react-bootstrap";
import ThreatIntelHeader from "./ThreatIntelHeader";
import ThreatIntelGrid from "./ThreatIntelGrid";
import { useSelector } from "react-redux";
import { RootState } from "../../configureStore";
import LazyLoading from "../LazyLoading";
import { LoadingContainer } from "../../pages/GlobalStyles";
import ThreatIntelChartSection from "./ThreatIntelChartSection";

const ThreatIntelPage = () => {
  const isLoading = useSelector(
    (state: RootState) => state.ThreatIntel.isLoading
  );
  return (
    <>
      {/* Header */}
      <ThreatIntelHeader />

      {isLoading ? (
        <LoadingContainer>
          <LazyLoading />
        </LoadingContainer>
      ) : (
        <>
          {/* Pie / Bar Charts Section */}
          <ThreatIntelChartSection />
          {/* Grid */}
          <ThreatIntelGrid />
        </>
      )}
    </>
  );
};

export default ThreatIntelPage;
