import { useEffect } from "react";
import { getResponsiveStyle, useDrag, useRefresh } from "muuri-react";
import { useMediaQuery } from "react-responsive";
import ReusableCard from "../../component/reuseableComp/ReusableCard";
import { DragItemProps } from "./InsightPageType";
import { chartIds } from "./InsightPage";
import {
  DragComponent,
  DragInsightDiv,
  DragMoveAbsoluteDiv,
  DragMoveDiv,
} from "../GlobalStyles";

const DragItem = ({
  index,
  Element,
  dataKey,
  onBarCliked,
  title,
  data,
  onSliceCliked,
  categoryKey,
  id,
  hidden,
  reset,
}: DragItemProps) => {
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
  let width: any = "32.7%";

  if (isMobile) {
    return (
      <DragComponent
        className={hidden ? "d-none" : "d-block"}
        id={id === chartIds.TOP10_ASSETS ? "top" : "small"}
        borderWidth={responsiveStyle.borderWidth}
        width={responsiveStyle.width}
        height={id === chartIds.TOP10_ASSETS ? "37.5rem" : "18rem"}
        margin={responsiveStyle.margin}
        paddingTop={responsiveStyle.paddingTop}
      >
        <DragMoveAbsoluteDiv>
          <DragMoveDiv
            opacity={isDragging ? 1 : 1}
            transform={isDragging ? "scale(1.05)" : "scale(1)"}
            transition={"all .2s"}
          >
            <DragInsightDiv className="drag_handler"></DragInsightDiv>
            <ReusableCard height={id === chartIds.TOP10_ASSETS ? 37.5 : 18}>
              {
                <Element
                  id={id}
                  selected=""
                  onBarCliked={onBarCliked}
                  data={data[dataKey]}
                  category={categoryKey ? data[categoryKey] : []}
                  title={title}
                  onSliceCliked={onSliceCliked}
                />
              }
            </ReusableCard>
          </DragMoveDiv>
        </DragMoveAbsoluteDiv>
      </DragComponent>
    );
  }
  return (
    <DragComponent
      className={hidden ? "d-none" : "d-block"}
      id={id === chartIds.TOP10_ASSETS ? "top" : "small"}
      borderWidth={responsiveStyle.borderWidth}
      width={width}
      height={id === chartIds.TOP10_ASSETS ? "37rem" : "18rem"}
      margin={responsiveStyle.margin}
      paddingTop={responsiveStyle.paddingTop}
    >
      <DragMoveAbsoluteDiv>
        <DragMoveDiv
          opacity={isDragging ? 1 : 1}
          transform={isDragging ? "scale(1.05)" : "scale(1)"}
          transition={"all .2s"}
        >
          <DragInsightDiv className="drag_handler"></DragInsightDiv>
          <ReusableCard height={id === chartIds.TOP10_ASSETS ? 36.58 : 18}>
            {
              <Element
                id={id}
                selected=""
                onBarCliked={onBarCliked}
                data={data[dataKey]}
                category={categoryKey ? data[categoryKey] : []}
                title={title}
                onSliceCliked={onSliceCliked}
              />
            }
          </ReusableCard>
        </DragMoveDiv>
      </DragMoveAbsoluteDiv>
    </DragComponent>
  );
};

export default DragItem;
