import { useEffect } from "react";
import { getResponsiveStyle, useDrag, useRefresh } from "muuri-react";
import { useMediaQuery } from "react-responsive";
import { chartIds } from "../RiskUserDashboard";
import {
  DragComponent,
  DragRosiRiskDiv,
  RosiRiskDragComponent,
  RosiRiskDragItemContainer,
} from "../../../pages/GlobalStyles";

const DragItem = ({
  Element,
  onChartClick,
  title,
  data,
  id,
  hidden,
  value,
  total,
  expense,
  getPinsForMap,
}: any) => {
  const refresh = useRefresh();
  const isDragging = useDrag();

  useEffect(() => {
    setTimeout(() => {
      refresh();
    }, 900);
  }, []);

  useEffect(() => {
    refresh();
  }, [hidden]);

  const isMobile = useMediaQuery({
    query: "(max-width: 900px)",
  });

  const responsiveStyle = getResponsiveStyle({
    // We have configured Muuri component  to have virtually divided into 3 columns,
    // the width of the item will be 1 columns (minus the margin).
    columns: isMobile ? 1 / 1 : 1 / 3,
    // The margin of the item, it can be any CSS values
    // valid for the margin expressed in "px" or "%".
    // margin: "1%",
    // margin: "7px 2px",
    margin: hidden ? "0" : "0.25em",
    // The width/height ratio. If you want to set a static
    // height just set the "height" option in px and remove the "ratio".
    // ratio: 5.1,
    height: "284px",
  });
  let width: any = "32.5%";

  // chart data will be different based on the chart id
  let chartData: any = {};

  if (chartIds.RUD_PROCESSCHART === id) {
    chartData = { ...data.process_chart, datalabels: false };
  } else if (chartIds.RUD_FUNCTIONCHART === id) {
    chartData = { ...data.function_chart, datalabels: false };
  } else if (id === chartIds.RUD_HEATMAPCHART) {
    chartData = { ...data.heat_map_data };
  }

  return (
    <DragComponent
      className={hidden ? "d-none" : "d-block"}
      id={id === chartIds.RUD_RISK_IMPACT ? "top" : "small"}
      width={width}
      height={id === chartIds.RUD_RISK_IMPACT ? "36.5rem" : "18rem"}
      margin={responsiveStyle.margin}
      paddingTop={responsiveStyle.paddingTop}
      borderWidth={responsiveStyle.borderWidth}
    >
      <RosiRiskDragItemContainer>
        <RosiRiskDragComponent isDragging={isDragging}>
          <DragRosiRiskDiv className="drag_handler"></DragRosiRiskDiv>
          {
            <Element
              id={id}
              onChartClick={onChartClick}
              data={chartData}
              title={title}
              value={value}
              total={total}
              expense={expense}
              getPinsForMap={getPinsForMap}
            />
          }
        </RosiRiskDragComponent>
      </RosiRiskDragItemContainer>
    </DragComponent>
  );
};

export default DragItem;
