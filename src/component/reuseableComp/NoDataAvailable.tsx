import { useTranslation } from "react-i18next";
import { NoDataAvailableContainer } from "./styles";

type TNoDataAvailableContainer = {
  height?: string;
  width?: string;
};

const NoDataAvailable: React.FC<TNoDataAvailableContainer> = ({
  height,
  width,
}) => {
  const { t } = useTranslation();
  return (
    <NoDataAvailableContainer height={height} width={width}>
      {t("nodata")}
    </NoDataAvailableContainer>
  );
};

export default NoDataAvailable;
