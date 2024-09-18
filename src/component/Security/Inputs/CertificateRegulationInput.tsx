import { Col, Form, Row } from "react-bootstrap";
import { CertificateRegulationInputProps } from "../SecurityTypes";
import { clamp } from "../../../utils/clamp";
import { useTranslation } from "react-i18next";
import Select, { SingleValue } from "react-select";
import { ModalCloseButton } from "../../GlobalComponentStyles";
import { theme } from "../../../pages/GlobalStyles";
import { useRef, useState } from "react";
import { HiCheck, HiPlus, HiTrash, HiOutlineNewspaper } from "react-icons/hi2";
import { customStylesForCertificate } from "../SecurityManagementStyle";

const CertificateRegulationInput = (props: CertificateRegulationInputProps) => {
  const {
    onChange,
    regulation_others,
    predefined_regulation,
    deleted_regulation_others,
    selected_regulation,
  } = props;
  const { t } = useTranslation();
  const certRef = useRef<any>();
  const [showCustomCert, setShowCustomCert] = useState(false);
  const [customCert, setCustomCert] = useState<{
    label: string;
    value: string;
    freq: number;
  }>({
    label: "",
    value: "",
    freq: 1,
  });
  const [selectedCert, setSelectedCert] = useState<{
    label: string;
    value: string;
    freq: number;
  }>({
    label: "",
    value: "",
    freq: 1,
  });

  const onCertSelect = (
    e: SingleValue<{
      label: string;
      value: string;
      freq: number;
    }>
  ) => {
    setSelectedCert((prev) => {
      const newVal = { ...prev, ...e };
      return newVal;
    });
  };

  const certificateOptions = predefined_regulation
    .filter(
      (cert) => !selected_regulation.map((rec) => rec.label).includes(cert)
    )
    .map((opt) => {
      return {
        label: opt,
        value: opt,
        freq: 1,
      };
    });

  const toggleCustomCert = () => {
    setShowCustomCert(!showCustomCert);
    setCustomCert({
      label: "",
      value: "",
      freq: 1,
    });
    setSelectedCert({
      label: "",
      value: "",
      freq: 1,
    });
  };

  const alreadyExistInList = (
    arr: { label: string; value?: string; name?: string; freq: number }[],
    str: string,
    deletedArr: {
      label: string;
      name: string;
      freq: number;
    }[]
  ) => {
    return deletedArr
      .map((res) => res.label.toLowerCase())
      .includes(str.toLowerCase())
      ? false
      : arr.map((res) => res.label.toLowerCase()).includes(str.toLowerCase());
  };

  return (
    <>
      <Row md={12} className="d-flex seprator py-10">
        <Col md={5}>
          {showCustomCert ? (
            <Form.Control
              className="certificateRegulationInput"
              type="text"
              placeholder={t("enterothercertifications").toUpperCase()}
              value={customCert.value}
              onChange={(e) =>
                setCustomCert((prev) => {
                  const newObj = {
                    ...prev,
                    label: e.target.value,
                    value: e.target.value,
                  };
                  return newObj;
                })
              }
              maxLength={15}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (
                    showCustomCert
                      ? customCert.label.trim() !== "" &&
                        !alreadyExistInList(
                          [...certificateOptions, ...regulation_others],
                          customCert.label,
                          deleted_regulation_others
                        )
                      : selectedCert.label.trim() !== ""
                  ) {
                    certRef.current.click();
                  }
                }
              }}
            />
          ) : (
            <Select
              id="react-select-language"
              placeholder={t("certifications").toUpperCase()}
              styles={customStylesForCertificate}
              theme={theme}
              value={certificateOptions.filter(
                (f) => f.label === selectedCert.label
              )}
              onChange={onCertSelect}
              options={certificateOptions}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (
                    showCustomCert
                      ? customCert.label.trim() !== "" &&
                        !alreadyExistInList(
                          [...certificateOptions, ...regulation_others],
                          customCert.label,
                          deleted_regulation_others
                        )
                      : selectedCert.label.trim() !== ""
                  ) {
                    certRef.current.click();
                  }
                }
              }}
            />
          )}
        </Col>
        <Col md={7}>
          <ModalCloseButton className="m-0">
            <Form.Control
              className="certificateRegulationInput"
              type="number"
              placeholder={t("enter")}
              name={showCustomCert ? customCert.value : selectedCert.value}
              disabled={
                showCustomCert
                  ? customCert.label.trim() === ""
                  : selectedCert.label.trim() === ""
              }
              value={showCustomCert ? customCert.freq : selectedCert.freq}
              onKeyDown={(e) => {
                const exceptThisSymbols = ["e", "E", "+", "-", "."];
                exceptThisSymbols.includes(e.key) && e.preventDefault();
                if (e.key === "Enter") {
                  if (
                    showCustomCert
                      ? customCert.label.trim() !== "" &&
                        !alreadyExistInList(
                          [...certificateOptions, ...regulation_others],
                          customCert.label,
                          deleted_regulation_others
                        )
                      : selectedCert.label.trim() !== ""
                  ) {
                    certRef.current.click();
                  }
                }
              }}
              onChange={(e) => {
                if (showCustomCert) {
                  setCustomCert((prev) => {
                    const newVal = { ...prev };
                    newVal.freq =
                      e.target.value === ""
                        ? ("" as unknown as number)
                        : clamp(1, 10, e.target.value as unknown as number);
                    return newVal;
                  });
                } else {
                  setSelectedCert((prev) => {
                    const newVal = { ...prev };
                    newVal.freq =
                      e.target.value === ""
                        ? ("" as unknown as number)
                        : clamp(1, 10, e.target.value as unknown as number);
                    return newVal;
                  });
                }
              }}
              maxLength={100}
            />
            <button
              ref={certRef}
              disabled={
                showCustomCert
                  ? customCert.label.trim() === "" ||
                    alreadyExistInList(
                      [...certificateOptions, ...regulation_others],
                      customCert.label,
                      deleted_regulation_others
                    )
                  : selectedCert.label.trim() === ""
              }
              onClick={() => {
                if (showCustomCert) {
                  onChange(
                    selected_regulation,

                    [
                      ...regulation_others,
                      {
                        freq: customCert.freq,
                        name: customCert.value,
                        label: customCert.label,
                      },
                    ],
                    deleted_regulation_others
                  );
                  setCustomCert({
                    freq: 1,
                    label: "",
                    value: "",
                  });
                } else {
                  onChange(
                    [
                      ...selected_regulation,
                      {
                        freq: selectedCert.freq,
                        name: selectedCert.value,
                        label: selectedCert.label,
                      },
                    ],
                    regulation_others,
                    deleted_regulation_others
                  );
                  setSelectedCert({
                    freq: 1,
                    label: "",
                    value: "",
                  });
                }
              }}
            >
              <HiCheck fontSize="1rem" color="inherent" />
            </button>
            <button onClick={toggleCustomCert}>
              <HiOutlineNewspaper fontSize="1rem" color="inherent" />
            </button>
          </ModalCloseButton>
        </Col>
      </Row>
      <div>
        {selected_regulation.map((cert) => (
          <Row
            md={12}
            key={cert.label}
            className="d-flex justify-content-center align-items-center"
          >
            <Col md={8}>
              <h1 className="securityCompliance-cert m-0">
                {cert.label.toUpperCase()}
              </h1>
            </Col>
            <Col md={2}>
              <h1 className="securityCompliance-cert m-0">{cert.freq}</h1>
            </Col>
            <Col md={2}>
              <ModalCloseButton className="m-0">
                <button
                  onClick={() => {
                    onChange(
                      selected_regulation.filter(
                        (rec) => rec.label !== cert.label
                      ),
                      regulation_others,
                      deleted_regulation_others
                    );
                  }}
                >
                  <HiTrash fontSize="0.75rem" color="inherent" />
                </button>
              </ModalCloseButton>
            </Col>
          </Row>
        ))}
        {[
          ...regulation_others.filter(
            (rec) =>
              !deleted_regulation_others
                .map((cert) => cert.label)
                .includes(rec.label)
          ),
        ].map((cert) => (
          <Row
            md={12}
            key={cert.label}
            className="d-flex justify-content-center align-items-center"
          >
            <Col md={8}>
              <h1 className="securityCompliance-cert m-0">
                {cert.label.toUpperCase()}
              </h1>
            </Col>
            <Col md={2}>
              <h1 className="securityCompliance-cert m-0">{cert.freq}</h1>
            </Col>
            <Col md={2}>
              <ModalCloseButton className="m-0">
                <button
                  onClick={() => {
                    onChange(selected_regulation, regulation_others, [
                      ...deleted_regulation_others,
                      cert,
                    ]);
                  }}
                >
                  <HiTrash fontSize="0.75rem" color="inherent" />
                </button>
              </ModalCloseButton>
            </Col>
          </Row>
        ))}
      </div>
    </>
  );
};

export default CertificateRegulationInput;
