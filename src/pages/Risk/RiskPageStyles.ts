// Risk Dashboard styles
import styled from "styled-components";

type TPageContainer1 = {
  fontSize: string;
};

export const Container = styled.div`
  background-color: var(--entityonboarding-bg-color);
  color: var(--entityonboarding-text-color);
  width: 100%;
  font-family: "Poppins", sans-serif;
`;

export const PageContainer = styled.div`
  background-color: var(--bg-color);
  color: var(--entityonboarding-text-color);
  width: 100%;
  height: 100%;
  display: flex;

  flex: 1;
  flex-direction: column;

  // above md flex 0.7 0 0 px below flex: 1
  .row1 {
    // flex: 1;
    // max-height: 20rem;
  }
  .row2 {
    // flex: 1;
    // max-height: 20rem;
  }
  @media (min-width: 992px) {
    .row1 {
      flex: 0.7 0 0px;
      max-height: none;
    }
    .row2 {
      max-height: none;
      flex: 1 0 0px;
    }
  }
`;

export const StyledSearchContainer = styled.div`
  border: 1px solid var(--table-search-border);
  border-radius: 5px;
  margin-right: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledSearchInput = styled.input`
  border: none !important;
  color: var(--font-color);
  /* background: var(--bg-color); */
  background: transparent;
  width: 100%;
  height: 1.5rem;
  border-radius: 5px;
  font-size: 1rem;
  margin-left: 4px;
  outline: none;
  &:active {
    border: none !important;
    outline: none;
  }
  &:focus {
    border: none !important;
    outline: none;
  }
  @media screen and (min-width: 300px) and (max-width: 480px) {
    width: 6em;
  }
`;

export const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1em 0;
`;

export const DisableContent = styled.div`
  flex: 1;
  pointer-events: none;
  opacity: 0.5;
`;
// Risk Onboarding styles
export const PageContainer1 = styled.div<TPageContainer1>`
  background-color: var(--bg-color);
  color: var(--riskonboarding-body-text-color);
  width: 100%;
  height: 100%;
  padding: 0.5rem 0px;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: stretch;
  font-size: ${(props) => props.fontSize};
  .form-check-inline {
    display: inline-flex;
    align-items: center;
  }
`;

export const MainContent1 = styled.div`
  flex: 1;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 1em;
  margin-bottom: 10px;
`;

export const riskStyles = {
  assetCardStyle: {
    width: "100%",
    borderRadius: "1.25em",
    height: "100%",
    backgroundColor: "var(--riskonboarding-screeno-card-color)",
    flex: "0.7 0 0",
    minHeight: "0",
    // border: "1px solid var(--card-border-color)",
  },
  assetCardTitleStyle: {
    textAlign: "center",
    fontWeight: 400,
    marginBottom: 0,
    // margin: "10px 0 12px 0",
    fontSize: "0.875em",
    fontFamily: "Poppins",
    color: "var(--riskdashboard-title-color)",
    backgroundColor: "var(--riskonboarding-screeno-title-color)",
    borderRadius: "1.25em 1.25em 0px 0px",
    padding: "0.625em",
    border: "1px solid var(--card-border-color)",
  },
  assetBodyStyle: {
    padding: "1em 1.5em",
    fontFamily: "Poppins",
    fontSize: "0.75em",
    fontWeight: "1200",
    minHeight: "0",
    display: "flex",
    flexDirection: "column",
    borderRadius: "0px 0px 1.25em 1.25em",
    border: "1px solid var(--card-border-color)",
    borderTop: "none",
    // textAlign:"center"
  },
  assetInventoryTreeTitle: {
    fontSize: "1em",
    color: "var(--entityonboarding-text-color)",
    fontWeight: "600",
    fontFamily: "Poppins",
    marginBottom: "0.5em",
    textTransform: "uppercase",
  },
  assetInventroyBtnStyle: {
    fontSize: "0.875em",
    backgroundColor: "transparent",
    padding: "0.2em 0.4em",
    border: "1px solid var(--font-color)",
    borderRadius: "3px",
    display: "flex",
    alignItems: "center",
    color: "var(--font-color)",
  },
  assetCollectionCard: {
    width: "100%",
    borderRadius: "1.25em",
    height: "100%",
    // margin: "0.3em 0",
    // marginTop: "8px",
    backgroundColor: "var(--riskonboarding-screeno-card-color)",
    flex: "1 0 0",
    minHeight: "0",
    display: "flex",
    flexDirection: "column",
    // border: "1px solid var(--card-border-color)",
  },
  assetCollectionTitle: {
    textAlign: "center",
    fontWeight: 400,
    marginBottom: "0",
    // margin: "10px 0 12px 0",
    fontSize: "0.875em",
    fontFamily: "Poppins",
    color: "var(--riskdashboard-title-color)",
    backgroundColor: "var(--riskonboarding-screeno-title-color)",
    borderRadius: "1.25em 1.25em 0px 0px",
    padding: "0.625em",
    border: "1px solid var(--card-border-color)",
  },
  assetCollectionSubtitle: {
    textAlign: "center",
    fontWeight: 400,
    marginBottom: "0",
    // margin: "10px 0 12px 0",
    fontSize: "0.875em",
    fontFamily: "Poppins",
    color: "var(--riskdashboard-title-color)",

    padding: "0.625em",
    border: "1px solid var(--card-border-color)",
  },
  assetCollectionBody: {
    padding: "1em 1.5em",
    fontFamily: "Poppins",
    fontSize: "0.75em",
    fontWeight: "1200",
    minHeight: 0,
    display: "flex",
    flexDirection: "column",
    borderRadius: "0px 0px 1.25em 1.25em",
    border: "1px solid var(--card-border-color)",
    borderTop: "none",
    // textAlign:"center"
  },
  riskImpactCard: {
    borderRadius: "1.25em",
    // margin: "0.3em 0",
    height: "100%",
    flex: 1,
    backgroundColor: "var(--riskonboarding-screeno-card-color)",
    // border: "1px solid var(--card-border-color)",
  },
  riskImpackCardTitle: {
    textAlign: "center",
    fontWeight: 400,
    marginBottom: "0px",
    // margin: "10px 0 12px 0",
    fontSize: "0.875em",
    fontFamily: "Poppins",
    color: "var(--riskdashboard-title-color)",
    backgroundColor: "var(--riskonboarding-screeno-title-color)",
    borderRadius: "1.25em 1.25em 0px 0px",
    padding: "0.625em",
    border: "1px solid var(--card-border-color)",
  },
  riskImpactCardBody: {
    padding: "1em 1.5em",
    fontFamily: "Poppins",
    fontSize: "0.75em",
    fontWeight: "1200",
    borderRadius: "0px 0px 1.25em 1.25em",
    border: "1px solid var(--card-border-color)",
    borderTop: "none",
    // textAlign:"center"
  },
  residualCardTitle: {
    textAlign: "center",
    fontWeight: 400,
    marginBottom: "0px",
    // margin: "10px 0 12px 0",
    fontSize: "0.875em",
    fontFamily: "Poppins",
    color: "var(--riskdashboard-title-color)",
    backgroundColor: "var(--riskonboarding-screeno-title-color)",
    borderRadius: "1.25em 1.25em 0px 0px",
    padding: "0.625em",
    border: "1px solid var(--card-border-color)",
    width: "100%",
  },
  residualCardBody: {
    // padding: "1em 1.5em",
    fontFamily: "Poppins",
    fontSize: "0.75em",
    fontWeight: "1200",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    // marginTop: "-2em",
    objectFit: "fill",
    width: "100%",
    minHeight: "0px",
    padding: "0",
    flex: "1 0 0px",
    borderRadius: "0px 0px 1.25em 1.25em",
    border: "1px solid var(--card-border-color)",
    borderTop: "none",
    // maxHeight: breakpointCallback({
    //   xs: "20rem",
    //   lg: "100%",
    // }),
  },
  riskActivityBtn: {
    padding: "1em",
    fontFamily: "Poppins",
    fontSize: "0.75em",
    fontWeight: "700",
    textAlign: "center",
    borderRadius: "1.75em",
    // margin: "0.3em 0",
    height: "auto",
    backgroundColor: "var(--risk-button-card-color)",
    color: "#000000",
    cursor: "pointer",
    width: "100%",
    // marginTop: "1.25em",
  },
};
