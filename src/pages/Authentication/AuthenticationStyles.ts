import styled from "styled-components";

export const inputstyle = {
    backgroundColor: "var(--input-box-color)",
    color: "var(--riskonboarding-input-font-color)",
};

export const CustomForgetPass = styled.h5`
    font-size: 1rem;
    cursor: pointer;
    @media screen and (min-width: 320px) and (max-width: 375px) {
        font-size: 0.75rem;
    }
    @media screen and (min-width: 375px) and (max-width: 480px) {
        font-size: 0.86rem;
    }
`;
