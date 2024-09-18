import styled from "styled-components";
export const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  flex-direction: column;
`;

export const BoxCard = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const EyeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  flex: 1;
`;

export const Eye = styled.div`
  width: 100px;
  height: 100px;
  border: 3px solid var(--font-color);
  border-radius: 80% 0%;
  position: relative;
  transform: rotate(45deg);

  img {
    display: block;
    position: absolute;
    left: 25px;
    top: 27px;
    width: 45px;
    height: auto;
    transform: rotate(-45deg);
  }

  &::before {
    content: "";
    display: block;
    position: absolute;
    width: 70px;
    height: 70px;
    /* border: 3px solid #fff; */
    border-top: 3px solid hsl(186 100% 70%); /* Blue */
    border-radius: 50%;
    left: 12px;
    top: 12px;

    animation: spin 1s linear infinite;
    -webkit-animation: spin 1s linear infinite;
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
`;
