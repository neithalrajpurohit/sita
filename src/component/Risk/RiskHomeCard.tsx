import { Link } from "react-router-dom";
import { EntityCardProps } from "./RiskTypes";
import {
  CustomCard,
  CustomCardBody,
  ImageContainer,
  CardText,
} from "./RiskStyles";

const RiskHomeCard = (props: EntityCardProps) => {
  const { cardTitle, icon, link, isDisable } = props;
  return (
    <Link
      to={isDisable ? "/admin" : link}
      className="nav-link dropdown-toggle py-0 control "
    >
      <CustomCard isDisable={isDisable}>
        <CustomCardBody>
          <ImageContainer>
            <img src={icon} alt={cardTitle} />
          </ImageContainer>
          <CardText>{cardTitle}</CardText>
        </CustomCardBody>
      </CustomCard>
    </Link>
  );
};

export default RiskHomeCard;
