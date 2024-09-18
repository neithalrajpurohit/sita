import React, { useState } from "react";
import {
  HiChevronLeft,
  HiChevronRight,
  HiOutlineMagnifyingGlass,
  HiOutlineXMark,
} from "react-icons/hi2";

import { useTranslation } from "react-i18next";
import {
  StyledPagination,
  StyledSearchContainer,
  StyledSearchInput,
  StyledTable,
  StyledTableContainer,
  StyledTableSpan,
  StyledTopContainer,
} from "./AADGridStyle";
import NoDataAvailable from "../reuseableComp/NoDataAvailable";
import { InvalidDate } from "../../utils/Application";
import { DFG } from "../../utils/Common";
import { Button } from "react-bootstrap";
import { ButtonContainer } from "../Entity/EntityStyles";
import { useHistory } from "react-router-dom";

interface GridHeaderColumn {
  key: string;
  headerText: string;
  isSorting: boolean;
  type: string;
  hideOnUI: boolean;
}

export interface GridDataItem {
  [key: string]: string | number | boolean | Date; // Adjust based on the actual data types in your grid data
}

interface TableProps {
  gridHeader: GridHeaderColumn[];
  gridData: GridDataItem[];
  handleColumn1Click: (row: GridDataItem) => void;
  itemsPerPage: number;
  showPrevBtn: boolean;
}

const AADGrid: React.FC<TableProps> = ({
  gridHeader,
  gridData,
  handleColumn1Click,
  itemsPerPage,
  showPrevBtn,
}) => {
  const { t } = useTranslation();
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Filter the data based on the search query
  const filteredData = gridData.filter((item) =>
    // Customize the logic based on your table data structure
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Get the subset of data to display on the current page
  const displayedData = filteredData.slice(startIndex, endIndex);

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Handle pagination button clicks
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle search query change
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to the first page when search query changes
  };

  const truncate = (str: string | number | boolean | Date) => {
    if (typeof str === "string") {
      return str.length > 40 ? str.substring(0, 30) + "..." : str;
    }
    if (typeof str === "boolean") {
      return str === true ? "Enrolled" : "Not Enrolled";
    }
    return str;
  };

  return (
    <>
      <StyledTopContainer>
        <StyledSearchContainer>
          <StyledSearchInput
            onChange={handleSearch}
            type="text"
            value={searchQuery}
            placeholder={t("searchintable")}
          />
          {searchQuery === "" ? (
            <HiOutlineMagnifyingGlass fontSize="1rem" className="mx-2 my-0" />
          ) : (
            <HiOutlineXMark
              fontSize="1rem"
              className="mx-2 my-0"
              onClick={() => {
                setSearchQuery("");
                setCurrentPage(1);
              }}
            />
          )}
        </StyledSearchContainer>
      </StyledTopContainer>
      {displayedData.length > 0 ? (
        <StyledTableContainer>
          <StyledTable>
            <thead>
              <tr>
                {gridHeader.map((column) => (
                  <th key={column.key}>{column.headerText.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayedData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {gridHeader.map((column) => (
                    <td key={column.key}>
                      {column.key === "column1" ? (
                        <StyledTableSpan
                          id={"grid-click-able-row"}
                          onClick={() => handleColumn1Click(row)}
                        >
                          {row[column.key]}
                        </StyledTableSpan>
                      ) : (
                        <>
                          {DFG(row[column.key]) !== InvalidDate
                            ? DFG(row[column.key])
                            : truncate(row[column.key])}
                        </>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </StyledTable>
          {/* Render pagination controls */}
          <StyledPagination>
            {/* Add your pagination buttons here */}

            <span>
              {t("page")} {currentPage} - {totalPages}{" "}
            </span>
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <HiChevronLeft fontSize="1rem" color="inherent" />
            </button>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <HiChevronRight fontSize="1rem" color="inherent" />
            </button>
            {showPrevBtn && (
              <ButtonContainer className="m-0">
                <Button
                  variant="outline-secondary"
                  size="sm"
                  className="unfilled-btn-style"
                  onClick={() => history.goBack()}
                >
                  {t("previous")}
                </Button>
              </ButtonContainer>
            )}
          </StyledPagination>
        </StyledTableContainer>
      ) : (
        <NoDataAvailable height="90%" width="96%" />
      )}
    </>
  );
};

export default AADGrid;
