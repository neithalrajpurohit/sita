import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useRefresh, getResponsiveStyle } from "muuri-react";
import {
  DragComponent,
  DragMoveAbsoluteDiv,
  DragOEIHozDiv,
} from "../GlobalStyles";

const OeiHorizontalItem = ({ dataSet, dragCard, card }: any) => {
  const isMobile = useMediaQuery({
    query: "(max-width: 900px)",
  });
  const refresh = useRefresh();

  useEffect(() => {
    setTimeout(() => {
      refresh();
    }, 900);
  }, []);

  useEffect(() => {
    refresh();
  }, [card.hidden]);

  const responsiveStyle = getResponsiveStyle({
    // We have configured Muuri component  to have virtually divided into 3 columns,
    // the width of the item will be 1 columns (minus the margin).
    columns: isMobile ? 1 / 1 : 1 / 3,
    // The margin of the item, it can be any CSS values
    // valid for the margin expressed in "px" or "%".
    // margin: "1%",
    // margin: "13px 6px",
    // The width/height ratio. If you want to set a static
    // height just set the "height" option in px and remove the "ratio".
    // ratio: 1.9,
    height: "16rem",
  });

  return (
    <DragComponent
      className={`item ${card.hidden ? "d-none" : "d-block"}`}
      position={"relative"}
      borderWidth={responsiveStyle.borderWidth}
      width={"33.33%"}
      height={responsiveStyle.height}
      margin={responsiveStyle.margin}
      paddingTop={responsiveStyle.paddingTop}
    >
      <DragOEIHozDiv className="drag_inner_handler"></DragOEIHozDiv>
      <DragMoveAbsoluteDiv className="item-content ">
        <card.Element data={dataSet[card.itemData]} />
      </DragMoveAbsoluteDiv>
    </DragComponent>
  );
};

export default OeiHorizontalItem;
