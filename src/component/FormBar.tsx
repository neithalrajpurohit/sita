import { BarContainer, TextContainer, TabText } from "./GlobalComponentStyles";

interface ArrProps {
  Arr: string[];
  currentActive: string;
  filled: number;
  onClick: (value: string) => void;
}

const EntityFormBar = (props: ArrProps) => {
  const { Arr, currentActive, filled, onClick } = props;
  return (
    <div>
      {/* <h1>Risk</h1> */}
      <BarContainer>
        {Arr.map((e, index) => (
          <TextContainer
            key={index}
            cursor={index < filled + 1 ? "pointer" : "not-allowed"}
            backgroundColor={
              currentActive === e
                ? "var(--formbar-bg-active-color)"
                : "var(--formbar-bg-inactive-color)"
            }
            color={
              currentActive === e
                ? "var(--formbar-default-active-color)"
                : index < filled
                ? "green"
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

export default EntityFormBar;
