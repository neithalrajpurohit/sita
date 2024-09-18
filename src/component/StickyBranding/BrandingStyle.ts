import styled from "styled-components";

const StyledLogo = styled.div`
  width: 100%; /* Set the width as per your design */
  height: auto; /* Maintain aspect ratio */
  /* position: fixed;
  bottom: 0;
  left: 0.5rem; */
  z-index: 999; /* Ensure it's on top of other content */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* background-color: var(--bg-color); */
  border-radius: 0.5rem 0.5rem 0 0;
  padding: 0.1rem 0;
  /* border: 2px solid var(--font-color); */
  border-bottom: none;
  /* opacity: 0.75;/ */

  .brandNetrumLogo {
    width: 5em;
    object-fit: cover;
  }
  .brandPoweredBy {
    font-size: 0.55rem;
    font-weight: 700;
    white-space: nowrap;
    color: #43baf5;
    cursor: default;
    /* opacity: 0.75; */
  }
`;

export default StyledLogo;
