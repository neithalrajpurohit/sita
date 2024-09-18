import { toPng, toJpeg, toSvg } from "html-to-image";

export interface CaptureAndDownloadProps {
  format: "jpeg" | "png" | "svg";
  targetRef: React.RefObject<HTMLElement>;
}

export const captureAndDownload: React.FC<CaptureAndDownloadProps> = ({
  format,
  targetRef,
}) => {
  if (!targetRef.current) {
    return null;
  }

  // Add a background rectangle to the SVG
  const element = targetRef.current as HTMLElement;
  element.style.backgroundColor = "var(--bg-color)";
  element.style.width = "100%";
  element.style.height = "100%";
  if (format === "jpeg") {
    toJpeg(element, { quality: 1 })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "risk-aggregation.jpeg";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (format === "png") {
    toPng(element, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "risk-aggregation.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (format === "svg") {
    toSvg(element)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "risk-aggregation.svg";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return null;
};

export const MiniRiskMapColorArr = [
  "rgb(25, 135, 84)",
  "rgb(140, 178, 110)",
  "rgb(255, 221, 136)",
  "rgb(236, 142, 93)",
  "rgb(216, 63, 49)",
];

export const formatLargeNumberForRiskImpact = (string: string) => {
  if (string === "") {
    return "";
  } else {
    const number = Number(string.split(" ")[0]);
    if (number >= 1e12) {
      return (number / 1e12).toFixed(1) + "T " + string.split(" ")[1];
    } else if (number >= 1e9) {
      return (number / 1e9).toFixed(1) + "B " + string.split(" ")[1];
    } else if (number >= 1e6) {
      return (number / 1e6).toFixed(1) + "M " + string.split(" ")[1];
    } else if (number >= 1e3) {
      return (number / 1e3).toFixed(1) + "K " + string.split(" ")[1];
    } else {
      return number.toFixed(1).toString() + " " + string.split(" ")[1];
    }
  }
};
