import styled from "styled-components";
import sun from "../../assets/icons/sun.png";
import moon from "../../assets/icons/moon.png";

export const CheckBoxWrapper = styled.div`
  position: relative;
`;

export const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 53px;
  height: 27px;
  border-radius: 18px;
  border: 2px sloid transparent;
  box-shadow: var(--admin-card-boxshadow);
  background-color: #aaaaaa;

  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 22px;
    height: 22px;
    margin: 3px;
    background-image: ${(props) => props.theme.toggleBackground};
    background-position: center;
    background-repeat: no-repeat;
    background-size: 18px 18px;
    box-shadow: var(--admin-card-boxshadow);
    background-color: #fff;

    transition: 0.2s;
  }
`;

export const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 18px;
  width: 53px;
  height: 27px;
  &:checked + ${CheckBoxLabel} {
    background-position-x: right;
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 22px;
      height: 22px;
      margin-left: 28px;
      transition: 0.2s;
    }
  }
`;

export const lightTheme = {
  background: "#ffffff",
  foreground: "#000000",
  toggleBackground: `url(${sun})`,
};

export const darkTheme = {
  background: "#222222",
  foreground: "#ffffff",
  toggleBackground: `url(${moon})`,
};
