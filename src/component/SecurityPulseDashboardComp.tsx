import { Card, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../index";

import { useHistory } from "react-router-dom";

import { SecurityPulseDetailsActionCreator } from "../store/SecurityPulse/SecurityPulseDetailsSlice";
import styled, { keyframes } from "styled-components";
import { DashboardActionCreator } from "../store/Dashboard/DashboardSlice";
import { RoutePath } from "../helpers/RoutePath";
import { SecurityPulseMarqueeItem } from "./GlobalComponentStyles";

interface SPDataProps {
  data: any[];
}

const SecurityPulseDashboardComp = (props: SPDataProps) => {
  const { data } = props;

  const history = useHistory();
  const dispatch: AppDispatch = useDispatch();

  const onEyeButtonClick = (incidentId: string) => {
    dispatch(
      SecurityPulseDetailsActionCreator.getSecurityPulseDetailsData(incidentId)
    )
      .then(() =>
        dispatch(SecurityPulseDetailsActionCreator.updateIsPreview(false))
      )
      .then(() => history.push("/SecurityPulseDetail"));
  };

  function truncate(str: string) {
    return str.length > 10 ? str.substring(0, 50) + "..." : str;
  }

  return (
    <>
      <Col sm={12}>
        <Card className="my-1">
          <MarqueeContainer>
            <MarqueeContent
              speed={data.length > 0 ? Number(10 * data.length) : 60}
            >
              {data.map((e: any, index: number) => (
                <SecurityPulseMarqueeItem
                  key={index}
                  onClick={() => {
                    if (e.IsExternal) {
                      dispatch(DashboardActionCreator.SelectedCybleID(e.id))
                        .then(() => {
                          dispatch(
                            DashboardActionCreator.FetchCybleFeeds(e.id)
                          );
                        })
                        .then(() => {
                          history.push(RoutePath.CYBLEFEED);
                        });
                    } else {
                      onEyeButtonClick(e.id);
                    }
                  }}
                >
                  {e.title} : {truncate(e.description || "")}
                </SecurityPulseMarqueeItem>
              ))}
            </MarqueeContent>
          </MarqueeContainer>
        </Card>
      </Col>
    </>
  );
};

export default SecurityPulseDashboardComp;

interface Marquee {
  speed: number;
}

const marqueeAnimation = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-100%, 0, 0);
  }

`;
const MarqueeContainer = styled.div`
  overflow: hidden;
  cursor: pointer;
  background-color: var(--card-bg-color);
`;

const MarqueeContent = styled.div<Marquee>`
  display: inline-block;
  white-space: nowrap;
  animation: ${marqueeAnimation} ${(props) => props.speed}s linear infinite;
  animation-play-state: running;

  &:hover {
    animation-play-state: paused;
  }
`;
