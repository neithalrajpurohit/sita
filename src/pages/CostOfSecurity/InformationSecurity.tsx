import { Col, Form, Row } from "react-bootstrap";
import CurrencyInput from "react-currency-input-field";
import { formatCurrencyWithCommas } from "../../utils/CurrenyConverter";
import { useTranslation } from "react-i18next";

const InformationSecurity = ({
  data,
  handleInputChange,
  info,
  handleInputOnKeyDown,
}: any) => {
  // to not allow typing of special characters
  const { t } = useTranslation();

  return (
    <div className="cop_scrollbar securityContainerStyle-COSC">
      <div className="p-3">
        {data.map((card: any, i: number) => {
          if (card.section === 1) {
            return (
              <div key={i}>
                <Row md={12}>
                  <h1 className="information-security-h1">
                    {card.values.title}
                  </h1>
                </Row>
                <Row className="mt-1 mb-1">
                  <Col md={6}>
                    <label>
                      <span className="cop_label_fonts">
                        {card.values.values[0].title}
                      </span>
                      <div className="inline mt-1">
                        <Form.Control
                          id="cs_strategicqty_input"
                          onKeyDown={handleInputOnKeyDown}
                          value={info.strategicLevel}
                          placeholder={
                            card.values.values[0].qty !== null
                              ? card.values.values[0].qty
                              : "Qty"
                          }
                          type="number"
                          name="strategicLevel"
                          onChange={(e) => {
                            let value = e.target.value;
                            if (value.length <= 5) {
                              handleInputChange(e);
                            }
                          }}
                          className="cop_input-placeholder"
                        />
                      </div>
                    </label>
                  </Col>
                  <Col md={6}>
                    <label>
                      <span className="cop_label_fonts">
                        {card.values.values[1].title}
                      </span>
                      <div className="inline mt-1">
                        <Form.Control
                          onKeyDown={handleInputOnKeyDown}
                          id="cs_tacticqty_input"
                          className="cop_input-placeholder"
                          name="tacticLevel"
                          onChange={(e) => {
                            let value = e.target.value;
                            if (value.length <= 5) {
                              handleInputChange(e);
                            }
                          }}
                          value={info.tacticLevel}
                          placeholder={
                            card.values.values[1].qty !== null
                              ? card.values.values[1].qty
                              : "Qty"
                          }
                          type="number"
                        ></Form.Control>
                      </div>
                    </label>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <label>
                      <span className="cop_label_fonts">
                        {card.values.values[0].annual_cost_title}
                      </span>
                      <div className="inline mt-1">
                        <Form.Control
                          onKeyDown={handleInputOnKeyDown}
                          id="cs_strategiccost"
                          as={CurrencyInput}
                          intlConfig={{ locale: "en-US", currency: "USD" }}
                          prefix=" "
                          className="cop_curreny_input"
                          name="strategicCost"
                          value={info.strategicCost}
                          onChange={(e) => {
                            let value = e.target.value;
                            if (value.length <= 12) {
                              handleInputChange(e);
                            }
                          }}
                          placeholder={
                            card.values.values[0].annual_cost_value !== null
                              ? formatCurrencyWithCommas(
                                  card.values.values[0].annual_cost_value,
                                  "USD"
                                )?.replace("US$", "")
                              : "$"
                          }
                        ></Form.Control>
                      </div>
                    </label>
                  </Col>
                  <Col md={6}>
                    <label>
                      <span className="cop_label_fonts">
                        {card.values.values[1].annual_cost_title}
                      </span>
                      <div className="inline mt-1">
                        <Form.Control
                          onKeyDown={handleInputOnKeyDown}
                          className="cop_curreny_input"
                          id="cs_tacticcost"
                          name="tacticCost"
                          as={CurrencyInput}
                          intlConfig={{ locale: "en-US", currency: "USD" }}
                          prefix=" "
                          value={info.tacticCost}
                          onChange={(e) => {
                            let value = e.target.value;
                            if (value.length <= 12) {
                              handleInputChange(e);
                            }
                          }}
                          placeholder={
                            card.values.values[1].annual_cost_value !== null
                              ? formatCurrencyWithCommas(
                                  card.values.values[1].annual_cost_value,
                                  "USD"
                                )?.replace("US$", "")
                              : "$"
                          }
                        ></Form.Control>
                      </div>
                    </label>
                  </Col>
                </Row>
              </div>
            );
          } else if (card.section === 2) {
            return (
              <div key={i}>
                <Row md={12} className="margin-top-17" key={i}>
                  <h1 className="information-security-h1">
                    {card.values.title}
                  </h1>
                </Row>
                <Row>
                  <Col md={6}>
                    <label>
                      <span className="cop_label_fonts">
                        {card.values.values[0].title}
                      </span>
                      <div className="inline mt-1">
                        <Form.Control
                          onKeyDown={handleInputOnKeyDown}
                          className="cop_curreny_input"
                          id="cs_soccost"
                          as={CurrencyInput}
                          intlConfig={{ locale: "en-US", currency: "USD" }}
                          prefix=" "
                          name="soc"
                          onChange={(e) => {
                            let value = e.target.value;
                            if (value.length <= 12) {
                              handleInputChange(e);
                            }
                          }}
                          value={info.soc}
                          placeholder={
                            card.values.values[0].value !== null
                              ? formatCurrencyWithCommas(
                                  card.values.values[0].value,
                                  "USD"
                                )?.replace("US$", "")
                              : "SOC Total Cost/year"
                          }
                        ></Form.Control>
                      </div>
                    </label>
                  </Col>
                  <Col md={6}>
                    <label>
                      <span className="cop_label_fonts">
                        {card.values.values[1].title}
                      </span>
                      <div className="inline mt-1">
                        <Form.Control
                          name="netseg"
                          value={info.netseg}
                          as={CurrencyInput}
                          intlConfig={{ locale: "en-US", currency: "USD" }}
                          prefix=" "
                          id="cs_netseg_cost"
                          onKeyDown={handleInputOnKeyDown}
                          onChange={(e) => {
                            let value = e.target.value;
                            if (value.length <= 12) {
                              handleInputChange(e);
                            }
                          }}
                          placeholder={
                            card.values.values[1].value !== null
                              ? formatCurrencyWithCommas(
                                  card.values.values[1].value,
                                  "USD"
                                )?.replace("US$", "")
                              : "Total Cost/year"
                          }
                          className="cop_curreny_input"
                        ></Form.Control>
                      </div>
                    </label>
                  </Col>
                </Row>
                <Row className="mt-0">
                  <Col md={6}>
                    <label>
                      <span className="cop_label_fonts">
                        {card.values.values[2].title}
                      </span>
                      <div className="inline mt-1">
                        <Form.Control
                          onKeyDown={handleInputOnKeyDown}
                          value={info.other}
                          id="cs_othercost"
                          as={CurrencyInput}
                          intlConfig={{ locale: "en-US", currency: "USD" }}
                          prefix=" "
                          className="cop_curreny_input"
                          placeholder={
                            card.values.values[2].value !== null
                              ? formatCurrencyWithCommas(
                                  card.values.values[2].value,
                                  "USD"
                                )?.replace("US$", "")
                              : "Total Cost/year"
                          }
                          onChange={(e) => {
                            let value = e.target.value;
                            if (value.length <= 12) {
                              handleInputChange(e);
                            }
                          }}
                          name="other"
                        ></Form.Control>
                      </div>
                    </label>
                  </Col>
                </Row>
              </div>
            );
          } else if (card.section === 3) {
            return (
              <div key={i}>
                <Row md={12} className="margin-top-17" key={i}>
                  <h1 className="information-security-h1">
                    {card.values.title}
                  </h1>
                </Row>
                <Row className="align-items-center">
                  <Col md={6}>
                    <label>
                      <span className="cop_label_fonts">
                        {card.values.values[0].title}
                      </span>
                      <div className="inline mt-1">
                        <Form.Control
                          onKeyDown={handleInputOnKeyDown}
                          className="cop_input-placeholder"
                          id="cs_totalemployees"
                          onChange={(e) => {
                            let value = e.target.value;
                            let isvalid = /^[0-9]{0,5}(\.[0-9]{0,1})?$/.test(
                              value
                            );
                            if (value.length <= 9) {
                              if (isvalid) {
                                handleInputChange(e);
                              }
                            }
                          }}
                          value={info.totalEmployees}
                          name="totalEmployees"
                          placeholder={
                            card.values.values[0].value !== null
                              ? card.values.values[0].value
                              : "Enter number"
                          }
                        ></Form.Control>
                      </div>
                    </label>
                  </Col>
                </Row>
                <Row md={12} className="margin-top-17" key={i}>
                  <h1 className="information-security-h1">
                    {card.values.values[1].title}
                  </h1>
                </Row>
                <Row>
                  <Col md={6}>
                    <label>
                      <span className="cop_label_fonts">
                        {t("percentage")} (%)
                      </span>
                      <div className="inline mt-1">
                        <Form.Control
                          onKeyDown={(e) => {
                            if (e.code === "Minus") {
                              e.preventDefault();
                            }
                            if (e.code === "Equal") {
                              e.preventDefault();
                            }
                            if (e.code === "KeyE") {
                              e.preventDefault();
                            }
                          }}
                          className="cop_input-placeholder"
                          name="unitCoverage"
                          id="cs_unitcoverage"
                          onChange={(e) => {
                            let value = e.target.value;
                            // regex to allow only three diigits with or withot dot
                            let isvalid = /^[0-9]{0,3}(\.[0-9]{0,1})?$/.test(
                              value
                            );
                            if (Number(value) <= 100) {
                              if (isvalid) {
                                handleInputChange(e);
                              }
                            }
                          }}
                          value={info.unitCoverage}
                          placeholder={
                            card.values.values[1].values[0].value !== null
                              ? card.values.values[1].values[0].value
                              : "%"
                          }
                        ></Form.Control>
                      </div>
                    </label>
                  </Col>
                  <Col md={6}>
                    <label>
                      <span className="cop_label_fonts">
                        {card.values.values[1].values[1].title}
                      </span>
                      <div className="inline mt-1">
                        <Form.Control
                          onKeyDown={handleInputOnKeyDown}
                          className="cop_curreny_input"
                          id="cs_totalcost"
                          name="totalCost"
                          as={CurrencyInput}
                          intlConfig={{ locale: "en-US", currency: "USD" }}
                          prefix=" "
                          onChange={(e) => {
                            let value = e.target.value;

                            if (value.length <= 12) {
                              handleInputChange(e);
                            }
                          }}
                          value={info.totalCost}
                          placeholder={
                            card.values.values[1].values[1].value !== null
                              ? formatCurrencyWithCommas(
                                  card.values.values[1].values[1].value,
                                  "USD"
                                )?.replace("US$", "")
                              : "$"
                          }
                        ></Form.Control>
                      </div>
                    </label>
                  </Col>
                </Row>
              </div>
            );
          }
          return <></>;
        })}
      </div>
    </div>
  );
};

export default InformationSecurity;
