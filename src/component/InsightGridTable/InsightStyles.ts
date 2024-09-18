import styled from "styled-components";

export const StyledTable = styled.table`
  caption-side: top;
  border: none;
  border-collapse: collapse;
  width: 100%;
  cursor: default;

  caption-side: bottom;

  thead {
    background-color: var(--admin-card-bg-color);
    position: sticky;
    top: 0; /* Don't forget this, required for the stickiness */
    border-bottom: 0.0015rem solid var(--grid-head-border-bottom);
  }

  th {
    border: none;
    padding: 0.5rem;
    font-size: 0.7rem;
    text-align: start;
    white-space: nowrap;
    @media screen and (min-width: 991px) and (max-width: 1440px) {
      font-size: 0.7rem;
    }
    @media screen and (min-width: 1441px) and (max-width: 1700px) {
      font-size: 0.8rem;
    }
    @media screen and (min-width: 1701px) and (max-width: 3840px) {
      font-size: 0.9rem;
    }
  }

  td {
    border: none;
    padding: 0.5rem;
    font-size: 0.8rem;
    text-align: start;
    white-space: nowrap;
    button {
      /* padding: 0.25rem 0.5rem; */
      margin: 0.25rem;
      background-color: var(--admin-card-bg-color);
      border: none;
      border-radius: 4px;
      cursor: pointer;
      color: var(--font-color);
    }

    button:hover {
      background-color: var(--btn-hover-bg);
    }

    button:disabled,
    button[disabled] {
      opacity: 0.5;
      cursor: not-allowed;
      color: whitesmoke;
    }

    @media screen and (min-width: 0px) and (max-width: 990px) {
      font-size: 0.55rem;
      padding: 0.05rem;
    }
    @media screen and (min-width: 991px) and (max-width: 1440px) {
      font-size: 0.65rem;
    }
    @media screen and (min-width: 1441px) and (max-width: 1700px) {
      font-size: 0.8rem;
    }
    @media screen and (min-width: 1701px) and (max-width: 3840px) {
      font-size: 0.8rem;
    }
  }

  tbody tr {
    max-width: min-content;
  }

  caption {
    font-size: 0.9em;
    padding: 5px;
    font-weight: bold;
  }
`;

export const StyledPagination = styled.div`
  /* Add styles for pagination controls */

  display: flex;
  justify-content: end;
  align-items: center;
  margin: 0.5rem 0;
  width: 100%;
  gap: 0.5rem;

  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0.25rem; /* Adjust the padding as needed */
  background: var(--bg-color);
  z-index: 2; /* Adjust z-index as needed to ensure it appears above other elements */
  border-bottom-left-radius: 0.85rem;
  border-bottom-right-radius: 0.85rem;

  button {
    padding: 0.25rem 0.5rem;
    background-color: var(--admin-card-bg-color);
    border: none;
    border-radius: 14px;
    cursor: pointer;
    color: var(--font-color);
  }

  button:hover {
    background-color: var(--btn-hover-bg);
  }

  button:disabled,
  button[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
    color: whitesmoke;
  }
`;
export const StyledGridIcon = styled.div`
  /* Add styles for pagination controls */

  display: flex;
  justify-content: end;
  align-items: center;
  margin: 0.5rem 0;
  width: 100%;
  gap: 0.5rem;

  button {
    padding: 0.25rem 0.5rem;
    background-color: var(--admin-card-bg-color);
    border: none;
    border-radius: 14px;
    cursor: pointer;
    color: var(--font-color);
  }

  button:hover {
    background-color: var(--btn-hover-bg);
  }

  button:disabled,
  button[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
    color: whitesmoke;
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
  width: 11.875rem;
  height: 1.5rem;
  background: transparent;
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

export const StyledTopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DateRangeButtonContainer = styled.div`
  margin-bottom: -20px;
`;
