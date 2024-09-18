//  MAIL VERIFICATION STYLES
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100vw;
    height: 100vh;
  }
`;

export const NetrumLogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  top: 0;
  left: 0;
  position: absolute;
  margin: 1.5625rem;
  flex-direction: column;
`;

export const RightsLogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  bottom: 0;
  left: 0;
  position: absolute;
  margin: 1.5625rem;
  flex-direction: column;
`;

export const CustomCardContainer = styled.div`
  top: 0;
  position: absolute;
  color: white;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  flex-direction: column;
  flex: 1;
`;

export const CustomCard = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem;
  border-radius: 1.25rem;
  background: rgba(0, 0, 0, 0.8);
  max-width: 32.375rem;
  height: 29.6875rem;
  flex-direction: column;
  padding: 2rem;
`;

export const CustomHeading = styled.h1`
  font-size: 2rem;
  margin: 25px;
`;

export const StyledFormContainer = styled.div`
  margin: 10px 12px;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;

export const ButtonContainer = styled.div`
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const QRContainer = styled.div`
  width: 100%;
  height: 120px;
  object-fit: contain;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 120px;
    height: 120px;
    object-fit: contain;
  }
`;
export const ButtonContainer2 = styled.div`
  margin: 10px 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

export const StyledMsgOTPPage = styled.h4`
  font-size: 1rem;
  margin: 10px 0px 10px 0px;
`;
