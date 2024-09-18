export const customStylesForCertificate = {
  // Fixes the overlapping problem of the component
  control: (baseStyles: any, state: any) => ({
    ...baseStyles,
    backgroundColor: "var(--riskonboarding-input-bg-color)",
    color: "var(--riskonboarding-input-font-color)",
    textAlign: "left",
    borderRadius: "0.625rem !important",
    // border: "1px solid var(--font-color)",
    height: "2rem",
    fontSize: "0.85rem",
  }),
  menuList: (provided: any) => ({
    ...provided,
    fontSize: "0.85rem",
    borderRadius: "0.625rem !important",
    // border: "1px solid var(--font-color)",
    "&::-webkit-scrollbar": {
      width: "0.5rem",
      height: "0.5rem",
      zIndex: 4,
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "var(--entityonboarding-text-color)",
      borderRadius: "0.25rem",
    },
  }),
  menu: (provided: any, state: any) => ({
    ...provided,
    zIndex: 4,
    fontSize: "0.85rem",
    backgroundColor: "var(--riskonboarding-input-bg-color)",
    color: "var(--riskonboarding-input-font-color)",
  }),
  input: (baseStyles: any, state: any) => ({
    ...baseStyles,
    fontSize: "0.85rem",
    color: state.itemScope
      ? "var(--entityonboarding-text-color)"
      : "var(--entityonboarding-text-color)",
  }),
  singleValue: (provided: any, state: any) => ({
    ...provided,
    fontSize: "0.85rem",
    backgroundColor: "var(--riskonboarding-input-bg-color)",
    color: "var(--riskonboarding-input-font-color)",
  }),
  option: (baseStyles: any, state: any) => ({
    ...baseStyles,
    fontSize: "0.85rem",
    color: state.isSelected
      ? "var(--bg-color)"
      : state.isFocused
      ? "var(--bg-color)"
      : "var(--entityonboarding-text-color)",
  }),
};
