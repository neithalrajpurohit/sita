import { BarContainer, TabText, TextContainer } from "../GlobalComponentStyles";
import { ArrProps } from "./SitaAdminTypes";

const AdminFormBar = (props: ArrProps) => {
  const { Arr, currentActive, onClick } = props;
  return (
    <div>
      {/* <h1>Risk</h1> */}
      <BarContainer>
        {Arr.map((e, index) => (
          <TextContainer
            key={index}
            cursor={"pointer"}
            backgroundColor={
              currentActive === e
                ? "var(--formbar-bg-active-color)"
                : "var(--formbar-bg-inactive-color)"
            }
            color={
              currentActive === e
                ? "var(--formbar-default-active-color)"
                : "var(--formbar-default-text-color)"
            }
            onClick={() => {
              onClick(e);
            }}
          >
            <TabText>{e}</TabText>
          </TextContainer>
        ))}
      </BarContainer>
    </div>
  );
};

export default AdminFormBar;
