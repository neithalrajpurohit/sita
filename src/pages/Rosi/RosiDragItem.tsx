import { useEffect, useRef } from "react";
import { getResponsiveStyle, useDrag, useRefresh } from "muuri-react";
import { useMediaQuery } from "react-responsive";
import ReusableCard from "../../component/reuseableComp/ReusableCard";
import {
  DragComponent,
  DragRosiRiskDiv,
  RosiRiskDragComponent,
  RosiRiskDragItemContainer,
} from "../GlobalStyles";

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
  reset,
}: any) => {
  const refresh = useRefresh();
  const isDragging = useDrag();
  const chartRef = useRef<any>();

  useEffect(() => {
    setTimeout(() => {
      refresh();
      if (chartRef.current) {
        chartRef.current?.chart?.reflow();
      }
    }, 900);
  }, []);

  useEffect(() => {
    refresh();
  }, [reset, hidden]);

  useEffect(() => {
    chartRef.current?.chart?.reflow();
  }, [data, chartRef]);

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
    margin: hidden ? "0" : "0.2rem",
    // The width/height ratio. If you want to set a static
    // height just set the "height" option in px and remove the "ratio".
    // ratio: 5.1,
    height: "18rem",
  });
  let width: any = "32.7%";

  const handleChildRef = (ref: any) => {
    chartRef.current = ref;
    // ref?.chart?.reflow();
  };

  return (
    <DragComponent
      className={hidden ? "d-none" : "d-block"}
      width={width}
      height={responsiveStyle.height}
      margin={responsiveStyle.margin}
      paddingTop={responsiveStyle.paddingTop}
      borderWidth={responsiveStyle.borderWidth}
    >
      <RosiRiskDragItemContainer>
        <RosiRiskDragComponent isDragging={isDragging}>
          <DragRosiRiskDiv className="drag_handler"></DragRosiRiskDiv>
          <ReusableCard height={18}>
            {
              <Element
                id={id}
                onChartClick={onChartClick}
                data={data}
                title={title}
                onRef={handleChildRef}
                value={value}
                total={total}
                key={id}
                expense={expense}
              />
            }
          </ReusableCard>
        </RosiRiskDragComponent>
      </RosiRiskDragItemContainer>
    </DragComponent>
  );
};

export default DragItem;
