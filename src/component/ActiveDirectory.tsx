import { Col, Row } from "react-bootstrap";
import { useBreakpoints } from "../hooks/useBreakpoints";
import { FetchPageResponse } from "../store/Risk/RiskType";
import SliderBar from "./SliderBar";
import {
  ActiveDirectoryStyledCol,
  ActiveDirectoryStyledDiv,
  ActiveDirectoryStyledHeading,
} from "./GlobalComponentStyles";

// const marks = {
//   0: {
//     style: {
//       width: "180px",
//       fontSize: "0.625rem",
//       whiteSpace: "pre-wrap",
//       overflowWrap: "break-word",
//       color: "var(--riskonboarding-activedirectory-text-color)",
//     },
//     label:
//       "Default AD GPOs with some security Default AD GPOs with some security Default AD GPOs with some..",
//   },
//   25: {
//     style: {
//       width: "180px",
//       fontSize: "0.625rem",
//       whiteSpace: "pre-wrap",
//       overflowWrap: "break-word",
//       color: "var(--riskonboarding-activedirectory-text-color)",
//     },
//     label:
//       "Default AD GPOs with some security Default AD GPOs with some security Default AD GPOs with some..",
//   },
//   75: {
//     style: {
//       width: "180px",
//       fontSize: "0.625rem",
//       whiteSpace: "pre-wrap",
//       overflowWrap: "break-word",
//       color: "var(--riskonboarding-activedirectory-text-color)",
//     },
//     label:
//       "Default AD GPOs with some security Default AD GPOs with some security Default AD GPOs with some..",
//   },
//   50: {
//     style: {
//       width: "180px",
//       fontSize: "0.625rem",
//       whiteSpace: "pre-wrap",
//       overflowWrap: "break-word",
//       color: "var(--riskonboarding-activedirectory-text-color)",
//     },
//     label:
//       "Default AD GPOs with some security Default AD GPOs with some security Default AD GPOs with some..",
//   },
//   100: {
//     style: {
//       width: "180px",
//       fontSize: "0.625rem",
//       whiteSpace: "pre-wrap",
//       overflowWrap: "break-word",
//       color: "var(--riskonboarding-activedirectory-text-color)",
//     },
//     label:
//       "Default AD GPOs with some security Default AD GPOs with some security Default AD GPOs with some..",
//   },
// };

interface ActiveDirectoryProps {
  pageData: FetchPageResponse["page_data"];
  onPageDataChange: (pageData: FetchPageResponse["page_data"]) => void;
}

const ActiveDirectory = ({
  pageData,
  onPageDataChange,
}: ActiveDirectoryProps) => {
  const breakpoint = useBreakpoints();

  return (
    <Row className="g-2">
      {pageData.map((res, i) => {
        const selectedAnswerData = res.answers.find(
          (answer) => answer.answer_value === res.selected_answer
        );

        if (!selectedAnswerData) return <></>;
        const marksCount = res.answers.length;
        const styledMarks = res.answers.reduce(
          (acc: Record<number | string, any>, answer, index) => {
            const mark = Math.round((index / (marksCount - 1)) * 100);
            acc[mark] = {
              style: {
                width: `${115 / marksCount}%`,
                fontSize: "0.625rem",
                whiteSpace: "pre-wrap",
                overflowWrap: "break-word",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3,
                overflow: "hidden",
                color:
                  selectedAnswerData?.answer_value === answer.answer_value
                    ? "var(--riskonboarding-activedirectory-text-color-active)"
                    : "var(--riskonboarding-activedirectory-text-color)",
              },
              answerData: answer,
              label: answer.answer_text,
              // @ts-ignore
              longLabel: answer.on_hover,
            };
            return acc;
          },
          {} as Record<number | string, any>
        );
        const selectedAnswerIndex = res.answers.findIndex(
          (answer) => answer.answer_value === res.selected_answer
        );
        const sliderValue = Math.round(
          (selectedAnswerIndex / (marksCount - 1)) * 100
        );

        return (
          <Col md={12} key={i}>
            <ActiveDirectoryStyledDiv>
              <Row>
                <Col md={3}>
                  <div>
                    <ActiveDirectoryStyledHeading>
                      {res.question}
                    </ActiveDirectoryStyledHeading>
                  </div>
                </Col>
                <Col md={1}></Col>

                <ActiveDirectoryStyledCol md={8}>
                  <SliderBar
                    tooltipEnabled={true}
                    marks={styledMarks}
                    value={sliderValue}
                    width="90%"
                    marginBottom={breakpoint({
                      xs: 6.5 * 16,
                      lg: undefined,
                    })}
                    onChange={(value) => {
                      const selectedMark = styledMarks[value];
                      const selectedAnswer = selectedMark.answerData;
                      onPageDataChange(
                        pageData.map((pageDataItem, index) =>
                          index === i
                            ? {
                                ...pageDataItem,
                                selected_answer: selectedAnswer.answer_value,
                              }
                            : pageDataItem
                        )
                      );
                    }}
                  />
                </ActiveDirectoryStyledCol>
              </Row>
            </ActiveDirectoryStyledDiv>
          </Col>
        );
      })}
    </Row>
  );
};

export default ActiveDirectory;
