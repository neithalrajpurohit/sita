import { useState, useEffect, useRef } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { axiosPrivate } from "../../helpers/ApiClient";
import { EndPoints } from "../../helpers/ApiEndPoints";
import { useTranslation } from "react-i18next";
// import PhoneInput from "react-phone-input-2";
const ContactPage = () => {
  const [resMessage, setResMessage] = useState<string>("");
  const [contactData, setContactData] = useState({
    description: "",
  });
  const { t } = useTranslation();
  const { CONTACT_US } = EndPoints;
  const submitRef = useRef<any>();
  const inputstyle = {
    backgroundColor: "var(--input-box-color)",
    color: "var(--riskonboarding-input-font-color)",
    width: "100%",
  };

  useEffect(() => {
    document.title = "Contact Us";
  }, []);

  const SubmitForm = (e: any) => {
    e.preventDefault();

    if (contactData.description.trim() === "") {
      setResMessage(`${t("mandatoryfeild")}`);
    } else {
      const fetchRes = async () => {
        const resp = await axiosPrivate.post(CONTACT_US, {
          description: contactData.description,
        });
        setResMessage(resp.data.message);
      };
      fetchRes();
    }
  };
  return (
    <>
      <Row>
        <h2 className="h1-responsive my-4 EditProfileText ">
          {t("contactus")}
        </h2>
      </Row>
      <Row>
        <Col md={6}>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>
                {t("description")}
                <Form.Label className="text-danger">*</Form.Label>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder={t("describeyourproblemhere")}
                maxLength={500}
                className="risk-input-style"
                onChange={(e) => {
                  setContactData({
                    ...contactData,
                    description: e.target.value,
                  });

                  if (contactData.description !== "") {
                    setResMessage("");
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    submitRef.current.click();
                  }
                }}
              />
            </Form.Group>
            <span className="invalidInput">{resMessage}</span>
            <br />
            <Button
              onClick={SubmitForm}
              variant="outline-success font-color"
              ref={submitRef}
              type="button"
            >
              {t("submit")}
            </Button>
          </Form>
          <br />
          <br />
        </Col>
        <Col md={6} className="margin-top-40">
          <div>
            <label>
              <b> {t("email")}</b>
            </label>

            <p className="font-color">info@netrum-tech.com</p>
          </div>

          <div>
            <label>
              <b> {t("address")}</b>{" "}
            </label>

            <p className="font-color">
              C 910-911, Noida One Building, Noida Sector 62, Noida - 201309
            </p>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ContactPage;
