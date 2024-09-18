import styled from "styled-components";
type TCustomCard = {
  isDisable: boolean;
};

export const CustomCard = styled.div<TCustomCard>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  border-radius: 20px;
  margin: 0.3em 0;
  height: 14.2em;
  background-color: var(--admin-card-bg-color);
  border: var(--admin-card-border);
  box-shadow: var(--admin-card-boxshadow);
  opacity: ${(props) => (props.isDisable ? 0.25 : 1)};
  cursor: ${(props) => (props.isDisable ? "not-allowed" : "pointer")};

  &:hover {
    transform: scale(1.01);
  }
  @media screen and (min-width: 3839px) and (max-width: 7680px) {
    height: 14.2em;
  }
`;

export const CustomCardBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
  border-radius: 120px;
  object-fit: contain;
  background-color: var(--admin-card-logoImg-bg);

  img {
    width: 65px;
    height: 65px;
  }

  @media screen and (min-width: 3839px) and (max-width: 7680px) {
    width: 5em;
    height: 5em;
    border-radius: 5em;

    img {
      width: 2.5em;
      height: 2.5em;
    }
  }
`;

export const CardText = styled.p`
  margin: 10px !important;
  font-weight: 500 !important;
  font-size: 1rem;
  color: var(--card-title-text-color) !important;
  @media screen and (min-width: 991px) and (max-width: 1440px) {
    font-size: 0.8rem;
  }
  @media screen and (min-width: 3839px) and (max-width: 7680px) {
    font-size: 1rem;
  }
`;
