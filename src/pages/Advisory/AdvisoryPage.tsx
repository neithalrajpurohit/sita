import React, { useEffect, useState } from "react";
import { AdvisoryActionCreator } from "../../store/Advisory/AdvisorySlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../index";
import Grid from "../../component/Grid/Grid";
import { hideShare } from "../../utils/Application";
import { Button, Image } from "react-bootstrap";
import Loading from "../../component/Loading";
import Icons from "../../assets/icons/index";
import { ColumnDescription } from "react-bootstrap-table-next";
import { Tdate } from "../../definition/InsightPageProps";
import { useThemeVal } from "../../hooks/useThemeVar";
import CustomModal from "../../component/Modal";

import { Document, Page, pdfjs } from "react-pdf";
import { toast } from "react-toastify";
import { RoutePath } from "../../helpers/RoutePath";
import { HiOutlineShare, HiOutlineArrowDownTray, HiEye } from "react-icons/hi2";
import moment from "moment";
import { useSelector } from "react-redux";
import useWindowSize from "../../hooks/useWindowSize";
import { RootState } from "../../configureStore";
import { useTranslation } from "react-i18next";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const AdvisoryPage = (props: any) => {
  const { t } = useTranslation();
  const advisoryData = useSelector((state: RootState) => state.Advisory);

  const useAuth = useSelector((state: RootState) => state.UserAuthentication);
  const themeHook = useThemeVal("variant");
  const dispatch: AppDispatch = useDispatch();

  const [selectedDate, setSelectedDate] = useState<any>({
    fromDate: new Date(advisoryData.fromDate),
    toDate: new Date(advisoryData.toDate),
  });

  const [countClickOnDate, setCountClickOnDate] = useState(0);
  const [isFiterChanged, setIsFiterChanged] = useState(false);
  const [numPages, setNumPages] = React.useState(null);
  const [shareBtnClick, setShareBtnClick] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [shareId, setShareId] = useState("");
  const [copied, setCopied] = useState("Copy");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    document.title = "Advisory";
  }, []);

  useEffect(() => {
    const startDate: Date = new Date(advisoryData.fromDate);
    const endDate: Date = new Date(advisoryData.toDate);
    dispatch(
      AdvisoryActionCreator.FetchAdvisoryData({
        start_date: moment(startDate).format("YYYY-MM-DD"),
        end_date: moment(endDate).format("YYYY-MM-DD"),
      })
    );
  }, []);

  useEffect(() => {
    dispatch(AdvisoryActionCreator.GeAdvisoryPdf({}));
  }, []);

  const handleBlurPage = () => {
    setCountClickOnDate(0);
  };

  const onEyeButtonClick = (advisory_id: string) => {
    dispatch(AdvisoryActionCreator.GeAdvisoryPdf({ id: advisory_id }))
      .unwrap()
      .then(() => {
        setShowModal(true);
      });
    setShareBtnClick(false);
  };

  const handleShare = (row: any) => {
    setShareBtnClick(true);

    const shareData = {
      title: "Advisory Details",
      text: `
      ${advisoryData.gridHeader[0]?.headerText}: ${row.column1},
      ${advisoryData.gridHeader[1]?.headerText} : ${row.column2},
      ${advisoryData.gridHeader[2]?.headerText}: ${row.column3},
      ${advisoryData.gridHeader[3]?.headerText}: ${row.column4},
      ${advisoryData.gridHeader[4]?.headerText} : ${row.column5},
      ${advisoryData.gridHeader[5]?.headerText}: ${row.column6},
      ${advisoryData.gridHeader[6]?.headerText} : ${row.column7}`,
    };
    if (!navigator.canShare) {
      return toast.warning(
        `${t("thisfeatureisavailableonlyinsecurecontexts(https)")}`,
        {
          position: "top-center",
          autoClose: 10000,
        }
      );
    }

    navigator.share(shareData).then(() => {
      toast.success(`${t("sharedsuccessfully")}`, {
        position: "top-center",
        autoClose: 10000,
      });
    });
  };
  const handleClose = () => {
    const copy = `${t("copy")}`;
    setCopied(copy);
    setShowModal(false);
    dispatch(
      AdvisoryActionCreator.FetchAdvisoryData({
        start_date: selectedDate.fromDate,
        end_date: selectedDate.toDate,
      })
    );
  };
  const handleShow = () => {
    const copy = `${t("copy")}`;
    setCopied(copy);
    setShowModal(true);
  };
  const handleClickOnAddBtn = () => {
    // dispatch(addSecurityPulseActionCreator.resetAddStates()).then(() =>
    //   dispatch(addSecurityPulseActionCreator.updateSecurityPulseMode("add"))
    // );
    // history.push("/AddEditSecurityPulse");
  };

  const handleDownload = (incidentId: string) => {
    dispatch(AdvisoryActionCreator.GeAdvisoryPdf({ id: incidentId }))
      .unwrap()
      .then(() => {
        downloadPDF();
      });

    setShareBtnClick(false);
  };
  const handleDateRangeChange = (date: Tdate) => {
    setCountClickOnDate(countClickOnDate + 1);
    const startDate: Date = new Date(date.selection.startDate);
    const endDate: Date = new Date(date.selection.endDate);
    setSelectedDate({ fromDate: startDate, toDate: endDate });
    setIsFiterChanged(true);
  };
  const selectedDateRange = {
    startDate: selectedDate.fromDate,
    endDate: selectedDate.toDate,
    key: "selection",
  };
  const sendRequestForGridData = () => {
    const startDate: string = moment(new Date(selectedDate.fromDate)).format(
      "YYYY-MM-DD"
    );
    const endDate: string = moment(new Date(selectedDate.toDate)).format(
      "YYYY-MM-DD"
    );
    dispatch(
      AdvisoryActionCreator.FetchAdvisoryData({
        start_date: startDate,
        end_date: endDate,
      })
    );
    dispatch(
      AdvisoryActionCreator.UpdateAvisoryDateRange({
        startDate: startDate,
        endDate: endDate,
      })
    );
  };
  const advisoryPdfModel = () => {
    return (
      <CustomModal
        onHide={handleClose}
        show={showModal}
        modalTitle={` ${t("advisory")}  ${shareId}`}
        modalBody={
          <div className="w-100">
            <div className="d-flex align-items-center justify-content-end w-100">
              <Button
                variant={themeHook}
                className="m-1"
                size="sm"
                onClick={() => downloadPDF()}
              >
                <HiOutlineArrowDownTray
                  className="object-fit-fill"
                  size="1.3em"
                  aria-hidden="true"
                />
              </Button>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <div className="advisory-div-container">
                <div className="d-flex justify-content-center align-items-center margin-15">
                  <Document
                    file={`data:application/pdf;base64,${advisoryData?.pdfData}`}
                    onLoadSuccess={onDocumentLoadSuccess}
                    onLoadError={(e) => console.log(e)}
                  >
                    {Array.from(new Array(numPages), (el, index) => (
                      <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                    ))}
                  </Document>
                </div>
              </div>
            </div>
          </div>
        }
      />
    );
  };
  const downloadPDF = () => {
    const linkSource = `data:application/pdf;base64,${advisoryData?.pdfData}`;
    const downloadLink = document.createElement("a");
    const fileName = "downloaded_pdf.pdf";

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  };
  const onDocumentLoadSuccess = ({ numPages }: any) => {
    setNumPages(numPages);
  };
  useEffect(() => {
    if (!advisoryData.isGridDataLoaded) {
      sendRequestForGridData();
    }
    if (isFiterChanged) {
      if (
        new Date(new Date(advisoryData.fromDate)).toDateString() !==
          new Date(new Date(advisoryData.toDate)).toDateString() &&
        new Date(new Date(advisoryData.toDate)).toDateString() !==
          new Date().toDateString()
      ) {
        sendRequestForGridData();
        setCountClickOnDate(0);
        setCurrentPage(1);
      } else if (countClickOnDate % 2 === 0) {
        sendRequestForGridData();
        setCountClickOnDate(0);
        setCurrentPage(1);
      }
    }
  }, [selectedDate.fromDate, selectedDate.toDate]);

  if (advisoryData.isGridDataLoaded) {
    if (!advisoryData.gridData) {
      return (
        <div className="error">
          Error while fetching the data. Please contact administrator.
        </div>
      );
    }
    const rowData: any[] =
      Object.keys(advisoryData.gridData).length > 0
        ? advisoryData.gridData?.map((row, index) => {
            return {
              ...row,
              column0: index,
              linkColumn: 4,

              actions: (
                <div className="d-flex flex-row justify-content-start">
                  {useAuth.userRoles?.claims?.includes(
                    "SecurityPulseGrid_View"
                  ) && (
                    <button
                      className="grid-action-button"
                      onClick={() => onEyeButtonClick(row?.column1)}
                    >
                      <HiEye fontSize="1rem" color="inherent" />
                    </button>
                  )}
                  {useAuth.userRoles?.claims?.includes(
                    "SecurityPulseGrid_Download"
                  ) && (
                    <button
                      className="grid-action-button"
                      onClick={() => handleDownload(row?.column1)}
                    >
                      <HiOutlineArrowDownTray
                        fontSize="1rem"
                        color="inherent"
                      />
                    </button>
                  )}
                  {useAuth.userRoles?.claims?.includes(
                    "PerspectiveGrid_Share"
                  ) &&
                    !hideShare && (
                      <button
                        className="grid-action-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShareId(row?.column1);
                          handleShow();
                          handleShare(row);
                        }}
                      >
                        <HiOutlineShare fontSize="1rem" color="inherent" />
                      </button>
                    )}
                </div>
              ),
            };
          })
        : [];

    const gridDataFormatter = (
      cell: any,
      index: number,
      row: any,
      dataDisplayLength?: number
    ) => {
      if (index === 1) {
        return (
          <span
            className="cursor-pointer"
            onClick={() => onEyeButtonClick(row.column1)}
          >
            {cell}
          </span>
        );
      }
      if (index === 2) {
        return <span>{moment(new Date(cell)).format("DD MMMM YY")}</span>;
      }
      if (index === 3) {
        return (
          <span className="d-flex justify-content-start text-nowrap text-capitalize">
            {cell}
          </span>
        );
      }
      if (index === 4) {
        return (
          <>
            {useAuth.userRoles?.claims?.includes("AdvisoryGrid_View") ? (
              <span
                onClick={() => onEyeButtonClick(row?.column1)}
                className="grid-row-clickable-row"
              >
                {dataDisplayLength && dataDisplayLength !== 0
                  ? cell?.slice(0, dataDisplayLength) + "..."
                  : cell}
              </span>
            ) : (
              <span>
                {dataDisplayLength && dataDisplayLength !== 0
                  ? cell?.slice(0, dataDisplayLength) + "..."
                  : cell}
              </span>
            )}
          </>
        );
      }
      if (index === advisoryData.gridHeader.length + 1) {
        return <>{cell}</>;
      }
      return (
        <div className="text-start">
          {dataDisplayLength && dataDisplayLength !== 0 ? "" : cell}
        </div>
      );
    };

    const headerFormatter = (
      column: ColumnDescription,
      colIndex: number,
      components: {
        sortElement: JSX.Element;
        filterElement: JSX.Element;
      }
    ) => {
      if (colIndex === 1) {
        return (
          <span className="d-flex justify-content-start width-50px">
            <span>{column.text}</span>
            <span>{components.sortElement}</span>
          </span>
        );
      }
      if (colIndex === 0) {
        return (
          <span className="d-flex justify-content-start width-145px">
            <span>{column.text}</span>
            <span>{components.sortElement}</span>
          </span>
        );
      }

      if (colIndex === 2) {
        return (
          <span className="d-flex justify-content-start width-140px">
            <span>{column.text}</span>
            <span>{components.sortElement}</span>
          </span>
        );
      }
      if (colIndex === 3) {
        return (
          <span className="d-flex justify-content-start width-120px">
            <span>{column.text}</span>
            <span>{components.sortElement}</span>
          </span>
        );
      }
      if (colIndex === 4) {
        return (
          <span className="d-flex justify-content-start width-200px">
            <span>{column.text}</span>
            <span>{components.sortElement}</span>
          </span>
        );
      }

      return (
        <span className="d-flex justify-content-start">
          <span>{column.text}</span>
          <span>{components.sortElement}</span>
        </span>
      );
    };

    const colData =
      Object.keys(advisoryData.gridData).length >= 0
        ? advisoryData.gridHeader.map((header, index) => {
            return {
              text: header.headerText,
              dataField: header.key,
              sort: header.isSorting,
              // hidden: header.hideOnUI,
              hidden: false,
              formatter: (cell: any, row: any) =>
                gridDataFormatter(cell, index, row, header.dataDisplayLength),
              headerFormatter: headerFormatter,
              sortCaret: (order: string) => {
                if (!order) return;
                else if (order === "asc") {
                  return (
                    <Image
                      className="ms-1 transfrom-180"
                      src={Icons.sortArrowIcon}
                      key={index}
                    />
                  );
                } else if (order === "desc") {
                  return (
                    <Image
                      key={index}
                      className="ms-1"
                      src={Icons.sortArrowIcon}
                    />
                  );
                }
              },
              sortFunc: (a: string, b: string, order: string) => {
                if (
                  order === "asc" &&
                  header.type.toLocaleLowerCase() === "date"
                ) {
                  return Date.parse(a) - Date.parse(b);
                } else if (
                  order === "desc" &&
                  header.type.toLocaleLowerCase() === "date"
                ) {
                  return Date.parse(b) - Date.parse(a);
                } else if (order === "asc") {
                  return a.localeCompare(
                    b,
                    navigator.languages[0] || navigator.language,
                    {
                      numeric: true,
                      ignorePunctuation: true,
                    }
                  );
                } else if (order === "desc") {
                  return b.localeCompare(
                    a,
                    navigator.languages[0] || navigator.language,
                    {
                      numeric: true,
                      ignorePunctuation: true,
                    }
                  );
                }
              },
            };
          })
        : [];

    colData.unshift({
      text: "UniqueId",
      dataField: "column0",
      sort: false,
      formatter: (cell: any, row: any) => gridDataFormatter(cell, 0, row),
      headerFormatter: headerFormatter,
      hidden: true,
      sortCaret: () => <></>,
      sortFunc: () => 0,
    });

    if (advisoryData.gridAddOn?.showLastColumnAsAction) {
      colData.push({
        text: `${t("actions")}`,
        dataField: "actions",
        sort: false,
        formatter: (cell: any, row: any) =>
          gridDataFormatter(cell, advisoryData.gridHeader.length + 1, row),
        headerFormatter: headerFormatter,
        hidden: false,
        sortCaret: () => <></>,
        sortFunc: () => 0,
      });
    }

    return (
      <div
        onClick={() => {
          setShowModal(false);
          setShareBtnClick(false);
        }}
        className="rml perspective-advisory-grid-page"
      >
        {advisoryData.isGridDataLoading || advisoryData.isLoading ? (
          <Loading title={""} width={"1050px"} />
        ) : (
          <div className="dPrint">{/* <AdvisoryPage /> */}</div>
        )}
        {advisoryData.isGridDataLoading ||
        advisoryData.isDeleteSecurityPulseLoading ||
        advisoryData.isLoading ? (
          <></>
        ) : (
          <>
            <span
              className="Analysis-Grid d-flex flex-column flex-grow-1"
              id="section-not-to-print"
            >
              <div className="my-3">
                <h1 className="analysis-header">{t("advisory")}</h1>
              </div>

              <Grid
                rowData={rowData}
                colData={colData}
                gridSelectedFilter={[]}
                gridHeaderDropdownData={[]}
                showGridHeader={true}
                showAddBtn={
                  useAuth.userRoles?.claims?.includes("") ? true : false
                }
                handleClickOnAddBtn={handleClickOnAddBtn}
                gridAddOn={advisoryData.gridAddOn}
                handleSelect={handleDateRangeChange}
                selectionRange={selectedDateRange}
                handleBlurPage={handleBlurPage}
                PageName={"Advisory"}
                onEyeButtonClick={onEyeButtonClick}
                currentPage={currentPage}
                setCurrentPage={(props: any) => {
                  setCurrentPage(props);
                }}
              />
            </span>
          </>
        )}

        <>
          {shareBtnClick ? (
            <CustomModal
              onHide={handleClose}
              show={shareBtnClick}
              modalTitle={` ${t("advisory")}  ${shareId}`}
              modalBody={
                <>
                  <div className="d-flex justify-content-center align-item-center">
                    <div className="security-grid-page-modal">
                      <div className="d-flex justify-content-between align-items-center margin-15">
                        <h6
                          onClick={() => {
                            const uri = `${window.location.origin}${
                              RoutePath.DYNAMICADVISORYDETAILS.split(":")[0]
                            }${shareId}`;
                            if (navigator && navigator.clipboard) {
                              navigator.clipboard.writeText(uri);
                            }
                            window.open(uri, "_blank");
                          }}
                          className="security-grid-clickable"
                        >
                          {`${window.location.origin}${
                            RoutePath.DYNAMICADVISORYDETAILS.split(":")[0]
                          }${shareId}`}
                        </h6>
                        <Button
                          size="sm"
                          variant="outline-secondary submit-btn-style"
                          disabled={window.location.protocol === "http:"}
                          onClick={() => {
                            const copied = `${t("copied")}`;
                            setCopied(copied);
                            const uri = `${window.location.origin}${
                              RoutePath.DYNAMICADVISORYDETAILS.split(":")[0]
                            }${shareId}`;
                            if (navigator && navigator.clipboard) {
                              navigator.clipboard.writeText(uri);
                            }
                          }}
                        >
                          {copied}
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              }
            />
          ) : (
            <>{showModal && advisoryPdfModel()}</>
          )}
        </>
      </div>
    );
  }
  return <div></div>;
};

export default AdvisoryPage;
