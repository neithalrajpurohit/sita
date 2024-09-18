import { useSelector } from "react-redux";
import styled from "styled-components";
import EDark from "../assets/images/E-Dark.png";
import ELight from "../assets/images/E-Light.png";
import { RootState } from "../configureStore";
import {
  StyledContainer,
  BoxCard,
  EyeContainer,
  Eye,
} from "../StyledComponent/GlobalStyles";
function LazyLoading() {
  const theme = useSelector(
    (state: RootState) =>
      state.UserAuthentication.userDetails?.user?.theme_preference
  );

  return (
    <StyledContainer>
      <BoxCard>
        <EyeContainer>
          <Eye>
            <img
              src={
                theme !== undefined
                  ? theme === "dark"
                    ? ELight
                    : EDark
                  : ELight
              }
              alt="e"
              className="logo-img"
              loading="eager"
            />
          </Eye>
        </EyeContainer>
      </BoxCard>
    </StyledContainer>
  );
}

export default LazyLoading;
