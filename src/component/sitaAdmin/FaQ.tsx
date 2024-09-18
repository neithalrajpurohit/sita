import { Col, Row } from "react-bootstrap";
import { FaQProps } from "./SitaAdminTypes";

const FaQ = (props: FaQProps) => {
  const { data } = props;

  return (
    <div className="mt-4 mb-3 faq-page-container">
      <Row md={12}>
        <Col xs={12}>
          <h4 className="faq-page-heading">FAQS</h4>
        </Col>
      </Row>

      {data.map((e: any, index: number) => (
        <div className="ml-3 mb-3">
          <div className="mt-4 mb-2 font-size-1-rem font-weight-600">
            {index + 1}.&nbsp;{e.Question}
          </div>
          <div className="ml-3">{e.Answer}</div>
        </div>
      ))}
    </div>
  );
};

export default FaQ;
