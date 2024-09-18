import moment from "moment";
import { useEffect, useState } from "react";
import { Button, Image } from "react-bootstrap";
import { toast } from "react-toastify";
import Grid from "../../component/Grid/Grid";
import { ColumnDescription } from "react-bootstrap-table-next";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Icons from "../../assets/icons/index";
import Loading from "../../component/Loading";
import { dropdownfilter } from "../../definition/InsightGridStoreProps";
import { Tdate } from "../../definition/InsightPageProps";
import { AppDispatch } from "../../index";
import { addEditAnalysisActionCreator } from "../../store/AddEdits/AddEditPerspectiveSlice";
import { RootState } from "../../configureStore";
import { AnalysisDetailsActionCreator } from "../../store/Perspective/PerspectiveDetailSlice";
import { PerspectiveActionCreator } from "../../store/Perspective/PerspectiveGridSlice";
import { hideShare } from "../../utils/Application";
import { DFG } from "../../utils/Common";
import AnalysisDetail from "./PerspectiveDetailPage";
import {
  HiOutlineShare,
  HiTrash,
  HiPencil,
  HiOutlineArrowDownTray,
  HiEye,
} from "react-icons/hi2";
import { useThemeVal } from "../../hooks/useThemeVar";
import useWindowSize from "../../hooks/useWindowSize";
import { useTranslation } from "react-i18next";
import { isAfter } from "date-fns";

type TAnalysisProps = ReturnType<typeof mapStateToProps>;
const PerspectiveGridPage = (props: TAnalysisProps) => {
  const { t } = useTranslation();
  const [countClickOnDate, setCountClickOnDate] = useState(0);
  const [isFiterChanged, setIsFiterChanged] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const themeHook = useThemeVal("variant");
  const { width } = useWindowSize();
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isShowDwMsg, setIsShowDwMsg] = useState(false);

  useEffect(() => {
    document.title = "Perspective";
  }, []);
  // future reference
  // useEffect(() => {
  //   let currentDate = new Date();
  //   currentDate.setDate(1);
  //   let startDate = currentDate.toISOString().split("T")[0];
  //   console.log(startDate, "h lh");
  //   let endDate = new Date();
  //   let lastDayOfMonth = new Date(
  //     endDate.getFullYear(),
  //     endDate.getMonth() + 1,
  //     0
  //   );
  //   let lastDate = lastDayOfMonth.toISOString().split("T")[0];

  //   dispatch(PerspectiveActionCreator.getAnalysiMasterDropDownData())
  //     .unwrap()
  //     .then(() =>
  //       dispatch(
  //         PerspectiveActionCreator.getPerspectiveGridData({
  //           fromDate: moment(new Date(startDate), "DD-MM-YYYY").format(
  //             "YYYY-MM-DD"
  //           ),
  //           toDate: moment(new Date(lastDate), "DD-MM-YYYY").format(
  //             "YYYY-MM-DD"
  //           ),
  //           dropdownFilters: props.PerspectiveGrid.dropdownfilters,
  //         })
  //       )
  //     );
  // }, []);

  const sendRequestForGridData = () => {
    // following logic included becz after page refresh the store provide startDate and Enddate as string
    const startDate: Date = new Date(props.PerspectiveGrid.startDate);
    const endDate: Date = new Date(props.PerspectiveGrid.endDate);
    dispatch(PerspectiveActionCreator.getAnalysiMasterDropDownData()).then(() =>
      dispatch(
        PerspectiveActionCreator.getPerspectiveGridData({
          fromDate: moment(startDate, "DD-MM-YYYY").format("YYYY-MM-DD"),
          toDate: moment(endDate, "DD-MM-YYYY").format("YYYY-MM-DD"),
          dropdownFilters: props.PerspectiveGrid.dropdownfilters,
        })
      )
    );
  };

  const handleBlurPage = () => {
    setCountClickOnDate(0);
  };
  useEffect(() => {
    if (!props.PerspectiveGrid.isGridDataLoaded) {
      sendRequestForGridData();
    }
    if (isFiterChanged) {
      if (
        new Date(new Date(props.PerspectiveGrid.startDate)).toDateString() !==
        new Date(new Date(props.PerspectiveGrid.endDate)).toDateString()
      ) {
        sendRequestForGridData();
        setCountClickOnDate(0);
      } else if (countClickOnDate % 2 === 0) {
        sendRequestForGridData();
        setCountClickOnDate(0);
      }
    }
  }, [
    props.PerspectiveGrid.startDate,
    props.PerspectiveGrid.endDate,
    props.PerspectiveGrid.dropdownfilters,
  ]);

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
      PerspectiveActionCreator.updateSelectedDate({
        startDate: startDate,
        endDate: endDate,
      })
    );
    setIsFiterChanged(true);
  };

  const selectedDateRange = {
    startDate: new Date(new Date(props.PerspectiveGrid.startDate)),
    endDate: new Date(new Date(props.PerspectiveGrid.endDate)),
    key: "selection",
  };

  const handleGridFilterChange = (selectedDropdownFilter: dropdownfilter[]) => {
    dispatch(
      PerspectiveActionCreator.updateSelectedDropdownFilters(
        selectedDropdownFilter
      )
    );
    setIsFiterChanged(true);
  };

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

  const handleClickOnAddBtn = () => {
    setIsShowDetail(false);

    dispatch(addEditAnalysisActionCreator.resetAddStates())
      .then(() =>
        dispatch(addEditAnalysisActionCreator.updateAnalysisMode("add"))
      )
      .then(() =>
        dispatch(addEditAnalysisActionCreator.setCancelMode("addGrid"))
      );
    history.push("/AddEditPerspective");
  };

  const onEyeButtonClick = (incidentId: string) => {
    dispatch(AnalysisDetailsActionCreator.getAnalysisDetailsData(incidentId))
      .then(() => dispatch(AnalysisDetailsActionCreator.updateIsPreview(false)))
      .then(() => dispatch(addEditAnalysisActionCreator.resetEditStates()))
      .then(() => history.push("/PerspectiveDetail"));
  };

  const handleShare = (row: any) => {
    const shareData = {
      title: "Perspective Details",
      text: `
      ${props.PerspectiveGrid.gridData?.gridHeader[0]?.headerText}: ${row.column1},
      ${props.PerspectiveGrid.gridData?.gridHeader[1]?.headerText} : ${row.column2},
      ${props.PerspectiveGrid.gridData?.gridHeader[2]?.headerText}: ${row.column3},
      ${props.PerspectiveGrid.gridData?.gridHeader[3]?.headerText}: ${row.column4}, 
      ${props.PerspectiveGrid.gridData?.gridHeader[4]?.headerText} : ${row.column5},    
      ${props.PerspectiveGrid.gridData?.gridHeader[5]?.headerText}: ${row.column6},
      ${props.PerspectiveGrid.gridData?.gridHeader[6]?.headerText} : ${row.column7}`,
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

  const handleEdit = (incidentId: string) => {
    history.push("/AddEditPerspective");
    dispatch(addEditAnalysisActionCreator.getAnalysis(incidentId))
      .then(() =>
        dispatch(addEditAnalysisActionCreator.updateAnalysisMode("edit"))
      )
      .then(() => dispatch(addEditAnalysisActionCreator.resetEditStates()))
      .then(() =>
        dispatch(addEditAnalysisActionCreator.setCancelMode("editGrid"))
      );
  };

  const handleDelete = (incidentId: string) => {
    dispatch(PerspectiveActionCreator.deletePerspectiveData(incidentId));
    setIsShowDwMsg(true);
  };

  useEffect(() => {
    if (isShowDwMsg && props.PerspectiveGrid.isDeletePerspectiveSuccess) {
      if (
        props.PerspectiveGrid.isDeletePerspectiveResp?.status?.toLocaleLowerCase() ===
        "success"
      ) {
        sendRequestForGridData();
        toast.success(props.PerspectiveGrid.isDeletePerspectiveResp?.message, {
          position: "top-center",
          autoClose: 10000,
        });
      } else {
        toast.error(props.PerspectiveGrid.isDeletePerspectiveResp?.message, {
          position: "top-center",
          autoClose: 10000,
        });
      }
      setIsShowDwMsg(false);
    }
  }, [props.PerspectiveGrid.isDeletePerspectiveResp]);

  const handleDownload = (incidentId: string) => {
    dispatch(AnalysisDetailsActionCreator.getAnalysisDetailsData(incidentId));
    setIsShowDetail(true);
  };

  useEffect(() => {
    if (isShowDetail && !props.PerspectiveDetails.isLoading) {
      setTimeout(() => {
        window.print();
        setIsShowDetail(false);
      }, 100);
    }
  }, [props.PerspectiveDetails.analysisDetailsData]);

  useEffect(() => {
    if (isShowDetail && props.PerspectiveDetails.isError) {
      toast.error(`${t("erroroccuredwhilefetchingthedata")}`, {
        position: "top-center",
        autoClose: 10000,
      });
      setIsShowDetail(false);
    }
  }, [props.PerspectiveDetails.isError]);

  if (props.PerspectiveGrid.isGridDataError) {
    return (
      <div className="error">
        Error while fetching the data. Please contact administrator.
      </div>
    );
  }

  if (!props.PerspectiveGrid.isGridDataLoaded) {
    if (props.PerspectiveGrid.isGridDataLoading) {
      return <Loading title={""} width={"1050px"} />;
    }
  }

  if (props.PerspectiveGrid.isGridDataLoaded) {
    const rowData: any[] =
      Object.keys(props.PerspectiveGrid.gridData).length > 0
        ? props.PerspectiveGrid.gridData?.gridData?.map((row, key) => {
            return {
              ...row,
              column0: key,
              linkColumn: 5,
              actions: (
                <div className="d-flex  justify-content-start">
                  {props.UserData.userRoles?.claims?.includes(
                    "PerspectiveGrid_View"
                  ) && (
                    <button
                      className="grid-action-button"
                      onClick={() => onEyeButtonClick(row?.column1)}
                    >
                      {/* <Image src={Icons.eyeIcon} /> */}
                      <HiEye fontSize="1rem" color="inherent" />
                    </button>
                  )}
                  {props.UserData.userRoles?.claims?.includes(
                    "PerspectiveGrid_Download"
                  ) && (
                    <button
                      className="grid-action-button"
                      onClick={() => handleDownload(row?.column1)}
                    >
                      {/* <Image src={Icons.dwIcon} /> */}
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
                          handleShare(row);
                        }}
                      >
                        <HiOutlineShare fontSize="1rem" color="inherent" />
                      </button>
                    )}
                  {props.UserData.userRoles?.claims?.includes(
                    "PerspectiveGrid_Edit"
                  ) && (
                    <Button
                      className="grid-action-button"
                      onClick={() => {
                        handleEdit(row.column1);
                      }}
                    >
                      <HiPencil fontSize="1rem" color="inherent" />
                    </Button>
                  )}
                  {props.UserData.userRoles?.claims?.includes(
                    "PerspectiveGrid_Delete"
                  ) && (
                    <button
                      className="grid-action-button"
                      onClick={() => {
                        handleDelete(row.column1);
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
      return (
        <span className="d-flex justify-content-start">
          <span>{column?.text}</span>
          <span>{components?.sortElement}</span>
        </span>
      );
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
      if (index === 5) {
        return (
          <>
            {props.UserData.userRoles?.claims?.includes(
              "PerspectiveGrid_View"
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
      if (index === props.PerspectiveGrid.gridData?.gridHeader.length + 1) {
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

    const colData =
      Object.keys(props.PerspectiveGrid.gridData).length > 0
        ? props.PerspectiveGrid.gridData?.gridHeader?.map((header, index) => {
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

    colData?.unshift({
      text: "UniqueId",
      dataField: "column0",
      sort: false,
      formatter: (cell: any, row: any) => gridDataFormatter(cell, 0, row),
      headerFormatter: headerFormatter,
      hidden: true,
      sortCaret: () => <></>,
      sortFunc: () => 0,
    });

    if (props.PerspectiveGrid.gridData?.gridAddOn?.showLastColumnAsAction) {
      colData?.push({
        text: `${t("actions")}`,
        dataField: "actions",
        sort: false,
        formatter: (cell: any, row: any) =>
          gridDataFormatter(
            cell,
            props.PerspectiveGrid.gridData?.gridHeader.length + 1,
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
        {props.PerspectiveGrid.isGridDataLoading ||
        props.PerspectiveDetails.isLoading ? (
          <Loading title={""} width={"1050px"} />
        ) : (
          <div className="dPrint">
            <AnalysisDetail />
          </div>
        )}
        {props.PerspectiveGrid.isGridDataLoading ||
        props.PerspectiveDetails.isLoading ||
        props.PerspectiveGrid.isDeletePerspectiveLoading ? (
          <></>
        ) : (
          <span
            className="Analysis-Grid d-flex flex-column flex-grow-1 "
            id="section-not-to-print"
          >
            <div className="my-3">
              <h1 className="analysis-header">{t("perspective")}</h1>
            </div>
            <Grid
              rowData={rowData}
              colData={colData}
              gridSelectedFilter={props?.PerspectiveGrid?.dropdownfilters}
              handleGridFilterChange={handleGridFilterChange}
              gridHeaderDropdownData={props.PerspectiveGrid.dropDownData}
              showGridHeader={true}
              showAddBtn={props.UserData.userRoles?.claims?.includes(
                "PerspectiveGrid_Add"
              )}
              handleClickOnAddBtn={handleClickOnAddBtn}
              gridAddOn={props.PerspectiveGrid.gridData?.gridAddOn}
              handleSelect={handleDateRangeChange}
              selectionRange={selectedDateRange}
              handleBlurPage={handleBlurPage}
              PageName={"Perspective"}
              onEyeButtonClick={onEyeButtonClick}
              currentPage={props.PerspectiveGrid.currentPage}
              setCurrentPage={(page: number) =>
                dispatch(PerspectiveActionCreator.receiveCurrentPage(page))
              }
            />
          </span>
        )}
      </div>
    );
  }
  return <div></div>;
};

// export default Analysis;
function mapStateToProps(initialState: RootState) {
  return {
    UserData: initialState.UserAuthentication,
    PerspectiveGrid: initialState.PerspectiveGrid,
    PerspectiveDetails: initialState.PerspectiveDetails,
  };
}

export default connect(mapStateToProps)(PerspectiveGridPage);
