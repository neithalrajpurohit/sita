import React, { HTMLAttributes } from "react";
import styled from "styled-components";

const ToggleWrapper = styled.label`
  position: relative;
  display: inline-block;
  width: 2.5rem;
  height: 1.25rem;
  border: 0.2rem solid var(--border-color);
  border-radius: 2.125rem;
`;

const ToggleSlider = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--toggle-bg-color, #ccc);
  border-radius: 2.125rem;

  &:before {
    content: "";
    position: absolute;
    width: 1.05rem;
    height: 1.05rem;
    top: 0.125rem;
    left: 0.125rem;
    background-color: var(--toggle-slider-color, #fff);
    border-radius: 50%;
    transition: transform 0.2s ease;
  }
`;

const ToggleInput = styled.input`
  display: none;

  &:checked + ${ToggleSlider}:before {
    transform: translateX(1.15rem);
  }
`;

interface CustomToggleProps extends HTMLAttributes<HTMLInputElement> {
  checked: boolean;
  onChange: () => void;
}

const CustomToggle: React.FC<CustomToggleProps> = ({ checked, onChange }) => {
  return (
    <ToggleWrapper>
      <ToggleInput type="checkbox" checked={checked} onChange={onChange} />
      <ToggleSlider />
    </ToggleWrapper>
  );
};

export default CustomToggle;
