import React, { Fragment, useEffect, useRef, useState } from "react";
import { Card, Col, Container, Dropdown, Form, Row } from "react-bootstrap";
import BootstrapTable, {
  PaginationOptions,
  SelectRowProps,
  SizePerPageRendererOptions,
} from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, {
  Search,
  // @ts-ignore
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import Accordion from "react-bootstrap/Accordion";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { IGridProps } from "./GridTypes";
import useWindowSize from "../../hooks/useWindowSize";
import { InvalidDate } from "../../utils/Application";
import { DFG } from "../../utils/Common";
import GridHeader from "../Grid/GridHeader";
import { useTranslation } from "react-i18next";
import NoDataAvailable from "../reuseableComp/NoDataAvailable";

const { SearchBar } = Search;

const Grid = (props: IGridProps) => {
  const { t } = useTranslation();
  const {
    handleSelect,
    selectionRange,
    showGridHeader,
    showAddBtn,
    handleClickOnAddBtn,
    handleBlurPage,
    PageName,
    onEyeButtonClick,
    currentPage,
    setCurrentPage,
  } = props;

  const columns = props.colData;

  const rows = props.rowData;

  const gridSelectedFilter = props.gridSelectedFilter;
  const handleGridFilterChange = props.handleGridFilterChange;
  const gridHeaderDropdownData = props.gridHeaderDropdownData;
  const { width } = useWindowSize();
  const [searchInput, setSearchInput] = useState("");

  const respCard = ["Perspective", "SecurityPulse", "Advisory"];

  const handleSearch = (e: any) => {
    setSearchInput(e.target.value.toLowerCase());
  };

  // Select row logic
  const selectRow = {
    selectionRenderer: ({ mode, ...rest }: any) => {
      return (
        <CustomCheckbox
          isChecked={props.selectedRows?.includes(rest.rowKey) as boolean}
        />
      );
    },
    hideSelectColumn: !props.gridAddOn?.showFirstColumnAsCheckbox,
    mode: "checkbox",
    onSelect: (row: any, isSelect: boolean) => {
      if (isSelect) {
        props.setSelectedRows([
          ...(props.selectedRows as string[]),
          row?.column0,
        ]);
      } else if (!isSelect) {
        props.setSelectedRows((selectetRows: any[]) =>
          selectetRows?.filter((rowId: string) => rowId !== row?.column0)
        );
      }
    },

    onSelectAll: (isSelect: boolean, rows: any) => {
      const allRowIds = rows.map((row: any) => row?.column0);
      if (!isSelect) {
        return props.setSelectedRows([]);
      } else {
        props.setSelectedRows(allRowIds);
      }
    },
  };
  const customTotal = (from: number, to: number, size: number) => (
    <span className="react-bootstrap-table-pagination-total grid-custom-total">
      {from} - {to} of {size}
    </span>
  );

  const sizePerPageRenderer = ({
    options,
    currSizePerPage,
    onSizePerPageChange,
  }: SizePerPageRendererOptions) => (
    <div className="page-size-dropdown d-flex flex-row grid-size-per-page-render">
      <p className="font-size-1-rem">{t("rowsperpage")}: </p>
      <Dropdown className="ms-1">
        <Dropdown.Toggle
          id="pageDropDown"
          size="sm"
          variant="info"
          className="grid-drop-down-toggle"
        >
          {currSizePerPage}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {options.map((option: any, key: any) => {
            return (
              <Dropdown.Item
                href="#"
                key={key}
                onClick={() => onSizePerPageChange(option.page)}
                active={currSizePerPage === `${option.page}`}
              >
                {option.page}
              </Dropdown.Item>
            );
          })}
          <Dropdown.Item
            href="#"
            onClick={() => onSizePerPageChange(rows.length)}
          >
            All
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );

  const paginationFactoryOptions: PaginationOptions = {
    page: currentPage,
    onSizePerPageChange: () => {},
    onPageChange: (page) => {
      setCurrentPage(page);
    },
    showTotal: true,
    paginationTotalRenderer: customTotal,
    alwaysShowAllBtns: true,
    sizePerPageRenderer,
  };

  return (
    <div className="grid-container d-flex flex-grow-1 flex-column">
      {width > 932 ? (
        <>
          <ToolkitProvider
            keyField="column0"
            data={rows}
            columns={columns.filter((e: any) => e.dataField !== "column8")}
            search
          >
            {(props: any) => {
              return (
                <>
                  <div className="">
                    {showGridHeader && (
                      <GridHeader
                        selectionRange={selectionRange}
                        gridHeaderDropdownData={gridHeaderDropdownData}
                        handleSelect={handleSelect}
                        gridSelectedFilter={gridSelectedFilter}
                        handleGridFilterChange={handleGridFilterChange}
                        showAddBtn={showAddBtn}
                        handleClickOnAddBtn={handleClickOnAddBtn}
                        handleBlurPage={handleBlurPage}
                      />
                    )}

                    <span className="mt-4">
                      <SearchBar
                        {...props.searchProps}
                        placeholder={t("searchintable")}
                        className="grid-search-bar"
                      />
                      {props?.searchProps?.searchText === "" ? (
                        <HiMagnifyingGlass className="position-absolute cursor-pointer  right-60px margin-top-10" />
                      ) : (
                        <i
                          className="fa fa-remove position-absolute cursor-pointer margin-top-10 right-60px "
                          onClick={() => props?.searchProps?.onClear()}
                        ></i>
                      )}
                    </span>
                  </div>
                  {rows.length > 0 ? (
                    <div className="table-container mt-3 d-flex flex-grow-1 flex-column">
                      <BootstrapTable
                        table="table-borderless table-responsive"
                        selectRow={
                          selectRow as SelectRowProps<typeof selectRow>
                        }
                        bordered={false}
                        pagination={paginationFactory(paginationFactoryOptions)}
                        {...props.baseProps}
                        wrapperClasses="table-responsive table-borderless cop_scrollbar fill"
                        noDataIndication={() => {
                          return <NoDataAvailable />;
                        }}
                      />
                    </div>
                  ) : (
                    <NoDataAvailable />
                  )}
                </>
              );
            }}
          </ToolkitProvider>
        </>
      ) : (
        <Container>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header className="bg-color">
                <b>Filters</b>
              </Accordion.Header>
              <Accordion.Body className="bg-color">
                {showGridHeader && (
                  <GridHeader
                    selectionRange={selectionRange}
                    gridHeaderDropdownData={gridHeaderDropdownData}
                    handleSelect={handleSelect}
                    gridSelectedFilter={gridSelectedFilter}
                    handleGridFilterChange={handleGridFilterChange}
                    showAddBtn={showAddBtn}
                    handleClickOnAddBtn={handleClickOnAddBtn}
                    handleBlurPage={handleBlurPage}
                  />
                )}

                <Form.Control
                  type="text"
                  value={searchInput}
                  placeholder={t("searchintable")}
                  onChange={handleSearch}
                />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          {rows
            .filter((row: any) => {
              return Object.values(row)
                .join("")
                .toLowerCase()
                .includes(searchInput.toLowerCase());
            })
            .map((row: any, key: any) => {
              return (
                <Fragment key={key}>
                  {PageName && respCard.includes(PageName) ? (
                    <Card className="my-3 p-3 mx-auto shadow grid-card-mobile  text-left mw-100">
                      <Row className="mt-2">
                        <Col xs={6}>
                          <span className="font-weight-bold">
                            {columns[2]?.text}
                          </span>{" "}
                          <br />
                          {row.column2}
                        </Col>
                        <Col xs={6}>
                          <span className="font-weight-bold">
                            {columns[3]?.text}
                          </span>{" "}
                          <br />
                          {DFG(row.column3) !== InvalidDate
                            ? DFG(row.column3)
                            : row.column3}
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col xs={6}>
                          <span className="font-weight-bold">
                            {columns[4]?.text}
                          </span>{" "}
                          <br />
                          {row.linkColumn === 4 ? (
                            <span
                              onClick={() => onEyeButtonClick(row?.column1)}
                              className="grid-row-clickable-row"
                            >
                              {row.column4}
                            </span>
                          ) : (
                            <>{row.column4}</>
                          )}
                        </Col>
                        <Col xs={6}>
                          <span className="font-weight-bold">
                            {columns[5]?.text}
                          </span>{" "}
                          <br />
                          {row.linkColumn === 5 ? (
                            <span
                              onClick={() => onEyeButtonClick(row?.column1)}
                              className="grid-row-clickable-row"
                            >
                              {row.column5}
                            </span>
                          ) : (
                            <>{row.column5}</>
                          )}
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col xs={6}>
                          {columns[6]?.text.toLowerCase() ===
                            `${t("actions").toLowerCase()}` && (
                            <Col xs={12}>
                              <span className="font-weight-bold">
                                {columns[6]?.text}
                              </span>{" "}
                              <br />
                              {row.actions}
                            </Col>
                          )}
                        </Col>
                        <Col xs={6}>
                          {columns[7]?.text.toLowerCase() ===
                            `${t("actions").toLowerCase()}` && (
                            <Col xs={12}>
                              <span className="font-weight-bold">
                                {columns[7]?.text}
                              </span>{" "}
                              <br />
                              {row.actions}
                            </Col>
                          )}
                        </Col>
                      </Row>

                      <Row className="mt-3">
                        {columns[8]?.text.toLowerCase() ===
                          `${t("actions").toLowerCase()}` && (
                          <Col xs={12}>
                            <span className="font-weight-bold">
                              {columns[8]?.text}
                            </span>{" "}
                            <br />
                            {row.actions}
                          </Col>
                        )}
                      </Row>
                      <Row className="mt-3">
                        {columns[9]?.text.toLowerCase() ===
                          `${t("actions").toLowerCase()}` && (
                          <Col xs={12}>
                            <span className="font-weight-bold">
                              {columns[9]?.text}
                            </span>{" "}
                            <br />
                            {row.actions}
                          </Col>
                        )}
                      </Row>
                    </Card>
                  ) : (
                    <Card className="my-3 p-3 mx-auto shadow text-left mw-100 grid-card-mobile ">
                      <Row className="mt-3">
                        <Col xs={6}>
                          <span className="font-weight-bold">
                            {columns[1]?.text}
                          </span>{" "}
                          <br />
                          <span
                            onClick={() => onEyeButtonClick(row?.column1)}
                            className="grid-row-clickable-row"
                          >
                            {row.column1}
                          </span>
                        </Col>
                        <Col xs={6}>
                          <span className="font-weight-bold">
                            {columns[2]?.text}
                          </span>{" "}
                          <br />
                          {row?.column2}
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col xs={6}>
                          <span className="font-weight-bold">
                            {columns[3]?.text}
                          </span>{" "}
                          <br />
                          {row.column3}
                        </Col>
                        <Col xs={6} className="">
                          <span className="font-weight-bold">
                            {columns[4]?.text}
                          </span>{" "}
                          <br />
                          {DFG(row.column4) !== InvalidDate
                            ? DFG(row.column4)
                            : row.column4}
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col>
                          <span className="font-weight-bold">
                            {columns[5]?.text}
                          </span>{" "}
                          <br />
                          {DFG(row.column5) !== InvalidDate
                            ? DFG(row.column5)
                            : row.column5}
                        </Col>
                        <Col xs={6}>
                          <span className="font-weight-bold">
                            {columns[6]?.text}
                          </span>{" "}
                          <br />
                          {DFG(row.column6) !== InvalidDate
                            ? DFG(row.column6)
                            : row.column6}
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col xs={6} className="">
                          <span className="font-weight-bold">
                            {columns[7]?.text}
                          </span>{" "}
                          <br />
                          {row.column7}
                        </Col>
                        <Col
                          xs={
                            columns[8]?.text.toLowerCase() ===
                            `${t("actions").toLowerCase()}`
                              ? 12
                              : 6
                          }
                          className={
                            columns[8]?.text.toLowerCase() ===
                            `${t("actions").toLowerCase()}`
                              ? "mt-3"
                              : ""
                          }
                        >
                          <span className="font-weight-bold">
                            {columns[8]?.text.toLowerCase() ===
                            `${t("actions").toLowerCase()}` ? (
                              <span className="mt-3">{columns[8]?.text} </span>
                            ) : (
                              ""
                            )}
                          </span>{" "}
                          <br />
                          {columns[8]?.text.toLowerCase() ===
                          `${t("actions").toLowerCase()}`
                            ? row?.actions
                            : ""}
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        {columns[9]?.text.toLowerCase() ===
                          `${t("actions").toLowerCase()}` && (
                          <Col xs={12}>
                            <span className="font-weight-bold">
                              {columns[9]?.text}
                            </span>{" "}
                            <br />
                            {row?.actions}
                          </Col>
                        )}
                      </Row>
                    </Card>
                  )}
                </Fragment>
              );
            })}
        </Container>
      )}
    </div>
  );
};

const CustomCheckbox = React.memo(({ isChecked }: { isChecked: boolean }) => {
  const checkboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!checkboxRef.current) return;
    checkboxRef.current.checked = isChecked;
  });

  return <input type="checkbox" ref={checkboxRef} />;
});

export default Grid;
