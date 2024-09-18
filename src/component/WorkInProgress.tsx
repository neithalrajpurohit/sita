import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import WorkinProgress from "../assets/images/WorkinProgress.svg";
import { HiArrowLongLeft } from "react-icons/hi2";

const WorkInProgress = () => {
  const history = useHistory();

  useEffect(() => {
    document.title = "Work In Progress";
  }, []);

  return (
    <Container>
      <img src={WorkinProgress} alt="Work In Progress" loading="lazy" />
      <Button variant="outline-primary" onClick={() => history.push("/")}>
        <HiArrowLongLeft fontSize="1.5em" /> Back To Dashboard
      </Button>
    </Container>
  );
};

export default WorkInProgress;

const Container = styled.div`
  background-color: var(--bg-color);
  color: var(--entityonboarding-text-color);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  flex-direction: column;
`;
