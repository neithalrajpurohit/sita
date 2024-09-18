import { Container } from "react-bootstrap";
import ThreatIntelPage from "../../component/ThreatIntel/ThreatIntelPage";
import { useEffect } from "react";

const ThreatIntel = () => {
  useEffect(() => {
    document.title = "Threat Intel";
  }, []);

  return (
    <Container fluid>
      <ThreatIntelPage />
    </Container>
  );
};

export default ThreatIntel;
