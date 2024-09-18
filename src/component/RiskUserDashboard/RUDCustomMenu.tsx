import Dropdown from "react-bootstrap/Dropdown";
import { useTranslation } from "react-i18next";
import { CaptureAndDownloadProps } from "./RUDUtils";

import styled from "styled-components";

interface RUDCustomMenuProps {
  handleDownload: (format: CaptureAndDownloadProps["format"]) => void;
  downloadAsFile: (filetype: "csv" | "xls") => void;
}

const BurgerIcon = styled.div`
  width: 0.85rem;
  height: 0.15rem;
  border-radius: 0.1rem;
  background-color: rgb(102, 102, 102);
  margin: 0.1rem 0;
  transition: 0.4s;
`;

function RUDCustomMenu({ handleDownload, downloadAsFile }: RUDCustomMenuProps) {
  const { t } = useTranslation();
  const onDownload = (str: "jpeg" | "png" | "svg") => {
    handleDownload(str);
  };

  return (
    <Dropdown className="exportdropdown">
      <Dropdown.Toggle
        variant="outline-secondary"
        className="exportdropdowntoggle"
      >
        <BurgerIcon />
        <BurgerIcon />
        <BurgerIcon />
      </Dropdown.Toggle>

      <Dropdown.Menu className="exportdropdownmenu">
        <Dropdown.Item
          className="exportdropdownitem"
          onClick={() => onDownload("png")}
        >
          {t("downloadPNG")}
        </Dropdown.Item>
        <Dropdown.Item
          className="exportdropdownitem"
          onClick={() => onDownload("jpeg")}
        >
          {t("downloadJPEG")}
        </Dropdown.Item>
        <Dropdown.Item
          className="exportdropdownitem"
          onClick={() => onDownload("svg")}
        >
          {t("downloadSVG")}
        </Dropdown.Item>
        <Dropdown.Item
          className="exportdropdownitem"
          onClick={() => downloadAsFile("csv")}
        >
          {t("downloadCSV")}
        </Dropdown.Item>
        <Dropdown.Item
          className="exportdropdownitem"
          onClick={() => downloadAsFile("xls")}
        >
          {t("downloadXLS")}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default RUDCustomMenu;
