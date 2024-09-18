import React from "react";
import StyledLogo from "./BrandingStyle";
import lightLogo from "../../assets/images/lightLogo.png";
import darkLogo from "../../assets/images/darkLogo.png";
import { useSelector } from "react-redux";
import { RootState } from "../../configureStore";

function Branding() {
  const theme = useSelector(
    (state: RootState) =>
      state.UserAuthentication.userDetails.user.theme_preference
  );
  return (
    <StyledLogo>
      <div className="brandPoweredBy">Powered by</div>
      <img
        className="brandNetrumLogo"
        src={theme === "dark" ? lightLogo : darkLogo}
        alt="SITA - Netrum"
      />
    </StyledLogo>
  );
}

export default Branding;
