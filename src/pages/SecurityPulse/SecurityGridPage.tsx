import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { Button, Image } from "react-bootstrap";
import { ColumnDescription } from "react-bootstrap-table-next";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Icons from "../../assets/icons/index";
import Grid from "../../component/Grid/Grid";
import Loading from "../../component/Loading";
import { Tdate } from "../../definition/InsightPageProps";
import { AppDispatch } from "../../index";
import { addSecurityPulseActionCreator } from "../../store/AddEdits/AddEditSecurityPulseSlice";
import { RootState } from "../../configureStore";
import { SecurityPulseDetailsActionCreator } from "../../store/SecurityPulse/SecurityPulseDetailsSlice";
import { SecurityPulseGridActionCreator } from "../../store/SecurityPulse/SecurityPulseGridSlice";
import { hideShare } from "../../utils/Application";
import { DFG } from "../../utils/Common";
import { isAfter } from "date-fns";
import {
  HiOutlineShare,
  HiTrash,
  HiPencil,
  HiOutlineArrowDownTray,
  HiEye,
} from "react-icons/hi2";
import { useThemeVal } from "../../hooks/useThemeVar";
import CustomModal from "../../component/Modal";
import { RoutePath } from "../../helpers/RoutePath";
import useWindowSize from "../../hooks/useWindowSize";
import SecurityPulseDetailsPage from "./SecurityPulseDetailsPage";
import { useTranslation } from "react-i18next";

type TAnalysisProps = ReturnType<typeof mapStateToProps>;

const SecurityPulseGridPage = (props: TAnalysisProps) => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isShowDwMsg, setIsShowDwMsg] = useState(false);
  const [countClickOnDate, setCountClickOnDate] = useState(0);
  const [isFiterChanged, setIsFiterChanged] = useState(false);
  const themeHook = useThemeVal("variant");
  const [showModal, setShowModal] = useState(false);
  const [shareId, setShareId] = useState("");
  const [copied, setCopied] = useState("Copy");
  const { width } = useWindowSize();

  useEffect(() => {
    document.title = "Security Pulse";
  }, []);

  useEffect(() => {
    const startDate: Date = new Date(props.SecurityPulseData.startDate);
    const endDate: Date = new Date(props.SecurityPulseData.endDate);
    dispatch(
      SecurityPulseGridActionCreator.getGridDataSecurityPulse({
        fromDate: moment(startDate, "DD-MM-YYYY").format("YYYY-MM-DD"),
        toDate: moment(endDate, "DD-MM-YYYY").format("YYYY-MM-DD"),
        // dropdownFilters: props.AnalysisData.dropdownfilters,
      })
    );
  }, []);

  const renderStatusType = (status: string) => {
    if (status.toLowerCase() === "high") {
      return "bg-custom-danger";
    }
    if (status.toLowerCase() === "low") {
      return "bg-custom-success";
    }
    if (status.toLowerCase() === "medium") {
      return "bg-custom-warning";
    }
  };

  const handleDateRangeChange = (date: Tdate) => {
    setCountClickOnDate(countClickOnDate + 1);
    const currentDate = new Date();

    if (isAfter(date.selection.endDate, currentDate)) {
      // If the selected start date is in the future, replace it with today's date
      date.selection.endDate = currentDate;
    }
    const startDate: Date = new Date(date.selection.startDate);
    const endDate: Date = new Date(date.selection.endDate);
    dispatch(
      SecurityPulseGridActionCreator.updateSelectedDate({
        startDate: startDate,
        endDate: endDate,
      })
    );
    setIsFiterChanged(true);
  };

  const selectedDateRange = {
    startDate: new Date(new Date(props.SecurityPulseData.startDate)),
    endDate: new Date(new Date(props.SecurityPulseData.endDate)),
    key: "selection",
  };

  const sendRequestForGridData = () => {
    // following logic included becz after page refresh the store provide startDate and Enddate as string
    const startDate: Date = new Date(props.SecurityPulseData.startDate);
    const endDate: Date = new Date(props.SecurityPulseData.endDate);
    // dispatch(SecurityPulseGridActionCreator.getAnalysiMasterDropDownData()).then(() =>
    dispatch(
      SecurityPulseGridActionCreator.getGridDataSecurityPulse({
        fromDate: moment(startDate, "DD-MM-YYYY").format("YYYY-MM-DD"),
        toDate: moment(endDate, "DD-MM-YYYY").format("YYYY-MM-DD"),
        // dropdownFilters: props.AnalysisData.dropdownfilters,
      })
      // )
    );
  };

  useEffect(() => {
    if (!props.SecurityPulseData.isGridDataLoaded) {
      sendRequestForGridData();
    }
    if (isFiterChanged) {
      if (
        new Date(new Date(props.SecurityPulseData.startDate)).toDateString() !==
        new Date(new Date(props.SecurityPulseData.endDate)).toDateString()
      ) {
        sendRequestForGridData();
        setCountClickOnDate(0);
      } else if (countClickOnDate % 2 === 0) {
        sendRequestForGridData();
        setCountClickOnDate(0);
      }
    }
  }, [
    props.SecurityPulseData.startDate,
    props.SecurityPulseData.endDate,
    // props.AnalysisData.dropdownfilters,
  ]);

  const handleClose = () => {
    const copy = `${t("copy")}`;
    setCopied(copy);
    setShowModal(false);
  };
  const handleShow = () => {
    const copy = `${t("copy")}`;
    setCopied(copy);
    setShowModal(true);
  };

  const handleBlurPage = () => {
    setCountClickOnDate(0);
  };

  const handleClickOnAddBtn = () => {
    setIsShowDetail(false);

    dispatch(addSecurityPulseActionCreator.resetAddStates()).then(() =>
      dispatch(addSecurityPulseActionCreator.updateSecurityPulseMode("add"))
    );
    history.push("/AddEditSecurityPulse");
  };

  const handleEdit = (incidentId: string) => {
    history.push("/AddEditSecurityPulse");
    dispatch(addSecurityPulseActionCreator.getSecurityPulse(incidentId))
      .then(() =>
        dispatch(addSecurityPulseActionCreator.updateSecurityPulseMode("edit"))
      )
      .then(() => dispatch(addSecurityPulseActionCreator.resetEditStates()))
      .then(() =>
        dispatch(addSecurityPulseActionCreator.setCancelMode("editGrid"))
      );
  };

  const onEyeButtonClick = (incidentId: string) => {
    dispatch(
      SecurityPulseDetailsActionCreator.getSecurityPulseDetailsData(incidentId)
    )
      .then(() =>
        dispatch(SecurityPulseDetailsActionCreator.updateIsPreview(false))
      )
      .then(() => history.push("/SecurityPulseDetail"));
  };

  const handleShare = (row: any) => {
    const shareData = {
      title: "SecurityPulse Details",
      text: `
      ${props.SecurityPulseData.gridData?.gridHeader[0]?.headerText}: ${row.column1},
      ${props.SecurityPulseData.gridData?.gridHeader[1]?.headerText} : ${row.column2},
      ${props.SecurityPulseData.gridData?.gridHeader[2]?.headerText}: ${row.column3},
      ${props.SecurityPulseData.gridData?.gridHeader[3]?.headerText}: ${row.column4}, 
      ${props.SecurityPulseData.gridData?.gridHeader[4]?.headerText} : ${row.column5},    
      ${props.SecurityPulseData.gridData?.gridHeader[5]?.headerText}: ${row.column6},
      ${props.SecurityPulseData.gridData?.gridHeader[6]?.headerText} : ${row.column7}`,
    };

    if (!navigator.canShare) {
      return toast.warning(
        "This feature is available only in secure contexts (HTTPS)",
        { position: "top-center", autoClose: 10000 }
      );
    }
    navigator.share(shareData).then(() => {
      toast.success(`${t("sharedsuccessfully")}`, {
        position: "top-center",
        autoClose: 10000,
      });
    });
  };

  const handleDownload = (incidentId: string) => {
    dispatch(
      SecurityPulseDetailsActionCreator.getSecurityPulseDetailsData(incidentId)
    );
    setIsShowDetail(true);
  };

  const handleDelete = (incidentId: string) => {
    dispatch(
      SecurityPulseGridActionCreator.deleteSecurityPulseData(incidentId)
    );
    setIsShowDwMsg(true);
  };

  useEffect(() => {
    if (isShowDwMsg && props.SecurityPulseData.isDeleteSecurityPulseSuccess) {
      if (
        props.SecurityPulseData.isDeleteSecurityPulseResp?.status?.toLocaleLowerCase() ===
        "success"
      ) {
        // dispatch(SecurityPulseGridActionCreator.getGridData());
        sendRequestForGridData();
        toast.success(
          props.SecurityPulseData.isDeleteSecurityPulseResp?.message,
          {
            position: "top-center",
            autoClose: 10000,
          }
        );
      } else {
        toast.error(
          props.SecurityPulseData.isDeleteSecurityPulseResp?.message,
          {
            position: "top-center",
            autoClose: 10000,
          }
        );
      }
      setIsShowDwMsg(false);
    }
  }, [props.SecurityPulseData.isDeleteSecurityPulseResp]);

  useEffect(() => {
    if (isShowDetail && !props.SecurityPulseDetailData.isLoading) {
      setTimeout(() => {
        window.print();
        setIsShowDetail(false);
      }, 100);
    }
  }, [props.SecurityPulseDetailData.SecurityPulseDetailsData]);

  useEffect(() => {
    if (isShowDetail && props.SecurityPulseDetailData.isError) {
      toast.error(`${t("erroroccuredwhilefetchingthedata")}`, {
        position: "top-center",
        autoClose: 10000,
      });
      setIsShowDetail(false);
    }
  }, [props.SecurityPulseDetailData.isError]);

  if (props.SecurityPulseData.isGridDataError) {
    return (
      <div className="error">
        Error while fetching the data. Please contact administrator.
      </div>
    );
  }

  if (!props.SecurityPulseData.isGridDataLoaded) {
    if (props.SecurityPulseData.isGridDataLoading) {
      return <Loading title={""} width={"1050px"} />;
    }
  }

  if (props.SecurityPulseData.isGridDataLoaded) {
    if (!props.SecurityPulseData.gridData?.gridData) {
      return (
        <div className="error">
          Error while fetching the data. Please contact administrator.
        </div>
      );
    }
    const rowData: any[] =
      Object.keys(props.SecurityPulseData.gridData).length > 0
        ? props.SecurityPulseData.gridData?.gridData.map((row, index) => {
            return {
              ...row,
              column0: index,
              linkColumn: 4,
              actions: (
                <div className="d-flex flex-row justify-content-start">
                  {props.UserData.userRoles?.claims?.includes(
                    "SecurityPulseGrid_View"
                  ) && (
                    <button
                      className="grid-action-button"
                      onClick={() => onEyeButtonClick(row?.column1)}
                    >
                      <HiEye fontSize="1rem" color="inherent" />
                    </button>
                  )}
                  {props.UserData.userRoles?.claims?.includes(
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
                  {props.UserData.userRoles?.claims?.includes(
                    "PerspectiveGrid_Share"
                  ) &&
                    !hideShare && (
                      <button
                        className="grid-action-button"
                        onClick={() => {
                          setShareId(row?.column1);
                          handleShow();
                        }}
                      >
                        <HiOutlineShare fontSize="1rem" color="inherent" />
                      </button>
                    )}

                  {props.UserData.userRoles?.claims?.includes(
                    "SecurityPulseGrid_Edit"
                  ) && (
                    <button
                      className="grid-action-button"
                      onClick={() => {
                        handleEdit(row?.column1);
                      }}
                    >
                      <HiPencil fontSize="1rem" color="inherent" />
                    </button>
                  )}
                  {props.UserData.userRoles?.claims?.includes(
                    "SecurityPulseGrid_Delete"
                  ) && (
                    <button
                      className="grid-action-button"
                      onClick={() => {
                        handleDelete(row?.column1);
                      }}
                    >
                      <HiTrash fontSize="1rem" color="inherent" />
                    </button>
                  )}
                </div>
              ),
            };
          })
        : [];

    const FlagRender = (type: string) => {
      if (type.toLocaleLowerCase() === "publish") {
        return "dummyIcons.flagIconPublish";
      } else if (type.toLocaleLowerCase() === "draft") {
        return "dummyIcons.flagIconDraft";
      }
    };

    const gridDataFormatter = (
      cell: any,
      index: number,
      row: any,
      dataDisplayLength?: number
    ) => {
      if (index === 2) {
        const dummyIcons = Icons;
        return (
          <span>
            <img src={eval(FlagRender(cell) as string)} />
          </span>
        );
      }
      if (index === 3) {
        return (
          <span className="d-flex justify-content-start text-nowrap">
            {/* {moment(new Date(cell), "DD-MM-YYYY").format("DD.MM.YYYY")} */}
            {DFG(cell)}
          </span>
        );
      }
      if (index === 4) {
        return (
          <>
            {props.UserData.userRoles?.claims?.includes(
              "SecurityPulseGrid_View"
            ) ? (
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
      if (index === props.SecurityPulseData.gridData?.gridHeader.length + 1) {
        return <>{cell}</>;
      }
      return (
        <div className="text-start">
          {dataDisplayLength && dataDisplayLength !== 0
            ? cell?.slice(0, dataDisplayLength) + "..."
            : cell}
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
      if (colIndex === 0) {
        return <span></span>;
      }
      if (colIndex === 1) {
        return (
          <span className="d-flex justify-content-start">
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
      Object.keys(props.SecurityPulseData.gridData).length > 0
        ? props.SecurityPulseData.gridData?.gridHeader.map((header, index) => {
            return {
              text: header.headerText,
              dataField: header.key,
              sort: header.isSorting,
              hidden: header.hideOnUI,
              formatter: (cell: any, row: any) =>
                gridDataFormatter(
                  cell,
                  index + 1,
                  row,
                  header.dataDisplayLength
                ),
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

    if (props.SecurityPulseData.gridData?.gridAddOn?.showLastColumnAsAction) {
      colData.push({
        text: `${t("actions")}`,
        dataField: "actions",
        sort: false,
        formatter: (cell: any, row: any) =>
          gridDataFormatter(
            cell,
            props.SecurityPulseData.gridData?.gridHeader.length + 1,
            row
          ),
        headerFormatter: headerFormatter,
        hidden: false,
        sortCaret: () => <></>,
        sortFunc: () => 0,
      });
    }

    return (
      <div className="rml perspective-advisory-grid-page">
        {props.SecurityPulseData.isGridDataLoading ||
        props.SecurityPulseDetailData.isLoading ? (
          <Loading title={""} width={"1050px"} />
        ) : (
          <div className="dPrint">
            <SecurityPulseDetailsPage />
          </div>
        )}
        {props.SecurityPulseData.isGridDataLoading ||
        props.SecurityPulseData.isDeleteSecurityPulseLoading ||
        props.SecurityPulseDetailData.isLoading ? (
          <></>
        ) : (
          // <Loading title={""} width={"1050px"} />
          <span
            className="Analysis-Grid d-flex flex-column flex-grow-1"
            id="section-not-to-print"
          >
            <div className="my-3">
              <h1 className="analysis-header">{t("securitypulse")}</h1>
            </div>
            <Grid
              rowData={rowData}
              colData={colData}
              gridSelectedFilter={props.SecurityPulseData.dropdownfilters}
              gridHeaderDropdownData={props.SecurityPulseData.dropDownData}
              showGridHeader={true}
              showAddBtn={
                props.UserData.userRoles?.claims?.includes(
                  "SecurityPulseGrid_Add"
                )
                  ? true
                  : false
              }
              handleClickOnAddBtn={handleClickOnAddBtn}
              gridAddOn={props.SecurityPulseData.gridData?.gridAddOn}
              handleSelect={handleDateRangeChange}
              selectionRange={selectedDateRange}
              handleBlurPage={handleBlurPage}
              PageName={"SecurityPulse"}
              onEyeButtonClick={onEyeButtonClick}
              currentPage={props.SecurityPulseData.currentPage}
              setCurrentPage={(page: number) =>
                dispatch(
                  SecurityPulseGridActionCreator.receiveCurrentPage(page)
                )
              }
            />
          </span>
        )}
        <>
          <CustomModal
            onHide={handleClose}
            show={showModal}
            modalTitle={`${t("share")}: ${t("securitypulse")} > ${shareId}`}
            modalBody={
              <>
                <div className="d-flex justify-content-center align-items-center">
                  <div className="security-grid-page-modal">
                    <div className="d-flex justify-content-between align-items-center margin-15">
                      <h6
                        onClick={() => {
                          const uri = `${window.location.origin}${
                            RoutePath.DYNAMICSECURITYPULSEDETAILS.split(":")[0]
                          }${shareId}`;

                          window.open(uri, "_blank");
                        }}
                        className="security-grid-clickable"
                      >
                        {`${window.location.origin}${
                          RoutePath.DYNAMICSECURITYPULSEDETAILS.split(":")[0]
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
                            RoutePath.DYNAMICSECURITYPULSEDETAILS.split(":")[0]
                          }${shareId}`;

                          navigator.clipboard.writeText(uri);
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
        </>
      </div>
    );
  }
  return <div></div>;
};

function mapStateToProps(state: RootState) {
  return {
    UserData: state.UserAuthentication,
    SecurityPulseData: state.SecurityPulseGrid,
    SecurityPulseDetailData: state.SecurityPulseDetails,
  };
}

export default connect(mapStateToProps)(SecurityPulseGridPage);
