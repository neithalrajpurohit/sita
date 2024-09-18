import { getResponsiveStyle, useDrag, useRefresh } from "muuri-react";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import ReusableCard from "../../component/reuseableComp/ReusableCard";
import { DragComponent, DragOEIDiv } from "../GlobalStyles";

interface SecurityCard {
  id: any;
  Element: any;
  itemData: any;
}
const OeiDragItems = ({
  id,
  Element,
  itemData,
  data,
  resolutionCard,
  cards,
  hidden,
  title,
}: any) => {
  const refresh = useRefresh();
  const isDragging = useDrag();

  useEffect(() => {
    refresh();
  }, [hidden]);

  useEffect(() => {
    setTimeout(() => {
      refresh();
    }, 900);
  }, []);

  const isMobile = useMediaQuery({
    query: "(max-width: 900px)",
  });

  const responsiveStyle = getResponsiveStyle({
    // We have configured Muuri component  to have virtually divided into 3 columns,
    // the width of the item will be 1 columns (minus the margin).
    columns: isMobile ? 1 / 1 : 1 / 2,
    // The margin of the item, it can be any CSS values
    // valid for the margin expressed in "px" or "%".
    // margin: "1%",
    margin: hidden ? "0" : "0.25em",
    // The width/height ratio. If you want to set a static
    // height just set the "height" option in px and remove the "ratio".
    // ratio: 1.9,
    height: "18rem",
  });
  let width: any;

  if (id === "security_operations") {
    width = "99%";
  } else {
    width = "49.1%";
  }
  if (id === "security_operations") {
    return (
      <DragComponent
        className={`item ${hidden ? "d-none" : "d-block"}`}
        position={"relative"}
        borderWidth={responsiveStyle.borderWidth}
        width={width}
        height={responsiveStyle.height}
        margin={responsiveStyle.margin}
        paddingTop={responsiveStyle.paddingTop}
      >
        <div className="drag_inner_handler"></div>
        <div className="item-content">
          <ReusableCard height={18}>
            <Element dragCard={cards} dataSet={data} />
          </ReusableCard>
        </div>
      </DragComponent>
    );
  } else {
    if (isMobile) {
      return (
        <DragComponent
          className={`item ${hidden ? "d-none" : "d-block"}`}
          position={"relative"}
          borderWidth={responsiveStyle.borderWidth}
          width={responsiveStyle.width}
          height={responsiveStyle.height}
          margin={responsiveStyle.margin}
          paddingTop={responsiveStyle.paddingTop}
        >
          <div className="item-content">
            <DragOEIDiv className="drag_handler"></DragOEIDiv>
            <ReusableCard height={18}>
              <Element data={data[itemData]} />
            </ReusableCard>
          </div>
        </DragComponent>
      );
    }
    return (
      <DragComponent
        className={`item ${hidden ? "d-none" : "d-block"}`}
        position={"relative"}
        borderWidth={responsiveStyle.borderWidth}
        width={width}
        height={responsiveStyle.height}
        margin={responsiveStyle.margin}
        paddingTop={responsiveStyle.paddingTop}
      >
        <div className="item-content">
          <DragOEIDiv className="drag_handler"></DragOEIDiv>
          <ReusableCard height={18}>
            <Element data={data[itemData]} />
          </ReusableCard>
        </div>
      </DragComponent>
    );
  }
};

export default OeiDragItems;
